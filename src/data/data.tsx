import { nanoid } from 'nanoid';
import { Comment, Emoji, Profile } from '../interface/IComment';

const listComment: Comment[] = [
	{
		id: nanoid(4),
		author: 'me',
		comment: {
			type: 'image',
			imageUrl: 'https://i.postimg.cc/BvbVH4V1/test-screenshot.jpg',
		},
		time: {
			value: '14:05:28, 25/5/2022',
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
			textContent:
				'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste voluptates illum officiis dignissimos iure dolor sit, quo ipsum! Dolorem quam consectetur aut. Ex quo optio corrupti eius? Tempore debitis ut ipsum ullam nemo eum, eaque sed et culpa adipisci fuga modi fugiat eveniet magni deleniti quam dolor iure dignissimos eius vel vero cum, deserunt earum ducimus! Aperiam vero adipisci aut voluptatum at quisquam, culpa veritatis vel ratione autem iste, nihil laudantium fugit magnam? Quas veritatis maiores, veniam voluptates doloribus corporis aspernatur nisi eos aut dolorum animi, voluptatibus dolores obcaecati ea voluptas iusto eius omnis voluptatem. Sint reiciendis ea perspiciatis vel!',
		},
		time: {
			type: 'right',
			value: '14:05:28, 25/5/2022',
		},
	},
	{
		id: nanoid(4),
		author: 'you',
		comment: {
			type: 'text',
			textContent: 'Xin cảm ơn rất nhiều',
		},
		time: {
			value: '14:05:28, 25/5/2022',
		},
	},
	{
		id: nanoid(4),
		author: 'you',
		comment: {
			type: 'record',
			recordDuration: 20,
		},
		time: {
			type: 'left',
			value: '14:05:28, 25/5/2022',
		},
	},
	{
		id: nanoid(4),
		author: 'you',
		comment: {
			type: 'call',
			callType: 'incomming',
			callDuration: 15,
		},
		time: {
			value: '14:05:28, 25/5/2022',
		},
	},
];

export { listComment };
