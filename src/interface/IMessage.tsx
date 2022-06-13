import { ICurrentMessageReply } from '../slice/CurrentMessageSlice';

type TypeMessageImage = {
	type: 'image';
	imageUrl: string;
};
type TypeMessageText = {
	type: 'text';
	textContent: string;
};
type TypeMessageCall = {
	type: 'call';
	callType: 'incomming' | 'outgoing' | 'missed';
	callDuration: number; //second
};
type TypeMassageRecord = {
	type: 'record';
	recordDuration: number;
};

export type MessageType = TypeMessageImage | TypeMessageText | TypeMessageCall | TypeMassageRecord;

export enum Emoji {
	HeartEmpty = 'heartEmpty',
	Like = '/-strong',
	Heart = '/-heart',
	Lol = ':>',
	Wow = ':o',
	Cry = ':-((',
	Angry = ':-h',
}

export type Author = 'you' | 'me' | 'separate';
export type TypeOfTime = 'separate' | 'auto';

export interface Message {
	index: number;
	id: string;
	messageReply: ICurrentMessageReply;
	author: Author;
	message: MessageType;
	time: {
		type: TypeOfTime;
		value: string; // dinh dang YYYY-MM-DD HH:mm:ss
	};
	emoji?: {
		show?: boolean; //Neu false thi hien icon trai tim rong
		type?: Emoji;
		number?: number;
	};
}

export interface Profile {
	userName: string;
	status: number; //trang thai hoat dong x phut truoc, neu la 0 thi ghi vua moi truy cap
	avatarURL: string;
	myName: string;
	myAvatarUrl: string;
}
