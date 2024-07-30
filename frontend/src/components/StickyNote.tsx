import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StickyNote as StickyNoteInterface } from "../interfaces";
import { useEffect, useState } from "react";
import useStickyNotes from "../hooks/useStickyNotes";
import useSessionContext from "../contexts/sessionContext";

interface Props {
	stickyNote: StickyNoteInterface;
}

export default function StickyNote({ stickyNote }: Props) {
	const [stickyNoteTitle, setStickyNoteTitle] = useState("");
	const [stickyNoteBody, setStickyNoteBody] = useState("");
	const [stickyNoteColor, setStickyNoteColor] = useState("yellow");

	const { saveStickyNoteData, deleteStickyNote } = useStickyNotes();
	const { curr_UID } = useSessionContext()!;

	useEffect(() => {
		const delayDebounceFn = setTimeout(() => {
			saveStickyNoteData(stickyNoteTitle, stickyNoteBody, stickyNoteColor);
		}, 1000);

		return () => clearTimeout(delayDebounceFn);
	}, [stickyNoteTitle, stickyNoteBody, stickyNoteColor]);

	return (
		<div
			className={`border border-black w-72 h-72 max-h-72 m-3 rounded-md
			${
				stickyNote.color === "yellow"
					? "bg-yellow-400"
					: stickyNote.color === "pink"
					? "bg-pink-400"
					: stickyNote.color === "sky"
					? "bg-sky-400"
					: stickyNote.color === "lime"
					? "bg-lime-400"
					: stickyNote.color === "purple"
					? "bg-purple-400"
					: "bg-red-400"
			} p-4 shadow-lg relative`}
		>
			<div className="flex mb-2">
				<div
					className="w-6 h-6 rounded-full bg-yellow-500 border border-black hover:cursor-pointer"
					onClick={() => setStickyNoteColor("yellow")}
				></div>
				<div
					className="w-6 h-6 rounded-full bg-pink-500 border border-black ml-2 hover:cursor-pointer"
					onClick={() => setStickyNoteColor("pink")}
				></div>
				<div
					className="w-6 h-6 rounded-full bg-sky-500 border border-black ml-2 hover:cursor-pointer"
					onClick={() => setStickyNoteColor("sky")}
				></div>
				<div
					className="w-6 h-6 rounded-full bg-lime-500 border border-black ml-2 hover:cursor-pointer"
					onClick={() => setStickyNoteColor("lime")}
				></div>
				<div
					className="w-6 h-6 rounded-full bg-purple-500 border border-black ml-2 hover:cursor-pointer"
					onClick={() => setStickyNoteColor("purple")}
				></div>
				{stickyNote.curr_uid === curr_UID ||
					(/[^a-zA-Z]/.test(stickyNote._id) && (
						<div
							className="ml-auto px-2 py-1 rounded bg-red-600 text-white text-base hover:cursor-pointer"
							onClick={() => deleteStickyNote(stickyNote._id)}
						>
							<FontAwesomeIcon icon={faTrash} />
						</div>
					))}
			</div>
			<textarea
				placeholder="Enter note title"
				className="text-xl font-semibold w-full p-2 overflow-hidden outline-none bg-transparent resize-none h-12 placeholder-black"
				value={stickyNote.note_title || undefined}
				onChange={e => setStickyNoteTitle(e.target.value)}
			></textarea>
			<textarea
				placeholder="Enter note"
				className="outline-none -mt-3 resize-none p-2 w-full h-44 max-h-44 overflow-hidden bg-transparent rounded placeholder-black"
				value={stickyNote.note_content || undefined}
				onChange={e => setStickyNoteBody(e.target.value)}
			></textarea>
		</div>
	);
}
