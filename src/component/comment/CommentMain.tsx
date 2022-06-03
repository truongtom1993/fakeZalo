import React, { Fragment, memo } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { BiDownArrow, BiUpArrow } from 'react-icons/bi';
import { GoDiffRemoved } from 'react-icons/go';
import { useDispatch } from 'react-redux';
import { Comment } from '../../interface/IComment';
import { changeCurrentComment } from '../../slice/CurrentCommentSlice';
import { addComment, removeCommentByIndex } from '../../slice/DataSlice';
import { createExampleComment } from '../../utils';
import CommentCall from './CommentCall';
import CommentImage from './CommentImage';
import CommentRecord from './CommentRecord';
import CommentText from './CommentText';
import SeparateTime from './SeparateTime';
interface Props {
	index: number;
	data: Comment;
	isLastCommentText?: boolean;
	isFirstComment?: boolean;
}

const CommentMain = ({ index, data, isLastCommentText, isFirstComment }: Props) => {
	const dispatch = useDispatch();
	function renderComment(type: string) {
		if (data.time.type === 'separate') {
			return <SeparateTime separateTime={data.time.value} />;
		}
		switch (type) {
			case 'image':
				return <CommentImage data={data} isFirstComment={isFirstComment} />;
			case 'text':
				return <CommentText data={data} isLastComment={isLastCommentText} isFirstComment={isFirstComment} />;
			case 'call':
				return <CommentCall data={data} isFirstComment={isFirstComment} />;
			case 'record':
				return <CommentRecord data={data} isFirstComment={isFirstComment} />;
		}
	}
	const changeFormData = () => {
		dispatch(changeCurrentComment(data));
	};

	const removeComment = () => {
		dispatch(removeCommentByIndex(index));
	};
	const addPrev = () => {
		// tao comment moi
		const newData = createExampleComment();

		dispatch(addComment({ index, data: newData }));
		dispatch(changeCurrentComment(newData));
	};
	const addNext = () => {
		// tao comment moi
		const newData = createExampleComment();

		dispatch(addComment({ index: index + 1, data: newData }));
		dispatch(changeCurrentComment(newData));
	};

	return (
		<Fragment>
			<div className={'comment_container px-2 relative flex items-center ' + (data.author === 'me' ? 'flex-row-reverse' : '')}>
				<Fragment>{renderComment(data.comment.type)}</Fragment>

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
