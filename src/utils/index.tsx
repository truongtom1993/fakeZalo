import moment from 'moment';
import { Comment } from '../interface/IComment';

function createExampleComment(): Comment {
	const exampleComment: Comment = {
		author: 'me',
		comment: { type: 'text', textContent: `Example Textcontent ${Math.random()}` },
		id: '',
		time: { type: 'right', value: moment().format('YYYY-MM-DD HH:mm:ss') },
		emoji: {
			show: false,
		},
	};
	return exampleComment;
}

export { createExampleComment };
