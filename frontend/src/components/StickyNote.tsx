import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StickyNote as StickyNoteInterface } from "../interfaces";
import { useRef, useState } from "react";
import useStickyNotes from "../hooks/useStickyNotes";
import useSessionContext from "../contexts/sessionContext";
import { tailspin } from "ldrs";

// TODO - need to implement logic to disable the sticky note for editing if you're not the owner of it
// TODO - update the saveStickyNoteData function so it also takes in the sticky note's rotation too
// TODO - implement logic for displaying a message to the user about not being able to add a note until they provide their existing note a note title and body

interface Props {
	stickyNote: StickyNoteInterface;
	allowNewNote: () => void;
}

export default function StickyNote({ stickyNote, allowNewNote }: Props) {
	const [stickyNoteTitle, setStickyNoteTitle] = useState("");
	const [stickyNoteBody, setStickyNoteBody] = useState("");
	const [stickyNoteColor, setStickyNoteColor] = useState(stickyNote.color);
	const { saveStickyNoteData, deleteStickyNote } = useStickyNotes();
	const { currUID } = useSessionContext()!;
	const [saving, setSaving] = useState(false);
	const keyUpTimer = useRef<number | null>(null);
	const titleRef = useRef<HTMLDivElement>(null);
	const bodyRef = useRef<HTMLDivElement>(null);

	function formatDate(utcDate: string): string {
		const date = new Date(utcDate);

		const options: Intl.DateTimeFormatOptions = {
			year: "numeric",
			month: "long",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit"
		};

		const formattedDate = date.toLocaleDateString("en-US", options);
		return formattedDate;
	}

	const handleChanges = async () => {
		setSaving(true);

		if (keyUpTimer.current) {
			clearTimeout(keyUpTimer.current);
		}

		keyUpTimer.current = window.setTimeout(() => {
			if (stickyNoteTitle && stickyNoteBody && stickyNote.rotation) {
				allowNewNote();
				saveStickyNoteData(
					stickyNoteTitle,
					stickyNoteBody,
					stickyNoteColor,
					stickyNote.rotation
				);
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
						onClick={() => {
							setStickyNoteColor("bg-green-400");
							handleChanges();
						}}
					></div>
					<div
						className="w-6 h-6 rounded-md border border-pink-600 ml-1 bg-pink-400"
						onClick={() => {
							setStickyNoteColor("bg-pink-400");
							handleChanges();
						}}
					></div>
					<div
						className="w-6 h-6 rounded-md border border-yellow-600 ml-1 bg-yellow-400"
						onClick={() => {
							setStickyNoteColor("bg-yellow-400");
							handleChanges();
						}}
					></div>
					<div
						className="w-6 h-6 rounded-md border border-orange-600 ml-1 bg-orange-400"
						onClick={() => {
							setStickyNoteColor("bg-orange-400");
							handleChanges();
						}}
					></div>
					<div
						className="w-6 h-6 rounded-md border border-sky-600 ml-1 bg-sky-400"
						onClick={() => {
							setStickyNoteColor("bg-sky-400");
							handleChanges();
						}}
					></div>
					<div
						className="w-6 h-6 rounded-md border border-purple-600 ml-1 bg-purple-400"
						onClick={() => {
							setStickyNoteColor("bg-purple-400");
							handleChanges();
						}}
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
					onKeyUp={handleChanges}
					onInput={setNoteData}
				>
					{stickyNote.note_title}
				</div>
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
					onKeyUp={handleChanges}
					onInput={setNoteData}
				>
					{stickyNote.note_content}
				</div>
			</div>
			<div className="text-sm flex p-1 h-[1.9rem] absolute bottom-0 w-full">
				{saving ? (
					<>
						<l-tailspin size="20" stroke="3" speed="0.9" color="black" />
						<p className="ml-2">Saving...</p>
					</>
				) : (
					<p className="ml-2">
						Saved at&nbsp;
						{formatDate(stickyNote.createdAt)}
					</p>
				)}
			</div>
		</div>
	);
}
