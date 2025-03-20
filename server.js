const express = require("express");
const path = require("path");
const cors = require("cors");
const fs = require("fs");
const YAML = require('yaml');

const app = express();
const PORT = process.env.PORT || 9191;

// Enable CORS for cross-origin requests
app.use(cors());

// Endpoint for electron-updater to check for updates
app.get("/updates", (req, res) => {
  try {
    const ymlPath = path.join(__dirname, "updates", "latest-mac.yml");
    const ymlContent = fs.readFileSync(ymlPath, 'utf8');
    const updateData = YAML.parse(ymlContent);
    res.json(updateData);
  } catch (error) {
    console.error('Error reading update info:', error);
    res.status(500).json({ error: 'Failed to get update information' });
  }
});

// Health check
app.get("/", (req, res) => {
  res.send("Electron Update Server Running 🚀");
});

app.get("*", (req, res) => {
  res.send("404 Not Found");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});