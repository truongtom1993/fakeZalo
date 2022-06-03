import { Form, Input, Button, Checkbox, Select, DatePicker, Row, Col, InputNumber, Radio, Divider, Modal, Space } from 'antd';
import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Comment } from '../../interface/IComment';
import { RootState } from '../../store/store';
import moment from 'moment';
import FormCommentType from './FormCommentType';
import FormProfile from './FormProfile';
import { converDataFormToComment } from '../../helpers';
import { addComment, changeCommentById } from '../../slice/DataSlice';
import React, { useState } from 'react';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { nanoid } from 'nanoid';

export interface IData {
	user: 'me' | 'you';
	commentType: 'text' | 'call' | 'image' | 'record';
	emoji: string;
	idComment: string;
	idReply: string;
	numberEmoji: string;
	separateTimeValue: string;
	textContent?: string;
	imageURL?: string;
	callType?: string;
	callDuration?: string;
	recordDuration?: string;
	timeLocation: string;
	timeValue: moment.Moment;
}

const { Option } = Select;

const formField = {
	user: 'me',
	idComment: '',
	idReply: '',
	timeLocation: '',
	timeValue: '',
	emoji: '',
	numberEmoji: 0,
	separateTimeValue: '',
	commentType: 'text',
	callType: 'incomming',
};

const FormAnt = () => {
	const [form] = Form.useForm();
	const { setFieldsValue, getFieldsValue } = form;
	const dispatch = useDispatch();
	const currentComment = useSelector<RootState, any>(s => s.currentCommentReducer.currentComment);

	useEffect(() => {
		setForm(currentComment, 'load');
	}, [currentComment]);

	const onFinish = (values: any) => {
		setForm(values, 'edit');
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo);
	};
	function onChange(value: any) {
		console.log(`selected ${value}`);
	}

	function onSearch(val: any) {
		console.log('search:', val);
	}
	function onOk(value: any) {
		console.log('onOk: ', value);
	}

	const resetForm = () => {
		form.resetFields();
	};
	const setForm = (data: any, type: 'load' | 'edit' | 'add') => {
		{
			if (type === 'load') {
				const timeValue = data.time?.value;
				const result: IData = {
					user: data?.author || '',
					idComment: data?.id || '',
					idReply: data?.idReply || '',
					timeLocation: data?.time?.type || '',
					timeValue: type === 'load' ? moment(new Date(timeValue)) : data.timeValue,
					emoji: data?.emoji?.type || '',
					numberEmoji: data?.emoji?.number || '',
					separateTimeValue: data?.separate?.time || '',
					commentType: data?.comment?.type || '',
					textContent: '',
					imageURL: '',
					callType: '',
					callDuration: '',
					recordDuration: '',
				};
				switch (result.commentType) {
					case 'text':
						result.textContent = data.comment.textContent || '';
						break;
					case 'image':
						result.imageURL = data.comment?.imageUrl || '';
						break;
					case 'call':
						result.callType = data.comment.callType || '';
						result.callDuration = data.comment.callDuration || '';
						break;
					case 'record':
						result.recordDuration = data.comment.recordDuration || '';
						break;
					default:
						break;
				}

				setFieldsValue(result);
				return;
			}
		}

		{
			if (type === 'edit') {
				const newData = converDataFormToComment(data);
				dispatch(changeCommentById({ id: newData.id, data: newData }));
				return;
			}
		}
		{
			if (type === 'add') {
				const newData = converDataFormToComment(getForm());
				dispatch(addComment({ data: newData }));
				return;
			}
		}
	};

	const getForm = () => {
		const result = getFieldsValue(true);
		return result;
	};
	const handleUserChange = (value: string) => {
		if (value === 'you') return form.setFieldsValue({ timeLocation: 'left' });
		else form.setFieldsValue({ timeLocation: 'right' });
	};
	const createComment = () => {
		setForm(currentComment, 'add');
	};

	const confirm = () => {
		Modal.confirm({
			title: 'Confirm',
			icon: <ExclamationCircleOutlined />,
			content: 'Xác nhận xóa toàn bộ dữ liệu',
			okText: <span className='text-white hover:outline-2'>Đồng ý</span>,
			cancelText: 'Hủy bỏ',
			onOk: confirmClearAllData,
		});
	};
	const confirmClearAllData = () => {
		console.info(`🎁 src/component/form/FormAnt.tsx	Line:128	ID:9aeeab`, 'clear all data');
	};
	return (
		<Fragment>
			<Form
				name='basic'
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 16 }}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				initialValues={formField}
				autoComplete='off'
				form={form}
			>
				<div>
					<Form.Item label='User' name='user' labelAlign='left' required>
						<Select onSelect={(e: string) => handleUserChange(e)}>
							<Option value='you'>You</Option>
							<Option value='me'>Me</Option>
						</Select>
					</Form.Item>
				</div>
				<div>
					<Form.Item label='ID Comment' name='idComment' labelAlign='left' required>
						<Input />
					</Form.Item>
					<Form.Item label='ID Reply' name='idReply' labelAlign='left'>
						<Input />
					</Form.Item>
				</div>
				<Divider>
					<b>Thời gian</b>
				</Divider>
				<div>
					<Form.Item label='Vị trí time' name='timeLocation' labelAlign='left'>
						<Select allowClear>
							<Option value='left'>Trái</Option>
							<Option value='center'>Giữa</Option>
							<Option value='right'>Phải</Option>
						</Select>
					</Form.Item>
				</div>
				<div>
					<Form.Item label='Chọn thời gian' name='timeValue' labelAlign='left'>
						<DatePicker showTime className='datePicker' />
					</Form.Item>
				</div>
				<Divider>
					<b>Icon</b>
				</Divider>
				<div>
					<Form.Item name='emoji' label='Emoji' labelAlign='left'>
						<Select placeholder='Icon' allowClear>
							<Option value='/-strong'>👍 Like</Option>
							<Option value='/-heart'>❤ Heart</Option>
							<Option value=':>'>😁 Lol</Option>
							<Option value=':o'>😮 Wow</Option>
							<Option value=':-(('>😭 Cry</Option>
							<Option value=':-h'>😡 Angry</Option>
						</Select>
					</Form.Item>
				</div>
				<div>
					<Col span={24}>
						<Form.Item name='numberEmoji' label='Số lượng' labelAlign='left'>
							<InputNumber min={1} max={10} onChange={onChange} className='inputNumber' />
						</Form.Item>
					</Col>
				</div>
				<Divider>
					<b>Phân cách thời gian</b>
				</Divider>
				<div>
					<Form.Item label='Separate Time' name='separateTimeValue' labelAlign='left'>
						<DatePicker showTime onChange={onChange} onOk={onOk} className='datePicker' />
					</Form.Item>
				</div>
				<Divider>
					<b>Comment</b>
				</Divider>

				<FormCommentType commentType={currentComment.comment?.type} />

				<div className='flex gap-2'>
					<Button type='default' htmlType='submit'>
						Edit
					</Button>
					<Button onClick={createComment}>Add</Button>
					<Button onClick={resetForm}>Reset Form</Button>
					<Button onClick={confirm}>ClearAllData</Button>
				</div>
			</Form>
		</Fragment>
	);
};

export default FormAnt;
