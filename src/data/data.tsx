import {Comment, Emoji, Profile} from '../interface/IComment'

const listComment: Comment[] = [{
	id: 'a',
	author: 'me',
	comment: {
		type: 'image',
		url: 'src/assets/img/test-screenshot.jpg',
	},
	time: {
		value: new Date()
	},
	emoji: {
		show: true,
		type: Emoji.Heart,
		number: 2
	}
},
{
	id: 'b',
	author: 'me',
	comment: {
		type: 'text',
		content: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste voluptates illum officiis dignissimos iure dolor sit, quo ipsum! Dolorem quam consectetur aut. Ex quo optio corrupti eius? Tempore debitis ut ipsum ullam nemo eum, eaque sed et culpa adipisci fuga modi fugiat eveniet magni deleniti quam dolor iure dignissimos eius vel vero cum, deserunt earum ducimus! Aperiam vero adipisci aut voluptatum at quisquam, culpa veritatis vel ratione autem iste, nihil laudantium fugit magnam? Quas veritatis maiores, veniam voluptates doloribus corporis aspernatur nisi eos aut dolorum animi, voluptatibus dolores obcaecati ea voluptas iusto eius omnis voluptatem. Sint reiciendis ea perspiciatis vel!',
	},
	time: {
		type: 'right',
		value: new Date()
	},
},
{
	id: 'bere',
	author: 'you',
	comment: {
		type: 'text',
		content: 'Xin cảm ơn rất nhiều',
	},
	time: {
		value: new Date()
	}
},
{
	id: 'c',
	author: 'you',
	comment: {
		type: 'record',
		duration: 20
	},
	time: {
		type: 'left',
		value: new Date()
	}
},
{
	id: 'b',
	author: 'me',
	comment: {
		type: 'call',
		callType: 'incomming'
	},
	time: {
		value: new Date()
	}
}

]

const profile: Profile = {
	name: 'Truong Tom',
	status: 0,
	avatar: 'src/assets/img/avatar.png'
}


export {listComment, profile}
