import express from "express";
import {
  getTodo,
  getTodos,
  createTodo,
  deleteTodo,
  completeTodo,
  editTodo,
} from "../controllers/todo.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/*READ*/

router.get("/todos", verifyToken, getTodos);
router.get("/todo/:id", verifyToken, getTodo);

/*CREATE*/
router.post("/create/todo", verifyToken, createTodo);

/*DELETE*/
router.delete("/delete/todo/:id", verifyToken, deleteTodo);

/*COMPLETE TODO*/
router.get("/todo/:id/complete", verifyToken, completeTodo);

/*EDIT TODO*/
router.put("/todo/:id/edit", verifyToken, editTodo);

export default router;
