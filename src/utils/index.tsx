import moment from 'moment';
import { nanoid } from 'nanoid';
import { Comment } from '../interface/IComment';

function createExampleComment(): Comment {
	const exampleComment: Comment = {
		author: 'me',
		comment: { type: 'text', textContent: `Example Textcontent ${Math.random()}` },
		id: nanoid(5),
		time: { type: 'auto', value: moment().format('YYYY-MM-DD HH:mm:ss') },
		emoji: {
			show: false,
		},
	};
	return exampleComment;
}

export { createExampleComment };
