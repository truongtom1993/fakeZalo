import React, { Fragment } from 'react';
import { IoMdCall } from 'react-icons/io';
import { MdCallEnd, MdCallMade, MdCallMissed, MdCallReceived } from 'react-icons/md';
import { Comment } from '../../interface/IComment';
import Avatar from '../Avatar';
import EmojiComponent from '../emoji/EmojiComponent';
interface Props {
	data: Comment;
	isFirstComment?: boolean;
}
const CommentCall = ({ data, isFirstComment }: Props) => {
	const { author, comment, time, emoji } = data;
	const { type } = comment;

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
		return <div className='h-[32px] text-sm text-center leading-[32px] font-semibold text-blue-500'>GỌI LẠI</div>;
	}
	function render() {
		if (type === 'call') {
			switch (comment.callType) {
				case 'incomming':
					return (
						<div className='call_container'>
							<div className='flex-grow border-b border-gray-200 flex flex-col text-xs '>
								<div className='flex-shrink-0 ml-2 flex items-end font-semibold mt-[0.35rem]'>
									<span className='tracking-wide'>Cuộc gọi thoại đến</span>
								</div>
								<div className='flex items-center ml-2 '>
									<div className='relative'>
										<IoMdCall className='fill-gray-500' />
										<MdCallReceived className='fill-green-500 scale-[.6] absolute left-[0.15rem] bottom-[0.15rem]' />
									</div>
									<div className='call_duration ml-1 text-gray-700'>{secondsToMinutes(comment.callDuration)}</div>
								</div>
							</div>

							{callFooter()}
							<EmojiComponent type={emoji?.type} number={emoji?.number} />
						</div>
					);
				case 'outgoing':
					return (
						<div className='call_container'>
							<div className='flex-grow border-b border-gray-200 flex flex-col text-xs '>
								<div className='flex-shrink-0 ml-2 flex items-end font-semibold mt-[0.35rem] '>
									<span className='tracking-wide'>Cuộc gọi thoại đi</span>
								</div>
								<div className='flex items-center ml-2 '>
									<div className='relative'>
										<IoMdCall className='fill-gray-500' />
										<MdCallMade className='fill-green-500 scale-[.6] absolute left-[0.15rem] bottom-[0.15rem]' />
									</div>
									<div className='call_duration ml-1 text-gray-700'>{secondsToMinutes(comment.callDuration)}</div>
								</div>
							</div>
							{callFooter()}
							<EmojiComponent type={emoji?.type} number={emoji?.number} />
						</div>
					);
				case 'missed':
					return (
						<div className='call_container'>
							<div className='flex-grow border-b border-gray-200 flex flex-col text-xs '>
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
							<EmojiComponent type={emoji?.type} number={emoji?.number} />
						</div>
					);
			}
		}
	}
	if (author === 'you') {
		return (
			<div className='flex my-2'>
				<Avatar isFirstComment={isFirstComment} />
				<div className='ml-2'>{render()}</div>
			</div>
		);
	}
	if (author === 'me') {
		return (
			<div className='flex my-2'>
				<div className='ml-auto'>{render()}</div>
			</div>
		);
	}
};
export default CommentCall;
