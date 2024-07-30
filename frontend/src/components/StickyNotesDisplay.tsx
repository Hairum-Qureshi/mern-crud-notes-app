import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useStickyNotes from "../hooks/useStickyNotes";
import { StickyNote } from "../interfaces";
import StickyNoteComponent from "./StickyNote";
import { useTheme } from "../contexts/themeContext";

export default function StickyNotesDisplay() {
	const { createStickyNote, stickyNotes } = useStickyNotes();
	const { theme } = useTheme()!;

	return (
		<div className={`${theme === "dark" ? "dark" : ""}`}>
			<div className="w-full p-3 dark:bg-slate-800 dark:text-slate-50 lg:min-h-[calc(100vh-3.5rem)] min-h-[calc(100vh-2.5rem)]  h-auto">
				<div className="p-5 text-2xl">
					<button
						className="bg-slate-200 p-2 rounded-md border border-black w-12 h-12 flex items-center justify-center dark:bg-slate-500 dark:text-slate-50"
						onClick={createStickyNote}
					>
						<FontAwesomeIcon icon={faPlus} />
					</button>
				</div>
				<div className="w-full p-5 h-auto flex flex-wrap items-center justify-center dark:text-black">
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
		</div>
	);
}
