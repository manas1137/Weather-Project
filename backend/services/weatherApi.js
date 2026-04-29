import axios from "axios";
import { getCache, setCache } from "../utils/cache.js";

export const fetchWeather = async (city) => {
  const API_KEY = process.env.API_KEY;
  if (!API_KEY) {
    throw new Error("Missing API_KEY");
  }

  const rawCity = city.trim();
  const safeCity = encodeURIComponent(rawCity);
  const cacheKey = `forecast:${safeCity}`;
  const cached = getCache(cacheKey);
  if (cached) return cached;

  const forecastUrl = (query) =>
    `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${query}&days=7&aqi=yes`;

  try {
    const response = await axios.get(forecastUrl(safeCity), { timeout: 10000 });
    const ttlMs = Number(process.env.CACHE_TTL_MS) || 10 * 60 * 1000;
    setCache(cacheKey, response.data, ttlMs);
    return response.data;
  } catch (error) {
    const code = error.response?.data?.error?.code;
    if (code !== 1006) {
      throw error;
    }

    const searchUrl = `https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${safeCity}`;
    const searchResponse = await axios.get(searchUrl, { timeout: 10000 });
    const best = Array.isArray(searchResponse.data) ? searchResponse.data[0] : null;
    if (!best?.lat || !best?.lon) {
      throw error;
    }

    const resolvedQuery = encodeURIComponent(`${best.lat},${best.lon}`);
    const resolvedCacheKey = `forecast:${resolvedQuery}`;
    const resolvedCached = getCache(resolvedCacheKey);
    if (resolvedCached) return resolvedCached;

    const resolvedResponse = await axios.get(forecastUrl(resolvedQuery), { timeout: 10000 });
    const ttlMs = Number(process.env.CACHE_TTL_MS) || 10 * 60 * 1000;
    setCache(resolvedCacheKey, resolvedResponse.data, ttlMs);
    return resolvedResponse.data;
  }
};

export const searchLocations = async (query) => {
  const API_KEY = process.env.API_KEY;
  if (!API_KEY) {
    throw new Error("Missing API_KEY");
  }

  const safeQuery = encodeURIComponent(query.trim());
  const url = `https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${safeQuery}`;
  const response = await axios.get(url, { timeout: 10000 });
  return response.data;
};
