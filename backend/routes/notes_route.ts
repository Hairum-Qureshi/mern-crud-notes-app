import express from "express";
import {
	createNote,
	getAllNotes,
	getNoteData,
	deleteNote,
	editNote
} from "../controllers/notes_controller";
import { authenticated, verifyRequest } from "../middleware/session-auth";
const router = express.Router();
import limit from "../config/rate-limiter";

router.post("/create", limit, createNote);
router.get("/all", getAllNotes);
router.get("/:note_id", getNoteData);
router.delete("/:note_id", authenticated, verifyRequest, deleteNote);
router.patch("/:note_id/edit", authenticated, verifyRequest, limit, editNote);

export default router;
