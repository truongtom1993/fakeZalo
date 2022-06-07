import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Divider, Form, Input, InputNumber, Modal, Select } from 'antd';
import moment from 'moment';
import React, { Fragment, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { converCommentToDataForm, converDataFormToComment } from '../../helpers';
import { useAppSelector } from '../../hooks';
import { Comment, Emoji, TypeOfTime } from '../../interface/IComment';
import { exampleCurrentCommentReply, ICurrentCommentReply } from '../../slice/CurrentCommentSlice';
import { addComment, changeCommentById, setRandomTime } from '../../slice/DataSlice';
import FormCommentType from './FormCommentType';

export interface IDataForm {
	index: number;
	user: 'me' | 'you';
	idComment: string;
	idReply: string;
	timeType: TypeOfTime;
	timeValue: moment.Moment | string;
	emoji: string;
	numberEmoji: number | undefined;
	commentType: 'text' | 'call' | 'image' | 'record';
	textContent?: string;
	imageURL?: string;
	callType?: string;
	callDuration?: string;
	recordDuration?: string;
}

const { Option } = Select;

const initFormValues = {
	user: 'me',
	idComment: '',
	idReply: '',
	timeType: 'auto',
	timeValue: moment(),
	emoji: '',
	numberEmoji: 0,
	commentType: 'text',
	callType: 'incomming',
	stepRandomTime: 600,
};

const FormAnt = () => {
	const [form] = Form.useForm();
	const { setFieldsValue, getFieldsValue } = form;
	const dispatch = useDispatch();
	const currentComment = useAppSelector<Comment>(s => s.currentCommentReducer.currentComment);
	const currentCommentReply = useAppSelector<ICurrentCommentReply>(s => s.currentCommentReducer.currentCommentReply);

	useEffect(() => {
		setForm(currentComment, 'load');
	}, [currentComment]);

	useEffect(() => {
		// if (currentCommentReply.idReply !== currentComment.id && currentComment.index > currentCommentReply.index) {
		setFieldsValue({ idReply: currentCommentReply.idReply });
		// }
	}, [currentCommentReply]);

	const onFinish = (values: IDataForm) => {
		setForm(values, 'edit');
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo);
	};
	function onChange(value: any) {
		console.log(`selected ${value}`);
	}

	const resetForm = () => {
		form.resetFields();
	};
	const setForm = (data: any, type: 'load' | 'edit' | 'add') => {
		if (type === 'load') {
			const result = converCommentToDataForm(data);
			setFieldsValue(result);
			return;
		}

		if (type === 'edit') {
			const index = data.index;
			const newData = converDataFormToComment({ ...data, index }, form.getFieldValue('idReply') ? currentCommentReply : exampleCurrentCommentReply);
			dispatch(changeCommentById({ id: newData.id, data: newData }));
			return;
		}

		if (type === 'add') {
			const newData = converDataFormToComment(getForm(), exampleCurrentCommentReply);
			dispatch(addComment({ data: newData }));
			return;
		}
	};

	const getForm = () => {
		return { ...getFieldsValue(true), index: currentComment.index };
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
	const handleChangeEmoji = (e: string) => {
		const numberEmoji = form.getFieldValue('numberEmoji');
		if (!numberEmoji) setFieldsValue({ numberEmoji: 1 });
		if (!e) setFieldsValue({ numberEmoji: void 0 });
	};

	const randomTime = () => {
		const randomTime = form.getFieldValue('randomTime') || moment();
		const stepRandomTime = form.getFieldValue('stepRandomTime') || 600;
		const startTime = randomTime && randomTime.format('YYYY-MM-DD HH:mm:ss');
		dispatch(setRandomTime({ startTime, stepTime: stepRandomTime }));
	};
	// ('YYYY-MM-DD HH:mm:ss')
	return (
		<Fragment>
			<Form
				name='basic'
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 16 }}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				initialValues={initFormValues}
				autoComplete='off'
				form={form}
			>
				<div>
					<Form.Item label='User' name='user' labelAlign='left' required>
						<Select>
							<Option value='you'>You</Option>
							<Option value='me'>Me</Option>
						</Select>
					</Form.Item>

					<Form.Item label='ID Comment' name='idComment' labelAlign='left'>
						<Input disabled />
					</Form.Item>

					<Form.Item label='Index' name='index' labelAlign='left'>
						<Input disabled />
					</Form.Item>

					<Form.Item label='ID Reply' name='idReply' labelAlign='left'>
						<Input allowClear />
					</Form.Item>
				</div>
				<Divider>
					<b>Time</b>
				</Divider>
				<div>
					<Form.Item label='Vị trí time' name='timeType' labelAlign='left'>
						<Select>
							<Option value='auto'>Auto</Option>
							<Option value='separate'>Giữa</Option>
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
						<Select placeholder='Icon' allowClear onChange={e => handleChangeEmoji(e)}>
							<Option value={Emoji.Like}>👍 Like</Option>
							<Option value={Emoji.Heart}>❤ Heart</Option>
							<Option value={Emoji.Lol}>😁 Lol</Option>
							<Option value={Emoji.Wow}>😮 Wow</Option>
							<Option value={Emoji.Cry}>😭 Cry</Option>
							<Option value={Emoji.Angry}>😡 Angry</Option>
						</Select>
					</Form.Item>
				</div>
				<div>
					<Col span={24}>
						<Form.Item name='numberEmoji' label='Số lượng' labelAlign='left'>
							<InputNumber min={1} onChange={onChange} className='inputNumber' />
						</Form.Item>
					</Col>
				</div>

				<Divider>
					<b>Comment</b>
				</Divider>

				<FormCommentType currentComment={currentComment} />

				<div className='flex gap-2'>
					<Button type='default' htmlType='submit'>
						Edit
					</Button>
					<Button onClick={createComment}>Add</Button>
					<Button onClick={resetForm}>Reset Form</Button>
					<Button onClick={confirm}>ClearAllData</Button>
				</div>

				<Divider>
					<b>Random Time</b>
				</Divider>

				<div>
					<Form.Item label='Start Time' name='randomTime' labelAlign='left'>
						<DatePicker showTime className='datePicker' />
					</Form.Item>
				</div>
				<div>
					<Form.Item label='Step Time' name='stepRandomTime' labelAlign='left'>
						<InputNumber step={100} min={100} className='inputNumber' />
					</Form.Item>
				</div>

				<div className='mt-2 flex justify-center'>
					<Button className='flex-1' onClick={randomTime}>
						Random Time
					</Button>
				</div>
			</Form>
		</Fragment>
	);
};

export default FormAnt;
