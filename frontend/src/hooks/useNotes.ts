import axios from "axios";
import { useEffect, useState } from "react";
import { Note } from "../interfaces";

// TODO - need to make middleware to make sure only users with a cookie can make posts!

interface NoteHandlers {
	postNote: (note_title: string, note_content: string) => void;
	getNoteData: (note_id: string) => void;
	noteData: Note | undefined;
	loadingStatus: boolean;
	allNotesData: Note[];
	deleteNote: (note_id: string, note_title: string) => void;
	editNote: (note_id: string, noteTitle: string, noteBody: string) => void;
	errorMessage: string;
	clearErrorMessage: () => void;
}

export default function useNotes(): NoteHandlers {
	const [noteData, setNoteData] = useState<Note | undefined>();
	const [loadingStatus, setLoadingStatus] = useState(false);
	const [allNotesData, setAllNotesData] = useState<Note[]>([]);
	const [errorMessage, setErrorMessage] = useState("");

	async function postNote(note_title: string, note_content: string) {
		if (!note_title || !note_content) {
			alert("Please make sure all fields are filled");
		} else {
			setLoadingStatus(true);
			await axios
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
					setErrorMessage(error.response.data.message);
					setLoadingStatus(false);
				});
		}
	}

	async function getNoteData(note_id: string) {
		setLoadingStatus(true);
		await axios
			.get(`http://localhost:4000/api/notes/${note_id}`)
			.then(response => {
				setNoteData(response.data);
				setLoadingStatus(false);
			})
			.catch(error => {
				console.log(error);
				setErrorMessage(error.response.data.message);
				setLoadingStatus(false);
			});
	}

	async function deleteNote(note_id: string, note_title: string) {
		const confirmation = confirm(
			`Are you sure you would like to delete "${note_title}"? This cannot be undone!`
		);
		if (confirmation) {
			await axios
				.delete(`http://localhost:4000/api/notes/${note_id}`, {
					withCredentials: true
				})
				.then(response => {
					if (response.status === 200) {
						window.location.href = "/";
					}
				})
				.catch(error => {
					console.log(error);
					setErrorMessage(error.response.data.message);
				});
		}
	}

	useEffect(() => {
		function getAllNotes() {
			setLoadingStatus(true);
			axios
				.get("http://localhost:4000/api/notes/all")
				.then(response => {
					setAllNotesData(response.data);
					setLoadingStatus(false);
				})
				.catch(error => {
					console.log(error);
					setErrorMessage(error.response.data.message);
					setLoadingStatus(false);
				});
		}
		getAllNotes();
	}, [noteData]);

	async function editNote(
		note_id: string,
		noteTitle: string,
		noteBody: string
	) {
		setLoadingStatus(true);
		await axios
			.patch(
				`http://localhost:4000/api/notes/${note_id}/edit`,
				{
					note_title: noteTitle,
					note_content: noteBody
				},
				{
					withCredentials: true
				}
			)
			.then(response => {
				if (response.status === 200) {
					window.location.href = `http://localhost:5174/note/${response.data._id}`;
					setLoadingStatus(false);
				}
			})
			.catch(error => {
				setErrorMessage(error.response.data.message);
				setLoadingStatus(false);
			});
	}

	function clearErrorMessage() {
		setErrorMessage("");
	}

	return {
		postNote,
		getNoteData,
		noteData,
		loadingStatus,
		allNotesData,
		deleteNote,
		editNote,
		errorMessage,
		clearErrorMessage
	};
}
