import { configureStore } from '@reduxjs/toolkit';
import commentList from '../slice/DataSlice';
import profileReducer from '../slice/ProfileSlice';
import currentCommentReducer from '../slice/CurrentCommentSlice';

export const store = configureStore({
	reducer: {
		commentList,
		profileReducer,
		currentCommentReducer,
	},
	// middleware: getDefaultMiddleware =>
	// 	getDefaultMiddleware({
	// 		serializableCheck: {
	// 			// Ignore these action types
	// 			ignoredActions: ['your/action/type'],
	// 			// Ignore these field paths in all actions
	// 			ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
	// 			// Ignore these paths in the state
	// 			ignoredPaths: ['items.dates'],
	// 		},
	// 	}),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
