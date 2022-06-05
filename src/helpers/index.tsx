import moment from 'moment';
import { IDataForm } from '../component/form/FormAnt';
import { Comment, CommentType, Emoji } from '../interface/IComment';
import { ICommentReply, ICurrentCommentReply } from '../slice/CurrentCommentSlice';

export const converDataFormToComment = (data: IDataForm, currentCommentReply: ICurrentCommentReply): Comment => {
	const comment: CommentType | object = { type: data.commentType };
	switch (data.commentType) {
		case 'text':
			Object.assign(comment, { textContent: data.textContent });
			break;
		case 'call':
			Object.assign(comment, { callType: data.callType, callDuration: data.callDuration });
			break;
		case 'image':
			Object.assign(comment, { imageUrl: data.imageURL });
			break;
		case 'record':
			Object.assign(comment, { recordDuration: data.recordDuration });
			break;
	}

	return {
		index: data.index,
		id: data.idComment,
		commentReply: currentCommentReply,
		author: data.user,
		comment: comment as CommentType,
		time: {
			type: data.timeType,
			value: typeof data.timeValue === 'object' ? data.timeValue?.format('YYYY-MM-DD HH:mm:ss') : '',
		},
		emoji: {
			show: data.emoji ? true : false,
			type: data.emoji as Emoji,
			number: data.numberEmoji,
		},
	};
};

export const converCommentToDataForm = (data: Comment): IDataForm => {
	const timeValue = data.time?.value;
	const result = {
		index: data.index,
		user: data?.author,
		idComment: data?.id || '',
		idReply: data?.commentReply.idReply,
		timeType: data?.time?.type || null,
		timeValue: moment(new Date(timeValue)),
		emoji: data?.emoji?.type || void 0,
		numberEmoji: data?.emoji?.number || void 0,
		commentType: data?.comment?.type,
		textContent: '',
		imageURL: '',
		callType: '',
		callDuration: '',
		recordDuration: '',
	};
	switch (data.comment.type) {
		case 'text':
			result.textContent = data.comment.textContent || '';
			break;
		case 'image':
			result.imageURL = data.comment?.imageUrl || '';
			break;
		case 'call':
			result.callType = data.comment.callType || '';
			result.callDuration = data.comment.callDuration.toString() || '';
			break;
		case 'record':
			result.recordDuration = data.comment.recordDuration.toString() || '';
			break;
		default:
			break;
	}
	return result;
};

export const convertToShortenTime = (value: string) => {
	const timeSplit = value.split(':');
	const minute = timeSplit[1];
	const hour = timeSplit[0].split(' ').at(-1);
	let result = `${Number.parseInt(hour)}:${minute}`;
	return result;
};

export const convertCommentToCommentReply = (data: Comment, index: number): ICurrentCommentReply => {
	return {
		idReply: data.id,
		index,
		data: {
			author: data.author,
			comment: data.comment,
		},
	};
};
