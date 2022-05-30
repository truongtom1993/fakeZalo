import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment, Emoji } from '../interface/IComment';

const currentComment = localStorage.getItem('currentComment');

const initCurrentComment: Comment = currentComment
	? JSON.parse(currentComment)
	: {
			id: 'dscxc3ref',
			idReply: '',
			author: 'me',
			comment: {
				type: 'text',
				textContent: 'lorem',
			},
			time: {
				type: 'right',
				value: '1993-01-03 15:31:59',
			},
			emoji: {
				show: true,
				type: Emoji.Heart,
				number: 1,
			},
			separate: {
				show: false,
			},
	  };

const currentCommentSlice = createSlice({
	name: 'currentComment',
	initialState: { currentComment: initCurrentComment },
	reducers: {
		changeCurrentComment(state, action: PayloadAction<Comment>) {
			state.currentComment = action.payload;
		},
	},
});
export const { changeCurrentComment } = currentCommentSlice.actions;
export default currentCommentSlice.reducer;
