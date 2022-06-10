import { Col, Form, Input, InputNumber, Select } from 'antd';
import React, { Fragment, useEffect, useMemo, useState } from 'react';
import { Message } from '../../interface/IMessage';

const { Option } = Select;
const { TextArea } = Input;

interface IProps {
	currentMessage: Message;
}

const FormMessageType = ({ currentMessage }: IProps) => {
	const [messageTypeState, setMessageTypeState] = useState<string>();
	const [callType, setCallType] = useState('incomming');

	useEffect(() => {
		setMessageTypeState(currentMessage.message.type);
		if (currentMessage.message.type === 'call') {
			setCallType(currentMessage.message.callType);
		}
	}, [currentMessage]);

	function renderMessageInput(type: string = 'text') {
		switch (type) {
			case 'text':
				return (
					<Form.Item name='textContent' wrapperCol={{ span: 24 }}>
						<TextArea rows={4} allowClear />
					</Form.Item>
				);
			case 'image':
				return (
					<Col span={24}>
						<Form.Item name='imageURL' wrapperCol={{ span: 24 }}>
							<Input type='text' placeholder='URL' allowClear />
						</Form.Item>
					</Col>
				);
			case 'call':
				return (
					<Fragment>
						<Form.Item name='callType' label='callType' labelAlign='left'>
							<Select placeholder='Call Type' onChange={e => setCallType(e)}>
								<Option value='incomming'>Incomming</Option>
								<Option value='outgoing'>Outgoing</Option>
								<Option value='missed'>Missed</Option>
							</Select>
						</Form.Item>
						{callType !== 'missed' && (
							<Form.Item name='callDuration' label='Duration' labelAlign='left' tooltip='Thời lượng cuộc gọi (giây)'>
								<InputNumber name='callDuration' min={1} className='inputNumber' />
							</Form.Item>
						)}
					</Fragment>
				);
			case 'record':
				return (
					<Form.Item name={'recordDuration'} label='Duration' labelAlign='left' tooltip='Thời lượng đoạn ghi âm (giây)'>
						<Input type='text' className='' />
					</Form.Item>
				);
		}
	}
	return (
		<Fragment>
			<div>
				<Form.Item label='Loại message' name='messageType' labelAlign='left' required>
					<Select placeholder='Chọn loại tin nhắn' onChange={e => setMessageTypeState(e)}>
						<Option value='text'>Văn bản</Option>
						<Option value='image'>Ảnh</Option>
						<Option value='call'>Cuộc gọi</Option>
						<Option value='record'>Ghi âm</Option>
					</Select>
				</Form.Item>
			</div>

			<div>{renderMessageInput(messageTypeState)}</div>
		</Fragment>
	);
};
export default FormMessageType;
