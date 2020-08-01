const mongoose = require("mongoose");

const PokemonSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  pokemon_number: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  sprites: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("pokemon", PokemonSchema);
