import axios from "axios";
import { useState } from "react";
import { Note } from "../interfaces";

interface NoteHandlers {
	postNote: (note_title: string, note_content: string) => void;
	getNoteData: (note_id: string) => void;
	noteData: Note | undefined;
	loadingStatus: boolean;
}

export default function useNotes(): NoteHandlers {
	const [noteData, setNoteData] = useState<Note | undefined>();
	const [loadingStatus, setLoadingStatus] = useState(false);

	function postNote(note_title: string, note_content: string) {
		if (!note_title || !note_content) {
			alert("Please make sure all fields are filled");
		} else {
			setLoadingStatus(true);
			axios
				.post(
					"http://localhost:4000/api/notes/create",
					{
						note_title,
						note_content
					},
					{
						withCredentials: true
					}
				)
				.then(response => {
					if (response.status === 201) {
						window.location.href = `http://localhost:5174/note/${response.data._id}`;
						setLoadingStatus(false);
					}
				})
				.catch(error => {
					console.log(error);
					setLoadingStatus(false);
				});
		}
	}

	function getNoteData(note_id: string) {
		axios
			.get(`http://localhost:4000/api/notes/${note_id}`)
			.then(response => setNoteData(response.data))
			.catch(error => console.log(error));
	}

	return { postNote, getNoteData, noteData, loadingStatus };
}
