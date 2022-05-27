import React, { useCallback, useEffect, useLayoutEffect, useMemo, useState, useContext, useReducer, useRef, Suspense, memo, lazy, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Profile } from '../interface/IComment';
import { RootState } from '../store/store';

const Avatar = () => {
	const avatarURL = useSelector<RootState, any>(s => s.profileReducer.profile.avatarURL);
	return (
		<Fragment>
			<div className='rounded-full w-7 h-7 border box-content bg-contain bg-no-repeat flex-shrink-0' style={{ backgroundImage: `url(${avatarURL})` }}></div>
		</Fragment>
	);
};
export default Avatar;
