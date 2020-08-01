const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../models/User");
const { genSalt, hash } = require("bcryptjs");
const { check, validationResult } = require("express-validator");

// @route   POST api/users
// @desc    Register a user
// @access  Public
router.post(
  // Route connected with current @route
  "/",
  // List of checks to make sure data inserted is correct
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please enter valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  // What to do if all information required has passed all checks
  async (req, res) => {
    // check if all field are valid
    const errors = validationResult(req);
    // throw errors if there are errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      // Check if user exists
      let user = await User.findOne({ email });
      // If email is already registered, inform users
      if (user) {
        res.status(400).json({ msg: "User already exists" });
      }
      // Else set user to User Schema
      user = new User({
        name,
        email,
        password,
      });

      // Create bcrypt salt for password encryption using bcrypt getSalt method
      const salt = await genSalt(10);

      // Encrypt user password using bcrypt hash method
      user.password = await hash(password, salt);

      // Save user in database
      await user.save();

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
