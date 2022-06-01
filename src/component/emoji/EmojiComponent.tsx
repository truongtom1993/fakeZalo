import React, { Fragment } from 'react';
import EmojiIcon from './EmojiIcon';
interface Props {
	type?: string;
	number?: number;
}

const EmojiComponent = ({ type, number }: Props) => {
	return (
		<Fragment>
			<div className='flex_emoji'>
				<div className='icon_count_emoji mr-1'>
					<EmojiIcon type={type} />
					<span className='ml-[0.15rem] text-gray-600 font-segoe'>{number}</span>
				</div>
				<div className='icon-emoji'>
					<EmojiIcon type={type} />
				</div>
			</div>
		</Fragment>
	);
};
export default EmojiComponent;
