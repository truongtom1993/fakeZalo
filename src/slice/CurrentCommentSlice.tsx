import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment';
import { nanoid } from 'nanoid';
import { Comment, Emoji } from '../interface/IComment';

const currentComment = localStorage.getItem('currentComment');

const initCurrentComment: Comment = currentComment
	? JSON.parse(currentComment)
	: {
			id: nanoid(5),
			idReply: '',
			author: 'me',
			comment: {
				type: 'text',
				textContent: '',
			},
			time: {
				type: null,
				value: moment().format('YYYY-MM-DD HH:mm:ss'),
			},
			emoji: {
				show: false,
				type: null,
				number: 0,
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
