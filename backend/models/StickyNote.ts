import { InferSchemaType, Schema, model } from "mongoose";

const stickyNoteSchema = new Schema(
	{
		note_title: {
			type: String,
			required: true
		},
		temp_id: {
			type: String
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
			default: "bg-yellow-400"
		},
		rotation: {
			type: String,
			default: "rotate-0"
		}
	},
	{
		timestamps: true
	}
);

type StickyNote = InferSchemaType<typeof stickyNoteSchema>;
export default model<StickyNote>("StickyNote", stickyNoteSchema);
