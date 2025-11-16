// api/weather.js

require("dotenv").config();
const fetch = require("node-fetch");

// Mivel Serverless Function-t használunk, a Vercel hívja ezt az "exported" függvényt
module.exports = async (req, res) => {
  // A Vercel kezeli a CORS-t és a query paramétereket (req.query)
  const city = req.query.city;

  const API_KEY = process.env.API_KEY;
  const OPENWEATHER_URL = process.env.OPENWEATHER_URL;

  if (!API_KEY || !OPENWEATHER_URL) {
    return res
      .status(500)
      .json({
        message:
          "Server misconfiguration: missing OPENWEATHER_URL or API_KEY in environment.",
      });
  }
  if (!city) {
    return res.status(400).json({ message: "Hiányzik a 'city' paraméter." });
  }

  // A teljes API lekérdezési URL
  const weatherApiUrl = `${OPENWEATHER_URL}?q=${city}&appid=${API_KEY}&units=metric&lang=hu`;

  try {
    const response = await fetch(weatherApiUrl);
    const data = await response.json();

    if (response.ok) {
      res.status(200).json(data);
    } else {
      // Hiba továbbítása a frontend felé
      res.status(response.status).json(data);
    }
  } catch (error) {
    // Hálózati hiba
    res
      .status(500)
      .json({ message: "Szerver oldali hiba a külső API hívásakor." });
  }
};
