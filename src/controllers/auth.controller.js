const authService = require("../services/auth.service");

async function register(req, res) {
  try {
    const { email, password } = req.body;

    const user = await authService.register(email, password);

    res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    const token = await authService.login(email, password);

    res.json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
  register,
  login,
};