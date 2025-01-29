const express = require("express");
const axios = require("axios");
const router = express.Router();

// Replace with your Geocoding API key
const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

router.get("/reverse-geocode", async (req, res) => {
  const { lat, lon } = req.query;

  if (!lat || !lon) {
    return res.status(400).json({ error: "Latitude and longitude are required" });
  }

  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${GOOGLE_MAPS_API_KEY}`
    );

    const address = response.data.results[0]?.formatted_address || "Address not found";
    res.json({ address });
  } catch (error) {
    console.error("Error reverse geocoding:", error);
    res.status(500).json({ error: "Failed to fetch address" });
  }
});

module.exports = router;
