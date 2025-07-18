const users = require("../data/users.json");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretKey = process.env.jwtSecretKey || "dsdssd";
const path = require("path");
const errorHandler = require("../middleware/errorLogger");
const fsPromises = require("fs").promises;
const usersFilePath = path.join(__dirname, "..", "data", "users.json");

const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "Email and password is required" });

  const user = users.find((user) => user.email === email);
  if (!user) return res.status(400).json({ message: "user not found" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ email: user.email }, secretKey, { expiresIn: "1h" });

  user.token = token;

  // Write updated users to file
  try {
    await fsPromises.writeFile(
      usersFilePath,
      JSON.stringify(users, null, 2),
      "utf8"
    );

    // exclude password from response object
    const { password, token, ...userWithoutPassword } = user;
    res
      .status(200)
      .json({ message: "Login successful", token, data: userWithoutPassword });
  } catch (error) {
    errorHandler(error, req, res);
  }
};

module.exports = { handleLogin };
