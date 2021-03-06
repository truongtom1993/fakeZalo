import React, { Fragment } from 'react';
import { FaPlay } from 'react-icons/fa';
import { IoVolumeMedium } from 'react-icons/io5';
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
const MainRecord = ({ index, data, isFirstMessage, isLastMessage }: Props) => {
	const { author, message, time, emoji } = data;

	function secondsToMinutes(second: number) {
		const minute = Math.floor(second / 60);
		const residual = second - minute * 60;
		if (minute < 10) {
			return residual >= 10 ? `0${minute}:${residual}` : `0${minute}:0${residual}`;
		}
		if (minute >= 10) {
			return residual >= 10 ? `${minute}:${residual}` : `${minute}:0${residual}`;
		}
	}

	function render() {
		if (author === 'you') {
			return (
				<Fragment>
					<div className='flex'>
						<Avatar isFirstMessage={isFirstMessage} />
						<div className='bg-white ml-1 rounded-xl border border-gray-300 border-opacity-80 flex flex-shrink-0 w-[146px] h-[47px] p-2 items-center relative'>
							<div className='icon-play w-7 h-7 bg-blue-500 rounded-full flex justify-center items-center'>
								<FaPlay className='fill-white ml-1' />
							</div>

							<div className='progess-icon-group flex self-center mt-1 ml-2 justify-around w-5'>
								<div className='w-[0.3rem] h-3 bg-gray-500 rounded-md self-end'></div>
								<div className='w-[0.3rem] h-[0.5rem] bg-gray-500 rounded-md self-end'></div>
								<div className='w-[0.27rem] h-4 bg-gray-500 rounded-md self-end'></div>
							</div>

							<div className='time-duration ml-3 text-gray-700 self-center'>{message.type === 'record' && secondsToMinutes(message.recordDuration)}</div>
						</div>

						<IoVolumeMedium className='fill-blue-500 self-center ml-2 w-5 h-5' />
					</div>

					{isLastMessage && <TimeComponent time={time} message={message} author={author} />}
				</Fragment>
			);
		}
		if (author === 'me') {
			return (
				<Fragment>
					<div className='flex'>
						<div className='bg-[#D5F1FF] ml-auto mr-2 rounded-xl border border-gray-300 flex flex-shrink-0 w-[146px] h-[47px] p-2 items-center relative'>
							<div className='icon-play w-7 h-7 bg-blue-500 rounded-full flex justify-center items-center'>
								<FaPlay className='fill-white ml-1' />
							</div>

							<div className='progess-icon-group flex self-center mt-1 ml-2 justify-around w-5'>
								<div className='w-[0.3rem] h-3 bg-gray-500 rounded-md self-end'></div>
								<div className='w-[0.3rem] h-[0.5rem] bg-gray-500 rounded-md self-end'></div>
								<div className='w-[0.27rem] h-4 bg-gray-500 rounded-md self-end'></div>
							</div>

							<div className='time-duration ml-3 text-gray-700 self-center'>{message.type === 'record' && secondsToMinutes(message.recordDuration)}</div>
						</div>
					</div>
					{isLastMessage && <TimeComponent time={time} message={message} author={author} />}
				</Fragment>
			);
		}
	}

	return (
		<Fragment>
			<div className='mb-1 flex flex-col'>{render()}</div>
		</Fragment>
	);
};
export default MainRecord;
