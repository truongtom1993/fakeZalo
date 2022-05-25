import React, { Fragment, useState } from 'react';
import { Form, Input, Button, Checkbox, Select, DatePicker, Row, Col, InputNumber } from 'antd';

const { Option } = Select;
const { TextArea } = Input;

const FormCommentType = () => {
	const [commentType, setCommentType] = useState<string>('text');
	const [callType, setCallType] = useState('incomming');

	function renderCommentInput(type: string = 'text') {
		switch (type) {
			case 'text':
				return (
					<Form.Item name='textContent'>
						{' '}
						<TextArea rows={9} className='border rounded-md w-full p-2' placeholder='maxLength is 6' />
					</Form.Item>
				);
			case 'image':
				return (
					<Fragment>
						<Input
							type='file'
							className='file:px-3 file:rounded-sm file:font-bold file:bg-white file:border hover:file:bg-gray-100 file:py-1 file:cursor-pointer'
						/>
						<Form.Item name='imageContent'>
							<Input type='text' className='border px-2 w-full rounded-md mt-2' placeholder='URL' />
						</Form.Item>
					</Fragment>
				);
			case 'call':
				return (
					<Fragment>
						<div className='space-x-2'>
							<span>Call Type:</span>
							<label htmlFor='Incomming'>Incomming</label>
							<Input type='radio' name='call_type' id='Incomming' onChange={() => setCallType('incomming')} />
							<label htmlFor='Outgoing'>Outgoing</label>
							<Input type='radio' name='call_type' id='Outgoing' onChange={() => setCallType('outgoing')} />
							<label htmlFor='Missed'>Missed</label>
							<Input type='radio' name='call_type' id='Missed' onChange={() => setCallType('missed')} />
						</div>
						{callType !== 'missed' && (
							<div className='space-x-2'>
								<span>Duration: </span>
								<Input type='text' className='px-2 border rounded-md' name='callDuration' />
							</div>
						)}
					</Fragment>
				);
			case 'record':
				return (
					<div>
						<div className='space-x-2'>
							<span>Duration: </span>
							<Input type='text' className='px-2 border rounded-md ' name='recordDuration' />
						</div>
					</div>
				);
		}
	}
	return (
		<Fragment>
			<div className='flex flex-col'>
				<Form.Item label='Loại comment' name='commentType'>
					<Select placeholder='Chọn loại comment' onChange={e => setCommentType(e)}>
						<Option value='text'>Văn bản</Option>
						<Option value='image'>Ảnh</Option>
						<Option value='call'>Cuộc gọi</Option>
						<Option value='record'>Ghi âm</Option>
					</Select>
				</Form.Item>

				<div className='pt-2'>{renderCommentInput(commentType)}</div>
			</div>
		</Fragment>
	);
};
export default FormCommentType;
