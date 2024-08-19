import { FormEvent, useState } from "react";
import axios from "axios";

export default function ContactForm() {
	const [subject, setSubject] = useState("");
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");
	const [displayMessage, setDisplayMessage] = useState({
		messageType: "",
		message: ""
	});

	// TODO - figure out how to clear input after submitting
	// TODO - make the alerts go away after a few seconds

	async function sendEmail(e: FormEvent) {
		e.preventDefault();
		if (subject && message) {
			await axios
				.post("http://localhost:4000/send-email", {
					subject,
					message,
					sender_email: email
				})
				.then(response => {
					setDisplayMessage({
						messageType: "success",
						message: response.data.message
					});
				})
				.catch(error => {
					console.log(error);
					setDisplayMessage({
						messageType: "error",
						message: error.response.data.message || error.response.data
					});
				});
		} else {
			setDisplayMessage({
				messageType: "error",
				message: "Please be sure to provide a subject and message"
			});
		}
	}

	return (
		<div>
			<form className="h-full p-10">
				<h1 className="lg:text-3xl text-4xl font-semibold">Contact Me!</h1>
				{displayMessage.message && (
					<div
						className={`w-full p-2 my-2 rounded-md ${
							displayMessage.messageType === "error"
								? "bg-red-700"
								: "bg-green-700"
						} text-white`}
					>
						{displayMessage.message}
					</div>
				)}
				<div>
					<label htmlFor="">
						Enter subject <span className="text-red-500">*</span>
					</label>
					<br />
					<input
						type="text"
						placeholder="Subject"
						className="w-full p-2 my-1 text-base border-2 border-gray-600 rounded dark:bg-gray-900 dark:border-gray-600 dark:text-gray-300 dark:focus:outline-none dark:focus:border-gray-500 dark:focus:border-2"
						onChange={e => setSubject(e.target.value)}
					/>
				</div>
				<div className="mt-3">
					<label htmlFor="">Enter your email</label> <br />
					<input
						type="email"
						placeholder="Email"
						className="w-full p-2 my-1 text-base border-2 border-gray-600 rounded dark:bg-gray-900 dark:border-gray-600 dark:text-gray-300 dark:focus:outline-none dark:focus:border-gray-500 dark:focus:border-2"
						onChange={e => setEmail(e.target.value)}
					/>
				</div>
				<div className="mt-3">
					<label htmlFor="">
						Enter your message/describe the bug or issue you've encountered
						&nbsp;<span className="text-red-500">*</span>
					</label>
					<br />
					<textarea
						placeholder="If you're reporting a bug, please be sure to list steps to reproduce it as well!"
						className="w-full h-60 p-2 my-1 text-base border-2 border-gray-600 rounded dark:bg-gray-900 dark:border-gray-600 dark:text-gray-300 dark:focus:outline-none dark:focus:border-gray-500 dark:focus:border-2 resize-none"
						onChange={e => setMessage(e.target.value)}
					></textarea>
				</div>

				<button
					className="w-full mt-8 p-3 bg-black rounded text-white text-lg flex items-center justify-center dark:bg-blue-500"
					onClick={e => {
						sendEmail(e);
					}}
				>
					Send Email
				</button>
			</form>
		</div>
	);
}
