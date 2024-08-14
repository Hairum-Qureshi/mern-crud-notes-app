import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useStickyNotes from "../hooks/useStickyNotes";
import { StickyNote } from "../interfaces";
import StickyNoteComponent from "./StickyNote";
import { useTheme } from "../contexts/themeContext";
import { useEffect, useState } from "react";
import { StickyNote as StickyNoteInterface } from "../interfaces";
import useSessionContext from "../contexts/sessionContext";

export default function StickyNotesDisplay() {
	const { stickyNotes } = useStickyNotes();
	const [openedStickyNote, setOpenedStickyNote] = useState(false);
	const { theme } = useTheme()!;

	const { deleteStickyNote } = useStickyNotes();
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

	function handleDelete(note_id: string) {
		// TODO - resolve issue where if you delete a note and press the add note button, the previously delete notes re-appear
		// TODO - saved notes don't appear to be deleted

		const confirmation = confirm(
			"Are you sure you would like to delete this sticky note? This cannot be undone!"
		);

		if (confirmation) {
			setPostedStickyNotes(prev => prev.filter(note => note._id !== note_id));
			if (!/^\d+$/.test(note_id)) {
				deleteStickyNote(note_id);
			}
		}
	}

	const { currUID } = useSessionContext()!;

	const rotations = ["-rotate-3", "rotate-6", "rotate-6", "rotate-3, rotate-0"];

	function createStickyNote() {
		setPostedStickyNotes(prev => [
			{
				_id: Math.floor(Number(new Date()) * Math.random()).toString(),
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

	function alreadyExists(note_id?: string) {
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
			<div className="w-full p-3 dark:bg-slate-800 dark:text-slate-50 lg:min-h-[calc(100vh-3.5rem)] min-h-[calc(100vh-2.5rem)] h-auto">
				<div className="p-5 text-2xl">
					<button
						className="bg-slate-200 p-2 rounded-md border border-black w-12 h-12 flex items-center justify-center dark:bg-slate-500 dark:text-slate-50"
						onClick={() => {
							// createStickyNote();
							alreadyExists();
							setOpenedStickyNote(true);
						}}
						disabled={openedStickyNote}
					>
						<FontAwesomeIcon icon={faPlus} />
					</button>
				</div>
				<div className="w-full p-5 h-auto flex flex-wrap items-center justify-center dark:text-black">
					{postedStickyNotes.length > 0 &&
						postedStickyNotes.map((stickyNote: StickyNote, index: number) => {
							return (
								<StickyNoteComponent
									stickyNote={stickyNote}
									key={stickyNote._id || index}
									allowNewNote={allowNewNote}
									handleDelete={handleDelete}
									alreadyExists={alreadyExists}
									noteExists={noteExists}
								/>
							);
						})}
				</div>
			</div>
		</div>
	);
}
