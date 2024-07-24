import express from "express";
import { createNote } from "../controllers/notes_controller";
const router = express.Router();

router.post("/create", createNote);

export default router;
