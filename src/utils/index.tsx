import moment from 'moment';
import { nanoid } from 'nanoid';
import { Message } from '../interface/IMessage';

function createExampleMessage(index: number): Message {
	const time = moment().format('YYYY-MM-DD HH:mm:ss');
	const exampleMessage: Message = {
		index,
		author: 'me',
		messageReply: {
			index: -1,
			idReply: '',
		},
		message: { type: 'text', textContent: `Example Textcontent ${time}` },
		id: nanoid(5),
		time: { type: 'auto', value: time },
		emoji: {
			show: false,
		},
	};
	return exampleMessage;
}

export { createExampleMessage };
