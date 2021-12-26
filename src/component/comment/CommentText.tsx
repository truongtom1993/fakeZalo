import React, { useCallback, useEffect, useLayoutEffect, useMemo, useState, useContext, useReducer, useRef, Suspense, memo, lazy, Fragment } from 'react'
import { Comment } from '../../interface/IComment'
import Avatar from '../Avatar'
import TimeComponent from '../time/TimeComponent';
interface Props {
	data: Comment,
	isLastComment?: boolean
}
const CommentText = ({ data, isLastComment }: Props) => {
	const { author, comment, time } = data;
	function render(data: Comment) {
		if (author === 'you') {
			return <Fragment>
				<div className="flex">
					<Avatar />
					<div className={'comment-text-main ml-1 bg-white'}>
						<span className='text-base text-gray-800 pb-1'>
							{comment.type === 'text' && comment.content}
						</span>
						<span className='time-stamp'>{time.value.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
					</div>
				</div>


			</Fragment>
		}
		if (author === 'me') {
			return <Fragment>
				<div className="flex">
					<div className={'comment-text-main ml-auto mr-2 bg-[#D5F1FF]'}>
						<span className='text-base text-gray-800 pb-1'>
							{comment.type === 'text' && comment.content}
						</span>
						{isLastComment && <span className='time-stamp'>{time.value.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>}
					</div>
				</div>

				{time.type && <TimeComponent time={time} />}
			</Fragment>
		}
	}
	return (<Fragment>
		<div className='my-2 flex flex-col'>
			{render(data)}
		</div>
	</Fragment>)
}
export default CommentText