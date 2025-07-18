const fs = require("fs").promises;
const path = require("path");
const bcrypt = require("bcrypt");

// Assuming users are loaded from a JSON file
const usersFilePath = path.join(__dirname, "..", "data", "users.json");

// Load users from file (initialize if file doesn't exist)
let users = [];
async function loadUsers() {
  try {
    const data = await fs.readFile(usersFilePath, "utf8");
    users = JSON.parse(data);
  } catch (error) {
    if (error.code === "ENOENT") {
      // File doesn't exist, initialize empty array
      users = [];
    } else {
      console.error("Error loading users:", error.message);
      throw error;
    }
  }
}

const handleSignUp = async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    // Load users from file
    await loadUsers();

    // Check for duplicate user
    const duplicate = users.find((user) => user.email === email);
    if (duplicate) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPwd = await bcrypt.hash(password, 10);

    // Create and store user
    const newUser = { email, password: hashedPwd };
    const updatedUsers = [...users, newUser];

    // Write updated users to file
    await fs.writeFile(
      usersFilePath,
      JSON.stringify(updatedUsers, null, 2),
      "utf8"
    );

    // Send success response
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    // Log error and send response
    console.error("Sign-up error:", error.message);
    res.status(500).json({ message: "Server error during sign-up" });
  }
};

// Error handler middleware (example)

module.exports = { handleSignUp };
