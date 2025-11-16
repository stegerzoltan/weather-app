// Simple local dev server to serve static files and the serverless API handler
require("dotenv").config();
const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from project root
app.use(express.static(path.join(__dirname)));

// Mount the vercel-style handler at /api/weather
const weatherHandler = require("./api/weather");
app.get("/api/weather", (req, res) => weatherHandler(req, res));

app.listen(port, () => {
  console.log(`Dev server listening on http://localhost:${port}`);
});
