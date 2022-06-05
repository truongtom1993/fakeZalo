import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment';
import { nanoid } from 'nanoid';
import { Author, Comment, CommentType, Emoji } from '../interface/IComment';

export interface ICurrentCommentReply {
	idReply: string | undefined;
	index: number;
	data?: ICommentReply;
}
export interface ICommentReply {
	author: Author;
	comment: CommentType;
}

export const exampleCurrentCommentReply: ICurrentCommentReply = {
	idReply: '',
	index: -1,
};

const currentComment = localStorage.getItem('currentComment');

const initCurrentComment: Comment = currentComment
	? JSON.parse(currentComment)
	: {
			index: -1,
			id: 'abcde',
			commentReply: {
				idReply: '',
				index: -1,
			},
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

const initCurrentCommentReply: ICurrentCommentReply = {
	idReply: '',
	index: -1,
};

const currentCommentSlice = createSlice({
	name: 'currentComment',
	initialState: {
		currentComment: initCurrentComment,
		currentCommentReply: initCurrentCommentReply,
	},
	reducers: {
		changeCurrentComment(state, action: PayloadAction<Comment>) {
			state.currentComment = action.payload;
		},
		changeCurrentCommentReply(state, action: PayloadAction<ICurrentCommentReply>) {
			state.currentCommentReply = action.payload;
		},
	},
});
export const { changeCurrentComment, changeCurrentCommentReply } = currentCommentSlice.actions;
export default currentCommentSlice.reducer;
