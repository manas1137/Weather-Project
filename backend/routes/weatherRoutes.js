import express from "express";
import { getSuggestions, getWeather } from "../controllers/weatherController.js";

const router = express.Router();

router.get("/search", getSuggestions);
router.get("/:city", getWeather);

export default router;
