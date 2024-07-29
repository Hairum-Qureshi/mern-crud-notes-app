import axios from "axios";
import { useEffect, useState } from "react";
import { StickyNote } from "../interfaces";

interface StickyNoteHandlers {
	createStickyNote: () => void;
	stickyNotes: StickyNote[];
	saveStickyNoteData: (
		stickyNoteTitle: string,
		stickyNoteBody: string,
		stickyNoteColor: string
	) => void;
	deleteStickyNote: (note_id: string) => void;
}

export default function useStickyNotes(): StickyNoteHandlers {
	const [stickyNotes, setStickyNotes] = useState<StickyNote[]>([]);

	function createStickyNote() {
		setStickyNotes(prev => [
			{
				_id: Math.floor(Number(new Date()) * Math.random()).toString(),
				note_title: "",
				note_content: "",
				color: "yellow"
			},
			...prev
		]);
	}

	useEffect(() => {
		async function getAllStickyNotes() {
			axios
				.get("http://localhost:4000/api/sticky-notes/all")
				.then(response => {
					setStickyNotes(response.data);
				})
				.catch(error => {
					console.error(error);
				});
		}

		getAllStickyNotes();
	}, []);

	async function saveStickyNoteData(
		stickyNoteTitle: string,
		stickyNoteBody: string,
		stickyNoteColor: string
	) {
		if (stickyNoteTitle && stickyNoteBody && stickyNoteColor) {
			axios
				.post(
					"http://localhost:4000/api/sticky-notes/create",
					{
						stickyNoteTitle,
						stickyNoteBody,
						stickyNoteColor
					},
					{
						withCredentials: true
					}
				)
				.then(response => {
					setStickyNotes(prev => [response.data, ...prev]);
				})
				.catch(error => {
					console.log(error);
				});
		}
	}

	async function deleteStickyNote(note_id: string) {
		await axios
			.delete(`http://localhost:4000/api/sticky-notes/${note_id}`, {
				withCredentials: true
			})
			.then(() => {
				setStickyNotes(prev => prev.filter(note => note._id !== note_id));
			})
			.catch(error => {
				console.log(error.response.data.message);
				if (error.response.data.message === "Invalid note ID") {
					setStickyNotes(prev => prev.filter(note => note._id !== note_id));
				}
			});
	}

	return {
		createStickyNote,
		stickyNotes,
		saveStickyNoteData,
		deleteStickyNote
	};
}