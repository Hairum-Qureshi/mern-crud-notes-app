import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import colors from "colors";
import mongoose from "mongoose";
import notes_route from "./routes/notes_route";
import cookieParser from "cookie-parser";

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

app.get("/api/user/current-session", (req: Request, res: Response) => {
	const token = req.cookies["anon-session"];
	try {
		if (token) {
			const curr_uid: string | undefined = parseJWT(token);
			if (curr_uid) {
				res.status(200).json(curr_uid);
			} else {
				res.status(401).json({ error: "Unauthorized" });
			}
		} else {
			res.status(401).json({ error: "Unauthorized" });
		}
	} catch (error) {
		console.log("<server.ts>  error", (error as Error).toString().red.bold);
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
