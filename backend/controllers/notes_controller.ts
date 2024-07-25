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
	asteriskCensorStrategy
} from "obscenity";
import mongoose from "mongoose";

colors.enable();

function createCookie(res: Response): string {
	const user_id: string = randomUUID().replace(/-/g, "");
	const payload = {
		user_id
	};
	const secretKey: string = Math.floor(
		Math.random() * Number(new Date())
	).toString();
	const token = jwt.sign(payload, secretKey, { expiresIn: "7d" });
	res.cookie("anon-session", token, { httpOnly: true, maxAge: 604800000 }); // 1 week in milliseconds
	return user_id;
}

function parseJWT(token: string): string {
	const decoded_uid = JSON.parse(
		Buffer.from(token.split(".")[1], "base64").toString()
	);
	return decoded_uid.user_id;
}

const createNote = async (req: Request, res: Response) => {
	const { note_title, note_content } = req.body;
	const curr_uid: string | undefined = req.cookies["anon-session"];

	const censor = new TextCensor().setStrategy(
		keepStartCensorStrategy(asteriskCensorStrategy())
	);

	const matcher = new RegExpMatcher({
		...englishDataset.build(),
		...englishRecommendedTransformers
	});
	const matches = matcher.getAllMatches(note_content);
	const checkTitleMatches = matcher.getAllMatches(note_title);

	if (checkTitleMatches.length > 0) {
		return res.status(400).json({
			message: "Title cannot contain profanity"
		});
	}

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
			const note = await Note.findById({ _id: note_id }).select(
				"-__v -updatedAt"
			);
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
	try {
		const allNotes = await Note.find({})
			.select("-__v -updatedAt")
			.sort({ createdAt: -1 });
		res.status(200).send(allNotes);
	} catch (error) {
		console.log(
			"<notes_controller.ts> getNoteData function error",
			(error as Error).toString().red.bold
		);
		res.status(500).send(error);
	}
};

export { createNote, getNoteData, getAllNotes };
