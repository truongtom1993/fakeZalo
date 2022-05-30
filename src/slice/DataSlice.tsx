import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { listComment as data } from '../data/data';
import { Comment } from '../interface/IComment';
interface IChangeComment {
	id: string;
	data: Comment;
}

const initData: Comment[] = localStorage.getItem('commentList') ? JSON.parse(localStorage.getItem('commentList')) : data;

const commentListSlice = createSlice({
	name: 'listComment',
	initialState: { data: initData },
	reducers: {
		pushData(state, action: PayloadAction<Comment>) {
			state.data.push(action.payload);
		},
		changeCommentById(state, action: PayloadAction<IChangeComment>) {
			const { payload } = action;
			const index = state.data.findIndex(e => e.id === payload.id);
			state.data.splice(index, 1, payload.data);
		},
	},
});
export const { pushData, changeCommentById } = commentListSlice.actions;
export default commentListSlice.reducer;
