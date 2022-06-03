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
		if (author === 'me' && comment.type === 'text') {
			return <p className='timeStamp_text_me_inner '>{convertToShortenTime(time.value)}</p>;
		}
		if (author === 'you' && comment.type === 'text') {
			return <p className='timeStamp_text_you_inner'>{convertToShortenTime(time.value)}</p>;
		}
	}

	return <Fragment>{render(time)}</Fragment>;
};
export default TimeComponent;
