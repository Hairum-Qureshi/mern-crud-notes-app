import { useEffect, useState } from "react";
import useNotes from "../hooks/useNotes";
import { ring2 } from "ldrs";
import useSessionContext from "../contexts/sessionContext";
import { useTheme } from "../contexts/themeContext";

export default function Form() {
	const [noteTitle, setNoteTitle] = useState("");
	const [noteBody, setNoteBody] = useState("");
	const [typedBodyCharacters, setTypedBodyCharacters] = useState(0);
	const [typedTitleCharacters, setTypedTitleCharacters] = useState(0);
	const [yourNoteFlair, setYourNoteFlair] = useState(false);
	const { currUID } = useSessionContext()!;
	const { theme } = useTheme()!;

	const {
		postNote,
		getNoteData,
		noteData,
		editNote,
		errorMessage,
		formLoadingStatus
	} = useNotes();

	const note_id = window.location.href.split("/")[4];
	const urlEnd = window.location.pathname.split("/").pop();

	useEffect(() => {
		if (note_id) {
			getNoteData(note_id);
		}
	}, [note_id]);

	useEffect(() => {
		setTypedBodyCharacters(noteBody.length);
	}, [noteBody]);

	useEffect(() => {
		setTypedTitleCharacters(noteTitle.length);
	}, [noteTitle]);

	useEffect(() => {
		if (noteData) {
			setNoteTitle(noteData.note_title);
			setNoteBody(noteData.note_content);
			setYourNoteFlair(noteData.curr_uid === currUID);
			document.title = "Edit Note Form";
		} else {
			document.title = "Post Note Form";
		}
	}, [noteData]);

	ring2.register();

	return (
		<div className={`${theme === "dark" ? "dark" : ""}`}>
			<div className="flex justify-center lg:h-[calc(100vh-3.5rem)] dark:bg-slate-800 flex-1 bg-[#f7f8fc]">
				<div className="flex flex-col w-full p-3 space-y-4 dark:text-gray-300">
					<h1 className="text-3xl font-semibold mt-5">
						{urlEnd === "new-note" ? "Create a Note" : "Edit Note"}
					</h1>
					<h3>
						You need a minimum of 20 characters for your title and 1,000 for
						your body
					</h3>
					<div>
						<form autoComplete="off">
							{errorMessage && (
								<div className="p-2 bg-red-600 dark:bg-red-700 text-base text-white rounded my-2 flex items-center">
									<h1>{errorMessage}</h1>
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
									maxLength={80}
									className="w-full p-2 my-1 text-base border-2 border-gray-600 rounded dark:bg-gray-900 dark:border-gray-600 dark:text-gray-300 dark:focus:outline-none dark:focus:border-gray-500 dark:focus:border-2"
									onChange={e => setNoteTitle(e.target.value)}
								/>
								<div className="text-right">
									<h1>{typedTitleCharacters}/80</h1>
								</div>
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
									maxLength={5000}
									className="w-full p-3 my-1 text-base border-2 border-gray-600 rounded h-64 resize-none dark:bg-gray-900 dark:border-gray-600 dark:text-gray-300 dark:focus:outline-none dark:focus:border-gray-500 dark:focus:border-2"
									onChange={e => setNoteBody(e.target.value)}
								/>
							</div>
							<div className="text-right">
								<p>{typedBodyCharacters}/5000</p>
							</div>
						</form>
						<div className="flex justify-center mt-10">
							{urlEnd === "new-note" ? (
								<button
									// disabled={typedWords < 1000}
									className={`w-full p-3 bg-black hover:bg-slate-800 rounded text-white text-lg flex items-center justify-center dark:bg-blue-500 dark:hover:bg-blue-600 ${
										errorMessage && "lg:-mt-4 mt-4"
									} ${errorMessage && "-mt-4"} ${
										typedBodyCharacters < 1000
											? "cursor-not-allowed"
											: "cursor-pointer"
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
									className={`w-full p-3 bg-black hover:bg-slate-800 rounded text-white text-lg flex items-center justify-center dark:bg-blue-500 dark:hover:bg-blue-600 ${
										errorMessage && "lg:-mt-4 mt-4"
									} ${errorMessage && "-mt-4"} ${
										typedBodyCharacters < 1000
											? "cursor-not-allowed"
											: "cursor-pointer"
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
