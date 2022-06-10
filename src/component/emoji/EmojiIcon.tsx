import React, { useCallback, useEffect, useLayoutEffect, useMemo, useState, useContext, useReducer, useRef, Suspense, memo, lazy, Fragment } from 'react';
import { Emoji } from '../../interface/IMessage';
interface Props {
	type?: string;
}

const EmojiIcon = ({ type }: Props) => {
	function renderEmoji(type: string | undefined) {
		switch (type) {
			case Emoji.Like:
				return (
					<span className='emoji-sizer' style={{ background: `url(src/assets/icons/all_emoji.png) repeat scroll 84% 82.5% / 5100%` }}>
						{type}
					</span>
				);
			case Emoji.Heart:
				return (
					<span className='emoji-sizer' style={{ background: `url(src/assets/icons/all_emoji.png) repeat scroll 84% 72.5% / 5100%` }}>
						{type}
					</span>
				);
			case Emoji.Lol:
				return (
					<span className='emoji-sizer' style={{ background: `url(src/assets/icons/all_emoji.png) repeat scroll 82% 7.5% / 5100%` }}>
						{type}
					</span>
				);
			case Emoji.Wow:
				return (
					<span className='emoji-sizer' style={{ background: `url(src/assets/icons/all_emoji.png) repeat scroll 84% 20% / 5100%` }}>
						{type}
					</span>
				);
			case Emoji.Cry:
				return (
					<span className='emoji-sizer' style={{ background: `url(src/assets/icons/all_emoji.png) repeat scroll 84% 2.5% / 5100%` }}>
						{type}
					</span>
				);
			case Emoji.Angry:
				return (
					<span className='emoji-sizer' style={{ background: `url(src/assets/icons/all_emoji.png) repeat scroll 84% 5% / 5100%` }}>
						{type}
					</span>
				);
		}
	}

	return <Fragment>{renderEmoji(type)}</Fragment>;
};
export default EmojiIcon;
