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

export interface ContextData {
	currUID: string | null;
	error: string | null;
}

export interface StickyNote {
	_id: string;
	note_title: string;
	note_content: string;
	curr_uid?: string;
	color: string;
}
