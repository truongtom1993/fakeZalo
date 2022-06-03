import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import { listComment } from '../data/data';
import { Comment } from '../interface/IComment';
interface IChangeComment {
	id: string;
	data: any;
}
interface IAddComment {
	index?: number;
	data: Comment;
}

const initData: Comment[] = localStorage.getItem('commentList') ? JSON.parse(localStorage.getItem('commentList')) : listComment;

const commentListSlice = createSlice({
	name: 'commentList',
	initialState: { data: initData },
	reducers: {
		addComment(state, action: PayloadAction<IAddComment>) {
			if (action.payload.index >= 0) {
				state.data.splice(action.payload.index, 0, { ...action.payload.data, id: nanoid(5) });
			} else {
				state.data.push({ ...action.payload.data, id: nanoid(5) });
			}
		},
		removeCommentByIndex(state, action: PayloadAction<number>) {
			state.data.splice(action.payload, 1);
		},
		changeCommentById(state, action: PayloadAction<IChangeComment>) {
			const { payload } = action;
			const index = state.data.findIndex(e => e.id === payload.id);
			state.data.splice(index, 1, payload.data);
		},
	},
});
export const { addComment, removeCommentByIndex, changeCommentById } = commentListSlice.actions;
export default commentListSlice.reducer;
