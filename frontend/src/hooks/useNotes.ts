import axios from "axios";
import { useEffect, useState } from "react";
import { Note, NoteHandlers } from "../interfaces";
import { useSearchParams } from "react-router-dom";

export default function useNotes(): NoteHandlers {
	const [noteData, setNoteData] = useState<Note | undefined>();
	const [loadingStatus, setLoadingStatus] = useState(false);
	const [formLoadingStatus, setFormLoadingStatus] = useState(false);
	const [allNotesData, setAllNotesData] = useState<Note[]>([]);
	const [errorMessage, setErrorMessage] = useState("");
	const [errorMessageNV, setErrorMessageNV] = useState("");
	const [numPages, setNumPages] = useState(0);
	const [searchParams, setSearchParams] = useSearchParams();
	const [totalNotes, setTotalNotes] = useState(0);

	useEffect(() => {
		const timer = setTimeout(() => {
			setErrorMessage("");
		}, 1000);

		return () => clearTimeout(timer);
	}, [errorMessage]);

	async function postNote(note_title: string, note_content: string) {
		if (!note_title || !note_content) {
			setErrorMessage("Please make sure all fields are filled");
		} else if (note_title.length < 20) {
			setErrorMessage("Your title must be at least 20 characters long");
		} else if (note_content.length < 1000) {
			setErrorMessage("You must have at least 1,000 characters to make a post");
		} else {
			setFormLoadingStatus(true);
			await axios
				.post(
					`${import.meta.env.VITE_BACKEND_BASE_URL}/api/notes/create`,
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
						window.location.href = `${
							import.meta.env.VITE_FRONTEND_BASE_URL
						}/note/${response.data._id}`;
						setFormLoadingStatus(false);
					}
				})
				.catch(error => {
					if (error.response.status === 429) {
						console.log(error);
						setErrorMessage(error.response.data);
					} else {
						console.log(error);
						setErrorMessage(error.response.data.message);
					}

					setFormLoadingStatus(false);
				});
		}
	}

	async function getNoteData(note_id: string) {
		setLoadingStatus(true);
		await axios
			.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/notes/${note_id}`)
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

	async function deleteNote(note_id: string) {
		await axios
			.delete(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/notes/${note_id}`, {
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

	const pageNumber = searchParams.get("page");
	useEffect(() => {
		function getAllNotes() {
			setLoadingStatus(true);
			axios
				.get(
					`${
						import.meta.env.VITE_BACKEND_BASE_URL
					}/api/notes/all?page=${pageNumber}`
				)
				.then(response => {
					setAllNotesData(response.data.all_notes);
					setNumPages(response.data.totalPages);
					setTotalNotes(response.data.totalNotes);
					setLoadingStatus(false);
				})
				.catch(error => {
					setErrorMessageNV(error.response.data.message);
					setLoadingStatus(false);
				});
		}
		getAllNotes();
	}, [noteData, pageNumber]);

	async function editNote(
		note_id: string,
		noteTitle: string,
		noteBody: string
	) {
		if (!noteTitle || !noteBody) {
			setErrorMessage("Please make sure all fields are filled");
		} else if (noteTitle.length < 20) {
			setErrorMessage("Your title must be at least 20 characters long");
		} else if (noteBody.length < 1000) {
			setErrorMessage("You must have at least 1,000 characters to make a post");
		} else {
			setFormLoadingStatus(true);
			await axios
				.patch(
					`${import.meta.env.VITE_BACKEND_BASE_URL}/api/notes/${note_id}/edit`,
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
						window.location.href = `${
							import.meta.env.VITE_FRONTEND_BASE_URL
						}/note/${response.data._id}`;
						setFormLoadingStatus(false);
					}
				})
				.catch(error => {
					setErrorMessage(error.response.data.message);
					setFormLoadingStatus(false);
				});
		}
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
		numPages,
		totalNotes,
		formLoadingStatus,
		errorMessageNV
	};
}
