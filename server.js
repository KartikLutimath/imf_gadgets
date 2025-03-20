const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Import routes (if you have them)
const gadgetRoutes = require("./routes/gadgets");
app.use("/gadgets", gadgetRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("IMF Gadget API is running...");
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
