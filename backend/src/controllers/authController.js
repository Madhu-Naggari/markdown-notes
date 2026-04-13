const authService = require("../services/authService");
const { createToken } = require("../utils/token");

async function register(req, res) {
  const { name, email, password } = req.body;
  const trimmedName = authService.normalizeName(name);
  const trimmedEmail = authService.normalizeEmail(email);

  if (!trimmedName || !trimmedEmail || !password) {
    return res
      .status(400)
      .json({ message: "Name, email, and password are required" });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters long" });
  }

  try {
    const existingUser = await authService.findUserByEmail(trimmedEmail);

    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const user = await authService.createUser({
      name: trimmedName,
      email: trimmedEmail,
      password,
    });

    return res.status(201).json({
      message: "Account created successfully",
      user,
      token: createToken(user),
    });
  } catch (error) {
    console.error("Error creating user:", error.message);
    return res.status(500).json({ message: "Failed to create account" });
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  const trimmedEmail = authService.normalizeEmail(email);

  if (!trimmedEmail || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await authService.verifyUser(trimmedEmail, password);

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    return res.json({
      message: "Login successful",
      user,
      token: createToken(user),
    });
  } catch (error) {
    console.error("Error logging in:", error.message);
    return res.status(500).json({ message: "Failed to log in" });
  }
}

async function getCurrentUser(req, res) {
  try {
    const user = await authService.findUserProfileById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error.message);
    return res.status(500).json({ message: "Failed to fetch user" });
  }
}

async function updateCurrentUser(req, res) {
  const { name, email, password } = req.body;
  const trimmedName = authService.normalizeName(name);
  const trimmedEmail = authService.normalizeEmail(email);

  if (!trimmedName || !trimmedEmail) {
    return res.status(400).json({ message: "Name and email are required" });
  }

  if (password && password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters long" });
  }

  try {
    const emailExists = await authService.emailExistsForAnotherUser(
      trimmedEmail,
      req.user.id,
    );

    if (emailExists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const user = await authService.updateUser(req.user.id, {
      name: trimmedName,
      email: trimmedEmail,
      password,
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json({
      message: "User updated successfully",
      user,
      token: createToken(user),
    });
  } catch (error) {
    console.error("Error updating user:", error.message);
    return res.status(500).json({ message: "Failed to update user" });
  }
}

function logout(req, res) {
  return res.json({ message: "Logged out successfully" });
}

module.exports = {
  register,
  login,
  getCurrentUser,
  updateCurrentUser,
  logout,
};

