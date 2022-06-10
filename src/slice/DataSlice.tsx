import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment';
import { nanoid } from 'nanoid';
import { listComment } from '../data/data';
import { Comment } from '../interface/IComment';
interface IChangeComment {
	id: string;
	data: Comment;
}
interface IAddComment {
	index?: number;
	data: Comment;
}
interface IRandomTime {
	startTime: string;
	stepTime: number;
}
interface IImportCommentList {
	data: [] | Comment[];
}

export const exampleCommentList: Comment[] = [
	{
		index: 0,
		id: nanoid(5),
		commentReply: {
			idReply: '',
			index: -1,
		},
		author: 'me',
		comment: {
			type: 'text',
			textContent: 'Example content',
		},
		time: {
			type: 'auto',
			value: moment().format('YYYY-MM-DD HH:mm:ss'),
		},
	},
];

const initData: Comment[] = localStorage.getItem('commentList') ? JSON.parse(localStorage.getItem('commentList')) : listComment;

const commentListSlice = createSlice({
	name: 'commentList',
	initialState: { data: initData },
	reducers: {
		importCommentList(state, action: PayloadAction<IImportCommentList>) {
			state.data = action.payload.data;
		},
		addComment(state, action: PayloadAction<IAddComment>) {
			if (action.payload.index >= 0) {
				state.data.splice(action.payload.index, 0, { ...action.payload.data });
			} else {
				state.data.push({ ...action.payload.data, id: nanoid(5), index: state.data.length + 1 });
			}
		},
		removeCommentByIndex(state, action: PayloadAction<number>) {
			state.data.splice(action.payload, 1);
		},
		changeCommentById(state, action: PayloadAction<IChangeComment>) {
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
				randomTime += randomNumber(100, action.payload.stepTime);
			});
		},
	},
});

function randomNumber(min: number, max: number) {
	return Math.round(Math.random() * (max - min)) + min;
}
export const { addComment, removeCommentByIndex, changeCommentById, setRandomTime, importCommentList } = commentListSlice.actions;
export default commentListSlice.reducer;
