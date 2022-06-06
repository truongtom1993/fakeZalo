import moment from 'moment';
import React, { Fragment } from 'react';
interface IProps {
	separateTime: string;
}
const SeparateTime = ({ separateTime }: IProps) => {
	return (
		<Fragment>
			<div className='m-auto my-2 flex'>
				<p className='text-[10px] px-2 font-segoe h-[16px] flex items-center text-white bg-gray-400 bg-opacity-80 rounded-xl self-center m-auto'>
					{moment(separateTime).format('H:mm, DD/MM/YYYY')}
				</p>
			</div>
		</Fragment>
	);
};
export default SeparateTime;
