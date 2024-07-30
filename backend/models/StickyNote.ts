import { InferSchemaType, Schema, model } from "mongoose";

const stickyNoteSchema = new Schema(
	{
		note_title: {
			type: String,
			required: true
		},
		note_content: {
			type: String,
			required: true
		},
		curr_uid: {
			type: String
		},
		color: {
			type: String,
			default: "yellow"
		}
	},
	{
		timestamps: true
	}
);

type StickyNote = InferSchemaType<typeof stickyNoteSchema>;
export default model<StickyNote>("StickyNote", stickyNoteSchema);
