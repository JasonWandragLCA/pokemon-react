const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");
const config = require("config");
const { compare } = require("bcryptjs");
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");

const User = require("../models/User");

// @route   GET api/auth
// @desc    Get logged in user
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/auth
// @desc    Auth user & get token
// @access  Public
router.post(
  "/",
  [
    check("email", "Please enter email").isEmail(),
    check("password", "Passord is required").exists(),
  ],
  async (req, res) => {
    // check if all field are valid
    const errors = validationResult(req);
    // throw errors if there are errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) res.status(400).json({ msg: "Invalid Credentials" });

      const isMatch = await compare(password, user.password);

      if (!isMatch) res.status(400).json({ msg: "Invalid Credentials" });

      // Create payload
      const payload = {
        user: {
          id: user.id,
        },
      };

      // Send json web token back as authentication
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
