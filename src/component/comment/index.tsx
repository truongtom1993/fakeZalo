import React, { useCallback, useEffect, useLayoutEffect, useMemo, useState, useContext, useReducer, useRef, Suspense, memo, lazy, Fragment } from 'react';
import { Comment } from '../../interface/IComment';
import CommentCall from './CommentCall';
import CommentImage from './CommentImage';
import CommentRecord from './CommentRecord';
import CommentText from './CommentText';
import { AiOutlineEdit } from 'react-icons/ai';
import { BiUpArrow, BiDownArrow } from 'react-icons/bi';
import { GoDiffRemoved } from 'react-icons/go';
import { useDispatch } from 'react-redux';
import { changeCurrentComment } from '../../slice/CurrentCommentSlice';
import { addComment, removeCommentByIndex } from '../../slice/DataSlice';
import moment from 'moment';

interface Props {
	index: number;
	data: Comment;
	isLastCommentText?: boolean;
}

function createExampleComment(): Comment {
	const exampleComment: Comment = {
		author: 'me',
		comment: { type: 'text', textContent: `Example Textcontent ${Math.random()}` },
		id: '',
		time: { type: 'right', value: moment().format('YYYY-MM-DD hh:mm:ss') },
		emoji: {
			show: false,
		},
	};
	return exampleComment;
}
const CommentMain = ({ index, data, isLastCommentText }: Props) => {
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

	const removeComment = () => {
		dispatch(removeCommentByIndex(index));
	};
	const addPrev = () => {
		dispatch(addComment({ index, data: createExampleComment() }));
	};
	const addNext = () => {
		dispatch(addComment({ index: index + 1, data: createExampleComment() }));
	};

	return (
		<Fragment>
			<div className={'comment_container px-2 relative flex items-center ' + (data.author === 'me' ? 'flex-row-reverse' : '')}>
				{renderComment(data.comment.type)}
				<div className='icon_edit_comment absolute left-1/2 -translate-x-1/2 w-auto flex items-center'>
					<BiUpArrow className='cursor-pointer mx-2 w-10 h-10' onClick={addPrev} />
					<BiDownArrow className='cursor-pointer mx-2 w-10 h-10' onClick={addNext} />
					<GoDiffRemoved className='cursor-pointer mx-2 w-9 h-9 stroke-[0.3]' onClick={removeComment} />
					<AiOutlineEdit className='cursor-pointer mx-2 w-10 h-10' onClick={changeFormData} />
				</div>
			</div>
		</Fragment>
	);
};
export default memo(CommentMain);
