import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import jwt, { JwtPayload } from "jsonwebtoken";
import colors from "colors";
import Note from "../models/Note";

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
					req.cookies.decoded_uid = decoded_parsed.user_id;
					next();
				}
			}
		);
	} else {
		res.status(401).json({
			message:
				"Your session has expired. Please make a new post to renew your session"
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
		if (req.params.note_id) {
			const note = await Note.findById(req.params.note_id);
			if (!note) {
				return res.status(404).json({ message: "Note not found" });
			}

			if (note.curr_uid !== decoded_uid) {
				return res
					.status(403)
					.json({ message: "You are not the owner of this note" });
			}

			next();
		} else {
			console.log(4);
			res.status(400).json({ message: "Note ID is required" });
		}
	} catch (error) {
		console.log(
			"<session-auth.ts> middleware verifyRequest function error",
			(error as Error).toString().red.bold
		);
		res.status(500).send({ message: "Server error" });
	}
};

export { authenticated, verifyRequest };
