const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var fetchuser = require("../middleware/fetchuser")

const JWT_SECRET = "ManasisaGoodBoy";

// Route 1:  // create a user using localhost:4000/api/auth/createuser
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleat 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    let success = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    // chech whether the user with this email exists already

    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ success, error: "A user with this email already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      // Create a User
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      let success = true
      res.json({ success, authtoken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("some error occured");
    }
  }
);

// Route:2 // Authenticate a user using (Login) : localhost:4000/api/auth/login

router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "Please try to login using correct Credentials" });
      }
      const passwordcompare = await bcrypt.compare(password, user.password);
      if (!passwordcompare) {
        let success = false
        return res.status(400).json({ success, error: "Please try to login using correct Credentials" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      let success = true
      res.json({ success, authtoken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// Route:3 // Get loggedin user Details using  : localhost:4000/api/auth/getuser

router.post("/getuser", fetchuser, async (req, res) => {
  try {
    const userId = req.user.id
    const user = await User.findById(userId).select("-password")
    res.send(user)
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
}
);
module.exports = router;
