import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import jwt, { JwtPayload } from "jsonwebtoken";
import colors from "colors";
import Note from "../models/Note";
import { createCookie } from "../controllers/notes_controller";
import StickyNote from "../models/StickyNote";
import mongoose from "mongoose";

colors.enable();
dotenv.config();

// Invalid signature - the secret used to verify a JWT doesn't match the one used to create another JWT

const authenticated = (req: Request, res: Response, next: NextFunction) => {
	const token = req.cookies["anon-session"];
	const secret: string = process.env.JWT_SECRET!;
	if (token) {
		jwt.verify(
			token,
			secret,
			(err: Error | null, decoded: string | JwtPayload | undefined) => {
				if (err) {
					console.log(
						"<session-auth.ts> middleware".yellow.bold,
						(err as Error).toString().red.bold
					);
					return res.status(401).json({ message: "Invalid token" });
				} else {
					const decoded_parsed: JwtPayload = decoded as JwtPayload;
					// The cookie hasn't expired yet, so extend it
					createCookie(res, decoded_parsed.user_id);
					req.cookies.decoded_uid = decoded_parsed.user_id;
					next();
				}
			}
		);
	} else {
		res.status(401).json({
			message:
				"Your session has expired. Unfortunately, you are no longer able to edit this post. Please make a new post to get a new session"
		});
	}
};

const verifyRequest = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const decoded_uid: string = req.cookies.decoded_uid;
		if (req.params) {
			const { note_id, sticky_note_id } = req.params;
			if (note_id) {
				if (mongoose.isValidObjectId(note_id)) {
					const note = await Note.findById(note_id);
					if (!note) {
						return res.status(404).json({ message: "Note not found" });
					}

					if (note?.curr_uid !== decoded_uid) {
						return res
							.status(403)
							.json({ message: "You are not the owner of this note" });
					}
				} else {
					return res.status(400).json({ message: "Invalid note ID" });
				}
			} else {
				if (mongoose.isValidObjectId(sticky_note_id)) {
					const sticky_note = await StickyNote.findById(sticky_note_id);
					if (!sticky_note) {
						return res.status(404).json({ message: "Sticky note not found" });
					} else {
						if (sticky_note?.curr_uid !== decoded_uid) {
							return res
								.status(403)
								.json({ message: "You are not the owner of this sticky note" });
						}
					}
				} else {
					return res.status(400).json({ message: "Invalid sticky note ID" });
				}
			}

			next();
		} else {
			res.status(400).json({ message: "Note ID is required" });
		}
	} catch (error) {
		console.log(
			"<session-auth.ts> middleware verifyRequest function error".yellow,
			(error as Error).toString().red.bold
		);
		res.status(500).send({ message: "Server error" });
	}
};

export { authenticated, verifyRequest };
