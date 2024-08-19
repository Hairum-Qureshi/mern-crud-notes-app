import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import colors from "colors";
import mongoose from "mongoose";
import notes_route from "./routes/notes_route";
import cookieParser from "cookie-parser";
import { authenticated } from "./middleware/session-auth";
import stickynotes_route from "./routes/stickynotes_route";
import limit from "./config/rate-limiter";
import sendEmail from "./nodemailer";

colors.enable();
dotenv.config();

const app = express();

const corsOptions = {
	origin: "http://localhost:5174",
	credentials: true,
	optionSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/notes", notes_route);
app.use("/api/sticky-notes", stickynotes_route);

const PORT: string | number = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI!;

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

app.post("/send-email", limit, (req: Request, res: Response) => {
	// TODO - add a check to make sure the user isn't passing in any profanity

	try {
		const { subject, sender_email, message } = req.body;
		sendEmail(subject, message, sender_email);
	} catch (error) {
		console.log(
			"<server.ts> send-email POST request error",
			(error as Error).toString().red.bold
		);
		res.status(500).send(error);
	}
});

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
