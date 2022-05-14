import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../interface/IComment';
const currentComment: Comment | {} = {};

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
