import moment from 'moment';
import { nanoid } from 'nanoid';
import { Message, Emoji, Profile } from '../interface/IMessage';

const listMessage: Message[] = [
	{
		index: 0,
		id: nanoid(5),
		messageReply: {
			idReply: '',
			index: -1,
		},
		author: 'me',
		message: {
			type: 'image',
			imageUrl:
				'https://images.unsplash.com/photo-1654293998081-9deefc0b27b3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
		},
		time: {
			type: 'auto',
			value: moment().format('YYYY-MM-DD HH:mm:ss'),
		},
		emoji: {
			show: true,
			type: Emoji.Heart,
			number: 2,
		},
	},
	{
		index: 1,
		id: nanoid(5),
		messageReply: {
			idReply: '',
			index: -1,
		},
		author: 'me',
		message: {
			type: 'text',
			textContent:
				'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste voluptates illum officiis dignissimos iure dolor sit, quo ipsum! Dolorem quam consectetur aut. Ex quo optio corrupti eius? Tempore debitis ut ipsum ullam nemo eum, eaque sed et culpa adipisci fuga modi fugiat eveniet magni deleniti quam dolor iure dignissimos eius vel vero cum, deserunt earum ducimus! Aperiam vero adipisci aut voluptatum at quisquam, culpa veritatis vel ratione autem iste, nihil laudantium fugit magnam? Quas veritatis maiores, veniam voluptates doloribus corporis aspernatur nisi eos aut dolorum animi, voluptatibus dolores obcaecati ea voluptas iusto eius omnis voluptatem. Sint reiciendis ea perspiciatis vel!',
		},
		time: {
			type: 'auto',
			value: moment().format('YYYY-MM-DD HH:mm:ss'),
		},
	},
	{
		index: 2,
		id: nanoid(5),
		messageReply: {
			idReply: '',
			index: -1,
		},
		author: 'you',
		message: {
			type: 'text',
			textContent: 'Xin cảm ơn rất nhiều',
		},
		time: {
			type: 'auto',
			value: moment().format('YYYY-MM-DD HH:mm:ss'),
		},
	},
	{
		index: 3,
		id: nanoid(5),
		messageReply: {
			idReply: '',
			index: -1,
		},
		author: 'you',
		message: {
			type: 'record',
			recordDuration: 20,
		},
		time: {
			type: 'auto',
			value: moment().format('YYYY-MM-DD HH:mm:ss'),
		},
	},
	{
		index: 4,
		id: nanoid(5),
		messageReply: {
			idReply: '',
			index: -1,
		},
		author: 'you',
		message: {
			type: 'call',
			callType: 'incomming',
			callDuration: 15,
		},
		time: {
			type: 'auto',
			value: moment().format('YYYY-MM-DD HH:mm:ss'),
		},
	},
];

export { listMessage };
