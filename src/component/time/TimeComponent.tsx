import React, { Fragment } from 'react';
import { Author, CommentType, TypeOfTime } from '../../interface/IComment';
import { convertToShortenTime } from '../../helpers';

type ITime = { type?: TypeOfTime; value: string };
interface Props {
	time: ITime;
	author: Author;
	comment: CommentType;
}

const TimeComponent = ({ time, author, comment }: Props) => {
	function render(time: ITime) {
		if (author === 'me') {
			if (comment.type === 'text') {
				return <p className='timeStamp_text_me_inner '>{convertToShortenTime(time.value)}</p>;
			} else {
				return (
					<span className='text-[10px] text-gray-100 font-segoe tracking-widest bg-gray-400 self-start rounded-xl px-1 mt-2'>
						{convertToShortenTime(time.value)}
					</span>
				);
			}
		}
		if (author === 'you') {
			if (comment.type === 'text') {
				return <p className='timeStamp_text_you_inner'>{convertToShortenTime(time.value)}</p>;
			} else {
				return (
					<span className='text-[10px] text-gray-100 font-segoe tracking-widest bg-gray-400 self-start rounded-xl px-1 ml-9 mt-2'>
						{convertToShortenTime(time.value)}
					</span>
				);
			}
		}
	}

	return <Fragment>{render(time)}</Fragment>;
};
export default TimeComponent;
