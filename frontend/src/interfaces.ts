export interface Note {
	_id: string;
	note_title: string;
	note_content: string;
	curr_uid: string;
	containsProfanity: boolean;
	createdAt: string;
	updatedAt: string;
}

export interface ContextProps {
	children: React.ReactNode;
}

export interface SessionContextData {
	currUID: string | null;
	error: string | null;
}

export interface StickyNote {
	_id: number | string;
	note_title: string;
	note_content: string;
	curr_uid: string;
	color: string;
	rotation?: string;
	createdAt: string;
	updatedAt?: string;
}

export interface ThemeContextData {
	theme: string;
	toggleTheme: () => void;
}

export interface FAQ_Interface {
	question: string;
	answer: string;
}

export interface NoteHandlers {
	postNote: (note_title: string, note_content: string) => void;
	getNoteData: (note_id: string) => void;
	noteData: Note | undefined;
	loadingStatus: boolean;
	allNotesData: Note[];
	deleteNote: (note_id: string) => void;
	editNote: (note_id: string, noteTitle: string, noteBody: string) => void;
	errorMessage: string;
	clearErrorMessage: () => void;
	numPages: number;
	totalNotes: number;
	formLoadingStatus: boolean;
	errorMessageNV: string;
}

export interface StickyNoteHandlers {
	stickyNotes: StickyNote[];
	saveStickyNoteData: (
		stickyNoteTempID: string | number,
		stickyNoteTitle: string,
		stickyNoteBody: string,
		stickyNoteColor: string,
		stickyNoteRotation: string
	) => void;
	editStickyNote: (
		stickyNoteID: string | number,
		stickyNoteTitle: string,
		stickyNoteBody: string,
		stickyNoteColor: string
	) => void;
	deleteStickyNote: (note_id: string | number) => void;
	errorMessage: string;
	loading: boolean;
}

export interface StickyNoteProps {
	stickyNote: StickyNote;
	allowNewNote: () => void;
	handleDelete: (note_id: string | number) => void;
	alreadyExists: (note_id?: string | number) => void;
	noteExists: boolean;
	toggleModal: () => void;
}

export interface PaginationProps {
	totalNotes: number;
	pageNumber: string | null;
	numPages: number;
	numButtons: number[];
}

export interface ModalProps {
	heading: string;
	children: React.ReactNode;
	modalType: string;
	toggleModal: () => void;
	noteID?: string | number;
	modalFor: string;
	handleStickyNoteDeletion?: (noteID: string | number) => void;
}
