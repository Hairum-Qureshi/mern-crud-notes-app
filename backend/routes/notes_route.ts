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
import rateLimiter from "../config/rate-limiter";

router.post("/create", authenticated, rateLimiter(10), createNote);
router.get("/all", getAllNotes);
router.get("/:note_id", getNoteData);
router.delete("/:note_id", authenticated, verifyRequest, deleteNote);
router.patch(
	"/:note_id/edit",
	authenticated,
	verifyRequest,
	rateLimiter(10),
	editNote
);

export default router;
