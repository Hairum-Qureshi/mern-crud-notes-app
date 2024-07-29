import { Request, Response } from "express";
import StickyNote from "../models/StickyNote";

const createStickyNote = async (req: Request, res: Response) => {
	const decoded_uid: string = req.cookies.decoded_uid;
	const { stickyNoteTitle, stickyNoteBody, stickyNoteColor } = req.body;
	try {
		await StickyNote.create({
			note_title: stickyNoteTitle,
			note_content: stickyNoteBody,
			curr_uid: decoded_uid,
			color: stickyNoteColor
		});
	} catch (error) {
		console.log(
			"<sticky_notes_controller.ts> createStickyNotes function error",
			(error as Error).toString().red.bold
		);
		res.status(500).send(error);
	}
};

const getAllStickyNotes = async (req: Request, res: Response) => {};

export { createStickyNote, getAllStickyNotes };
