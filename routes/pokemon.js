const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");
// Import Models
const User = require("../models/User");
const Pokemon = require("../models/Pokemon");

// @route   GET api/pokemon
// @desc    Get all users pokemon
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const pokemon = await Pokemon.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(pokemon);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/pokemon
// @desc    Add new pokemon
// @access  Private
router.post("/", (req, res) => {
  res.send("Add pokemon");
});

// @route   PUT api/pokemon/:id
// @desc    Update pokemon
// @access  Private
router.put("/:id", (req, res) => {
  res.send("Update pokemon");
});

// @route   DELETE api/pokemon/:id
// @desc    Delete pokemon
// @access  Private
router.delete("/:id", (req, res) => {
  res.send("Delete pokemon");
});

module.exports = router;
