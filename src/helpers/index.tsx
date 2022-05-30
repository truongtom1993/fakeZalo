import { IData } from '../component/form/FormAnt';
import { Comment, CommentType } from '../interface/IComment';

const converDataFormToComment: Comment = (data: IData) => {
	const comment: CommentType = { type: data.commentType };
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
	};
};

const converCommentToDataForm = (comment: Comment) => {};
