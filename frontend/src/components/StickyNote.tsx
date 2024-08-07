import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StickyNote as StickyNoteInterface } from "../interfaces";
import { useRef, useState } from "react";
import useStickyNotes from "../hooks/useStickyNotes";
import useSessionContext from "../contexts/sessionContext";
import { tailspin } from "ldrs";

interface Props {
	stickyNote: StickyNoteInterface;
	allowNewNote: () => void;
}

export default function StickyNote({ stickyNote, allowNewNote }: Props) {
	const [stickyNoteTitle, setStickyNoteTitle] = useState("");
	const [stickyNoteBody, setStickyNoteBody] = useState("");
	const [stickyNoteColor, setStickyNoteColor] = useState("bg-yellow-400");
	const { saveStickyNoteData, deleteStickyNote } = useStickyNotes();
	const { currUID } = useSessionContext()!;
	const [saving, setSaving] = useState(false);
	const keyUpTimer = useRef<number | null>(null);
	const titleRef = useRef<HTMLDivElement>(null);
	const bodyRef = useRef<HTMLDivElement>(null);

	const handleKeyUp = async () => {
		setSaving(true);

		if (keyUpTimer.current) {
			clearTimeout(keyUpTimer.current);
		}

		keyUpTimer.current = window.setTimeout(() => {
			if (stickyNoteTitle && stickyNoteBody) {
				allowNewNote();
			}
			setSaving(false);
		}, 2000);
	};

	function setNoteData() {
		if (titleRef.current) {
			setStickyNoteTitle(titleRef.current.innerText);
		}
		if (bodyRef.current) {
			setStickyNoteBody(bodyRef.current.innerText);
		}
	}

	tailspin.register();

	return (
		<div
			className={`border border-black w-80 min-h-72 h-auto mx-3 my-5 rounded-md ${stickyNoteColor} relative ${stickyNote.rotation}`}
		>
			<div className="min-h-10 w-full p-1 font-semibold text-lg h-auto">
				<div className="w-full flex items-center">
					<div
						className="w-6 h-6 rounded-md border border-green-600 ml-1 bg-green-400"
						onClick={() => setStickyNoteColor("bg-green-400")}
					></div>
					<div
						className="w-6 h-6 rounded-md border border-pink-600 ml-1 bg-pink-400"
						onClick={() => setStickyNoteColor("bg-pink-400")}
					></div>
					<div
						className="w-6 h-6 rounded-md border border-yellow-600 ml-1 bg-yellow-400"
						onClick={() => setStickyNoteColor("bg-yellow-400")}
					></div>
					<div
						className="w-6 h-6 rounded-md border border-orange-600 ml-1 bg-orange-400"
						onClick={() => setStickyNoteColor("bg-orange-400")}
					></div>
					<div
						className="w-6 h-6 rounded-md border border-sky-600 ml-1 bg-sky-400"
						onClick={() => setStickyNoteColor("bg-sky-400")}
					></div>
					<div
						className="w-6 h-6 rounded-md border border-purple-600 ml-1 bg-purple-400"
						onClick={() => setStickyNoteColor("bg-purple-400")}
					></div>
					<div className="p-2 inline-flex rounded-md items-center bg-red-600 text-white ml-auto">
						<FontAwesomeIcon icon={faTrash} />
					</div>
				</div>
				<div
					contentEditable="plaintext-only"
					className="w-full mt-1 p-1 inline-block outline-none"
					data-placeholder="Enter heading..."
					data-gramm="false"
					data-gramm_editor="false"
					data-enable-grammarly="false"
					ref={titleRef}
					onKeyUp={handleKeyUp}
					onInput={setNoteData}
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
					ref={bodyRef}
					onKeyUp={handleKeyUp}
					onInput={setNoteData}
				></div>
			</div>
			<div className="text-sm flex p-1 h-[1.9rem] absolute bottom-0 w-full">
				{saving ? (
					<>
						<l-tailspin size="20" stroke="3" speed="0.9" color="black" />
						<p className="ml-2">Saving...</p>
					</>
				) : (
					<p className="ml-2">
						Saved at {new Date().toLocaleString().split(", ")[1]}
					</p>
				)}
			</div>
		</div>
	);
}
