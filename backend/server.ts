import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import colors from "colors";

colors.enable();
dotenv.config();

const app = express();

const corsOptions = {
	origin: "http://localhost:5174",
	credentials: true,
	optionSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
const PORT: string | number = process.env.PORT || 4000;

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}!`.magenta.bold);
});
