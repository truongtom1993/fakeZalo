import React, { useCallback, useEffect, useLayoutEffect, useMemo, useState, useContext, useReducer, useRef, Suspense, memo, lazy, Fragment } from 'react';
import { BiMicrophone } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import { ICurrentCommentReply } from '../../slice/CurrentCommentSlice';
import { RootState } from '../../store/store';
interface IProps {
	commentReply: ICurrentCommentReply;
}
const CommentReply = ({ commentReply }: IProps) => {
	const { idReply, data } = commentReply;

	function renderCommentReply(type: string) {
		if (type === 'text') {
			return (
				<div className='overflow-hidden pr-2'>
					<p className='my-0 font-semibold'>{'Đặng Nhật Trường'}</p>
					<p className='truncate text-gray-500 '>{data.comment?.textContent}</p>
				</div>
			);
		}
		if (type === 'image') {
			return (
				<Fragment>
					<img src={data.comment?.imageUrl} alt='' className='h-9 aspect-square self-end mr-2' />
					<div className='overflow-hidden truncate pr-2 flex-grow'>
						<p className='my-0 font-semibold'>{'Đặng Nhật Trường'}</p>
						<div className='truncate text-gray-500 '>{data.comment?.imageUrl}</div>
					</div>
				</Fragment>
			);
		}
		if (type === 'call') {
			return (
				<Fragment>
					<div className='flex'>
						<div className='h-9 aspect-square bg-gray-400 rounded-full self-center mr-2 flex justify-center items-center'>
							<BiMicrophone className='h-6 w-4' />
						</div>
					</div>
					<div className='truncate pr-2 flex-grow'>
						<p className='my-0 font-semibold'>{'Đặng Nhật Trường'}</p>
						<p className='truncate text-gray-500'>{`[Tin nhắn thoại]`}</p>
					</div>
				</Fragment>
			);
		}
		if (type === 'record') {
		}
	}
	return (
		<Fragment>
			{idReply && (
				<div className='flex h-11 my-1 tracking-normal'>
					<div className='separate_reply'></div>
					<div className='flex flex-grow'>{renderCommentReply('call' || data.comment.type)}</div>
				</div>
			)}
		</Fragment>
	);
};
export default CommentReply;
