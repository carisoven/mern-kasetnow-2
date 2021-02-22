const express = require("express");
const router = express.Router();
// config tools
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const { check, validationResult } = require("express-validator");
// Auth Middleware
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const normalize = require('normalize-url');

// route    GET api/auth
// Get user by token
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.send({
      _id: user.id,
      role: user.role,
      fullname: user.fullname,
      email:user.email,
      avatar: user.avatar,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// route    POST /api/auth/signin
// Login Email
router.post(
  "/signin",
  [
    check("email", "email invite").not().isEmpty(),
    check("password", "password invite").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "email and Password is wrong" }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "email and Password is wrong" }] });
      }

      const payload = {
        user: {
          id: user.id,
          role: user.role,
        },
      };
      jwt.sign(
        payload,
        process.env.JWTSECRET,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({
            token: token,
            user: {
              id: user.id,
              role: user.role,
            },
          });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// route    POST api/auth/signup
// Register User
router.post(
  "/signup",
  [
    check("email", "Please include a valid email").not().isEmpty(),
    check(
      "password",
      "please enter a Password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { fullname, email, password, role } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }
      const avatar = normalize(
        gravatar.url(email, {
          s: '200',
          r: 'pg',
          d: 'mm'
        }),
        { forceHttps: true }
      );
      user = new User({
        fullname,
        avatar,
        email,
        password,
        role,
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        process.env.JWTSECRET,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({
            token: token,
            user: {
              id: user.id,
              role: user.role,
            },
          });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send(err.message);
    }
  }
);

module.exports = router;
