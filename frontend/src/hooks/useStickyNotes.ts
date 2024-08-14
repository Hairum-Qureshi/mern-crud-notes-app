import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { StickyNote } from "../interfaces";

interface StickyNoteHandlers {
	stickyNotes: StickyNote[];
	saveStickyNoteData: (
		stickyNoteTempID: string,
		stickyNoteTitle: string,
		stickyNoteBody: string,
		stickyNoteColor: string,
		stickyNoteRotation: string
	) => void;
	editStickyNote: (
		stickyNoteID: string,
		stickyNoteTitle: string,
		stickyNoteBody: string,
		stickyNoteColor: string
	) => void;
	deleteStickyNote: (note_id: string) => void;
}

export default function useStickyNotes(): StickyNoteHandlers {
	const [stickyNotes, setStickyNotes] = useState<StickyNote[]>([]);

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

	useEffect(() => {
		getAllStickyNotes();
	}, []);

	function saveStickyNoteData(
		stickyNoteTempID: string,
		stickyNoteTitle: string,
		stickyNoteBody: string,
		stickyNoteColor: string,
		stickyNoteRotation: string
	) {
		axios
			.post(
				"http://localhost:4000/api/sticky-notes/create",
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
				console.log(error);
			});
	}

	async function editStickyNote(
		stickyNoteID: string,
		stickyNoteTitle: string,
		stickyNoteBody: string,
		stickyNoteColor: string
	) {
		await axios
			.patch(
				`http://localhost:4000/api/sticky-notes/${stickyNoteID}/edit`,
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
				console.log(error);
			});
	}

	function deleteStickyNote(note_id: string) {}

	return {
		stickyNotes,
		saveStickyNoteData,
		editStickyNote,
		deleteStickyNote
	};
}

// export default function useStickyNotes(): StickyNoteHandlers {
// 	const [stickyNotes, setStickyNotes] = useState<StickyNote[]>([]);

// useEffect(() => {
// 	async function getAllStickyNotes() {
// 		axios
// 			.get("http://localhost:4000/api/sticky-notes/all")
// 			.then(response => {
// 				console.log(response.data);
// 				setStickyNotes(response.data);
// 			})
// 			.catch(error => {
// 				console.error(error);
// 			});
// 	}
// 	getAllStickyNotes();
// }, []);

// 	async function saveStickyNoteData(
// 		stickyNoteTitle: string,
// 		stickyNoteBody: string,
// 		stickyNoteColor: string,
// 		stickyNoteRotation: string
// 	) {
// 		if (stickyNoteTitle && stickyNoteBody && stickyNoteColor) {
// axios
// 	.post(
// 		"http://localhost:4000/api/sticky-notes/create",
// 		{
// 			stickyNoteTitle,
// 			stickyNoteBody,
// 			stickyNoteColor,
// 			stickyNoteRotation
// 		},
// 		{
// 			withCredentials: true
// 		}
// 	)
// 	.then(response => {
// 		setStickyNotes(prev => [response.data, ...prev]);
// 	})
// 	.catch(error => {
// 		console.log(error);
// 	});
// 		}
// 	}

// 	async function editStickyNote(
// 		stickyNoteID: string,
// 		stickyNoteTitle: string,
// 		stickyNoteBody: string,
// 		stickyNoteColor: string
// 	) {
// 		if (!stickyNoteTitle || !stickyNoteBody) {
// 			alert("Please make sure your sticky note has a title and body");
// 		} else {
// await axios
// 	.patch(
// 		`http://localhost:4000/api/sticky-notes/${stickyNoteID}/edit`,
// 		{
// 			stickyNoteTitle,
// 			stickyNoteBody,
// 			stickyNoteColor
// 		},
// 		{
// 			withCredentials: true
// 		}
// 	)
// 	.then(response => {
// 		// TODO - I think here you'll need to append it back to the array of sticky notes and replace the one you updated
// 		console.log(response.data);
// 	})
// 	.catch(error => {
// 		console.log(error);
// 	});
// 		}
// 	}

// 	async function deleteStickyNote(note_id: string) {
// 		await axios
// 			.delete(`http://localhost:4000/api/sticky-notes/${note_id}`, {
// 				withCredentials: true
// 			})
// 			.then(() => {
// 				setStickyNotes(prev => prev.filter(note => note._id !== note_id));
// 				console.log("delete 1", stickyNotes);
// 			})
// 			.catch(error => {
// 				// handles case where the user wants to delete a sticky note before refreshing the page
// 				console.log(error.response.data.message);
// 				if (error.response.data.message === "Invalid sticky note ID") {
// 					setStickyNotes(prev => prev.filter(note => note._id !== note_id));
// 					console.log("delete 2", stickyNotes);
// 				}
// 			});
// 	}

// 	return {
// 		stickyNotes,
// 		saveStickyNoteData,
// 		editStickyNote,
// 		deleteStickyNote
// 	};
// }
