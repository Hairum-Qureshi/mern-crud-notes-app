import { Request, Response } from "express";
import { randomUUID } from "crypto";
import jwt from "jsonwebtoken";
import colors from "colors";
import Note from "../models/Note";
import {
	TextCensor,
	RegExpMatcher,
	englishDataset,
	englishRecommendedTransformers,
	keepStartCensorStrategy,
	asteriskCensorStrategy,
	MatchPayload
} from "obscenity";
import mongoose from "mongoose";
import { parseJWT } from "../server";
import dotenv from "dotenv";

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
	res.cookie("anon-session", token, { httpOnly: true, maxAge: 604800000 }); // 1 week in milliseconds
	return user_id;
}

const matcher = new RegExpMatcher({
	...englishDataset.build(),
	...englishRecommendedTransformers
});

const censor = new TextCensor().setStrategy(
	keepStartCensorStrategy(asteriskCensorStrategy())
);

function getMatchPayload(note_content: string): MatchPayload[] {
	const matches = matcher.getAllMatches(note_content);
	return matches;
}

const createNote = async (req: Request, res: Response) => {
	const { note_title, note_content } = req.body;
	const curr_uid: string | undefined = req.cookies["anon-session"];

	const checkTitleMatches = matcher.getAllMatches(note_title);

	if (checkTitleMatches.length > 0) {
		return res.status(400).json({
			message: "Title cannot contain profanity"
		});
	}

	const matches: MatchPayload[] = getMatchPayload(note_content);

	if (!curr_uid) {
		const user_id: string = createCookie(res);
		try {
			const createdNote = await Note.create({
				note_title,
				note_content: censor.applyTo(note_content, matches),
				curr_uid: user_id,
				containsProfanity: matches.length > 0
			});

			res.status(201).send(createdNote);
		} catch (error) {
			console.log(
				"<notes_controller.ts> createNote function error",
				(error as Error).toString().red.bold
			);
			res.status(500).send(error);
		}
	} else {
		try {
			const user_id: string = parseJWT(req.cookies["anon-session"]);
			if (user_id) {
				const createdNote = await Note.create({
					note_title,
					note_content: censor.applyTo(note_content, matches),
					curr_uid: user_id,
					containsProfanity: matches.length > 0
				});
				res.status(201).send(createdNote);
			}
		} catch (error) {
			console.log(
				"<notes_controller.ts> createNote function error",
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
			"<notes_controller.ts> getNoteData function error",
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
		res.status(404).json({ message: "no notes" });
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
			"<notes_controller.ts> deleteNote function error",
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

		if (checkTitleMatches.length > 0) {
			return res.status(400).json({
				message: "Title cannot contain profanity"
			});
		}

		const matches: MatchPayload[] = getMatchPayload(note_content);

		const updatedNote = await Note.findByIdAndUpdate(
			{ _id: note_id },
			{
				note_title,
				note_content: censor.applyTo(note_content, matches)
			},
			{
				new: true
			}
		).select("-__v");
		res.status(200).send(updatedNote);
	} catch (error) {
		console.log(
			"<notes_controller.ts> editNote function error",
			(error as Error).toString().red.bold
		);
		res.status(500).send(error);
	}
};

export { createNote, getNoteData, getAllNotes, deleteNote, editNote };
