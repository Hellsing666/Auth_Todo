import express from "express";
import pool from "../config/db.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// All routes are protected - user must be authenticated
// req.user is populated by the protect middleware

// Get all todos for the current user
router.get("/", protect, async (req, res) => {
  try {
    const todos = await pool.query(
      "SELECT * FROM todo WHERE user_id = $1 ORDER BY id ASC",
      [req.user.id]
    );
    res.json(todos.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server Error" });
  }
});

// Create a new todo for the current user
router.post("/", protect, async (req, res) => {
  try {
    const { description, priority } = req.body;
    
    if (!description || !description.trim()) {
      return res.status(400).json({ message: "Description is required" });
    }

    const todoPriority = priority || 'medium';

    const result = await pool.query(
      "INSERT INTO todo (description, completed, priority, user_id) VALUES ($1, $2, $3, $4) RETURNING *",
      [description, false, todoPriority, req.user.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server Error" });
  }
});

// Update a todo (only if it belongs to the current user)
router.patch("/:id", protect, async (req, res) => {
  try {
    const { id } = req.params;
    const { description, completed, priority } = req.body;

    // First check if the todo belongs to the current user
    const todoCheck = await pool.query(
      "SELECT * FROM todo WHERE id = $1 AND user_id = $2",
      [id, req.user.id]
    );

    if (todoCheck.rows.length === 0) {
      return res.status(404).json({ message: "Todo not found or unauthorized" });
    }

    const result = await pool.query(
      "UPDATE todo SET description = $1, completed = $2, priority = $3 WHERE id = $4 AND user_id = $5 RETURNING *",
      [description, completed, priority || todoCheck.rows[0].priority, id, req.user.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server Error" });
  }
});

// Delete a todo (only if it belongs to the current user)
router.delete("/:id", protect, async (req, res) => {
  try {
    const { id } = req.params;

    // First check if the todo belongs to the current user
    const todoCheck = await pool.query(
      "SELECT * FROM todo WHERE id = $1 AND user_id = $2",
      [id, req.user.id]
    );

    if (todoCheck.rows.length === 0) {
      return res.status(404).json({ message: "Todo not found or unauthorized" });
    }

    const result = await pool.query(
      "DELETE FROM todo WHERE id = $1 AND user_id = $2 RETURNING *",
      [id, req.user.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;
