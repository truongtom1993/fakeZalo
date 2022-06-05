import moment from 'moment';
import { nanoid } from 'nanoid';
import { Comment } from '../interface/IComment';

function createExampleComment(index: number): Comment {
	const time = moment().format('YYYY-MM-DD HH:mm:ss');
	const exampleComment: Comment = {
		index,
		author: 'me',
		commentReply: {
			index: -1,
			idReply: '',
		},
		comment: { type: 'text', textContent: `Example Textcontent ${time}` },
		id: nanoid(5),
		time: { type: 'auto', value: time },
		emoji: {
			show: false,
		},
	};
	return exampleComment;
}

export { createExampleComment };
