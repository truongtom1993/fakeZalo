
type TypeCommentImage = {
	type: 'image',
	url: string,
}
type TypeCommentText = {
	type: 'text',
	content: string
}
type TypeCommentCall = {
	type: 'call',
	callType: 'incomming' | 'outgoing'
}
type TypeCommentRecord = {
	type: 'record',
	duration: number
}

type CommentType = TypeCommentImage | TypeCommentText | TypeCommentCall | TypeCommentRecord

export enum Emoji {
	Like = '/-strong',
	Heart = '/-heart',
	Lol = ':>',
	Wow = ':o',
	Cry = ':-((',
	Angry = ':-h'
}

type Author = 'you' | 'me';
export type TypeOfTime = 'left' | 'center' | 'right';

export interface Comment {
	id: string,
	author: Author,
	comment: CommentType,
	time: {
		type?: TypeOfTime,
		value: Date,
	}
	emoji?: {
		show?: boolean, //Neu false thi hien icon trai tim rong
		type?: Emoji,
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

export interface Profile {
	name: string,
	status: number, //trang thai hoat dong x phut truoc, neu la 0 thi ghi vua moi truy cap
	avatar: string,
}

// export type { Comment, Profile, TypeCommentImage, TypeCommentCall, TypeCommentRecord, TypeCommentText, CommentType , Emoji}