import React, { useCallback, useEffect, useLayoutEffect, useMemo, useState, useContext, useReducer, useRef, Suspense, memo, lazy, Fragment } from 'react';
import Avatar from '../Avatar';
import { IoMdShareAlt } from 'react-icons/io';
import Emoji from '../emoji/EmojiComponent';
import { Comment } from '../../interface/IComment';

interface Props {
	data: Comment;
}

const CommentImage = ({ data }: Props) => {
	const { author, comment, time, emoji } = data;

	function render() {
		if (author === 'you') {
			return (
				<Fragment>
					<div className={`comment-container flex ` + (emoji?.number ? 'mb-4 mt-2' : 'my-4')}>
						<Avatar />
						<div className='comment-image-flx'>
							<img src={comment.type === 'image' && comment.imageUrl} alt='image-content' className='comment-image' />

							<span className='hd-label'>HD</span>

							<div className='icon-emoji'>
								<Emoji type={emoji?.type} />
							</div>

							<div className='icon-count-heart'>
								<Emoji type={emoji?.type} />
								<span className='ml-[0.15rem] text-gray-600'>{emoji?.number}</span>
							</div>
						</div>
						<div className='icon-share-image'>
							<IoMdShareAlt />
						</div>
					</div>
				</Fragment>
			);
		}
		if (author === 'me') {
			return (
				<Fragment>
					<div className={`comment-container flex flex-row-reverse mr-2 ` + (emoji?.number ? 'mb-4 mt-2' : 'my-4')}>
						<div className='comment-image-flx'>
							<img src={comment.type === 'image' && comment.imageUrl} alt='image-content' className='comment-image' />

							<span className='hd-label'>HD</span>

							<div className='icon-count-heart'>
								<Emoji type={emoji?.type} />
								<span className='ml-[0.15rem] text-gray-600'>{emoji?.number}</span>
							</div>

							<div className='icon-emoji'>
								<Emoji type={emoji?.type} />
							</div>
						</div>
						<div className='icon-share-image'>
							<IoMdShareAlt />
						</div>
					</div>
				</Fragment>
			);
		}
	}

	return <Fragment>{render()}</Fragment>;
};
export default CommentImage;
