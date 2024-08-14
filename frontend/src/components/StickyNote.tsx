import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StickyNote as StickyNoteInterface } from "../interfaces";
import { useEffect, useRef, useState } from "react";
import useStickyNotes from "../hooks/useStickyNotes";
import useSessionContext from "../contexts/sessionContext";
import { tailspin } from "ldrs";
import formatDate from "../utilities/time-formatter.util";

// TODO - implement logic for displaying a message to the user about not being able to add a note until they provide their existing note a note title and body
// TODO - create a way to delete sticky notes without page refresh
// TODO - not 100% sure this is really a problem, but if you inspect element on a sticky note that you didn't create and change it from 'conteneditable=false' to true and edit the sticky note, it creates a duplicate sticky note with that same data; you don't end up doing any damage to the other user's sticky note, but just something to be aware about.
// TODO - make sure to add a guard to prevent users from adding profanity on the sticky notes!
// TODO - need to add a 'loading all sticky notes' feature
// TODO - make sure the delete sticky note function works

interface Props {
	stickyNote: StickyNoteInterface;
	allowNewNote: () => void;
	handleDelete: (note_id: string) => void;
	alreadyExists: (note_id?: string) => void;
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
			// TODO - issue where if you create a new note and change its color, the color isn't updated
			if (stickyNoteTitle && stickyNoteBody && stickyNote.rotation) {
				allowNewNote();
				alreadyExists(stickyNote._id);
				if (/^\d+$/.test(stickyNote._id)) {
					// If the sticky note ID is numeric
					if (noteExists) {
						// edit it
						console.log("not creating a new note because it already exists");
						// ! Note: while you may successfully implement the logic to make it seem like you edited the newly created note, it's unlikely that the edit will go through to the backend because the note did not have a valid MongoDB ID which will result in the user having to re-add their edit to the sticky note after refreshing the page which will grant their note to have the MongoDB ID

						// editNote(
						// 	stickyNote._id,
						// 	stickyNoteTitle,
						// 	stickyNoteBody,
						// 	stickyNote,
						// );
					} else {
						// save it
						console.log("saving note...");
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
			}

			setSaving(false);
		}, 2000);

		// ! Original Code:
		// keyUpTimer.current = window.setTimeout(() => {
		// 	// TODO - issue where if you create a new note and change its color, the color isn't updated
		// 	if (stickyNoteTitle && stickyNoteBody && stickyNote.rotation) {
		// 		allowNewNote();
		// 		if (/^\d+$/.test(stickyNote._id)) {
		// 			// If the sticky note ID is only numbers, that means it's not a sticky note from MongoDB
		// saveStickyNoteData(
		// 	stickyNoteTitle,
		// 	stickyNoteBody,
		// 	typeof sticky_note_color !== "string"
		// 		? stickyNoteColor
		// 		: sticky_note_color,
		// 	stickyNote.rotation
		// );

		// 			// TODO - because this note still has the default ID and not MongoDB's ID, any changes you make will call the 'saveStickyNoteData()' function again resulting in duplicate data
		// 		} else {
		// 	// User changes an existing sticky note (that has a MongoDB ID)'s text and even background color
		// 	editStickyNote(
		// 		stickyNote._id,
		// 		stickyNoteTitle,
		// 		stickyNoteBody,
		// 		typeof sticky_note_color !== "string"
		// 			? stickyNoteColor
		// 			: sticky_note_color
		// 	);
		// }
		// 	} else {
		// 		// Case where the user only wants to change the sticky note's background color and not text
		// 		if (!stickyNoteTitle && !stickyNoteBody) {
		// 			editStickyNote(
		// 				stickyNote._id,
		// 				stickyNote.note_title,
		// 				stickyNote.note_content,
		// 				typeof sticky_note_color !== "string"
		// 					? stickyNoteColor
		// 					: sticky_note_color
		// 			);
		// 		}
		// 	}

		// 	setSaving(false);
		// }, 2000);
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
							className="w-6 h-6 rounded-md border border-green-600 ml-1 bg-green-400"
							onClick={() => {
								setStickyNoteColor("bg-green-400");
								handleChanges("bg-green-400");
							}}
						></div>
						<div
							className="w-6 h-6 rounded-md border border-pink-600 ml-1 bg-pink-400"
							onClick={() => {
								setStickyNoteColor("bg-pink-400");
								handleChanges("bg-pink-400");
							}}
						></div>
						<div
							className="w-6 h-6 rounded-md border border-yellow-600 ml-1 bg-yellow-400"
							onClick={() => {
								setStickyNoteColor("bg-yellow-400");
								handleChanges("bg-yellow-400");
							}}
						></div>
						<div
							className="w-6 h-6 rounded-md border border-orange-600 ml-1 bg-orange-400"
							onClick={() => {
								setStickyNoteColor("bg-orange-400");
								handleChanges("bg-orange-400");
							}}
						></div>
						<div
							className="w-6 h-6 rounded-md border border-sky-600 ml-1 bg-sky-400"
							onClick={() => {
								setStickyNoteColor("bg-sky-400");
								handleChanges("bg-sky-400");
							}}
						></div>
						<div
							className="w-6 h-6 rounded-md border border-purple-600 ml-1 bg-purple-400"
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
			</div>
			<div className="flex-grow mx-1 flex flex-col">
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
			</div>
			<div className="text-sm flex p-1 h-[1.9rem] absolute bottom-0 w-full">
				{saving ? (
					<>
						<l-tailspin size="20" stroke="3" speed="0.9" color="black" />
						<p className="ml-2">Saving...</p>
					</>
				) : (
					<p className="ml-2">
						Saved on&nbsp;
						{formatDate(stickyNote.createdAt)}
					</p>
				)}
			</div>
		</div>
	);
}
