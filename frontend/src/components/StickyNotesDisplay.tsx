import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useStickyNotes from "../hooks/useStickyNotes";
import { StickyNote } from "../interfaces";
import StickyNoteComponent from "./StickyNote";
import { useTheme } from "../contexts/themeContext";
import { useEffect, useState } from "react";
import { StickyNote as StickyNoteInterface } from "../interfaces";
import useSessionContext from "../contexts/sessionContext";
import LoadingSpinner from "./LoadingSpinner";
import Modal from "./Modal";

export default function StickyNotesDisplay() {
	const [openedStickyNote, setOpenedStickyNote] = useState(false);
	const [modalVisibility, setModalVisibility] = useState(false);
	const [selectedStickyNoteID, setSelectedStickyNoteID] = useState<
		string | number
	>(-1);
	const { theme } = useTheme()!;

	const { stickyNotes, errorMessage, loading } = useStickyNotes();
	const [postedStickyNotes, setPostedStickyNotes] = useState<
		StickyNoteInterface[]
	>([]);

	const [noteExists, setNoteExists] = useState(false);

	function allowNewNote() {
		setOpenedStickyNote(false);
	}

	useEffect(() => {
		setPostedStickyNotes(stickyNotes);
	}, [stickyNotes]);

	useEffect(() => {
		document.title = "All Sticky Notes";
	}, []);

	function toggleModal() {
		setModalVisibility(!modalVisibility);
	}

	function handleDelete(note_id: string | number) {
		setModalVisibility(true);
		setSelectedStickyNoteID(note_id);
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

	function handleStickyNoteDeletion(note_id: string | number) {
		setPostedStickyNotes(prev => prev.filter(note => note._id !== note_id));
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

	return (
		<div className={`${theme === "dark" ? "dark" : ""}`}>
			{modalVisibility && (
				<Modal
					modalType="confirmation"
					heading="Hang on!"
					toggleModal={toggleModal}
					noteID={selectedStickyNoteID}
					modalFor="sticky note"
					handleStickyNoteDeletion={handleStickyNoteDeletion}
					allowNewNote={allowNewNote}
				>
					Are you sure you would like to delete your sticky note? This action
					cannot be undone!
				</Modal>
			)}
			<div className="w-full p-3 bg-[#f7f8fc] dark:bg-slate-800 dark:text-slate-50 lg:min-h-[calc(100vh-3.5rem)] min-h-[calc(100vh-2.5rem)] h-auto">
				<div className="p-5 text-2xl lg:flex lg:items-center">
					<button
						title="Add Sticky Note Button"
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
							<h1 className="lg:w-11/12 w-full lg:mt-0 mt-3 text-lg border border-red-600 rounded px-3 py-1 bg-red-800 text-white">
								{errorMessage}
							</h1>
						</div>
					)}
					<div className="flex justify-center w-full">
						<h1 className="lg:w-11/12 w-full lg:mt-0 mt-3 text-lg border border-red-600 rounded px-3 py-1 bg-red-800 text-white">
							If you find your sticky note disappearing after it saves, that
							means you've made too many requests and need to try again in 1
							hour.
						</h1>
					</div>
				</div>
				{postedStickyNotes.length === 0 && !loading && (
					<div className="p-2 lg:w-1/2 m-auto text-3xl text-center font-semibold">
						<h1>
							There are currently no sticky notes posted. Press the plus button
							to create a sticky note!
						</h1>
					</div>
				)}
				<div className="w-full p-5 h-auto flex flex-wrap items-center justify-center dark:text-black">
					{loading ? (
						<LoadingSpinner>LOADING STICKY NOTES</LoadingSpinner>
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
								toggleModal={toggleModal}
							/>
						))
					)}
				</div>
			</div>
		</div>
	);
}
