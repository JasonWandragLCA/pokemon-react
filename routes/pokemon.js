const express = require("express");
const router = express.Router();

// @route   GET api/pokemon
// @desc    Get all users pokemon
// @access  Private
router.get("/", (req, res) => {
  res.send("Get all pokemon");
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
