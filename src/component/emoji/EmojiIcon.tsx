import React, { useCallback, useEffect, useLayoutEffect, useMemo, useState, useContext, useReducer, useRef, Suspense, memo, lazy, Fragment } from 'react';
import { IoMdHeartEmpty } from 'react-icons/io';
import { Emoji } from '../../interface/IMessage';
import { EMOJI_ICON } from '../../constant';
// import allIcon from '../../assets/icons/all_emoji.png';
interface Props {
	type?: string;
}

const allIcon = 'https://i.postimg.cc/yxT1L8my/all-emoji.png';

const EmojiIcon = ({ type }: Props) => {
	function renderEmoji(type: string) {
		if (type === Emoji.HeartEmpty) {
			return <IoMdHeartEmpty className='opacity-70' />;
		}
		return (
			<span className='emoji-sizer' style={{ background: `url(${allIcon}) repeat scroll ${EMOJI_ICON[type]}` }}>
				{type}
			</span>
		);

		// switch (type) {
		// 	case Emoji.HeartEmpty:
		// 		return <IoMdHeartEmpty className='opacity-70' />;
		// 	case Emoji.Like:
		// 		return (
		// 			<span className='emoji-sizer' style={{ background: `url(${allIcon}) repeat scroll 84% 82.5% / 5100%` }}>
		// 				{type}
		// 			</span>
		// 		);
		// 	case Emoji.Heart:
		// 		return (
		// 			<span className='emoji-sizer' style={{ background: `url(${allIcon}) repeat scroll 84% 72.5% / 5100%` }}>
		// 				{type}
		// 			</span>
		// 		);
		// 	case Emoji.Lol:
		// 		return (
		// 			<span className='emoji-sizer' style={{ background: `url(${allIcon}) repeat scroll 82% 7.5% / 5100%` }}>
		// 				{type}
		// 			</span>
		// 		);
		// 	case Emoji.Wow:
		// 		return (
		// 			<span className='emoji-sizer' style={{ background: `url(${allIcon}) repeat scroll 84% 20% / 5100%` }}>
		// 				{type}
		// 			</span>
		// 		);
		// 	case Emoji.Cry:
		// 		return (
		// 			<span className='emoji-sizer' style={{ background: `url(${allIcon}) repeat scroll 84% 2.5% / 5100%` }}>
		// 				{type}
		// 			</span>
		// 		);
		// 	case Emoji.Angry:
		// 		return (
		// 			<span className='emoji-sizer' style={{ background: `url(${allIcon}) repeat scroll 84% 5% / 5100%` }}>
		// 				{type}
		// 			</span>
		// 		);
		// }
	}

	return <Fragment>{renderEmoji(type)}</Fragment>;
};
export default EmojiIcon;
