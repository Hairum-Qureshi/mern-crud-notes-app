import { Request, Response } from "express";
import StickyNote from "../models/StickyNote";
import colors from "colors";
import { createCookie } from "./notes_controller";
// import { parseJWT } from "../server";
import mongoose from "mongoose";

colors.enable();

const createStickyNote = async (req: Request, res: Response) => {
	const curr_uid: string | undefined = req.cookies["anon-session"];
	const { stickyNoteTitle, stickyNoteBody, stickyNoteColor } = req.body;

	// Validate required fields
	if (!stickyNoteTitle || !stickyNoteBody) {
		return res
			.status(400)
			.json({ message: "note_title and note_content are required" });
	}

	try {
		const user_id: string = curr_uid
			? req.cookies.decoded_uid
			: createCookie(res);

		const createdStickyNote = await StickyNote.create({
			note_title: stickyNoteTitle,
			note_content: stickyNoteBody,
			curr_uid: user_id,
			color: stickyNoteColor
		});

		if (createdStickyNote) {
			const stickyNoteData = await StickyNote.findById(
				createdStickyNote._id
			).select("-__v -createdAt -updatedAt");
			res.status(201).json(stickyNoteData);
		} else {
			res.status(400).json({ message: "Failed to create sticky note" });
		}
	} catch (error) {
		console.log(
			"<sticky_notes_controller.ts> createStickyNote function error".yellow,
			(error as Error).toString().red.bold
		);
		res.status(500).send(error);
	}
};

const getAllStickyNotes = async (req: Request, res: Response) => {
	try {
		const allStickyNotes = await StickyNote.find({}).sort({ createdAt: -1 });
		res.status(200).json(allStickyNotes);
	} catch (error) {
		console.log(
			"<sticky_notes_controller.ts> getAllStickyNotes function error".yellow,
			(error as Error).toString().red.bold
		);
		res.status(500).send(error);
	}
};

const deleteStickyNote = async (req: Request, res: Response) => {
	const { sticky_note_id } = req.params;
	try {
		if (!mongoose.isValidObjectId(sticky_note_id)) {
			res.status(400).json({ message: "Invalid note ID" });
		} else {
			await StickyNote.findByIdAndDelete({ _id: sticky_note_id });
			res.status(200).json({ message: "Sticky note deleted successfully" });
		}
	} catch (error) {
		console.log(
			"<sticky_notes_controller.ts> deleteStickyNote function error".yellow,
			(error as Error).toString().red.bold
		);
		res.status(500).send(error);
	}
};

export { createStickyNote, getAllStickyNotes, deleteStickyNote };
