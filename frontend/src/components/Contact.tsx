import { useEffect } from "react";
import { useTheme } from "../contexts/themeContext";

export default function Contact() {
	useEffect(() => {
		document.title = "Contact";
	}, []);

	const { theme } = useTheme()!;

	return (
		<div className={`${theme === "dark" ? "dark" : ""}`}>
			<div className="bg-[#f7f8fc dark:bg-slate-800 w-full lg:h-[calc(100vh-3.5rem)] lg:inline-flex dark:text-white">
				<div className="lg:w-1/2 w-full h-inherit p-3">
					<form className="h-full p-10">
						<h1 className="lg:text-3xl text-4xl font-semibold mb-5">
							Contact Me!
						</h1>
						<div>
							<label htmlFor="">Enter subject</label> <br />
							<input
								type="text"
								placeholder="Subject"
								className="w-full p-2 my-1 text-base border-2 border-gray-600 rounded dark:bg-gray-900 dark:border-gray-600 dark:text-gray-300 dark:focus:outline-none dark:focus:border-gray-500 dark:focus:border-2"
							/>
						</div>
						<div className="mt-3">
							<label htmlFor="">Enter your email (optional)</label> <br />
							<input
								type="email"
								placeholder="Email"
								className="w-full p-2 my-1 text-base border-2 border-gray-600 rounded dark:bg-gray-900 dark:border-gray-600 dark:text-gray-300 dark:focus:outline-none dark:focus:border-gray-500 dark:focus:border-2"
							/>
						</div>
						<div className="mt-3">
							<label htmlFor="">
								Enter your message/describe the bug or issue you've encountered
							</label>
							<br />
							<textarea
								placeholder="Enter your message"
								className="w-full h-60 p-2 my-1 text-base border-2 border-gray-600 rounded dark:bg-gray-900 dark:border-gray-600 dark:text-gray-300 dark:focus:outline-none dark:focus:border-gray-500 dark:focus:border-2 resize-none"
							></textarea>
						</div>

						<button className="w-full mt-8 p-3 bg-black rounded text-white text-lg flex items-center justify-center dark:bg-blue-500">
							Send Email
						</button>
					</form>
				</div>
				<div className="lg:w-1/2 w-full h-inherit dark:bg-gray-900 bg-gray-300 p-3">
					<div className="my-20 mx-10">
						<h1 className="lg:text-5xl text-6xl font-semibold mt-10">
							Thanks for checking out Anonymous Notes!
						</h1>
						<h3 className="mt-5 lg:text-2xl text-xl lg:text-left text-justify lg:mr-10 leading-relaxed">
							I truly hope this site has provided a space for you to vent out
							any frustration or anger you may have been experiencing. Your
							feedback is invaluable to me as I continue to improve and grow as
							a developer. <br /> <br /> Whether you've encountered a bug, have
							suggestions for new features, or just want to share your thoughts,
							I'm here to listen. Your input helps shape the future of this
							site, and I'm committed to making it the best it can be. Please
							use the form to let me know how I can enhance your experience. I'm
							excited to hear from you and to learn how this site has impacted
							you!
						</h3>
					</div>
				</div>
			</div>
		</div>
	);
}
