import express from "express";
import { authenticated, verifyRequest } from "../middleware/session-auth";
import {
	createStickyNote,
	getAllStickyNotes,
	deleteStickyNote,
	editStickyNote
} from "../controllers/stickynotes_controller";
import rateLimiter from "../config/rate-limiter";

const router = express.Router();

router.post("/create", authenticated, rateLimiter(10), createStickyNote);
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
	rateLimiter(10),
	editStickyNote
);

export default router;
