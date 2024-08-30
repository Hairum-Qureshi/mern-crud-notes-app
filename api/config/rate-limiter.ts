import rateLimit from "express-rate-limit";

const rateLimiter = (maxRequests: number) => {
	return rateLimit({
		max: maxRequests,
		windowMs: 60 * 60 * 1000, // 1 hour in milliseconds
		message: "Too many requests. Please try again in 1 hour."
	});
};

export default rateLimiter;
