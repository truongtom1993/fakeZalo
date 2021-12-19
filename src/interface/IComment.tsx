interface Comment {
	id: string,
	author: 'you'|'me',
	comment: {
		type: 'image'|'text'|'call'|'record',
		content?: string,
		duration?: string,
		url?: string,
	},
	time: string,
	emoji?: {
		show?: boolean,
		type?: 'heart'|'like'|'lol'|'wow'|'cry'|'angry',
		number?: number
	},
	separate?: {
		show?: boolean,
		time?: string
	},
	reply?: {
		show?: boolean,
		idComment: string,
	}
}

interface Profile {
	name: string,
	status: string,
	avatar: string,
}

export type { Comment, Profile }