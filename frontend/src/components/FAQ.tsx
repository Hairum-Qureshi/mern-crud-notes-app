import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import faq_json from "../JSON/faq.json";

interface FAQ_Interface {
	question: string;
	answer: string;
}

export default function FAQ() {
	const [showAnswer, setShowAnswer] = useState(false);

	// TODO - move interface to 'interfaces.ts' file
	// TODO - consider modifying/removing the report FAQ
	// TODO - figure out why the link color isn't being added for the rules & disclaimers link
	// TODO - make it so that you're able to click the link instead of the FAQ div closing
	// TODO - make it so that you're able to open a specific FAQ instead of them all

	return faq_json.map((faq: FAQ_Interface, index: number) => {
		return (
			<div
				className={`border-2 text-base bg-black text-white border-black dark:border-gray-500 rounded-md px-2 py-3 dark:bg-slate-800 hover:cursor-pointer ${
					index !== 0 && "mt-3"
				}`}
				key={index}
				onClick={() => setShowAnswer(!showAnswer)}
			>
				<div className="w-full flex">
					<h2 className="font-semibold text-lg">{faq.question}</h2>
					<span className="ml-auto text-lg mr-2">
						{showAnswer ? (
							<FontAwesomeIcon icon={faAngleUp} />
						) : (
							<FontAwesomeIcon icon={faAngleDown} />
						)}
					</span>
				</div>
				{showAnswer && (
					<div
						className="w-full dark:text-slate-400 text-gray-300 mt-2"
						dangerouslySetInnerHTML={{ __html: faq.answer }}
					></div>
				)}
			</div>
		);
	});
}