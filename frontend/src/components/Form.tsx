import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import useNotes from "../hooks/useNotes";
import { ring2 } from "ldrs";
import useSessionContext from "../contexts/sessionContext";
import { useTheme } from "../contexts/themeContext";

// TODO - figure out how to add a max word limit to the textarea
// TODO - uncomment the disabled logic for the button
// TODO - add a character/word limit to the title
//! BUG - if you press the button only entering the note title, it doesn't prompt you to fill in the textarea
// ! BUG - if there are no notes, the error "no notes" is displayed to the user
// ! MINOR BUG - fix issue where if you're on the edit form and click on "Create a Big Note", the form still says 'Edit Post'

export default function Form() {
	const [noteTitle, setNoteTitle] = useState("");
	const [noteBody, setNoteBody] = useState("");
	const [typedWords, setTypedWords] = useState(0);
	const [maxCharacters, setMaxCharacters] = useState(1000);
	const [readOnly, setReadOnly] = useState(false);
	const [yourNoteFlair, setYourNoteFlair] = useState(false);
	const { currUID } = useSessionContext()!;
	const { theme } = useTheme()!;

	const {
		postNote,
		getNoteData,
		noteData,
		editNote,
		errorMessage,
		clearErrorMessage,
		formLoadingStatus
	} = useNotes();

	const note_id = window.location.href.split("/")[4];
	useEffect(() => {
		if (note_id) {
			getNoteData(note_id);
		}
	}, [note_id]);

	useEffect(() => {
		if (noteData) {
			setNoteTitle(noteData.note_title);
			setNoteBody(noteData.note_content);
			setYourNoteFlair(noteData.curr_uid === currUID);
			document.title = "Edit Note Form";
		}
	}, [noteData]);

	ring2.register();

	useEffect(() => {
		const wordCount = noteBody.trim().split(/\s+/).length; // Use \s+ to handle multiple spaces
		setTypedWords(wordCount);

		document.title = "Post Note Form";

		if (wordCount === 5000) {
			setMaxCharacters(noteBody.length);
			setReadOnly(true);
		}
	}, [noteBody]);

	return (
		<div className={`${theme === "dark" ? "dark" : ""}`}>
			<div className="w-full flex justify-center lg:h-[calc(100vh-3.5rem)] dark:bg-slate-800 flex-1 bg-[#f7f8fc]">
				<div className="flex flex-col w-full p-3 space-y-4 dark:text-gray-300">
					<h1 className="text-3xl font-semibold mt-5">
						{noteData === undefined || !noteData || !yourNoteFlair
							? "Create a Note"
							: "Edit Note"}
					</h1>
					<div>
						<form autoComplete="off">
							{errorMessage && (
								<div className="p-2 bg-red-600 dark:bg-red-700 text-base text-white rounded my-2 flex items-center -mt-3">
									<h1>{errorMessage}</h1>
									<FontAwesomeIcon
										icon={faX}
										className="ml-auto mr-2 text-lg px-2 py-2 hover:cursor-pointer"
										onClick={clearErrorMessage}
									/>
								</div>
							)}
							<div>
								<label htmlFor="note-title" className="text-lg">
									Note Title
								</label>
								<input
									type="text"
									id="note-title"
									placeholder="Enter a title"
									value={
										noteData !== undefined && yourNoteFlair
											? noteTitle
											: undefined
									}
									className="w-full p-2 my-1 text-base border border-gray-600 rounded dark:bg-gray-900 dark:border-gray-600 dark:text-gray-300 dark:focus:outline-none dark:focus:border-gray-500 dark:focus:border-2"
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
									value={
										noteData !== undefined && yourNoteFlair
											? noteBody
											: undefined
									}
									className="w-full p-3 my-1 text-base border border-gray-600 rounded h-64 resize-none dark:bg-gray-900 dark:border-gray-600 dark:text-gray-300 dark:focus:outline-none dark:focus:border-gray-500 dark:focus:border-2"
									// maxLength={maxCharacters}
									readOnly={readOnly}
									onChange={e => setNoteBody(e.target.value)}
								/>
							</div>
							<div className="text-right">
								<p>{typedWords}/5000</p>
							</div>
						</form>
						<div className="flex justify-center mt-10">
							{noteData === undefined || !noteData || !yourNoteFlair ? (
								<button
									// disabled={typedWords < 1000}
									className={`w-full p-3 bg-black rounded text-white text-lg flex items-center justify-center dark:bg-blue-500 dark:hover:bg-blue-600 ${
										errorMessage && "lg:-mt-4 mt-4"
									} ${errorMessage && "-mt-4"} ${
										typedWords < 1000 ? "cursor-not-allowed" : "cursor-pointer"
									}`}
									onClick={() => {
										postNote(noteTitle, noteBody);
									}}
								>
									{formLoadingStatus ? (
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
							) : (
								<button
									// disabled={typedWords < 1000}
									className={`w-full p-3 bg-black rounded text-white text-lg flex items-center justify-center dark:bg-blue-500 dark:hover:bg-blue-600 ${
										errorMessage && "lg:-mt-4 mt-4"
									} ${errorMessage && "-mt-4"} ${
										typedWords < 1000 ? "cursor-not-allowed" : "cursor-pointer"
									}`}
									onClick={() => {
										editNote(note_id, noteTitle, noteBody);
									}}
								>
									{formLoadingStatus ? (
										<>
											<l-ring-2
												size="30"
												stroke="3"
												stroke-length="0.25"
												bg-opacity="0.1"
												speed="0.8"
												color="white"
											></l-ring-2>
											&nbsp; Confirming Edits
										</>
									) : (
										"Confirm Edits"
									)}
								</button>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
