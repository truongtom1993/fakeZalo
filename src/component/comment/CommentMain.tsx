import { message, Tooltip } from 'antd';
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
		if (data.author === 'separate' || data.time.type === 'separate') {
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
		if (currentComment.comment.type !== 'text') {
			return message.warning('Tin nhắn hiện tại phải là dạng text mới có thể trở thành tin nhắn Reply');
		}
		if (currentComment.index <= commentReply.index) {
			return message.warn('Tin nhắn reply phải phía trên tin nhắn hiện tại');
		}
		message.success('Lấy ID Reply thành công');
		dispatch(changeCurrentCommentReply(commentReply));
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

				<div className='icon_edit_comment absolute left-1/2 -translate-x-1/2 flex items-center bg-gray-100 bg-opacity-70 p-2 rounded-lg shadow-lg'>
					<Tooltip title='Thêm tin nhắn mới bên trên tin nhắn này'>
						<BiUpArrow className='cursor-pointer mx-2 w-10 h-10 hover:scale-125' onClick={addPrev} />
					</Tooltip>
					<Tooltip title='Thêm tin nhắn mới bên dưới tin nhắn này'>
						<BiDownArrow className='cursor-pointer mx-2 w-10 h-10 hover:scale-125' onClick={addNext} />
					</Tooltip>
					<Tooltip title='Xóa tin nhắn này'>
						<GoDiffRemoved className='cursor-pointer mx-2 w-8 h-8 stroke-[0.3] hover:scale-125' onClick={removeComment} />
					</Tooltip>
					<Tooltip title='Lấy ID của tin nhắn làm ID Reply'>
						<BsReplyAll className='cursor-pointer mx-2 w-11 h-11 hover:scale-125' onClick={() => getCommentReply(convertCommentToCommentReply(data, index))} />
					</Tooltip>

					<Tooltip title='Lấy dòng này làm tin nhắn hiện tại'>
						<FiEdit className='cursor-pointer mx-2 w-8 h-8 hover:scale-125' onClick={changeFormData} />
					</Tooltip>
				</div>
			</div>
		</Fragment>
	);
};
export default memo(CommentMain);
