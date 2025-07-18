require("dotenv").config();
const cors = require("cors");
const corsOptions = require("./config/CorsOptions");
const express = require("express");
const { logger } = require("./middleware/logger");
const app = express();
const PORT = process.env.PORT || 3500;

// middleware to log events in case of debugging
app.use(logger);

// this is where we define url allowed by cors
app.use(cors(corsOptions));

//middleware to handle url encoded data that is form data
app.use(express.urlencoded({ extended: true }));

// built in middleware for reading json data
app.use(express.json());

// Login api
app.use("/auth", require("./routes/auth"));

//Signup api
app.use("/register", require("./routes/register"));

//task api
app.use("/tasks", require("./routes/task"));

//movies api
app.use("/movies", require("./routes/movie"));

// listen for changes
app.listen(PORT, () => console.log(`server currently running on Port ${PORT}`));
