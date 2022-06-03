import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

interface IProps {
	width?: string;
	height?: string;
	isFirstComment?: boolean;
}

const Avatar = ({ width, height, isFirstComment }: IProps) => {
	const avatarURL = useSelector<RootState, any>(s => s.profileReducer.profile.avatarURL);
	return (
		<Fragment>
			{isFirstComment ? (
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
