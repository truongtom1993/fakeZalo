import type {Comment, Profile} from '../interface/IComment'

const data: Comment[] = [{
	id: 'a',
	author: 'me',
	comment: {
		type: 'text',
		content: 'lorem ipsum',
	},
	time: 'abc'
},
{
	id: 'b',
	author: 'me',
	comment: {
		type: 'text',
		content: 'lorem ipsum',
	},
	time: 'abc'
}

]

const profile: Profile = {
	name: 'abc',
	status: 'Hoat dong 10 phut truoc',
	avatar: '../assets/img/avatar.png'
}

export {data, profile}
