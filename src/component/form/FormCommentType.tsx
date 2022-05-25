import React, { Fragment, useEffect, useState } from 'react';
import { Form, Input, Button, Checkbox, Select, DatePicker, Row, Col, InputNumber } from 'antd';

const { Option } = Select;
const { TextArea } = Input;

interface IProps {
	commentType: string;
}

const FormCommentType = ({ commentType = 'text' }: IProps) => {
	const [commentTypeState, setCommentTypeState] = useState<string>();
	const [callType, setCallType] = useState('incomming');

	useEffect(() => {
		setCommentTypeState(commentType);
	}, [commentType]);

	function renderCommentInput(type: string = 'text') {
		switch (type) {
			case 'text':
				return (
					<Form.Item name='textContent'>
						<TextArea rows={9} className='border rounded-md w-full p-2' placeholder='maxLength is 6' />
					</Form.Item>
				);
			case 'image':
				return (
					<Fragment>
						<Form.Item>
							<Input
								type='file'
								className='file:px-3 file:rounded-sm file:font-bold file:bg-white file:border hover:file:bg-gray-100 file:py-1 file:cursor-pointer'
							/>
						</Form.Item>
						<Form.Item name='imageContent'>
							<Input type='text' className='border px-2 w-full rounded-md mt-2' placeholder='URL' />
						</Form.Item>
					</Fragment>
				);
			case 'call':
				return (
					<Fragment>
						<div className='space-x-2 flex'>
							<Form.Item name='callType' label='callType'>
								<Select placeholder='Call Type' onChange={e => setCallType(e)}>
									<Option value='incomming'>Incomming</Option>
									<Option value='outgoing'>Outgoing</Option>
									<Option value='missed'>Missed</Option>
								</Select>
							</Form.Item>
						</div>
						{callType !== 'missed' && (
							<div className='space-x-2 flex'>
								<span>Duration: </span>
								<Form.Item name='callDuration'>
									<Input type='text' className='px-2 border rounded-md' name='callDuration' />
								</Form.Item>
							</div>
						)}
					</Fragment>
				);
			case 'record':
				return (
					<div>
						<div className='space-x-2 flex'>
							<span>Duration: </span>
							<Form.Item name={'recordDuration'}>
								<Input type='text' className='px-2 border rounded-md' />
							</Form.Item>
						</div>
					</div>
				);
		}
	}
	return (
		<Fragment>
			<Row>
				<Col span={14}>
					<Form.Item label='Loại comment' name='commentType' labelAlign='left' labelCol={{ span: 10, offset: 0 }}>
						<Select placeholder='Chọn loại comment' onChange={e => setCommentTypeState(e)}>
							<Option value='text'>Văn bản</Option>
							<Option value='image'>Ảnh</Option>
							<Option value='call'>Cuộc gọi</Option>
							<Option value='record'>Ghi âm</Option>
						</Select>
					</Form.Item>
				</Col>
			</Row>
			<Row>
				<Col flex='auto'>{renderCommentInput(commentTypeState)}</Col>
			</Row>
		</Fragment>
	);
};
export default FormCommentType;
