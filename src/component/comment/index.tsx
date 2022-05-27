import React, { useCallback, useEffect, useLayoutEffect, useMemo, useState, useContext, useReducer, useRef, Suspense, memo, lazy, Fragment } from 'react';
import { Comment } from '../../interface/IComment';
import CommentCall from './CommentCall';
import CommentImage from './CommentImage';
import CommentRecord from './CommentRecord';
import CommentText from './CommentText';
import { BsPlusSquareDotted } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { changeCurrentComment } from '../../slice/CurrentCommentSlice';

interface Props {
	data: Comment;
	isLastCommentText?: boolean;
}
const CommentMain = ({ data, isLastCommentText }: Props) => {
	const dispatch = useDispatch();
	function renderComment(type: string) {
		switch (type) {
			case 'image':
				return <CommentImage data={data} />;
			case 'text':
				return <CommentText data={data} isLastComment={isLastCommentText} />;
			case 'call':
				return <CommentCall data={data} />;
			case 'record':
				return <CommentRecord data={data} />;
		}
	}
	const changeFormData = () => {
		dispatch(changeCurrentComment(data));
	};

	return (
		<Fragment>
			<div className={'comment_container px-2 relative flex items-center ' + (data.author === 'me' ? 'flex-row-reverse' : '')}>
				{renderComment(data.comment.type)}
				<BsPlusSquareDotted className='icon_edit_comment cursor-pointer mx-4 w-10 h-10 absolute left-1/2 -translate-x-1/2' onClick={changeFormData} />
			</div>
		</Fragment>
	);
};
export default CommentMain;
