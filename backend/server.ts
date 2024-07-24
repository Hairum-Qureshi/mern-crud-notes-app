import express from "express";
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
