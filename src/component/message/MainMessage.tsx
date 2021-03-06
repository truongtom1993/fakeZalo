import { message, Tooltip } from 'antd';
import React, { Fragment, memo, useRef } from 'react';
import { BiDownArrow, BiUpArrow } from 'react-icons/bi';
import { BsReplyAll } from 'react-icons/bs';
import { FiEdit } from 'react-icons/fi';
import { GoDiffRemoved } from 'react-icons/go';
import { useDispatch } from 'react-redux';
import { convertMessageToMessageReply } from '../../helpers';
import { useAppSelector } from '../../hooks';
import { Message } from '../../interface/IMessage';
import { changeCurrentMessage, changeCurrentMessageReply, exampleCurrentMessage, IMessageReply, ICurrentMessageReply } from '../../slice/CurrentMessageSlice';
import { addMessage, removeMessageByIndex } from '../../slice/DataSlice';
import { createExampleMessage } from '../../utils';
import MessageCall from './MessageCall';
import MessageImage from './MessageImage';
import MessageRecord from './MessageRecord';
import MessageText from './MessageText';
import SeparateTime from './SeparateTime';

interface IProps {
	index: number;
	data: Message;
	isLastMessage: boolean;
	isFirstMessage: boolean;
}

const MessageMain = (props: IProps) => {
	const { index, data } = props;
	const dispatch = useDispatch();
	const currentMessage = useAppSelector<Message>(s => s.currentMessageReducer.currentMessage);

	function renderMessage(type: string) {
		if (data.author === 'separate' || data.time.type === 'separate') {
			return <SeparateTime separateTime={data.time.value} />;
		}
		switch (type) {
			case 'image':
				return <MessageImage {...props} />;
			case 'text':
				return <MessageText {...props} />;
			case 'call':
				return <MessageCall {...props} />;
			case 'record':
				return <MessageRecord {...props} />;
		}
	}

	const changeFormData = () => {
		dispatch(changeCurrentMessage({ ...data, index }));
	};

	const removeMessage = () => {
		dispatch(removeMessageByIndex(index));
		dispatch(changeCurrentMessage(exampleCurrentMessage));
	};
	const addPrev = () => {
		// tao message moi
		const newData = createExampleMessage(index);

		dispatch(addMessage({ index, data: newData }));
		dispatch(changeCurrentMessage(newData));
	};
	const addNext = () => {
		// tao message moi
		const newData = createExampleMessage(index + 1);

		dispatch(addMessage({ index: index + 1, data: newData }));
		dispatch(changeCurrentMessage(newData));
	};
	const getReplyId = (messageReply: ICurrentMessageReply) => {
		if (currentMessage.message.type !== 'text') {
			return message.warning('Tin nh???n hi???n t???i ph???i l?? d???ng text m???i c?? th??? tr??? th??nh tin nh???n Reply');
		}
		if (currentMessage.index <= messageReply.index) {
			return message.warn('Tin nh???n reply ph???i ph??a tr??n tin nh???n hi???n t???i');
		}
		if (messageReply.type === 'call') {
			return message.warn('Kh??ng th??? reply cu???c g???i');
		}
		message.success('L???y ID Reply th??nh c??ng');
		dispatch(changeCurrentMessageReply(messageReply));
	};

	return (
		<Fragment>
			<div
				className={
					'message_container px-2 relative flex items-center ' +
					(`type_${data.message.type}_${data.author} author_${data.author} ` + (data.author === 'me' ? 'flex-row-reverse' : ''))
				}
			>
				<Fragment>{renderMessage(data.message.type)}</Fragment>

				<div className='icon_edit_message absolute left-1/2 -translate-x-1/2 flex items-center bg-gray-100 bg-opacity-70 px-2 rounded-lg shadow-lg z-10'>
					<Tooltip title='Th??m tin nh???n m???i b??n tr??n tin nh???n n??y'>
						<BiUpArrow className='cursor-pointer mx-2 w-10 h-10 hover:scale-125' onClick={addPrev} />
					</Tooltip>
					<Tooltip title='Th??m tin nh???n m???i b??n d?????i tin nh???n n??y'>
						<BiDownArrow className='cursor-pointer mx-2 w-10 h-10 hover:scale-125' onClick={addNext} />
					</Tooltip>
					<Tooltip title='X??a tin nh???n n??y'>
						<GoDiffRemoved className='cursor-pointer mx-2 w-8 h-8 stroke-[0.3] hover:scale-125' onClick={removeMessage} />
					</Tooltip>
					<Tooltip title='L???y ID c???a tin nh???n l??m ID Reply'>
						<BsReplyAll className='cursor-pointer mx-2 w-11 h-11 hover:scale-125' onClick={() => getReplyId(convertMessageToMessageReply(data, index))} />
					</Tooltip>

					<Tooltip title='L???y d??ng n??y l??m tin nh???n hi???n t???i'>
						<FiEdit className='cursor-pointer mx-2 w-8 h-8 hover:scale-125' onClick={changeFormData} />
					</Tooltip>
				</div>
			</div>
		</Fragment>
	);
};
export default memo(MessageMain);
