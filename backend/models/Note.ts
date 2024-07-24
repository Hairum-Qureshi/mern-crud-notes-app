import mongoose, { InferSchemaType, Schema, model } from "mongoose";

const noteSchema = new Schema(
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
			type: String,
			required: true
		},
		containsProfanity: {
			type: Boolean,
			default: false
		}
	},
	{
		timestamps: true
	}
);

type Note = InferSchemaType<typeof noteSchema>;
export default model<Note>("Note", noteSchema);
