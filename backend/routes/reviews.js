const express = require("express");
const db = require("../db/connection");

const router = express.Router();

// Add a review for a car
router.post("/", async (req, res) => {
  const { user_id, car_id, rating, review } = req.body;

  try {
    await db.query(
      "INSERT INTO reviews (user_id, car_id, rating, review) VALUES (?, ?, ?, ?)",
      [user_id, car_id, rating, review]
    );
    res.status(201).json({ message: "Review added successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/reviews", async (req, res) => {
  try {
    const [reviews] = await db.query(
      "SELECT reviews.*, users.username FROM reviews JOIN users ON reviews.user_id = users.id"
    );
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all reviews for a specific car
router.get("/car/:carId", async (req, res) => {
  const { carId } = req.params;

  try {
    const [reviews] = await db.query(
      "SELECT reviews.*, users.username FROM reviews JOIN users ON reviews.user_id = users.id WHERE car_id = ? ORDER BY created_at DESC",
      [carId]
    );
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
