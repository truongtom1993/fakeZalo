import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Comment, Emoji } from "../interface/IComment";

const data: Comment[] = [
	{
		id: "dfdsf",
		author: "you",
		comment: {
			type: "text",
			content: "",
		},
		time: {
			type: "center",
			value: new Date(),
		},
		emoji: {
			show: false,
			type: Emoji.Like,
			number: 1,
		},
		separate: {
			show: false,
			time: new Date(),
		},
		reply: {
			show: false,
			idComment: "",
		},
	},
];

const listComment = createSlice({
	name: "listComment",
	initialState: {
		data,
	},
	reducers: {
		pushData(state, action: PayloadAction<Comment>) {
			state.data.push(action.payload)
		},
	},
});
export const { pushData } = listComment.actions;
export default listComment.reducer;
