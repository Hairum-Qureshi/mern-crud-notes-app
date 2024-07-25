import express from "express";
import {
	createNote,
	getAllNotes,
	getNoteData,
	deleteNote
} from "../controllers/notes_controller";
const router = express.Router();

router.post("/create", createNote);
router.get("/all", getAllNotes);
router.get("/:note_id", getNoteData);
router.delete("/:note_id", deleteNote);

export default router;
