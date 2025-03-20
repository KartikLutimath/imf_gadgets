const { Sequelize } = require("sequelize");

// Load environment variables
require("dotenv").config();

// Create Sequelize instance
const sequelize = new Sequelize(
  process.env.DB_NAME || "imf_gadgets_db",
  process.env.DB_USER || "kartik",
  process.env.DB_PASS || "Kartik@2003",
  {
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: "postgres",
    logging: true, // Set to true to see SQL logs

  }
);

// Authenticate DB connection
sequelize
  .authenticate()
  .then(() => console.log("✅ Database connected successfully!"))
  .catch((error) => console.error("❌ Database connection error:", error.message));

module.exports = sequelize;
