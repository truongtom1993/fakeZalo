import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { listComment } from '../data/data';
import { Comment } from '../interface/IComment';
interface IChangeComment {
	id: string;
	data: any;
}

const initData: Comment[] = localStorage.getItem('commentList') ? JSON.parse(localStorage.getItem('commentList')) : listComment;

const commentListSlice = createSlice({
	name: 'commentList',
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
