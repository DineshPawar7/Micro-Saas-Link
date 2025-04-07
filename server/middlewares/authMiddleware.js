// controllers/authController.js
const jwt = require("jsonwebtoken");

const loginController = async (req, res) => {
  const { email, password } = req.body;

  if (email !== "intern@dacoid.com" || password !== "Test123") {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ userId: "hardcoded_user_id" }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.json({ token });
};

module.exports = {
  loginController,
};
