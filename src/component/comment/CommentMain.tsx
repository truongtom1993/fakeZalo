import React, { Fragment, memo, useRef } from 'react';
import { BiDownArrow, BiUpArrow } from 'react-icons/bi';
import { BsReplyAll } from 'react-icons/bs';
import { FiEdit } from 'react-icons/fi';
import { GoDiffRemoved } from 'react-icons/go';
import { useDispatch } from 'react-redux';
import { convertCommentToCommentReply } from '../../helpers';
import { useAppSelector } from '../../hooks';
import { Comment } from '../../interface/IComment';
import { changeCurrentComment, changeCurrentCommentReply, exampleCurrentComment, ICommentReply, ICurrentCommentReply } from '../../slice/CurrentCommentSlice';
import { addComment, removeCommentByIndex } from '../../slice/DataSlice';
import { createExampleComment } from '../../utils';
import CommentCall from './CommentCall';
import CommentImage from './CommentImage';
import CommentRecord from './CommentRecord';
import CommentText from './CommentText';
import SeparateTime from './SeparateTime';

interface IProps {
	index: number;
	data: Comment;
	isLastComment: boolean;
	isFirstComment: boolean;
}

const CommentMain = (props: IProps) => {
	const { index, data } = props;
	const dispatch = useDispatch();
	const currentComment = useAppSelector<Comment>(s => s.currentCommentReducer.currentComment);

	function renderComment(type: string) {
		if (data.time.type === 'separate') {
			return <SeparateTime separateTime={data.time.value} />;
		}
		switch (type) {
			case 'image':
				return <CommentImage {...props} />;
			case 'text':
				return <CommentText {...props} />;
			case 'call':
				return <CommentCall {...props} />;
			case 'record':
				return <CommentRecord {...props} />;
		}
	}

	const changeFormData = () => {
		dispatch(changeCurrentComment({ ...data, index }));
	};

	const removeComment = () => {
		dispatch(removeCommentByIndex(index));
		dispatch(changeCurrentComment(exampleCurrentComment));
	};
	const addPrev = () => {
		// tao comment moi
		const newData = createExampleComment(index);

		dispatch(addComment({ index, data: newData }));
		dispatch(changeCurrentComment(newData));
	};
	const addNext = () => {
		// tao comment moi
		const newData = createExampleComment(index + 1);

		dispatch(addComment({ index: index + 1, data: newData }));
		dispatch(changeCurrentComment(newData));
	};
	const getCommentReply = (commentReply: ICurrentCommentReply) => {
		if (currentComment.index > commentReply.index) {
			dispatch(changeCurrentCommentReply(commentReply));
		}
	};

	return (
		<Fragment>
			<div
				className={
					'comment_container px-2 relative flex items-center ' +
					(`type_${data.comment.type}_${data.author} author_${data.author} ` + (data.author === 'me' ? 'flex-row-reverse' : ''))
				}
			>
				<Fragment>{renderComment(data.comment.type)}</Fragment>

				<div className='icon_edit_comment absolute left-1/2 -translate-x-1/2 w-auto flex items-center'>
					<BiUpArrow className='cursor-pointer mx-2 w-10 h-10' onClick={addPrev} />
					<BiDownArrow className='cursor-pointer mx-2 w-10 h-10' onClick={addNext} />
					<GoDiffRemoved className='cursor-pointer mx-2 w-9 h-9 stroke-[0.3]' onClick={removeComment} />
					<BsReplyAll className='cursor-pointer mx-2 w-10 h-10' onClick={() => getCommentReply(convertCommentToCommentReply(data, index))} />
					<FiEdit className='cursor-pointer mx-2 w-9 h-9' onClick={changeFormData} />
				</div>
			</div>
		</Fragment>
	);
};
export default memo(CommentMain);
