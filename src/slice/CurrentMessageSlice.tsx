import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment';
import { Author, Message, MessageType } from '../interface/IMessage';

export interface ICurrentMessageReply {
	type?: string;
	idReply: string | undefined;
	index: number;
	data?: IMessageReply;
}
export interface IMessageReply {
	author: Author;
	message: MessageType;
}

export const exampleCurrentMessageReply: ICurrentMessageReply = {
	idReply: '',
	index: -1,
};
export const exampleCurrentMessage: Message = {
	index: -1,
	id: 'abcde',
	messageReply: {
		idReply: '',
		index: -1,
	},
	author: 'me',
	message: {
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

const currentMessage = localStorage.getItem('currentMessage');

const initCurrentMessage: Message = currentMessage ? JSON.parse(currentMessage) : exampleCurrentMessage;

const currentMessageSlice = createSlice({
	name: 'currentMessage',
	initialState: {
		currentMessage: initCurrentMessage,
		currentMessageReply: exampleCurrentMessageReply,
	},
	reducers: {
		importCurrentMessage(state, action: PayloadAction<any>) {
			state.currentMessage = action.payload.currentMessage;
			state.currentMessageReply = action.payload.currentMessageReply;
		},
		changeCurrentMessage(state, action: PayloadAction<Message>) {
			state.currentMessage = action.payload;
		},
		changeCurrentMessageReply(state, action: PayloadAction<ICurrentMessageReply>) {
			state.currentMessageReply = action.payload;
		},
	},
});
export const { changeCurrentMessage, changeCurrentMessageReply, importCurrentMessage } = currentMessageSlice.actions;
export default currentMessageSlice.reducer;
