const path = require("path");
const fsPromises = require("fs").promises;
const tasksFilePath = path.join(__dirname, "..", "data", "task.json");

const handleFetchTasks = async (req, res) => {
  try {
    const rawdata = await fsPromises.readFile(tasksFilePath, "utf8");
    const tasks = JSON.parse(rawdata);
    return res.status(200).json({ tasks });
  } catch (error) {
    console.error("Error reading tasks:", error);
    return res.status(500).json({ message: "Failed to fetch tasks" });
  }
};

module.exports = { handleFetchTasks };
