import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import { Comment, Emoji } from '../interface/IComment';

const data: Comment[] = [
	{
		id: nanoid(4),
		author: 'you',
		comment: {
			type: 'text',
			content: 'lorem ipsum',
		},
		time: {
			type: 'center',
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
			idComment: '',
		},
	},
];

const listComment = createSlice({
	name: 'listComment',
	initialState: {
		data,
	},
	reducers: {
		pushData(state, action: PayloadAction<Comment>) {
			state.data.push(action.payload);
		},
		changeCommentById(state, action: PayloadAction<Comment>) {},
	},
});
export const { pushData } = listComment.actions;
export default listComment.reducer;
