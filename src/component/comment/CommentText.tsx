import React, { Fragment, memo } from 'react';
import { Comment } from '../../interface/IComment';
import Avatar from '../Avatar';
import EmojiComponent from '../emoji/EmojiComponent';
import TimeComponent from '../time/TimeComponent';

interface Props {
	data: Comment;
	isLastComment?: boolean;
}
const CommentText = ({ data, isLastComment }: Props) => {
	const { author, comment, time, emoji } = data;
	console.info(`🎁 src/component/comment/CommentText.tsx	Line:13	ID:a4d5a7`, time);

	function render() {
		if (author === 'you') {
			return (
				<Fragment>
					<div className='flex'>
						<Avatar />
						<div className={'comment-text-main relative ml-1 bg-white'}>
							<span className='text-base text-gray-800 pb-1 mb-2'>{comment.type === 'text' && comment.textContent}</span>
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
							<span className='text-base text-gray-800 pb-1'>{comment.type === 'text' && comment.textContent}</span>
							<EmojiComponent type={emoji?.type} number={emoji?.number} />
							{isLastComment && <TimeComponent time={time} comment={comment} author={author} />}
						</div>
					</div>
				</Fragment>
			);
		}
	}
	return <div className='my-2 flex flex-col'>{render()}</div>;
};
export default memo(CommentText);
