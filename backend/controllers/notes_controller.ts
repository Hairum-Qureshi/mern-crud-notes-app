import { Request, Response } from "express";

const createNote = async (req: Request, res: Response) => {
	const { note_title, note_content } = req.body;
	console.log(note_title, note_content);

	// Check if a cookie exists; if it doesn't, create one
};

export { createNote };
