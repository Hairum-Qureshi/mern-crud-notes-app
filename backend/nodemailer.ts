import nodemailer from "nodemailer";
import colors from "colors";

colors.enable();

function callEmailAuth(): nodemailer.Transporter {
	const transporter = nodemailer.createTransport({
		host: "smtp.gmail.com",
		port: 587,
		secure: false,
		auth: {
			user: process.env.EMAIL,
			pass: process.env.APP_PASS
		}
	});

	return transporter;
}

async function sendEmail(
	subject: string,
	message: string,
	senderEmail?: string
) {
	try {
		const transporter = callEmailAuth();
		await transporter.sendMail({
			from: process.env.EMAIL,
			to: process.env.EMAIL,
			subject: `[Anonymous Notes Inquiry] - ${subject}`,
			text: `${message} ${
				senderEmail && `\n \n \n You can reach me at: ${senderEmail}`
			}`
		});
	} catch (error) {
		"<nodemailer.ts> sendEmail function error".yellow,
			(error as Error).toString().red.bold;
	}
}

export default sendEmail;
