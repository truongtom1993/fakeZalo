type TypeCommentImage = {
	type: 'image';
	imageUrl: string;
};
type TypeCommentText = {
	type: 'text';
	textContent: string;
};
type TypeCommentCall = {
	type: 'call';
	callType: 'incomming' | 'outgoing' | 'missed';
	callDuration: number; //second
};
type TypeCommentRecord = {
	type: 'record';
	recordDuration: number;
};

export type CommentType = TypeCommentImage | TypeCommentText | TypeCommentCall | TypeCommentRecord;

export enum Emoji {
	Like = '/-strong',
	Heart = '/-heart',
	Lol = ':>',
	Wow = ':o',
	Cry = ':-((',
	Angry = ':-h',
}

export type Author = 'you' | 'me';
export type TypeOfTime = 'left' | 'center' | 'right' | null;

export interface Comment {
	id: string;
	idReply?: string;
	author: Author;
	comment: CommentType;
	time: {
		type: TypeOfTime;
		value: string; // dinh dang YYYY-MM-DD hh:mm:ss
	};
	emoji?: {
		show?: boolean; //Neu false thi hien icon trai tim rong
		type?: Emoji;
		number?: number;
	};
	separate?: {
		show?: boolean;
		time?: string;
	};
}

export interface Profile {
	userName: string;
	status: number; //trang thai hoat dong x phut truoc, neu la 0 thi ghi vua moi truy cap
	avatarURL: string;
}
