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
		// if (time.type === 'left') {
		// 	return <p className='text-[10px] px-2 mr-2 mt-2 ml-9 text-white bg-gray-400 bg-opacity-80 rounded-xl self-start font-robo'>da nhan</p>;
		// }
		if (author === 'me' && comment.type === 'text') {
			return <p className='timeStamp_text_me_inner '>{convertToShortenTime(time.value)}</p>;
		}
		if (author === 'you' && comment.type === 'text') {
			return <p className='timeStamp_text_you_inner'>{convertToShortenTime(time.value)}</p>;
		}
		if (time.type === 'center') {
			return (
				<p className='text-[10px] px-2 font-robo mr-2 mb-2 mt-3 h-[16px] flex items-center text-white bg-gray-400 bg-opacity-80 rounded-xl self-center'>
					{time.value}
				</p>
			);
		}
	}

	return <Fragment>{render(time)}</Fragment>;
};
export default TimeComponent;
