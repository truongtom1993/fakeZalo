import React, { Fragment } from 'react';
import { useAppSelector } from '../hooks';

interface IProps {
	width?: string;
	height?: string;
	isFirstMessage?: boolean;
	isLastOfMessageList?: boolean;
}

const Avatar = ({ width, height, isFirstMessage, isLastOfMessageList }: IProps) => {
	const avatarURL = useAppSelector<any>(s => s.profileReducer.profile.avatarURL);
	return (
		<Fragment>
			{isFirstMessage || isLastOfMessageList ? (
				<div
					className='rounded-full w-7 h-7 border bg-center bg-cover bg-no-repeat box-content flex-shrink-0'
					style={{ backgroundImage: `url(${avatarURL})`, width, height }}
				></div>
			) : (
				<div className='rounded-full w-7 h-7 box-content flex-shrink-0' style={{ width, height }}></div>
			)}
		</Fragment>
	);
};
export default Avatar;
