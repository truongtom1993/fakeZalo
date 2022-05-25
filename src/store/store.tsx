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

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
