import React, { Fragment, memo, useEffect, useLayoutEffect, useRef } from 'react';
import { Emoji, Message } from '../../interface/IMessage';
import { store } from '../../store/store';
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

const MessageText = ({ data, isLastMessage, isFirstMessage, index }: Props) => {
	const { author, message, time, emoji, messageReply } = data;
	const messageListLength = store.getState().messageListReducer.data.length;
	const isEndOfList = messageListLength - 1 === index;
	const contentRef = useRef<HTMLDivElement>();

	useLayoutEffect(() => {
		if (message.type === 'text') {
			const stringUrl = message.textContent.replace(emailReg, result => {
				switch (result) {
					case Emoji.Like:
						return `<span class='emoji' style='--position: 84% 82.5%/5100%'></span>`;
					case Emoji.Heart:
						return `<span class='emoji' style='--position: 84% 72.5% / 5100%'></span>`;
					case Emoji.Lol:
						return `<span class='emoji' style='--position: 82% 7.5% /5100%'></span>`;
					case Emoji.Wow:
						return `<span class='emoji' style='--position: 84% 20%/5100%'></span>`;
					case Emoji.Cry:
						return `<span class='emoji' style='--position: 84% 2.5% /5100%'></span>`;
					case Emoji.Angry:
						return `<span class='emoji' style='--position: 84% 5% /5100%'></span>`;

					default:
						break;
				}
				return `<a class="linkInText">${result}</a>`;
			});

			contentRef.current && (contentRef.current.innerHTML = stringUrl);
		}
	}, [message]);

	function render() {
		if (author === 'you') {
			return (
				<Fragment>
					<div className={`flex ${isEndOfList ? 'mb-6' : ''}`}>
						<Avatar isFirstMessage={isFirstMessage} />
						<div className={'message-text-main relative ml-1 bg-white'}>
							{messageReply.idReply && <MessageReply messageReply={messageReply} />}
							<div className='text-lg text-gray-800' ref={contentRef}></div>
							<EmojiComponent type={emoji?.type} number={emoji?.number} author={author} isEndOfList={isEndOfList ? true : false} />

							{isLastMessage && (
								<div className='pt-1'>
									<TimeComponent time={time} message={message} author={author} />
								</div>
							)}
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
							<div className='text-lg text-gray-800' ref={contentRef}></div>
							<EmojiComponent type={emoji?.type} number={emoji?.number} author={author} />
							{isLastMessage && (
								<div className='pt-1'>
									<TimeComponent time={time} message={message} author={author} />
								</div>
							)}
						</div>
					</div>
				</Fragment>
			);
		}
	}
	return <div className='mb-1 flex flex-col'>{render()}</div>;
};
export default memo(MessageText);
