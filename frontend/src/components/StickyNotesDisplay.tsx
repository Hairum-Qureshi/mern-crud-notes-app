import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useStickyNotes from "../hooks/useStickyNotes";
import { StickyNote } from "../interfaces";
import StickyNoteComponent from "./StickyNote";
import { useTheme } from "../contexts/themeContext";
import { useEffect, useState } from "react";
import { StickyNote as StickyNoteInterface } from "../interfaces";
import useSessionContext from "../contexts/sessionContext";
import { tailspin } from "ldrs";

export default function StickyNotesDisplay() {
	const [openedStickyNote, setOpenedStickyNote] = useState(false);
	const { theme } = useTheme()!;

	const { deleteStickyNote, stickyNotes, errorMessage, loading } =
		useStickyNotes();
	const [postedStickyNotes, setPostedStickyNotes] = useState<
		StickyNoteInterface[]
	>([]);

	useEffect(() => {
		if (errorMessage) {
			console.error("An error occurred:", errorMessage);
		}
	}, [errorMessage]);

	const [noteExists, setNoteExists] = useState(false);

	function allowNewNote() {
		setOpenedStickyNote(false);
	}

	// TODO - need to make the error message disappear after a few seconds
	// TODO - when you delete a newly created sticky note, the error message that appears is "sticky note not found"
	// !BUG - 'errorMessage' in useStickyNotes is defined, but when trying to access it here, it's empty

	useEffect(() => {
		setPostedStickyNotes(stickyNotes);
	}, [stickyNotes]);

	useEffect(() => {
		document.title = "All Sticky Notes";
	}, []);

	function handleDelete(note_id: string | number) {
		const confirmation = confirm(
			"Are you sure you would like to delete this sticky note? This cannot be undone!"
		);

		if (confirmation) {
			setPostedStickyNotes(prev => prev.filter(note => note._id !== note_id));
			deleteStickyNote(note_id);
		}
	}

	const { currUID } = useSessionContext()!;

	const rotations = ["-rotate-3", "rotate-6", "rotate-6", "rotate-3, rotate-0"];

	function createStickyNote() {
		setPostedStickyNotes(prev => [
			{
				_id: Math.floor(Number(new Date()) * Math.random()),
				note_title: "",
				note_content: "",
				color: "bg-yellow-400",
				curr_uid: currUID!,
				rotation: rotations[Math.floor(Math.random() * rotations.length)],
				createdAt: new Date().toISOString()
			},
			...prev
		]);
	}

	function alreadyExists(note_id?: string | number) {
		const found: StickyNote | undefined = postedStickyNotes.find(
			(note: StickyNote) => note._id === note_id
		);
		if (found) {
			setNoteExists(true);
		} else {
			setNoteExists(false);
			createStickyNote();
		}
	}

	tailspin.register();

	return (
		<div className={`${theme === "dark" ? "dark" : ""}`}>
			<div className="w-full p-3 dark:bg-slate-800 dark:text-slate-50 lg:min-h-[calc(100vh-3.5rem)] min-h-[calc(100vh-2.5rem)] h-auto">
				<div className="p-5 text-2xl lg:flex lg:items-center">
					<button
						className="bg-slate-200 p-2 rounded-md border border-black w-12 h-12 flex items-center justify-center dark:bg-slate-500 dark:text-slate-50"
						onClick={() => {
							alreadyExists();
							setOpenedStickyNote(true);
						}}
						disabled={openedStickyNote}
					>
						<FontAwesomeIcon icon={faPlus} />
					</button>

					{errorMessage && (
						<div className="flex justify-center w-full">
							<h1 className="lg:w-11/12 w-full lg:mt-0 mt-3 text-lg border border-red-600 rounded px-3 py-1 bg-red-800">
								{errorMessage}
							</h1>
						</div>
					)}
				</div>
				<div className="w-full p-5 h-auto flex flex-wrap items-center justify-center dark:text-black">
					{loading ? (
						theme === "dark" ? (
							<>
								<l-tailspin
									size="40"
									stroke="5"
									speed="0.9"
									color="white"
								></l-tailspin>
								<h1 className="text-2xl text-white font-semibold ml-3">
									LOADING STICKY NOTES
								</h1>
							</>
						) : (
							<>
								<l-tailspin
									size="40"
									stroke="5"
									speed="0.9"
									color="black"
								></l-tailspin>
								<h1 className="text-2xl font-semibold ml-3">
									LOADING STICKY NOTES
								</h1>
							</>
						)
					) : (
						postedStickyNotes.length > 0 &&
						postedStickyNotes.map((stickyNote: StickyNote, index: number) => (
							<StickyNoteComponent
								stickyNote={stickyNote}
								key={stickyNote._id || index}
								allowNewNote={allowNewNote}
								handleDelete={handleDelete}
								alreadyExists={alreadyExists}
								noteExists={noteExists}
							/>
						))
					)}
				</div>
			</div>
		</div>
	);
}
