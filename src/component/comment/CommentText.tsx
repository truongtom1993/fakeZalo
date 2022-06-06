import React, { Fragment, memo } from 'react';
import { Comment } from '../../interface/IComment';
import Avatar from '../Avatar';
import EmojiComponent from '../emoji/EmojiComponent';
import TimeComponent from '../time/TimeComponent';
import CommentReply from './CommentReply';

interface Props {
	index: number;
	data: Comment;
	isLastComment: boolean;
	isFirstComment: boolean;
}
const CommentText = ({ data, isLastComment, isFirstComment, index }: Props) => {
	const { author, comment, time, emoji, commentReply } = data;

	function render() {
		if (author === 'you') {
			return (
				<Fragment>
					<div className='flex'>
						<Avatar isFirstComment={isFirstComment} />
						<div className={'comment-text-main relative ml-1 bg-white'}>
							{commentReply.idReply && <CommentReply commentReply={commentReply} />}
							<span className='text-base text-gray-800 pb-1'>{comment.type === 'text' && comment.textContent}</span>
							<EmojiComponent type={emoji?.type} number={emoji?.number} />
							{isLastComment && <TimeComponent time={time} comment={comment} author={author} />}
						</div>
					</div>
				</Fragment>
			);
		}
		if (author === 'me') {
			return (
				<Fragment>
					<div className='flex'>
						<div className={'comment-text-main relative ml-auto mr-2 bg-[#D5F1FF]'}>
							{commentReply.idReply && <CommentReply commentReply={commentReply} />}
							<span className='text-base text-gray-800 pb-1'>{comment.type === 'text' && comment.textContent}</span>
							<EmojiComponent type={emoji?.type} number={emoji?.number} />
							{isLastComment && <TimeComponent time={time} comment={comment} author={author} />}
						</div>
					</div>
				</Fragment>
			);
		}
	}
	return <div className='mb-2 flex flex-col'>{render()}</div>;
};
export default memo(CommentText);
