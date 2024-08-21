import { useEffect, useState } from "react";
import { useTheme } from "../contexts/themeContext";
import ContactForm from "./ContactForm";
import Form from "./Form";
import FAQ from "./FAQ";

export default function SplitPanel() {
	const { theme } = useTheme()!;
	const [isContact, setIsContact] = useState(false);

	const lastParam = window.location.pathname.split("/").pop();

	useEffect(() => {
		setIsContact(lastParam === "contact");
	}, [lastParam]);

	// I noticed when I console log the 'url' variable when the edit form is open, nothing gets printed whereas for the post note form, it returns 'create-form' and the contact form returns 'contact'. This might be why the edit form isn't the same as the post form.

	return (
		<div className={`${theme === "dark" ? "dark" : ""}`}>
			<div className="bg-[#f7f8fc dark:bg-slate-800 w-full lg:flex lg:min-h-[calc(100vh-3.5rem)] dark:text-gray-100">
				<div className="lg:w-1/2 w-full h-inherit p-3">
					{isContact ? <ContactForm /> : <Form />}
				</div>
				<div className="lg:w-1/2 w-full h-inherit dark:bg-gray-900 bg-gray-300 p-3">
					{isContact ? (
						<div className="my-20 mx-10">
							<h1 className="lg:text-5xl text-6xl font-semibold mt-10">
								Thanks for checking out Anonymous Notes!
							</h1>
							<h3 className="mt-5 lg:text-2xl text-xl lg:text-left text-justify lg:mr-10 leading-relaxed">
								I truly hope this site has provided a space for you to vent out
								any frustration or anger you may have been experiencing. Your
								feedback is invaluable to me as I continue to improve and grow
								as a developer. <br /> <br /> Whether you've encountered a bug,
								have suggestions for new features, or just want to share your
								thoughts, I'm here to listen. Your input helps shape the future
								of this site, and I'm committed to making it the best it can be.
								Please use the form to let me know how I can enhance your
								experience. I'm excited to hear from you and to learn how this
								site has impacted you!
							</h3>
						</div>
					) : (
						<>
							<h1 className="text-3xl font-semibold mb-5 text-center">
								Before posting, please check out the FAQ:
							</h1>
							<FAQ />
						</>
					)}
				</div>
			</div>
		</div>
	);
}
