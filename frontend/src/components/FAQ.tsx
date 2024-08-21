import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import faq_json from "../JSON/faq.json";
import { FAQ_Interface } from "../interfaces";

export default function FAQ() {
	const [faqIndex, setFAQIndex] = useState(-1);

	// TODO - move interface to 'interfaces.ts' file
	// TODO - consider modifying/removing the report FAQ
	// TODO - figure out why the link color isn't being added for the rules & disclaimers link
	// TODO - make the background fill the entire screen even on mobile view

	return faq_json.map((faq: FAQ_Interface, index: number) => {
		return (
			<div
				className={`border-2 text-base bg-gray-800 text-white border-blue-700 dark:border-gray-500 rounded-md px-2 py-3 dark:bg-slate-800 hover:cursor-pointer ${
					index !== 0 && "mt-4"
				}`}
				key={index}
			>
				<div
					className="w-full flex"
					onClick={() => setFAQIndex(faqIndex === index ? -1 : index)}
				>
					<h2 className="font-semibold text-lg">{faq.question}</h2>
					<span className="ml-auto text-lg mr-2">
						{faqIndex === index ? (
							<FontAwesomeIcon icon={faAngleUp} />
						) : (
							<FontAwesomeIcon icon={faAngleDown} />
						)}
					</span>
				</div>
				{faqIndex === index && (
					<div
						className="w-full dark:text-slate-400 text-gray-300 mt-2"
						dangerouslySetInnerHTML={{ __html: faq.answer }}
					></div>
				)}
			</div>
		);
	});
}
