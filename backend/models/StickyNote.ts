import { InferSchemaType, Schema, model } from "mongoose";

const stickyNoteSchema = new Schema({
	note_title: {
		type: String,
		default: "Untitled Note"
	},
	note_content: {
		type: String
	},
	curr_uid: {
		type: String,
		required: true
	},
	color: {
		type: String,
		default: "yellow"
	}
});

type StickyNote = InferSchemaType<typeof stickyNoteSchema>;
export default model<StickyNote>("StickyNote", stickyNoteSchema);
