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
    // gets all pokemon in database related to the user
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
router.post(
  "/",
  [auth, [check("name", "Name is required").not().isEmpty()]],
  async (req, res) => {
    // check if all field are valid
    const errors = validationResult(req);
    // throw errors if there are errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { pokemon_number, name, sprites } = req.body;

    try {
      const newPokemon = new Pokemon({
        user: req.user.id,
        pokemon_number,
        name,
        sprites,
      });

      const pokemon = await newPokemon.save();
      res.json(pokemon);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   PUT api/pokemon/:id
// @desc    Update pokemon
// @access  Private
router.put("/:id", auth, async (req, res) => {
  const { pokemon_number, name, sprites } = req.body;

  // Build Pokemon Object
  const pokemonFields = {};
  if (pokemon_number) pokemonFields.pokemon_number = pokemon_number;
  if (name) pokemonFields.name = name;
  if (sprites) pokemonFields.sprites = sprites;

  try {
    let pokemon = await Pokemon.findById(req.params.id);
    if (!pokemon) res.status(404).json({ msg: "Pokemon not found" });

    // Make sure user owns pokemon
    if (pokemon.user.toString() !== req.user.id)
      res.status(401).json({ msg: "Not Authorized" });

    pokemon = await Pokemon.findByIdAndUpdate(
      req.params.id,
      { $set: pokemonFields },
      { new: true }
    );
    res.json(pokemon);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   DELETE api/pokemon/:id
// @desc    Delete pokemon
// @access  Private
router.delete("/:id", (req, res) => {
  res.send("Delete pokemon");
});

module.exports = router;
