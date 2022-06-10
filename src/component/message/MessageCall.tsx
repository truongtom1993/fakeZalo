import React, { Fragment } from 'react';
import { IoMdCall } from 'react-icons/io';
import { MdCallEnd, MdCallMade, MdCallMissed, MdCallReceived } from 'react-icons/md';
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
const MessageCall = ({ index, data, isFirstMessage, isLastMessage }: Props) => {
	const { author, message, time, emoji } = data;
	const { type } = message;

	function secondsToMinutes(second: number) {
		const minute = Math.floor(second / 60);
		const residual = second - minute * 60;
		if (minute < 10) {
			return residual >= 10 ? `0${minute} phút ${residual} giây` : `0${minute} phút 0${residual} giây`;
		}
		if (minute >= 10) {
			return residual >= 10 ? `${minute} phút ${residual} giây` : `${minute} phút 0${residual} giây`;
		}
	}
	function callFooter() {
		return (
			<Fragment>
				<div className='border-b border-b-gray-500 opacity-20'></div>
				<div className='h-[32px] text-sm text-center leading-[32px] font-semibold text-blue-500'>GỌI LẠI</div>
			</Fragment>
		);
	}
	function render() {
		if (type === 'call') {
			switch (message.callType) {
				case 'incomming':
					return (
						<Fragment>
							<div className={`call_container ${author === 'me' ? 'bg-[#D5F1FF]' : 'bg-white'}`}>
								<div className='flex-grow flex flex-col text-xs '>
									<div className='flex-shrink-0 ml-2 flex items-end font-semibold mt-[0.35rem]'>
										<span className='tracking-wide'>Cuộc gọi thoại đến</span>
									</div>
									<div className='flex items-center ml-2 '>
										<div className='relative'>
											<IoMdCall className='fill-gray-500' />
											<MdCallReceived className='fill-green-500 scale-[.6] absolute left-[0.15rem] bottom-[0.15rem]' />
										</div>
										<div className='call_duration ml-1 text-gray-700'>{secondsToMinutes(message.callDuration)}</div>
									</div>
								</div>
								{callFooter()}
							</div>
							{isLastMessage && <TimeComponent time={time} message={message} author={author} />}
						</Fragment>
					);
				case 'outgoing':
					return (
						<Fragment>
							<div className={`call_container ${author === 'me' ? 'bg-[#D5F1FF]' : 'bg-white'}`}>
								<div className='flex-grow flex flex-col text-xs '>
									<div className='flex-shrink-0 ml-2 flex items-end font-semibold mt-[0.35rem] '>
										<span className='tracking-wide'>Cuộc gọi thoại đi</span>
									</div>
									<div className='flex items-center ml-2 '>
										<div className='relative'>
											<IoMdCall className='fill-gray-500' />
											<MdCallMade className='fill-green-500 scale-[.6] absolute left-[0.15rem] bottom-[0.15rem]' />
										</div>
										<div className='call_duration ml-1 text-gray-700'>{secondsToMinutes(message.callDuration)}</div>
									</div>
								</div>
								{callFooter()}
							</div>
							{isLastMessage && <TimeComponent time={time} message={message} author={author} />}
						</Fragment>
					);
				case 'missed':
					return (
						<Fragment>
							<div className={`call_container ${author === 'me' ? 'bg-[#D5F1FF]' : 'bg-white'}`}>
								<div className='flex-grow flex flex-col text-xs '>
									<div className='flex-shrink-0 ml-2 flex items-end font-semibold mt-[0.35rem] '>
										<span className='text-red-500 tracking-wide'>Bạn bị nhỡ</span>
									</div>
									<div className='flex items-center ml-2 '>
										<div className='relative h-full w-3'>
											<MdCallEnd className='fill-red-500 absolute top-1' />
											<MdCallMissed className='fill-red-500 scale-[.6] absolute bottom-[5px]' />
										</div>
										<div className='call_duration ml-1 text-gray-700'>Cuộc gọi thoại</div>
									</div>
								</div>
								{callFooter()}
							</div>
							{isLastMessage && <TimeComponent time={time} message={message} author={author} />}
						</Fragment>
					);
			}
		}
	}
	if (author === 'you') {
		return (
			<div className='flex mb-2'>
				<Avatar isFirstMessage={isFirstMessage} />
				<div className='ml-1 '>{render()}</div>
			</div>
		);
	}
	if (author === 'me') {
		return (
			<div className='flex mb-2 mr-2 '>
				<div className='ml-auto'>{render()}</div>
			</div>
		);
	}
};
export default MessageCall;
