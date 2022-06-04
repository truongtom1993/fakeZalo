import React, { Fragment, useEffect, useRef } from 'react';
import EmojiIcon from './EmojiIcon';
interface Props {
	type?: string;
	number?: number;
}

const EmojiComponent = ({ type, number }: Props) => {
	const ref = useRef(null);
	useEffect(() => {
		let parent: any;
		if (ref.current) {
			parent = ref.current.parentElement;
			parent.classList.add('mb-3');
		}
		return () => {
			parent && parent.classList.remove('mb-3');
		};
	}, [type]);

	return (
		<Fragment>
			{type && number > 0 && (
				<div className='flex_emoji' ref={ref}>
					<div className='icon_count_emoji mr-1'>
						<EmojiIcon type={type} />
						<span className='ml-[0.15rem] text-gray-600 font-segoe'>{number}</span>
					</div>
					<div className='icon-emoji'>
						<EmojiIcon type={type} />
					</div>
				</div>
			)}
		</Fragment>
	);
};
export default EmojiComponent;
