import { fetchWeather, searchLocations } from "../services/weatherApi.js";

export const getWeather = async (req, res) => {
  const city = req.params.city;
  if (!city || !city.trim()) {
    return res.status(400).json({ message: "City is required" });
  }

  try {
    const data = await fetchWeather(city);
    res.json(data);
  } catch (error) {
    if (error.response?.status) {
      return res.status(error.response.status).json(error.response.data);
    }
    if (error.message === "Missing API_KEY") {
      return res.status(500).json({ message: "Server misconfigured" });
    }
    console.log(error.message);
    res.status(500).json({ message: "Error fetching weather" });
  }
};

export const getSuggestions = async (req, res) => {
  const query = req.query.q;
  if (!query || !query.trim()) {
    return res.status(400).json({ message: "Query is required" });
  }

  try {
    const results = await searchLocations(query);
    res.json(results);
  } catch (error) {
    console.log(error.response?.data || error.message);
    res.status(500).json({ message: "Error searching locations" });
  }
};
