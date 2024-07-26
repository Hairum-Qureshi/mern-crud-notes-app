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

router.post("/create", createNote);
router.get("/all", getAllNotes);
router.get("/:note_id", getNoteData);
router.delete("/:note_id", authenticated, verifyRequest, deleteNote);
router.patch("/:note_id/edit", authenticated, verifyRequest, editNote);

export default router;
