import React, { Fragment, memo } from 'react';
import { Message } from '../../interface/IMessage';
import Avatar from '../Avatar';
import EmojiComponent from '../emoji/EmojiComponent';
import TimeComponent from '../time/TimeComponent';
import MessageReply from './MessageReply';

interface Props {
	index: number;
	data: Message;
	isLastMessage: boolean;
	isFirstMessage: boolean;
}
const MessageText = ({ data, isLastMessage, isFirstMessage, index }: Props) => {
	const { author, message, time, emoji, messageReply } = data;

	function render() {
		if (author === 'you') {
			return (
				<Fragment>
					<div className='flex'>
						<Avatar isFirstMessage={isFirstMessage} />
						<div className={'message-text-main relative ml-1 bg-white'}>
							{messageReply.idReply && <MessageReply messageReply={messageReply} />}
							<span className='text-base text-gray-800 pb-1'>{message.type === 'text' && message.textContent}</span>
							<EmojiComponent type={emoji?.type} number={emoji?.number} />
							{isLastMessage && <TimeComponent time={time} message={message} author={author} />}
						</div>
					</div>
				</Fragment>
			);
		}
		if (author === 'me') {
			return (
				<Fragment>
					<div className='flex'>
						<div className={'message-text-main relative ml-auto mr-2 bg-[#D5F1FF]'}>
							{messageReply.idReply && <MessageReply messageReply={messageReply} />}
							<span className='text-base text-gray-800 pb-1'>{message.type === 'text' && message.textContent}</span>
							<EmojiComponent type={emoji?.type} number={emoji?.number} />
							{isLastMessage && <TimeComponent time={time} message={message} author={author} />}
						</div>
					</div>
				</Fragment>
			);
		}
	}
	return <div className='mb-2 flex flex-col'>{render()}</div>;
};
export default memo(MessageText);
