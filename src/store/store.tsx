import { configureStore } from '@reduxjs/toolkit';
import commentListReducer from '../slice/DataSlice';
import profileReducer from '../slice/ProfileSlice';
import currentCommentReducer from '../slice/CurrentCommentSlice';

export const store = configureStore({
	reducer: {
		commentListReducer,
		profileReducer,
		currentCommentReducer,
	},
});

function setLocal(key: string, value: object) {
	localStorage.setItem(key, JSON.stringify(value));
}

// window.addEventListener('beforeunload', function (e) {
// 	const state = store.getState();

// 	const commentList = state.commentListReducer.data;
// 	const profile = state.profileReducer.profile;
// 	const currentComment = state.currentCommentReducer.currentComment;

// 	setLocal('commentList', commentList);
// 	setLocal('profile', profile);
// 	setLocal('currentComment', currentComment);
// });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
