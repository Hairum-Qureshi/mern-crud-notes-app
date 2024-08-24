import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import useStickyNotes from "../hooks/useStickyNotes";
import useSessionContext from "../contexts/sessionContext";
import { tailspin } from "ldrs";
import formatDate from "../utilities/time-formatter.util";
import { StickyNoteProps } from "../interfaces";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// TODO - implement logic for displaying a message to the user about not being able to add a note until they provide their existing note a note title and body

// TODO - display an error message to the user when they click the 'add sticky note' button when their current sticky note is empty (they can only add a new sticky note once the recent one isn't empty)

// TODO - need to make useMutation handle deleting sticky notes too

export default function StickyNote({
	stickyNote,
	allowNewNote,
	handleDelete,
	alreadyExists,
	noteExists,
	toggleModal
}: StickyNoteProps) {
	const [stickyNoteTitle, setStickyNoteTitle] = useState("");
	const [stickyNoteBody, setStickyNoteBody] = useState("");
	const [stickyNoteColor, setStickyNoteColor] = useState(stickyNote.color);
	const { saveStickyNoteData, editStickyNote } = useStickyNotes();
	const { currUID } = useSessionContext()!;
	const [saving, setSaving] = useState(false);
	const keyUpTimer = useRef<number | null>(null);
	const titleRef = useRef<HTMLDivElement>(null);
	const bodyRef = useRef<HTMLDivElement>(null);

	const queryClient = useQueryClient();

	const stickyNoteMutation = useMutation({
		mutationFn: async ({
			// mutation hook only accepts one parameter which is why it needs to be an object
			id,
			title,
			body,
			color,
			rotation,
			mutationType
		}: {
			id: string | number;
			title: string;
			body: string;
			color: string;
			rotation?: string;
			mutationType: string;
		}) => {
			return mutationType === "post"
				? saveStickyNoteData(id, title, body, color, rotation!)
				: editStickyNote(id, title, body, color);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["sticky-notes"]
			});
		}
	});

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
						stickyNoteMutation.mutate({
							id: stickyNote._id,
							title: stickyNoteTitle,
							body: stickyNoteBody,
							color:
								typeof sticky_note_color !== "string"
									? stickyNoteColor
									: sticky_note_color,
							mutationType: "edit"
						});
					} else {
						// save it
						stickyNoteMutation.mutate({
							id: stickyNote._id,
							title: stickyNoteTitle,
							body: stickyNoteBody,
							color:
								typeof sticky_note_color !== "string"
									? stickyNoteColor
									: sticky_note_color,
							rotation: stickyNote.rotation,
							mutationType: "post"
						});
					}
				} else {
					// If the sticky note ID is a valid MongoDB ID
					// User changes an existing sticky note (that has a MongoDB ID)'s text and even background color
					stickyNoteMutation.mutate({
						id: stickyNote._id,
						title: stickyNoteTitle,
						body: stickyNoteBody,
						color:
							typeof sticky_note_color !== "string"
								? stickyNoteColor
								: sticky_note_color,
						mutationType: "edit"
					});
				}
			} else {
				// The user only changed the sticky note's background color
				stickyNoteMutation.mutate({
					id: stickyNote._id,
					title: stickyNoteTitle,
					body: stickyNoteBody,
					color:
						typeof sticky_note_color !== "string"
							? stickyNoteColor
							: sticky_note_color,
					mutationType: "edit"
				});
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

	const now: Date = new Date();
	const formattedTime = now.toLocaleTimeString("en-US", {
		timeStyle: "short",
		hour12: true
	});

	const formattedDate = now.toLocaleDateString("en-US", {
		month: "2-digit",
		day: "2-digit",
		year: "2-digit"
	});

	tailspin.register();

	return (
		<div
			className={`border border-black w-80 min-h-72 max-h-96 h-auto mx-3 my-5 rounded-md ${stickyNoteColor} relative ${stickyNote.rotation}`}
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
									toggleModal();
									setSaving(false);
									allowNewNote();
									handleDelete(stickyNote._id);
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
						className="w-full outline-none p-1 text-base flex-grow mb-8 max-h-64 overflow-y-auto flex-shrink-0"
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
					<div className="flex w-full">
						<l-tailspin size="20" stroke="3" speed="0.9" color="black" />
						<div className="flex w-full justify-between">
							<p className="ml-2">Saving...</p>
							<span className="font-semibold">0/500</span>
						</div>
					</div>
				) : (
					<div className="flex w-full">
						{stickyNote.curr_uid === currUID ? (
							<div className="w-full">
								<div className="flex justify-between">
									<p>
										Saved at {formattedTime} on {formattedDate}
									</p>
									<span className="font-semibold">0/500</span>
								</div>
							</div>
						) : (
							<p>
								Posted on&nbsp;
								{formatDate(stickyNote.createdAt)}
							</p>
						)}
					</div>
				)}
			</div>
		</div>
	);
}
