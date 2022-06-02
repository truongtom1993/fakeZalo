import { IData } from '../component/form/FormAnt';
import { Comment, CommentType } from '../interface/IComment';

export const converDataFormToComment = (data: IData): any => {
	const comment: CommentType | object = { type: data.commentType };
	switch (data.commentType) {
		case 'text':
			Object.assign(comment, { textContent: data.textContent });
			break;
		case 'call':
			Object.assign(comment, { callDuration: data.callDuration, callType: data.callType });
			break;
		case 'image':
			Object.assign(comment, { imageUrl: data.imageURL });
			break;
		case 'record':
			Object.assign(comment, { recordDuration: data.recordDuration });
			break;
		default:
			break;
	}

	return {
		id: data.idComment,
		idReply: data.idReply,
		author: data.user,
		comment,
		time: {
			type: data.timeLocation,
			value: data.timeValue ? data.timeValue?.format('YYYY-MM-DD HH:mm:ss') : '',
		},
		emoji: {
			show: data.emoji ? true : false,
			type: data.emoji,
			number: data.numberEmoji,
		},
		separate: {
			time: data.separateTimeValue,
			show: data.separateTimeValue ? true : false,
		},
	};
};

export const convertToShortenTime = (value: string) => {
	const timeSplit = value.split(':');
	const minute = timeSplit[1];
	const hour = timeSplit[0].split(' ').at(-1);
	let result = `${Number.parseInt(hour)}:${minute}`;
	return result;
};

export const converCommentToDataForm = (comment: Comment) => {};
