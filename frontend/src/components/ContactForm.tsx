export default function ContactForm() {
	return (
		<div>
			<form className="h-full p-10">
				<h1 className="lg:text-3xl text-4xl font-semibold mb-5">Contact Me!</h1>
				<div>
					<label htmlFor="">
						Enter subject <span className="text-red-500">*</span>
					</label>{" "}
					<br />
					<input
						type="text"
						placeholder="Subject"
						className="w-full p-2 my-1 text-base border-2 border-gray-600 rounded dark:bg-gray-900 dark:border-gray-600 dark:text-gray-300 dark:focus:outline-none dark:focus:border-gray-500 dark:focus:border-2"
					/>
				</div>
				<div className="mt-3">
					<label htmlFor="">Enter your email</label> <br />
					<input
						type="email"
						placeholder="Email"
						className="w-full p-2 my-1 text-base border-2 border-gray-600 rounded dark:bg-gray-900 dark:border-gray-600 dark:text-gray-300 dark:focus:outline-none dark:focus:border-gray-500 dark:focus:border-2"
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
					></textarea>
				</div>

				<button className="w-full mt-8 p-3 bg-black rounded text-white text-lg flex items-center justify-center dark:bg-blue-500">
					Send Email
				</button>
			</form>
		</div>
	);
}
