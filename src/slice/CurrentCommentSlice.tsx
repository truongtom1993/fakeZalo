import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment, Emoji } from '../interface/IComment';
const currentComment: Comment = {
	id: 'dscxc3ref',
	author: 'me',
	comment: {
		type: 'text',
		content: 'lorem',
	},
	time: {
		type: 'right',
		value: '1653535848685',
	},
	emoji: {
		show: true,
		type: Emoji.Heart,
		number: 1,
	},
	separate: {
		show: false,
	},
	reply: {
		show: false,
	},
};

const currentCommentSlice = createSlice({
	name: 'currentComment',
	initialState: { currentComment },
	reducers: {
		changeCurrentComment(state, action: PayloadAction<Comment>) {
			state.currentComment = action.payload;
		},
	},
});
export const { changeCurrentComment } = currentCommentSlice.actions;
export default currentCommentSlice.reducer;
