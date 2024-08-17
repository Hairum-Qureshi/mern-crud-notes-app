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
					<h1 className="text-white text-xl">Left</h1>
					{/* <form></form> */}
				</div>
				<div className="lg:w-1/2 w-full h-inherit p-3">
					<div className="mt-20">
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
