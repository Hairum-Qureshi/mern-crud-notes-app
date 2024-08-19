import { FormEvent, useState } from "react";
import Modal from "./Modal";

export default function ContactForm() {
	const [subject, setSubject] = useState("");
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");
	const [showModal, setShowModal] = useState(false);
	const [isError, setIsError] = useState(false);

	function sendEmail(e: FormEvent) {
		e.preventDefault();
		if (subject && message) {
			setShowModal(true);
			setIsError(false);
		} else {
			setShowModal(true);
			setIsError(true);
		}
	}

	function toggleModal() {
		setShowModal(false);
	}

	return (
		<div>
			{showModal && (
				<Modal
					modalType="confirmation"
					heading={isError ? "There was a problem" : "Success!"}
					toggleModal={toggleModal}
					modalFor="note"
				>
					{isError
						? "Please be sure you've provided a subject and a message body"
						: "Your email has been sent! Please keep an eye on your inbox for a reply within the next few days."}
				</Modal>
			)}

			<form className="h-full p-10">
				<h1 className="lg:text-3xl text-4xl font-semibold mb-5">Contact Me!</h1>
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
					onClick={e => sendEmail(e)}
				>
					Send Email
				</button>
			</form>
		</div>
	);
}
