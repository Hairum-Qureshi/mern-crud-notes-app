import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StickyNote as StickyNoteInterface } from "../interfaces";
import { useEffect, useState } from "react";
import useStickyNotes from "../hooks/useStickyNotes";
import useSessionContext from "../contexts/sessionContext";
import { tailspin } from "ldrs";

interface Props {
	stickyNote: StickyNoteInterface;
	update: () => void;
}

export default function StickyNote({ stickyNote, update }: Props) {
	const [stickyNoteTitle, setStickyNoteTitle] = useState("");
	const [stickyNoteBody, setStickyNoteBody] = useState("");
	const [stickyNoteColor, setStickyNoteColor] = useState("bg-yellow-400");
	const [saving, isSaving] = useState(false);

	const { saveStickyNoteData, deleteStickyNote } = useStickyNotes();
	const { currUID } = useSessionContext()!;

	tailspin.register();

	useEffect(() => {
		const delayDebounceFn = setTimeout(() => {
			saveStickyNoteData(stickyNoteTitle, stickyNoteBody, stickyNoteColor);
		}, 800);

		return () => clearTimeout(delayDebounceFn);
	}, [stickyNoteTitle, stickyNoteBody, stickyNoteColor]);

	function changeColor(color: string) {
		setStickyNoteColor(`bg-${color}-400`);
	}

	return (
		<div
			className={`border border-black w-80 min-h-72 h-auto m-3 rounded-md ${stickyNoteColor} flex flex-col relative`}
		>
			<div className="min-h-10 w-full p-1 font-semibold text-lg h-auto">
				<div className="w-full flex items-center">
					<div
						className="w-6 h-6 rounded-md border border-green-600 ml-1 bg-green-400"
						onClick={() => changeColor("green")}
					></div>
					<div
						className="w-6 h-6 rounded-md border border-pink-600 ml-1 bg-pink-400"
						onClick={() => changeColor("pink")}
					></div>
					<div
						className="w-6 h-6 rounded-md border border-yellow-600 ml-1 bg-yellow-400"
						onClick={() => changeColor("yellow")}
					></div>
					<div
						className="w-6 h-6 rounded-md border border-orange-600 ml-1 bg-orange-400"
						onClick={() => changeColor("orange")}
					></div>
					<div
						className="w-6 h-6 rounded-md border border-sky-600 ml-1 bg-sky-400"
						onClick={() => changeColor("sky")}
					></div>
					<div
						className="w-6 h-6 rounded-md border border-purple-600 ml-1 bg-purple-400"
						onClick={() => changeColor("purple")}
					></div>
					<div className="p-2 inline-flex rounded-md items-center bg-red-600 text-white ml-auto">
						<FontAwesomeIcon icon={faTrash} />
					</div>
				</div>
				<div
					contentEditable="plaintext-only"
					className="w-full mt-1 p-1 inline-block outline-none"
					data-placeholder="Enter heading..."
				></div>
			</div>
			<div className="flex-grow mx-1 flex flex-col">
				<div
					contentEditable="plaintext-only"
					className="w-full outline-none p-1 text-base flex-grow mb-8"
					data-gramm="false"
					data-gramm_editor="false"
					data-enable-grammarly="false"
					data-placeholder="Enter content..."
				></div>
			</div>
			<div className="text-sm flex p-1 h-[1.9rem] absolute bottom-0 w-full">
				{saving ? (
					<>
						<l-tailspin size="20" stroke="3" speed="0.9" color="black" />
						<p className="ml-2">Saving...</p>
					</>
				) : (
					<p className="ml-2">Saved at 11:31 PM</p>
				)}
			</div>
		</div>

		// <div
		// 	className={`border border-black w-72 h-72 max-h-72 m-3 rounded-md
		// 	${
		// 		stickyNote.color === "yellow"
		// 			? "bg-yellow-400"
		// 			: stickyNote.color === "pink"
		// 			? "bg-pink-400"
		// 			: stickyNote.color === "sky"
		// 			? "bg-sky-400"
		// 			: stickyNote.color === "lime"
		// 			? "bg-lime-400"
		// 			: stickyNote.color === "purple"
		// 			? "bg-purple-400"
		// 			: "bg-red-400"
		// 	} p-4 shadow-lg relative`}
		// >
		// 	<div className="flex mb-2">
		// 		<div
		// 			className="w-6 h-6 rounded-full bg-yellow-500 border border-black hover:cursor-pointer"
		// 			onClick={() => setStickyNoteColor("yellow")}
		// 		></div>
		// 		<div
		// 			className="w-6 h-6 rounded-full bg-pink-500 border border-black ml-2 hover:cursor-pointer"
		// 			onClick={() => setStickyNoteColor("pink")}
		// 		></div>
		// 		<div
		// 			className="w-6 h-6 rounded-full bg-sky-500 border border-black ml-2 hover:cursor-pointer"
		// 			onClick={() => setStickyNoteColor("sky")}
		// 		></div>
		// 		<div
		// 			className="w-6 h-6 rounded-full bg-lime-500 border border-black ml-2 hover:cursor-pointer"
		// 			onClick={() => setStickyNoteColor("lime")}
		// 		></div>
		// 		<div
		// 			className="w-6 h-6 rounded-full bg-purple-500 border border-black ml-2 hover:cursor-pointer"
		// 			onClick={() => setStickyNoteColor("purple")}
		// 		></div>
		// 		{stickyNote.curr_uid === currUID && (
		// 			<div
		// 				className="ml-auto px-2 py-1 rounded bg-red-600 text-white text-base hover:cursor-pointer"
		// 				onClick={() => {
		// 					deleteStickyNote(stickyNote._id);
		// 					update();
		// 				}}
		// 			>
		// <FontAwesomeIcon icon={faTrash} />
		// 			</div>
		// 		)}
		// 	</div>
		// 	<textarea
		// 		placeholder="Enter note title"
		// 		className="text-xl font-semibold w-full p-2 overflow-hidden outline-none bg-transparent resize-none h-12 placeholder-black"
		// 		value={stickyNote.note_title || undefined}
		// 		onChange={e => setStickyNoteTitle(e.target.value)}
		// 	></textarea>
		// 	<textarea
		// 		placeholder="Enter note"
		// 		className="outline-none -mt-3 resize-none p-2 w-full h-44 max-h-44 overflow-hidden bg-transparent rounded placeholder-black"
		// 		value={stickyNote.note_content || undefined}
		// 		onChange={e => setStickyNoteBody(e.target.value)}
		// 	></textarea>
		// </div>
	);
}
