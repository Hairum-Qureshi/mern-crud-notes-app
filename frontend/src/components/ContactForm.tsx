import { FormEvent, useEffect, useRef, useState } from "react";
import axios from "axios";

export default function ContactForm() {
	const [subject, setSubject] = useState("");
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");
	const [displayMessage, setDisplayMessage] = useState({
		messageType: "",
		message: ""
	});

	const subjectRef = useRef<HTMLInputElement>(null);
	const emailRef = useRef<HTMLInputElement>(null);
	const messageRef = useRef<HTMLTextAreaElement>(null);
	const [showMessage, setShowMessage] = useState(false);

	useEffect(() => {
		if (showMessage) {
			const timer = setTimeout(() => {
				setShowMessage(false);
				setDisplayMessage({
					messageType: "",
					message: ""
				});
			}, 2000);

			// Cleanup the timeout if the component unmounts or if showMessage changes
			return () => clearTimeout(timer);
		}
	}, [showMessage]);

	async function sendEmail(e: FormEvent) {
		e.preventDefault();
		if (subject && message) {
			await axios
				.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/send-email`, {
					subject,
					message,
					sender_email: email
				})
				.then(response => {
					setDisplayMessage({
						messageType: "success",
						message: response.data.message
					});

					subjectRef.current!.value = "";
					emailRef.current ? (emailRef.current.value = "") : null;
					messageRef.current!.value = "";

					setShowMessage(true);
				})
				.catch(error => {
					console.log(error);
					setDisplayMessage({
						messageType: "error",
						message: error.response.data.message || error.response.data
					});
					setShowMessage(true);
				});
		} else {
			setDisplayMessage({
				messageType: "error",
				message: "Please be sure to provide a subject and message"
			});
			setShowMessage(true);
		}
	}

	return (
		<div>
			<form className="h-full p-10">
				<h1 className="lg:text-3xl text-4xl font-semibold mb-3">Contact Me!</h1>
				{showMessage && (
					<div
						className={`w-full p-2 my-2 rounded-md transition-opacity ease-in duration-100 ${
							displayMessage.messageType === "error"
								? "bg-red-700"
								: "bg-green-700"
						} text-white`}
					>
						{displayMessage.message}
					</div>
				)}
				<div>
					<label>
						Enter subject <span className="text-red-500">*</span>
					</label>
					<br />
					<input
						type="text"
						placeholder="Subject"
						className="w-full p-2 my-1 text-base border-2 border-gray-600 rounded dark:bg-gray-900 dark:border-gray-600 dark:text-gray-300 dark:focus:outline-none dark:focus:border-gray-500 dark:focus:border-2 focus:outline-none focus:border-blue-800 focus:border-2"
						onChange={e => setSubject(e.target.value)}
						ref={subjectRef}
					/>
				</div>
				<div className="mt-3">
					<label htmlFor="">Enter your email</label> <br />
					<input
						type="email"
						placeholder="Email"
						className="w-full p-2 my-1 text-base border-2 border-gray-600 rounded dark:bg-gray-900 dark:border-gray-600 dark:text-gray-300 dark:focus:outline-none dark:focus:border-gray-500 dark:focus:border-2 focus:outline-none focus:border-blue-800 focus:border-2"
						onChange={e => setEmail(e.target.value)}
						ref={emailRef}
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
						className="w-full h-60 p-2 my-1 text-base border-2 border-gray-600 rounded dark:bg-gray-900 dark:border-gray-600 dark:text-gray-300 dark:focus:outline-none dark:focus:border-gray-500 dark:focus:border-2 resize-none focus:outline-none focus:border-blue-800 focus:border-2"
						onChange={e => setMessage(e.target.value)}
						ref={messageRef}
					></textarea>
				</div>

				<button
					className="w-full mt-8 p-3 bg-black hover:bg-slate-800 rounded text-white text-lg flex items-center justify-center dark:bg-blue-500 dark:hover:bg-blue-600"
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
