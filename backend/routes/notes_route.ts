import express from "express";
import {
	createNote,
	getAllNotes,
	getNoteData,
	deleteNote,
	editNote
} from "../controllers/notes_controller";
const router = express.Router();

router.post("/create", createNote);
router.get("/all", getAllNotes);
router.get("/:note_id", getNoteData);
router.delete("/:note_id", deleteNote);
router.patch("/:note_id/edit", editNote);

export default router;
