import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import colors from "colors";
import mongoose from "mongoose";
import notes_route from "./routes/notes_route";
import cookieParser from "cookie-parser";
import { authenticated } from "./middleware/session-auth";
import stickynotes_route from "./routes/stickynotes_route";
import { matcher } from "./config/profanity-checker";
import { MatchPayload } from "obscenity";
import sendEmail from "./nodemailer";
import rateLimiter from "./config/rate-limiter";
colors.enable();
dotenv.config();

const app = express();

const corsOptions = {
	origin: process.env.FRONTEND_URL!,
	credentials: true,
	optionSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/notes", notes_route);
app.use("/api/sticky-notes", stickynotes_route);

app.get("/", (req: Request, res: Response) => {
	res.send("Welcome to the Anonymous Notes API");
});

app.get(
	"/api/user/current-session",
	authenticated,
	(req: Request, res: Response) => {
		const decoded_uid = req.cookies.decoded_uid;
		try {
			res.status(200).json(decoded_uid);
		} catch (error) {
			console.log(
				"<server.ts> current-session GET request error",
				(error as Error).toString().red.bold
			);
			res.status(500).send(error);
		}
	}
);

app.post("/send-email", rateLimiter(2), (req: Request, res: Response) => {
	try {
		const { subject, sender_email, message } = req.body;

		const checkSubjectMatches: MatchPayload[] = matcher.getAllMatches(subject);
		const messageSubjectMatches: MatchPayload[] =
			matcher.getAllMatches(message);
		const emailSubjectMessages: MatchPayload[] | undefined =
			(sender_email && matcher.getAllMatches(sender_email)) || undefined;

		if (
			checkSubjectMatches.length > 0 ||
			messageSubjectMatches.length > 0 ||
			emailSubjectMessages
		) {
			res.status(400).send({
				message: "Please refrain from including profanity"
			});
		} else {
			sendEmail(subject, message, sender_email);
			res.status(200).json({ message: "Successfully sent email!" });
		}
	} catch (error) {
		console.log(
			"<server.ts> send-email POST request error",
			(error as Error).toString().red.bold
		);
		res.status(500).send(error);
	}
});

const PORT: string | number = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI!;

mongoose
	.connect(MONGO_URI)
	.then(() => {
		app.listen(PORT, () => {
			console.log(
				`Successfully connected to MongoDB! Server listening on port ${PORT}`
					.magenta.bold
			);
		});
	})
	.catch(err => {
		console.log(err);
	});
