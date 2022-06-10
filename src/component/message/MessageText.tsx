import React, { Fragment, memo, useEffect, useLayoutEffect, useRef } from 'react';
import { Emoji, Message } from '../../interface/IMessage';
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

const emailReg = new RegExp(
	/([(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\-\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*))|(\/-strong)|(\/-heart)|(:>)|(:o)|(:-\(\()|(:-h)/,
	'gm',
);

const emojiReg = /fd/g;

const MessageText = ({ data, isLastMessage, isFirstMessage, index }: Props) => {
	const { author, message, time, emoji, messageReply } = data;
	const contentRef = useRef<HTMLDivElement>();

	useLayoutEffect(() => {
		if (message.type === 'text') {
			const stringUrl = message.textContent.replace(emailReg, result => {
				switch (result) {
					case Emoji.Like:
						return `<span class='emoji strongEmoji'></span>`;
					case Emoji.Heart:
						return `<span class='emoji heartEmoji'></span>`;
					case Emoji.Lol:
						return `<span class='emoji lolEmoji'></span>`;
					case Emoji.Wow:
						return `<span class='emoji wowEmoji'></span>`;
					case Emoji.Cry:
						return `<span class='emoji cryEmoji'></span>`;
					case Emoji.Angry:
						return `<span class='emoji angryEmoji'></span>`;

					default:
						break;
				}
				return `<a class="linkInText">${result}</a>`;
			});
			console.info(`🎁 src/component/message/MessageText.tsx	Line:36	ID:3b4945`, stringUrl);

			contentRef.current && (contentRef.current.innerHTML = stringUrl);
		}
	}, [message]);

	function render() {
		if (author === 'you') {
			return (
				<Fragment>
					<div className='flex'>
						<Avatar isFirstMessage={isFirstMessage} />
						<div className={'message-text-main relative ml-1 bg-white'}>
							{messageReply.idReply && <MessageReply messageReply={messageReply} />}
							<div className='text-base text-gray-800 pb-1' ref={contentRef}>
								{message.type === 'text' && message.textContent}
							</div>
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
							<div className='text-base text-gray-800 pb-1' ref={contentRef}>
								{message.type === 'text' && message.textContent}
							</div>
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
