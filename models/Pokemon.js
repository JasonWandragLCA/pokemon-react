const mongoose = require("mongoose");

// TODO:: Check information of pokemon to be saved to DB
// Currently saved:
// - user (User who owns this pokemon)
// - pokemon_number (Pokemon number according to pokedex)
// - name (name of pokemon)
// - sprites (array of pokemon images)
// - pokemon_url (link to get pokemon info)
// - date (Date when pokemon was added to user collection)

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
