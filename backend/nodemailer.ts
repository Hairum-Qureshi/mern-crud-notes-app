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
	message: string,
	senderEmail?: string
): Promise<number> {
	try {
		const transporter = callEmailAuth();
		await transporter.sendMail({
			from: process.env.EMAIL,
			to: process.env.EMAIL,
			subject: "Somebody sent you an email from your site, Anonymous Notes!",
			text: `${message} ${
				senderEmail && `\n \n \n You can reach me at: ${senderEmail}`
			}`
		});

		return 200;
	} catch (error) {
		"<nodemailer.ts> sendEmail function error".yellow,
			(error as Error).toString().red.bold;
		return 500;
	}
}

export default sendEmail;
