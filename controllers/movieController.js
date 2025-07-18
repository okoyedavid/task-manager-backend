const path = require("path");
const fsPromises = require("fs").promises;
const moviespath = path.join(__dirname, "..", "data", "movies.json");

const handleFetchMovies = async (req, res) => {
  try {
    const data = await fsPromises.readFile(moviespath, "utf8");
    const movies = JSON.parse(data);
    return res.status(200).json({ movies });
  } catch (error) {
    console.error("Error reading tasks:", error);
    return res.status(500).json({ message: "Failed to fetch tasks" });
  }
};

const handleAddMovies = async (req, res) => {
  const { movie } = req.body;

  if (!movie) res.status(400).json({ message: "movies object is needed" });
  const data = await fsPromises.readFile(moviespath, "utf8");
  const movies = await JSON.parse(data);

  const newMovies = [...movies, movie];
  await fsPromises.writeFile(moviespath, JSON.stringify(newMovies, null, 2));
  return res.status(201).json({ message: "Movie added successfully" });
};

module.exports = { handleFetchMovies, handleAddMovies };
