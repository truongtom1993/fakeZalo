import { Fragment } from 'react'
import { BsListUl } from 'react-icons/bs'
import { HiOutlineVideoCamera } from 'react-icons/hi'
import { IoCallOutline } from 'react-icons/io5'
import { MdArrowBack } from 'react-icons/md'

interface Props {
	name: string,
	time: number
}

const Header = ({ name, time }: Props) => {
	let timeStamp;
	const checkTime = Math.floor(time / 60);
	
	if (checkTime < 24  ){
		if (checkTime < 1 ) timeStamp = time + ' phút';
		if (checkTime >= 1)	timeStamp = checkTime + ' giờ';
	}
	if (checkTime > 24 ) {
		timeStamp = Math.floor(time/1440) + ' ngày'
	}

	return (<Fragment>
		<div className='h-[48px] bg-gradient-to-r from-[#2474f1] to-[#01afec] flex border-b'>
			<div className="iconBack h-full w-[48px] flex justify-center items-center">
				<MdArrowBack className='w-[50%] h-[50%] ml-1 fill-white' />
			</div>

			<div className="header-content flex flex-col h-full flex-grow font-segoe tracking-[-0.015rem]">
				<div className="text-white ml-[0.4rem] mt-[2px]">{name}</div>
				<div className="text-xs ml-2 mt-[-2px] text-white text-opacity-70">Truy cập {timeStamp} trước</div>
			</div>

			<div className="icon-call w-[48px] h-full flex justify-center items-center">
				<IoCallOutline className='w-[45%] h-[45%] ml-1 stroke-white' />
			</div>
			<div className="icon-video-call w-[48px] h-full flex justify-center items-center">
				<HiOutlineVideoCamera id='icon_video' className='stroke-white w-full h-[60%] ml-1'/>
			</div>
			<div className="icon-more w-[48px] h-full flex justify-center items-center ">
				<BsListUl className='fill-white w-full h-[45%] ml-1'/>
			</div>
		</div>
	</Fragment>)
}
export default Header