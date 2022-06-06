import React, { Fragment } from 'react';
import { IoMdShareAlt } from 'react-icons/io';
import { Comment } from '../../interface/IComment';
import Avatar from '../Avatar';
import EmojiComponent from '../emoji/EmojiComponent';
import TimeComponent from '../time/TimeComponent';

interface Props {
	index: number;
	data: Comment;
	isLastComment: boolean;
	isFirstComment: boolean;
}

const CommentImage = ({ index, data, isFirstComment, isLastComment }: Props) => {
	const { author, comment, time, emoji } = data;

	function render() {
		if (author === 'you') {
			return (
				<div className='flex flex-col'>
					<div className={`flex ` + (emoji?.number ? 'mt-2' : 'my-4')}>
						<Avatar isFirstComment={isFirstComment} />
						<div className='comment-image-flx'>
							<img src={comment.type === 'image' && comment.imageUrl} alt='image-content' className='comment-image' />
							<span className='hd-label'>HD</span>
							<EmojiComponent type={emoji?.type} number={emoji?.number} />
						</div>
						<div className='icon-share-image'>
							<IoMdShareAlt />
						</div>
					</div>
					{isLastComment && <TimeComponent time={time} comment={comment} author={author} />}
				</div>
			);
		}
		if (author === 'me') {
			return (
				<div className='flex flex-col'>
					<>
						<div className={`flex flex-row-reverse mr-2 ` + (emoji?.number ? 'mt-2' : 'my-4')}>
							<div className='comment-image-flx'>
								<img src={comment.type === 'image' && comment.imageUrl} alt='image-content' className='comment-image' />
								<span className='hd-label'>HD</span>
								<EmojiComponent type={emoji?.type} number={emoji?.number} />
							</div>
							<div className='icon-share-image'>
								<IoMdShareAlt />
							</div>
						</div>
					</>
					<div className='ml-10'>{isLastComment && <TimeComponent time={time} comment={comment} author={author} />}</div>
				</div>
			);
		}
	}

	return <Fragment>{render()}</Fragment>;
};
export default CommentImage;
