import React, { Fragment } from 'react';
import { IoMdShareAlt } from 'react-icons/io';
import { Message } from '../../interface/IMessage';
import Avatar from '../Avatar';
import EmojiComponent from '../emoji/EmojiComponent';
import TimeComponent from '../time/TimeComponent';

interface Props {
	index: number;
	data: Message;
	isLastMessage: boolean;
	isFirstMessage: boolean;
}

const MessageImage = ({ index, data, isFirstMessage, isLastMessage }: Props) => {
	const { author, message, time, emoji } = data;

	function render() {
		if (author === 'you') {
			return (
				<div className='flex flex-col mb-2'>
					<div className='flex'>
						<Avatar isFirstMessage={isFirstMessage} />
						<div className='message-image-flx'>
							<img src={message.type === 'image' && message.imageUrl} alt='image-content' className='message-image' />
							<span className='hd-label'>HD</span>
							<EmojiComponent type={emoji?.type} number={emoji?.number} author={author} />
						</div>
						<div className='icon-share-image'>
							<IoMdShareAlt />
						</div>
					</div>
					{isLastMessage && <TimeComponent time={time} message={message} author={author} />}
				</div>
			);
		}
		if (author === 'me') {
			return (
				<div className='flex flex-col mb-2'>
					<>
						<div className='flex flex-row-reverse mr-2'>
							<div className='message-image-flx'>
								<img src={message.type === 'image' && message.imageUrl} alt='image-content' className='message-image' />
								<span className='hd-label'>HD</span>
								<EmojiComponent type={emoji?.type} number={emoji?.number} author={author} />
							</div>
							<div className='icon-share-image'>
								<IoMdShareAlt />
							</div>
						</div>
					</>
					<div className='ml-10'>{isLastMessage && <TimeComponent time={time} message={message} author={author} />}</div>
				</div>
			);
		}
	}

	return <Fragment>{render()}</Fragment>;
};
export default MessageImage;
