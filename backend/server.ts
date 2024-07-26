import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import colors from "colors";
import mongoose from "mongoose";
import notes_route from "./routes/notes_route";
import cookieParser from "cookie-parser";
import { authenticated } from "./middleware/session-auth";

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

const PORT: string | number = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI!;

export function parseJWT(token: string): string {
	const decoded_uid = JSON.parse(
		Buffer.from(token.split(".")[1], "base64").toString()
	);
	return decoded_uid.user_id;
}

app.get(
	"/api/user/current-session",
	authenticated,
	(req: Request, res: Response) => {
		const decoded_uid = req.cookies.decoded_uid;
		console.log(decoded_uid);
		try {
			res.status(200).json(decoded_uid);
		} catch (error) {
			console.log("<server.ts>  error", (error as Error).toString().red.bold);
			res.status(500).send(error);
		}
	}
);

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
