import React, { useCallback, useEffect, useLayoutEffect, useMemo, useState, useContext, useReducer, useRef, Suspense, memo, lazy, Fragment } from 'react'
import { Comment } from '../../interface/IComment'
import Avatar from '../Avatar';
import { FaPlay } from 'react-icons/fa'
import { IoVolumeMedium } from 'react-icons/io5';
import TimeComponent from '../time/TimeComponent';

interface Props {
	data: Comment
}
const CommentRecord = ({ data }: Props) => {
	const { author, comment, time } = data;

	function secondsToMinutes(second: number) {
		const minute = Math.floor(second / 60);
		const residual = second - minute * 60;
		if (minute < 10) {
			return residual >= 10 ? `0${minute}:${residual}` : `0${minute}:0${residual}`
		}
		if (minute >= 10) {
			return residual >= 10 ? `${minute}:${residual}` : `${minute}:0${residual}`
		}
	}

	function render(data: Comment) {
		if (author === 'you') {
			return <Fragment>
				<div className='flex '>
					<Avatar />
					<div className='bg-white ml-1 rounded-xl border border-gray-300 border-opacity-80 flex flex-shrink-0 w-[146px] h-[47px] p-2 items-center'>
						<div className="icon-play w-7 h-7 bg-blue-500 rounded-full flex justify-center items-center">
							<FaPlay className='fill-white ml-1' />
						</div>

						<div className="progess-icon-group flex self-center ml-2 justify-around w-5">
							<div className='w-[0.3rem] h-4 bg-gray-500 rounded-md self-end'></div>
							<div className='w-[0.3rem] h-[0.5rem] bg-gray-500 rounded-md self-end'></div>
							<div className='w-[0.27rem] h-5 bg-gray-500 rounded-md self-end'></div>
						</div>

						<div className="time-duration ml-3 text-gray-700 self-center mb-1">
							{comment.type === 'record' && secondsToMinutes(comment.duration)}
						</div>
					</div>

					<IoVolumeMedium className='fill-blue-500 self-center ml-2 w-5 h-5' />
				</div>
				{time.type && <TimeComponent time={time} />}
			</Fragment>
		}
		if (author === 'me') {
			return <Fragment>
				<div className='flex'>
					<div className='bg-[#D5F1FF] ml-auto mr-2 rounded-xl border border-gray-300 flex flex-shrink-0 w-[146px] h-[47px] p-2 items-center'>
						<div className="icon-play w-7 h-7 bg-blue-500 rounded-full flex justify-center items-center">
							<FaPlay className='fill-white ml-1' />
						</div>

						<div className="progess-icon-group flex self-center ml-2 justify-around w-5">
							<div className='w-[0.3rem] h-4 bg-gray-500 rounded-md self-end'></div>
							<div className='w-[0.3rem] h-[0.5rem] bg-gray-500 rounded-md self-end'></div>
							<div className='w-[0.27rem] h-5 bg-gray-500 rounded-md self-end'></div>
						</div>

						<div className="time-duration ml-3 text-gray-700 self-center mb-1">
							{comment.type === 'record' && secondsToMinutes(comment.duration)}
						</div>
					</div>
				</div>
			</Fragment>
		}
	}

	return (<Fragment>
		<div className='my-2 flex flex-col'>
			{render(data)}
		</div>
	</Fragment>)
}
export default CommentRecord