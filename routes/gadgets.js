const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");
const Gadget = require("../models/gadget");

// GET all gadgets with random success probability
router.get("/", async (req, res) => {
  try {
    let whereClause = {};
    if (req.query.status) {
      whereClause.status = req.query.status;
    }

    const gadgets = await Gadget.findAll({ where: whereClause });

    // Add random mission success probability (10% to 100%)
    const gadgetsWithSuccess = gadgets.map((gadget) => ({
      ...gadget.toJSON(),
      successProbability: `${Math.floor(Math.random() * 91) + 10}%`,
    }));

    res.json(gadgetsWithSuccess);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// POST - Add a new gadget
router.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: "Name is required" });

    const gadget = await Gadget.create({ name });
    res.status(201).json(gadget);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// PATCH - Update gadget info
router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, status } = req.body;

    const gadget = await Gadget.findByPk(id);
    if (!gadget) return res.status(404).json({ error: "Gadget not found" });

    if (name) gadget.name = name;
    if (status) gadget.status = status;

    await gadget.save();
    res.json(gadget);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE - Mark gadget as decommissioned
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const gadget = await Gadget.findByPk(id);
    if (!gadget) return res.status(404).json({ error: "Gadget not found" });

    gadget.status = "Decommissioned";
    await gadget.save();

    res.json({ message: "Gadget decommissioned" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// POST - Self-destruct a gadget
router.post("/:id/self-destruct", async (req, res) => {
  try {
    const { id } = req.params;

    const gadget = await Gadget.findByPk(id);
    if (!gadget) return res.status(404).json({ error: "Gadget not found" });

    // Simulated self-destruct confirmation code
    const confirmationCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    
    gadget.status = "Destroyed";
    await gadget.save();

    res.json({ message: "Gadget self-destructed", confirmationCode });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
