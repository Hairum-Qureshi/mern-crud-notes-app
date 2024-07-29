import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useStickyNotes from "../hooks/useStickyNotes";
import { StickyNote } from "../interfaces";
import StickyNoteComponent from "./StickyNote";

export default function StickyNotesDisplay() {
	const { createStickyNote, stickyNotes } = useStickyNotes();

	return (
		<div className="w-full p-3">
			<div className="p-5 text-2xl">
				<button
					className="bg-slate-200 p-2 rounded-md border border-black w-12 h-12 flex items-center justify-center"
					onClick={createStickyNote}
				>
					<FontAwesomeIcon icon={faPlus} />
				</button>
			</div>
			<div className="w-full p-5 h-auto flex flex-wrap items-center justify-center">
				{stickyNotes.length > 0 &&
					stickyNotes.map((stickyNote: StickyNote, index: number) => {
						return (
							<StickyNoteComponent
								stickyNote={stickyNote}
								key={stickyNote._id || index}
							/>
						);
					})}
			</div>
		</div>
	);
}
