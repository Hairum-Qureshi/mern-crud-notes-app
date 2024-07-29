import rateLimit from "express-rate-limit";

const limit = rateLimit({
	max: 10, // maximum requests
	windowMs: 60 * 60 * 1000, // 1 hour in milliseconds
	message: "Too many requests. Please try again in 1 hour."
});

export default limit;
