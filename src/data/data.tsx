import { nanoid } from 'nanoid';
import { Comment, Emoji, Profile } from '../interface/IComment';

const listComment: Comment[] = [
	{
		id: nanoid(4),
		author: 'me',
		comment: {
			type: 'image',
			url: 'src/assets/img/test-screenshot.jpg',
		},
		time: {
			value: new Date().toLocaleString(),
		},
		emoji: {
			show: true,
			type: Emoji.Heart,
			number: 2,
		},
	},
	{
		id: nanoid(4),
		author: 'me',
		comment: {
			type: 'text',
			content:
				'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste voluptates illum officiis dignissimos iure dolor sit, quo ipsum! Dolorem quam consectetur aut. Ex quo optio corrupti eius? Tempore debitis ut ipsum ullam nemo eum, eaque sed et culpa adipisci fuga modi fugiat eveniet magni deleniti quam dolor iure dignissimos eius vel vero cum, deserunt earum ducimus! Aperiam vero adipisci aut voluptatum at quisquam, culpa veritatis vel ratione autem iste, nihil laudantium fugit magnam? Quas veritatis maiores, veniam voluptates doloribus corporis aspernatur nisi eos aut dolorum animi, voluptatibus dolores obcaecati ea voluptas iusto eius omnis voluptatem. Sint reiciendis ea perspiciatis vel!',
		},
		time: {
			type: 'right',
			value: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' }),
		},
	},
	{
		id: nanoid(4),
		author: 'you',
		comment: {
			type: 'text',
			content: 'Xin cảm ơn rất nhiều',
		},
		time: {
			value: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' }),
		},
	},
	{
		id: nanoid(4),
		author: 'you',
		comment: {
			type: 'record',
			duration: 20,
		},
		time: {
			type: 'left',
			value: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' }),
		},
	},
	{
		id: nanoid(4),
		author: 'you',
		comment: {
			type: 'call',
			callType: 'incomming',
			duration: 15,
		},
		time: {
			value: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' }),
		},
	},
];

const profile: Profile = {
	name: 'Người lạ',
	status: 6 * 60,
	avatar: 'src/assets/img/avatar.png',
};

export { listComment, profile };
