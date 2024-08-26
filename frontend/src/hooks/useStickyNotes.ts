import axios from "axios";
import { useEffect, useState } from "react";
import { StickyNote, StickyNoteHandlers } from "../interfaces";
import { useQuery } from "@tanstack/react-query";

export default function useStickyNotes(): StickyNoteHandlers {
	const [stickyNotes, setStickyNotes] = useState<StickyNote[]>([]);
	const [errorMessage, setErrorMessage] = useState("");
	const [loading, setLoading] = useState(false);

	const stickyNotesQuery = useQuery({
		queryKey: ["sticky-notes"],
		queryFn: async () => {
			try {
				const response = await axios.get(
					`${import.meta.env.VITE_BACKEND_BASE_URL}/api/sticky-notes/all`
				);
				setStickyNotes(response.data);
				return response;
			} catch (error) {
				setErrorMessage((error as Error).message);
			}
		}
	});

	useEffect(() => {
		setLoading(stickyNotesQuery.isLoading);
	}, [stickyNotes]);

	async function saveStickyNoteData(
		stickyNoteTempID: string | number,
		stickyNoteTitle: string,
		stickyNoteBody: string,
		stickyNoteColor: string,
		stickyNoteRotation: string
	) {
		await axios
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
			})
			.catch(error => {
				if (error.response.status === 429) {
					setErrorMessage("Too many requests. Please try again later.");
				} else {
					console.log(error.response.data.message);
					setErrorMessage(error.response.data.message);
				}
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
