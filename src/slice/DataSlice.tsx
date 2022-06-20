import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment';
import { nanoid } from 'nanoid';
import { listMessage } from '../data/data';
import { Message } from '../interface/IMessage';
interface IChangeMessage {
	id: string;
	data: Message;
}
interface IAddMessage {
	index?: number;
	data: Message;
}
interface IRandomTime {
	startTime: string;
	stepTime: number;
}
interface IImportMessageList {
	data: [] | Message[];
}

export const exampleMessageList: Message[] = [
	{
		index: 0,
		id: nanoid(5),
		messageReply: {
			idReply: '',
			index: -1,
		},
		author: 'me',
		message: {
			type: 'text',
			textContent: 'Example content',
		},
		time: {
			type: 'auto',
			value: moment().format('YYYY-MM-DD HH:mm:ss'),
		},
	},
];

const initData: Message[] = localStorage.getItem('messageList') ? JSON.parse(localStorage.getItem('messageList')) : listMessage;

const messageListSlice = createSlice({
	name: 'messageList',
	initialState: { data: initData },
	reducers: {
		importMessageList(state, action: PayloadAction<IImportMessageList>) {
			state.data = action.payload.data;
		},
		addMessage(state, action: PayloadAction<IAddMessage>) {
			if (action.payload.index >= 0) {
				state.data.splice(action.payload.index, 0, { ...action.payload.data });
			} else {
				state.data.push({ ...action.payload.data, id: nanoid(5), index: state.data.length + 1 });
			}
		},
		removeMessageByIndex(state, action: PayloadAction<number>) {
			state.data.splice(action.payload, 1);
		},
		changeMessageById(state, action: PayloadAction<IChangeMessage>) {
			const { payload } = action;
			const index = state.data.findIndex(e => e.id === payload.id);
			state.data[index] = payload.data;
		},
		setRandomTime(state, action: PayloadAction<IRandomTime>) {
			const startTime = moment(action.payload.startTime);
			let randomTime = action.payload.stepTime;
			state.data.forEach(element => {
				const newTime = startTime.add(randomTime, 's').format('YYYY-MM-DD HH:mm:ss');
				element.time.value = newTime;
				randomTime = randomNumber(100, action.payload.stepTime);
			});
		},
	},
});

function randomNumber(min: number, max: number) {
	return Math.round(Math.random() * (max - min)) + min;
}
export const { addMessage, removeMessageByIndex, changeMessageById, setRandomTime, importMessageList } = messageListSlice.actions;
export default messageListSlice.reducer;
