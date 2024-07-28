import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StickyNote as StickyNoteInterface } from "../interfaces";
import { useEffect, useState } from "react";
import useStickyNotes from "../hooks/useStickyNotes";

interface Props {
	stickyNote: StickyNoteInterface;
}

export default function StickyNote({ stickyNote }: Props) {
	const [stickyNoteTitle, setStickyNoteTitle] = useState("");
	const [stickyNoteBody, setStickyNoteBody] = useState("");
	const [stickyNoteColor, setStickyNoteColor] = useState("yellow");

	const { saveStickyNoteData } = useStickyNotes();

	useEffect(() => {
		saveStickyNoteData(stickyNoteTitle, stickyNoteBody, stickyNoteColor);
	}, [stickyNoteTitle, stickyNoteBody, stickyNoteColor]);

	return (
		<div
			className="border border-black w-72 h-72 max-h-72 m-3 rounded-md
    bg-yellow-400 p-4 shadow-lg relative"
		>
			<div className="flex mb-2">
				<div
					className="w-6 h-6 rounded-full bg-yellow-500 border border-black"
					onClick={() => setStickyNoteColor("yellow")}
				></div>
				<div
					className="w-6 h-6 rounded-full bg-pink-500 border border-black ml-2"
					onClick={() => setStickyNoteColor("pink")}
				></div>
				<div
					className="w-6 h-6 rounded-full bg-sky-500 border border-black ml-2"
					onClick={() => setStickyNoteColor("sky")}
				></div>
				<div
					className="w-6 h-6 rounded-full bg-lime-500 border border-black ml-2"
					onClick={() => setStickyNoteColor("lime")}
				></div>
				<div
					className="w-6 h-6 rounded-full bg-purple-500 border border-black ml-2"
					onClick={() => setStickyNoteColor("purple")}
				></div>
				<div className="ml-auto px-2 py-1 rounded bg-red-600 text-white text-base hover:cursor-pointer">
					<FontAwesomeIcon icon={faTrash} />
				</div>
			</div>
			<textarea
				placeholder="Enter note title"
				className="text-xl font-semibold w-full p-2 overflow-hidden outline-none bg-transparent resize-none h-12"
				onChange={e => setStickyNoteTitle(e.target.value)}
			></textarea>
			<textarea
				placeholder="Enter note"
				className="outline-none -mt-3 resize-none p-2 w-full h-44 max-h-44 overflow-hidden bg-transparent rounded"
				onChange={e => setStickyNoteBody(e.target.value)}
			></textarea>
		</div>
	);
}
