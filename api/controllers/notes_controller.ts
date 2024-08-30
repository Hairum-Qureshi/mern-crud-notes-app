import { Request, Response } from "express";
import { randomUUID } from "crypto";
import jwt from "jsonwebtoken";
import colors from "colors";
import Note from "../models/Note";
import { MatchPayload } from "obscenity";
import { Document } from "mongoose";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { censor, getMatchPayload, matcher } from "../config/profanity-checker";

dotenv.config();

// TODO - need to handle expired JWT tokens

const secretKey: string = process.env.JWT_SECRET!;

colors.enable();

export function createCookie(res: Response, uid?: string): string {
	const user_id: string = !uid ? randomUUID().replace(/-/g, "") : uid;
	const payload = {
		user_id
	};

	const token = jwt.sign(payload, secretKey, { expiresIn: "7d" });
	const isProduction = process.env.NODE_ENV === "production";

	res.cookie("anon-session", token, {
		httpOnly: isProduction, // Enable httpOnly in production
		secure: isProduction, // Use secure cookies in production
		maxAge: 604800000 // 1 week in mill
	});

	return user_id;
}

async function saveNoteDataToMongo(
	note_title: string,
	note_content: string,
	user_id: string,
	containsProfanity: boolean
): Promise<Document | Error> {
	const matches: MatchPayload[] = getMatchPayload(note_content);

	try {
		const createdNote = await Note.create({
			note_title,
			note_content: censor.applyTo(note_content, matches),
			curr_uid: user_id,
			containsProfanity
		});

		return createdNote;
	} catch (error) {
		throw new Error((error as Error).message);
	}
}

const createNote = async (req: Request, res: Response) => {
	const { note_title, note_content } = req.body;

	const checkTitleMatches = matcher.getAllMatches(note_title);

	if (checkTitleMatches.length > 0) {
		return res.status(400).json({
			message: "Title cannot contain profanity"
		});
	}

	const matches: MatchPayload[] = getMatchPayload(note_content);
	const decoded_uid: string = req.cookies.decoded_uid;

	if (!decoded_uid) {
		const user_id: string = createCookie(res);
		try {
			const createdNote = await saveNoteDataToMongo(
				note_title,
				censor.applyTo(note_content, matches),
				user_id,
				matches.length > 0
			);

			res.status(201).send(createdNote);
		} catch (error) {
			console.log(
				"<notes_controller.ts> createNote function error".yellow,
				(error as Error).toString().red.bold
			);
			res.status(500).send(error);
		}
	} else {
		try {
			const createdNote = await saveNoteDataToMongo(
				note_title,
				censor.applyTo(note_content, matches),
				decoded_uid,
				matches.length > 0
			);

			res.status(201).send(createdNote);
		} catch (error) {
			console.log(
				"<notes_controller.ts> createNote function error".yellow,
				(error as Error).toString().red.bold
			);
			res.status(500).send(error);
		}
	}
};

const getNoteData = async (req: Request, res: Response) => {
	const { note_id } = req.params;

	try {
		if (mongoose.isValidObjectId(note_id)) {
			const note = await Note.findById({ _id: note_id }).select("-__v");
			res.status(200).send(note);
		} else {
			res.status(400).send("Invalid Note ID");
		}
	} catch (error) {
		console.log(
			"<notes_controller.ts> getNoteData function error".yellow,
			(error as Error).toString().red.bold
		);
		res.status(500).send(error);
	}
};

const getAllNotes = async (req: Request, res: Response) => {
	const page = Number(req.query.page) || 1;
	const notesPerPage = 9;
	const totalNotes: number = await Note.countDocuments({});
	const totalPages: number = Math.ceil(totalNotes / notesPerPage);
	if (page < 0 || page > totalPages) {
		res.status(404).json({ message: "No notes" });
	} else {
		const skip = (page - 1) * notesPerPage;

		const all_notes = await Note.find({})
			.sort({ createdAt: -1 })
			.skip(skip)
			.limit(notesPerPage);
		if (all_notes && all_notes.length > 0) {
			res.status(200).send({ all_notes, totalPages, totalNotes });
		} else {
			res.status(404).json({ message: "No notes" });
		}
	}
};

const deleteNote = async (req: Request, res: Response) => {
	const { note_id } = req.params;
	try {
		await Note.findByIdAndDelete({ _id: note_id });
		res.status(200).send("Note deleted successfully");
	} catch (error) {
		console.log(
			"<notes_controller.ts> deleteNote function error".yellow,
			(error as Error).toString().red.bold
		);
		res.status(500).send(error);
	}
};

const editNote = async (req: Request, res: Response) => {
	const { note_id } = req.params;
	const { note_title, note_content } = req.body;

	try {
		const checkTitleMatches = matcher.getAllMatches(note_title);

		if (!note_title || !note_content) {
			res.status(400).json({
				message: "Please be sure to provide a note title and content"
			});
		} else if (checkTitleMatches.length > 0) {
			return res.status(400).json({
				message: "Title cannot contain profanity"
			});
		} else {
			// Check if the note's content has changed at all
			const noteData = await Note.findById({ _id: note_id });
			if (noteData) {
				if (
					noteData.note_title === note_title &&
					noteData.note_content === note_content
				) {
					return res.status(200).json(noteData);
				} else {
					const matches: MatchPayload[] = getMatchPayload(note_content);

					const updatedNote = await Note.findByIdAndUpdate(
						{ _id: note_id },
						{
							note_title,
							note_content: censor.applyTo(note_content, matches),
							containsProfanity: matches.length > 0
						},
						{
							new: true
						}
					).select("-__v");
					res.status(200).send(updatedNote);
				}
			} else {
				res.status(404).json({
					message: "Note not found"
				});
			}
		}
	} catch (error) {
		console.log(
			"<notes_controller.ts> editNote function error".yellow,
			(error as Error).toString().red.bold
		);
		res.status(500).send(error);
	}
};

export { createNote, getNoteData, getAllNotes, deleteNote, editNote };
