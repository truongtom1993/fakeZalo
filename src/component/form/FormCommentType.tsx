import { Col, Form, Input, Select } from 'antd';
import React, { Fragment, useEffect, useMemo, useState } from 'react';
import { Comment } from '../../interface/IComment';

const { Option } = Select;
const { TextArea } = Input;

interface IProps {
	currentComment: Comment;
}

const FormCommentType = ({ currentComment }: IProps) => {
	const [commentTypeState, setCommentTypeState] = useState<string>();
	const [callType, setCallType] = useState('incomming');

	useEffect(() => {
		setCommentTypeState(currentComment.comment.type);
	}, [currentComment]);

	function renderCommentInput(type: string = 'text') {
		switch (type) {
			case 'text':
				return (
					<Form.Item name='textContent' wrapperCol={{ span: 24 }}>
						<TextArea rows={4} />
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
								<Input type='text' className='' name='callDuration' />
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
				<Form.Item label='Loại comment' name='commentType' labelAlign='left' required>
					<Select placeholder='Chọn loại comment' onChange={e => setCommentTypeState(e)}>
						<Option value='text'>Văn bản</Option>
						<Option value='image'>Ảnh</Option>
						<Option value='call'>Cuộc gọi</Option>
						<Option value='record'>Ghi âm</Option>
					</Select>
				</Form.Item>
			</div>

			<div>{renderCommentInput(commentTypeState)}</div>
		</Fragment>
	);
};
export default FormCommentType;
