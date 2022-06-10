import moment from 'moment';
import { IDataForm } from '../component/form/FormAnt';
import { Emoji, Message, MessageType } from '../interface/IMessage';
import { ICurrentMessageReply } from '../slice/CurrentMessageSlice';

export const converDataFormToMessage = (data: IDataForm, currentMessageReply: ICurrentMessageReply): Message => {
	const message: MessageType | object = { type: data.messageType };
	switch (data.messageType) {
		case 'text':
			Object.assign(message, { textContent: data.textContent });
			break;
		case 'call':
			Object.assign(message, { callType: data.callType, callDuration: data.callDuration });
			break;
		case 'image':
			Object.assign(message, { imageUrl: data.imageURL });
			break;
		case 'record':
			Object.assign(message, { recordDuration: data.recordDuration });
			break;
	}

	return {
		index: data.index,
		id: data.idMessage,
		messageReply: currentMessageReply,
		author: data.user,
		message: message as MessageType,
		time: {
			type: data.timeType,
			value: typeof data.timeValue === 'object' ? data.timeValue?.format('YYYY-MM-DD HH:mm:ss') : '',
		},
		emoji: {
			show: data.emoji ? true : false,
			type: data.emoji as Emoji,
			number: data.numberEmoji,
		},
	};
};

export const converMessageToDataForm = (data: Message): IDataForm => {
	const timeValue = data.time?.value;
	const result = {
		index: data.index,
		user: data?.author,
		idMessage: data?.id || '',
		idReply: data?.messageReply.idReply,
		timeType: data?.time?.type || null,
		timeValue: moment(new Date(timeValue)),
		emoji: data?.emoji?.type || void 0,
		numberEmoji: data?.emoji?.number || void 0,
		messageType: data?.message?.type,
		textContent: '',
		imageURL: '',
		callType: '',
		callDuration: '',
		recordDuration: '',
	};
	switch (data.message.type) {
		case 'text':
			result.textContent = data.message.textContent || '';
			break;
		case 'image':
			result.imageURL = data.message?.imageUrl || '';
			break;
		case 'call':
			result.callType = data.message.callType || '';
			result.callDuration = data.message.callDuration?.toString() || '';
			break;
		case 'record':
			result.recordDuration = data.message.recordDuration?.toString() || '';
			break;
		default:
			break;
	}
	return result;
};

export const convertToShortenTime = (value: string) => {
	const timeSplit = value.split(':');
	const minute = timeSplit[1];
	const hour = timeSplit[0].split(' ').at(-1);
	let result = `${Number.parseInt(hour)}:${minute}`;
	return result;
};

export const convertMessageToMessageReply = (data: Message, index: number): ICurrentMessageReply => {
	return {
		type: data.message.type,
		idReply: data.id,
		index,
		data: {
			author: data.author,
			message: data.message,
		},
	};
};
