import { IData } from '../component/form/FormAnt';
import { Comment, CommentType } from '../interface/IComment';

const converDataFormToComment = (data: IData) => {
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
			value: data.timeValue,
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

const converCommentToDataForm = (comment: Comment) => {};
