import { configureStore } from '@reduxjs/toolkit';
import messageListReducer from '../slice/DataSlice';
import profileReducer from '../slice/ProfileSlice';
import currentMessageReducer from '../slice/CurrentMessageSlice';

export const store = configureStore({
	reducer: {
		messageListReducer,
		profileReducer,
		currentMessageReducer,
	},
});

function setLocal(key: string, value: object) {
	localStorage.setItem(key, JSON.stringify(value));
}

window.addEventListener('beforeunload', function (e) {
	const state = store.getState();

	const messageList = state.messageListReducer.data;
	const profile = state.profileReducer.profile;
	const currentMessage = state.currentMessageReducer.currentMessage;

	setLocal('messageList', messageList);
	setLocal('profile', profile);
	setLocal('currentMessage', currentMessage);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
