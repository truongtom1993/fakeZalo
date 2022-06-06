import React, { Fragment } from 'react';
import { BiMicrophone } from 'react-icons/bi';
import { useAppSelector } from '../../hooks';
import { Profile } from '../../interface/IComment';
import { ICurrentCommentReply } from '../../slice/CurrentCommentSlice';
interface IProps {
	commentReply: any;
}
const CommentReply = ({ commentReply }: IProps) => {
	const { idReply, data } = commentReply;
	const { myName } = useAppSelector<Profile>(s => s.profileReducer.profile);

	function renderCommentReply(type: string) {
		if (type === 'text') {
			return (
				<div className='truncate pr-2'>
					<p className='truncate my-0 font-semibold'>{myName}</p>
					<p className='truncate text-gray-500 '>{data.comment?.textContent}</p>
				</div>
			);
		}
		if (type === 'image') {
			return (
				<Fragment>
					<img src={data.comment?.imageUrl} alt='' className='h-9 aspect-square self-center mr-3' />
					<div className='truncate pr-2 flex-grow'>
						<p className='truncate my-0 font-semibold'>{myName}</p>
						<div className='truncate text-gray-500 '>{data.comment?.imageUrl}</div>
					</div>
				</Fragment>
			);
		}
		if (type === 'record') {
			return (
				<Fragment>
					<div className='flex'>
						<div className='h-9 aspect-square bg-gray-300 rounded-full self-center mr-3 flex justify-center items-center'>
							<BiMicrophone className='scale-[1.7] opacity-40' />
						</div>
					</div>
					<div className='overflow-hidden pr-2 flex-grow'>
						<p className='truncate my-0 font-semibold'>{myName}</p>
						<p className='truncate text-gray-500'>{`[Tin nhắn thoại]`}</p>
					</div>
				</Fragment>
			);
		}
	}
	return (
		<Fragment>
			{idReply && data.comment.type !== 'call' && (
				<div className='flex h-11 my-1 tracking-normal'>
					<div className='separate_reply'></div>
					<div className='flex flex-grow overflow-hidden'>{renderCommentReply(data.comment.type)}</div>
				</div>
			)}
		</Fragment>
	);
};
export default CommentReply;
