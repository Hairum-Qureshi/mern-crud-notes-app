import axios from "axios";
import { useEffect, useState } from "react";
import { StickyNote, StickyNoteHandlers } from "../interfaces";

export default function useStickyNotes(): StickyNoteHandlers {
	const [stickyNotes, setStickyNotes] = useState<StickyNote[]>([]);
	const [errorMessage, setErrorMessage] = useState("");
	const [loading, setLoading] = useState(false);

	async function getAllStickyNotes() {
		setLoading(true);
		axios
			.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/sticky-notes/all`)
			.then(response => {
				setLoading(false);
				setStickyNotes(response.data);
			})
			.catch(error => {
				setLoading(false);
				console.log(error.response.data.message);
				setErrorMessage(error.response.data.message);
			});
	}

	useEffect(() => {
		getAllStickyNotes();
	}, []);

	function saveStickyNoteData(
		stickyNoteTempID: string | number,
		stickyNoteTitle: string,
		stickyNoteBody: string,
		stickyNoteColor: string,
		stickyNoteRotation: string
	) {
		axios
			.post(
				`${import.meta.env.VITE_BACKEND_BASE_URL}/api/sticky-notes/create`,
				{
					stickyNoteTempID,
					stickyNoteTitle,
					stickyNoteBody,
					stickyNoteColor,
					stickyNoteRotation
				},
				{
					withCredentials: true
				}
			)
			.then(response => {
				setStickyNotes(prev => [response.data, ...prev]);
				getAllStickyNotes();
			})
			.catch(error => {
				console.log(error.response.data.message);
				setErrorMessage(error.response.data.message);
			});
	}

	async function editStickyNote(
		stickyNoteID: string | number,
		stickyNoteTitle: string,
		stickyNoteBody: string,
		stickyNoteColor: string
	) {
		await axios
			.patch(
				`${
					import.meta.env.VITE_BACKEND_BASE_URL
				}/api/sticky-notes/${stickyNoteID}/edit`,
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
				// TODO - I think here you'll need to append it back to the array of sticky notes and replace the one you updated
				// this.setState(prevState => ({       data: prevState.data.map(el => (el.id === id ? { ...el, text } : el)) }))
				setStickyNotes(prevStickyNotes =>
					prevStickyNotes.map((stickyNote: StickyNote) =>
						stickyNote._id === response.data._id
							? {
									...stickyNote,
									...response.data
							  }
							: stickyNote
					)
				);
			})
			.catch(error => {
				console.log(error.response.data.message);
				setErrorMessage(error.response.data.message);
			});
	}

	async function deleteStickyNote(note_id: string | number) {
		await axios
			.delete(
				`${import.meta.env.VITE_BACKEND_BASE_URL}/api/sticky-notes/${note_id}`,
				{
					withCredentials: true
				}
			)
			.then(() => {
				setStickyNotes(prev => prev.filter(note => note._id !== note_id));
			})
			.catch(error => {
				console.log(error.response.data.message);
				setErrorMessage(error.response.data.message);
			});
	}

	return {
		stickyNotes,
		saveStickyNoteData,
		editStickyNote,
		deleteStickyNote,
		errorMessage,
		loading
	};
}
