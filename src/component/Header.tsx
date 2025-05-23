import { Fragment, memo } from 'react';
import { BsListUl } from 'react-icons/bs';
import { HiOutlineVideoCamera } from 'react-icons/hi';
import { IoCallOutline } from 'react-icons/io5';
import { MdArrowBack } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { Profile } from '../interface/IMessage';
import { RootState } from '../store/store';
type IProps = {
	type: string;
};
const Header = (props: IProps) => {
	const { type } = props;
	if (type === 'custome') {
		return <HeaderCustome />;
	} else {
		return <HeaderLogic />;
	}
};

const HeaderLogic = () => {
	const profile = useSelector<RootState, Profile>(s => s.profileReducer.profile);
	const { userName, status } = profile;

	function convertTime(time: number) {
		const checkTime = Math.floor(time / 60);
		if (time === 0) return 'Vừa mới truy cập';
		if (checkTime < 24) {
			if (checkTime < 1) return `Truy cập ${time} phút trước`;
			if (checkTime >= 1) return `Truy cập ${checkTime} giờ trước`;
		}
		if (checkTime > 24) {
			return 'Truy cập ' + Math.floor(time / 1440) + ' ngày trước';
		}
	}

	return (
		<Fragment>
			<div className='h-[48px] w-[480px] bg-gradient-to-r from-[#267AFF] to-[#01BAFA] flex border-b'>
				<div className='iconBack h-full w-[48px] flex justify-center items-center'>
					<MdArrowBack className='w-[50%] h-[50%] ml-1 fill-white' />
				</div>

				<div className='header-content flex flex-col h-full flex-grow font-segoe '>
					<span className='text-gray-50 ml-[0.4rem] mt-[4px] font-robo font-medium'>{userName}</span>
					<div className='text-[0.7rem] ml-[0.4rem] mt-[-2px] text-white text-opacity-70 leading-3 tracking-[-0.015rem]'>{convertTime(+status)}</div>
				</div>

				<div className='icon-call w-[48px] h-full flex justify-center items-center'>
					<IoCallOutline className='w-[45%] h-[45%] ml-1 stroke-white' />
				</div>
				<div className='icon-video-call w-[48px] h-full flex justify-center items-center'>
					<HiOutlineVideoCamera id='icon_video' className='stroke-white w-full h-[60%] ml-1' />
				</div>
				<div className='icon-more w-[48px] h-full flex justify-center items-center '>
					<BsListUl className='fill-white w-full h-[45%] ml-1' />
				</div>
			</div>
		</Fragment>
	);
};

const HeaderCustome = () => {
	return <div><img src="https://i.postimg.cc/wTPVSLVy/image.png" alt="header_zalo" className=''/></div>;
};
export default memo(Header);
