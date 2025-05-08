import { Emoji } from '../interface/IMessage';

const EMOJI_ICON: any = {
	[Emoji.HeartEmpty]: 'heartEmpty',
	[Emoji.Like]: '84% 82.5% / 5100%',
	[Emoji.Heart]: '84% 72.5% / 5100%',
	[Emoji.Lol]: '82% 7.5% / 5100%',
	[Emoji.Wow]: '84% 20% / 5100%',
	[Emoji.Cry]: '84% 2.5% / 5100%',
	[Emoji.Angry]: '84% 5% / 5100%',
};

const emoji_icon = {
	heartEmpty: 'heartEmpty',
	'/-strong': '84% 82.5% / 5100%',
	'/-heart': '84% 72.5% / 5100%',
	':>': '82% 7.5% / 5100%',
	':o': '84% 20% / 5100%',
	':-((': '84% 2.5% / 5100%',
	':-h': '84% 5% / 5100%',
};

const EMOJI_KEY = Object.keys(EMOJI_ICON);
console.info(`🎁 src/constant/index.ts	Line:14	ID:bdeb8a`, EMOJI_KEY);

export { EMOJI_ICON, EMOJI_KEY };
