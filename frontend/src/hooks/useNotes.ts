import axios from "axios";

interface NoteHandlers {
	postNote: (note_title: string, note_content: string) => void;
}

export default function useNotes(): NoteHandlers {
	function postNote(note_title: string, note_content: string) {
		if (!note_title) {
			alert("Please enter a title for your note");
		} else {
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
				.then(response => console.log(response.data))
				.catch(error => console.log(error));
		}
	}

	return { postNote };
}
