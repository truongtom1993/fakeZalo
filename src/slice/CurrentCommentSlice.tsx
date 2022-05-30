import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment, Emoji } from '../interface/IComment';

const initCurrentComment: Comment = localStorage.getItem('currentComment')
	? JSON.parse(localStorage.getItem('currentComment'))
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
