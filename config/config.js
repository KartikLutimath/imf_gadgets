require('dotenv').config(); // Ensure this is at the top

// import 'dotenv/config';  // ✅ Works in ES Modules

module.exports = {
  development: {
    username: "Kartik",
    password: "Kartik@2003",
    database: "imf_gadgets_db",
    host: "127.0.0.1",
    dialect: "postgres",
  },
  production: {
    use_env_variable: "DATABASE_URL",
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false // Required for cloud-based DBs like Heroku
      }
    }
  }
};
