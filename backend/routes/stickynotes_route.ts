import express from "express";
import { authenticated, verifyRequest } from "../middleware/session-auth";
import {
	createStickyNote,
	getAllStickyNotes,
	deleteStickyNote,
	editStickyNote
} from "../controllers/stickynotes_controller";
import limit from "../config/rate-limiter";

const router = express.Router();

router.post("/create", authenticated, createStickyNote);
router.get("/all", getAllStickyNotes);
router.delete(
	"/:sticky_note_id",
	authenticated,
	verifyRequest,
	deleteStickyNote
);
router.patch(
	"/:sticky_note_id/edit",
	authenticated,
	verifyRequest,
	limit,
	editStickyNote
);

export default router;
