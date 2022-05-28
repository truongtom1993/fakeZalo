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

function setReducerToStorage(reducer: 'commentListReducer' | 'profileReducer' | 'currentCommentReducer') {
	localStorage.setItem(reducer, JSON.stringify(store.getState()[reducer]));
}

window.addEventListener('beforeunload', function () {});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
