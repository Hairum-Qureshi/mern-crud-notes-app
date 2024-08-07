import express from "express";
import { authenticated, verifyRequest } from "../middleware/session-auth";
import {
	createStickyNote,
	getAllStickyNotes,
	deleteStickyNote
} from "../controllers/stickynotes_controller";

const router = express.Router();

router.post("/create", authenticated, createStickyNote);
router.get("/all", getAllStickyNotes);
router.delete(
	"/:sticky_note_id",
	authenticated,
	verifyRequest,
	deleteStickyNote
);

export default router;
