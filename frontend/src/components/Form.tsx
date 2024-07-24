import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useNotes from "../hooks/useNotes";
import { ring2 } from "ldrs";

// TODO - figure out how to add a max word limit to the textarea
// TODO - uncomment the disabled logic for the button
// TODO - need to add loading spinner

export default function Form() {
	const [noteTitle, setNoteTitle] = useState("");
	const [noteBody, setNoteBody] = useState("");
	const [typedWords, setTypedWords] = useState(0);
	const [maxCharacters, setMaxCharacters] = useState(1000);
	const [readOnly, setReadOnly] = useState(false);

	ring2.register();

	useEffect(() => {
		const wordCount = noteBody.trim().split(/\s+/).length; // Use \s+ to handle multiple spaces
		setTypedWords(wordCount);

		if (wordCount === 5000) {
			setMaxCharacters(noteBody.length);
			setReadOnly(true);
		}
	}, [noteBody]);

	const { postNote, loadingStatus } = useNotes();

	return (
		<div className="w-full flex justify-center">
			<div className="flex flex-col mt-5 lg:w-7/12 w-full p-3 space-y-4">
				<Link to="/">
					<div className="flex items-center text-lg">
						<FontAwesomeIcon icon={faArrowLeftLong} />
						<h1 className="ml-2">Go Back</h1>
					</div>
				</Link>
				<h1 className="text-3xl font-semibold">Create a Note</h1>
				<div className="p-2">
					<div>
						<label htmlFor="note-title" className="text-lg">
							Note Title
						</label>
						<input
							type="text"
							id="note-title"
							placeholder="Enter a title"
							className="w-full p-2 my-1 text-base border border-black rounded"
							onChange={e => setNoteTitle(e.target.value)}
						/>
					</div>
					<div className="mt-3">
						<label htmlFor="note-body" className="text-lg">
							Note Body
						</label>
						<textarea
							id="note-body"
							placeholder="Enter some body text"
							className="w-full p-3 my-1 text-base border whitespace-pre-wrap border-black rounded h-56 resize-y min-h-20 max-h-96"
							// maxLength={maxCharacters}
							readOnly={readOnly}
							onChange={e => setNoteBody(e.target.value)}
						/>
						<div className="text-right">
							<p>{typedWords}/5000</p>
						</div>
					</div>
					<div className="flex justify-center">
						<button
							// disabled={typedWords < 1000}
							className={`w-full lg:w-1/2 mt-5 p-3 bg-black rounded text-white text-lg flex items-center justify-center ${
								typedWords < 1000 ? "cursor-not-allowed" : "cursor-pointer"
							}`}
							onClick={() => postNote(noteTitle, noteBody)}
						>
							{loadingStatus ? (
								<>
									<l-ring-2
										size="30"
										stroke="3"
										stroke-length="0.25"
										bg-opacity="0.1"
										speed="0.8"
										color="white"
									></l-ring-2>
									&nbsp; Posting
								</>
							) : (
								"Post Note"
							)}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
