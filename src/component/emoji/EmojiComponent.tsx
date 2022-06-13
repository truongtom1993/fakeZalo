import { message } from 'antd';
import React, { Fragment, useEffect, useRef } from 'react';
import { Author, Emoji } from '../../interface/IMessage';
import { store } from '../../store/store';
import EmojiIcon from './EmojiIcon';
interface Props {
	type?: string;
	number?: number;
	author: Author;
	isEndOfList?: boolean;
}

const EmojiComponent = ({ type, number, author, isEndOfList }: Props) => {
	const ref = useRef(null);
	useEffect(() => {
		let parent: any;
		if (ref.current) {
			parent = ref.current.parentElement;
			parent.classList.add('mb-[14px]');
		}
		return () => {
			parent && parent.classList.remove('mb-[14px]');
		};
	}, [type]);

	return (
		<Fragment>
			{author === 'you' && isEndOfList && (
				<div className='flex_emoji' ref={ref}>
					{number > 0 && (
						<div className='icon_count_emoji mr-1'>
							<EmojiIcon type={type} />
							<span className='ml-[0.15rem] text-gray-400 font-segoe'>{number}</span>
						</div>
					)}
					<div className='icon-emoji'>
						<EmojiIcon type={Emoji.HeartEmpty} />
					</div>
				</div>
			)}
			{type && number > 0 && (
				<div className='flex_emoji' ref={ref}>
					<div className='icon_count_emoji mr-1'>
						<EmojiIcon type={type} />
						<span className='ml-[0.15rem] text-gray-400 font-segoe'>{number}</span>
					</div>
					<div className='icon-emoji'>
						<EmojiIcon type={author === 'me' || isEndOfList ? Emoji.HeartEmpty : type} />
					</div>
				</div>
			)}
		</Fragment>
	);
};
export default EmojiComponent;
