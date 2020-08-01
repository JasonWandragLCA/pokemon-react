const express = require("express");
const connectDB = require("./config/db");

const app = express();

// Connect Database
connectDB();

// Initialize Middleware
app.use(express.json({ extended: false }));
app.get("/", (req, res) => res.json({ msg: "Welcome to Pokemon App" }));

// Define Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));
app.use("/api/pokemon", require("./routes/pokemon"));

// Initialize port environment variables
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
