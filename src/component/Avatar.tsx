import React, { useCallback, useEffect, useLayoutEffect, useMemo, useState, useContext, useReducer, useRef, Suspense, memo, lazy, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Profile } from '../interface/IComment';
import { RootState } from '../store/store';

interface IProps {
	width?: string;
	height?: string;
}

const Avatar = ({ width, height }: IProps) => {
	const avatarURL = useSelector<RootState, any>(s => s.profileReducer.profile.avatarURL);
	return (
		<Fragment>
			<div
				className='rounded-full w-7 h-7 border bg-center bg-cover bg-no-repeat box-content flex-shrink-0'
				style={{ backgroundImage: `url(${avatarURL})`, width, height }}
			></div>
		</Fragment>
	);
};
export default Avatar;
