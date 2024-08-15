import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StickyNote as StickyNoteInterface } from "../interfaces";
import { useRef, useState } from "react";
import useStickyNotes from "../hooks/useStickyNotes";
import useSessionContext from "../contexts/sessionContext";
import { tailspin } from "ldrs";
import formatDate from "../utilities/time-formatter.util";

// TODO - implement logic for displaying a message to the user about not being able to add a note until they provide their existing note a note title and body
// TODO - make sure to add a guard to prevent users from adding profanity on the sticky notes!

interface Props {
	stickyNote: StickyNoteInterface;
	allowNewNote: () => void;
	handleDelete: (note_id: string | number) => void;
	alreadyExists: (note_id?: string | number) => void;
	noteExists: boolean;
}

export default function StickyNote({
	stickyNote,
	allowNewNote,
	handleDelete,
	alreadyExists,
	noteExists
}: Props) {
	const [stickyNoteTitle, setStickyNoteTitle] = useState("");
	const [stickyNoteBody, setStickyNoteBody] = useState("");
	const [stickyNoteColor, setStickyNoteColor] = useState(stickyNote.color);
	const { saveStickyNoteData, editStickyNote } = useStickyNotes();
	const { currUID } = useSessionContext()!;
	const [saving, setSaving] = useState(false);
	const keyUpTimer = useRef<number | null>(null);
	const titleRef = useRef<HTMLDivElement>(null);
	const bodyRef = useRef<HTMLDivElement>(null);

	const handleChanges = async (sticky_note_color?: string) => {
		setSaving(true);

		if (keyUpTimer.current) {
			clearTimeout(keyUpTimer.current);
		}

		keyUpTimer.current = window.setTimeout(() => {
			if (stickyNoteTitle && stickyNoteBody && stickyNote.rotation) {
				allowNewNote();
				alreadyExists(stickyNote._id);
				if (/^\d+$/.test(stickyNote._id.toString())) {
					// If the sticky note ID is numeric
					if (noteExists) {
						editStickyNote(
							stickyNote._id,
							stickyNoteTitle,
							stickyNoteBody,
							typeof sticky_note_color !== "string"
								? stickyNoteColor
								: sticky_note_color
						);
					} else {
						// save it
						saveStickyNoteData(
							stickyNote._id,
							stickyNoteTitle,
							stickyNoteBody,
							typeof sticky_note_color !== "string"
								? stickyNoteColor
								: sticky_note_color,
							stickyNote.rotation
						);
					}
				} else {
					// If the sticky note ID is a valid MongoDB ID
					// User changes an existing sticky note (that has a MongoDB ID)'s text and even background color
					editStickyNote(
						stickyNote._id,
						stickyNoteTitle,
						stickyNoteBody,
						typeof sticky_note_color !== "string"
							? stickyNoteColor
							: sticky_note_color
					);
				}
			} else {
				// The user only changed the sticky note's background color
				editStickyNote(
					stickyNote._id,
					!stickyNoteTitle ? stickyNote.note_title : stickyNoteTitle,
					!stickyNoteBody ? stickyNote.note_content : stickyNoteBody,
					typeof sticky_note_color !== "string"
						? stickyNoteColor
						: sticky_note_color
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
				{stickyNote.curr_uid === currUID && (
					<div className="w-full flex items-center">
						<div
							className="w-6 h-6 rounded-md border-2 border-green-600 ml-1 bg-green-400 hover:cursor-pointer hover:bg-green-300"
							onClick={() => {
								setStickyNoteColor("bg-green-400");
								handleChanges("bg-green-400");
							}}
						></div>
						<div
							className="w-6 h-6 rounded-md border-2 border-pink-600 ml-1 bg-pink-400 hover:cursor-pointer hover:bg-pink-300"
							onClick={() => {
								setStickyNoteColor("bg-pink-400");
								handleChanges("bg-pink-400");
							}}
						></div>
						<div
							className="w-6 h-6 rounded-md border-2 border-yellow-600 ml-1 bg-yellow-400 hover:cursor-pointer hover:bg-yellow-300"
							onClick={() => {
								setStickyNoteColor("bg-yellow-400");
								handleChanges("bg-yellow-400");
							}}
						></div>
						<div
							className="w-6 h-6 rounded-md border-2 border-orange-600 ml-1 bg-orange-400 hover:cursor-pointer hover:bg-orange-300"
							onClick={() => {
								setStickyNoteColor("bg-orange-400");
								handleChanges("bg-orange-400");
							}}
						></div>
						<div
							className="w-6 h-6 rounded-md border-2 border-sky-600 ml-1 bg-sky-400 hover:cursor-pointer hover:bg-sky-300"
							onClick={() => {
								setStickyNoteColor("bg-sky-400");
								handleChanges("bg-sky-400");
							}}
						></div>
						<div
							className="w-6 h-6 rounded-md border-2 border-purple-600 ml-1 bg-purple-400 hover:cursor-pointer hover:bg-purple-300"
							onClick={() => {
								setStickyNoteColor("bg-purple-400");
								handleChanges("bg-purple-400");
							}}
						></div>
						{stickyNote.curr_uid === currUID && (
							<div
								className="p-2 inline-flex rounded-md items-center bg-red-600 text-white ml-auto hover:cursor-pointer"
								onClick={() => {
									handleDelete(stickyNote._id);
									setSaving(false);
									allowNewNote();
								}}
							>
								<FontAwesomeIcon icon={faTrash} />
							</div>
						)}
					</div>
				)}
				{stickyNote.curr_uid === currUID ? (
					<div
						contentEditable={
							stickyNote.curr_uid === currUID ? "plaintext-only" : false
						}
						className="w-full mt-1 p-1 inline-block outline-none"
						data-placeholder="Enter heading..."
						data-gramm="false"
						data-gramm_editor="false"
						data-enable-grammarly="false"
						ref={titleRef}
						suppressContentEditableWarning={true}
						onKeyUp={handleChanges}
						onInput={setNoteData}
					>
						{stickyNote.note_title}
					</div>
				) : (
					<div className="w-full mt-1 p-1 inline-block outline-none">
						{stickyNote.note_title}
					</div>
				)}
			</div>
			<div className="flex-grow mx-1 flex flex-col">
				{stickyNote.curr_uid === currUID ? (
					<div
						contentEditable={
							stickyNote.curr_uid === currUID ? "plaintext-only" : false
						}
						className="w-full outline-none p-1 text-base flex-grow mb-8"
						data-gramm="false"
						data-gramm_editor="false"
						data-enable-grammarly="false"
						data-placeholder="Enter content..."
						ref={bodyRef}
						suppressContentEditableWarning={true}
						onKeyUp={handleChanges}
						onInput={setNoteData}
					>
						{stickyNote.note_content}
					</div>
				) : (
					<div className="w-full outline-none p-1 text-base flex-grow mb-8">
						{stickyNote.note_content}
					</div>
				)}
			</div>
			<div className="text-sm flex p-1 h-[1.9rem] absolute bottom-0 w-full">
				{saving ? (
					<>
						<l-tailspin size="20" stroke="3" speed="0.9" color="black" />
						<p className="ml-2">Saving...</p>
					</>
				) : (
					<p className="ml-2">
						{stickyNote.curr_uid === currUID ? (
							<>
								Saved on&nbsp;
								{formatDate(stickyNote.createdAt)}
							</>
						) : (
							<>
								Posted on&nbsp;
								{formatDate(stickyNote.createdAt)}
							</>
						)}
					</p>
				)}
			</div>
		</div>
	);
}
