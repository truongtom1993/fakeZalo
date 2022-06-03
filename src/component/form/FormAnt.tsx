import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Divider, Form, Input, InputNumber, Modal, Select } from 'antd';
import moment from 'moment';
import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { converDataFormToComment } from '../../helpers';
import { Comment, TypeOfTime } from '../../interface/IComment';
import { addComment, changeCommentById } from '../../slice/DataSlice';
import { RootState } from '../../store/store';
import FormCommentType from './FormCommentType';

export interface IData {
	user: 'me' | 'you';
	commentType: 'text' | 'call' | 'image' | 'record';
	emoji: string;
	idComment: string;
	idReply: string;
	numberEmoji: number;
	textContent?: string;
	imageURL?: string;
	callType?: string;
	callDuration?: string;
	recordDuration?: string;
	timeType: TypeOfTime;
	timeValue: moment.Moment;
}

const { Option } = Select;

const formField: IData = {
	user: 'me',
	idComment: '',
	idReply: '',
	timeType: 'auto',
	timeValue: moment(),
	emoji: '',
	numberEmoji: 0,
	commentType: 'text',
	callType: 'incomming',
};

const FormAnt = () => {
	const [form] = Form.useForm();
	const { setFieldsValue, getFieldsValue } = form;
	const dispatch = useDispatch();
	const currentComment = useSelector<RootState, Comment>(s => s.currentCommentReducer.currentComment);

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
					timeType: data?.time?.type || null,
					timeValue: type === 'load' ? moment(new Date(timeValue)) : data.timeValue,
					emoji: data?.emoji?.type || '',
					numberEmoji: data?.emoji?.number || '',
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
	const handleUserChange = (value: string) => {};
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
			</Form>
		</Fragment>
	);
};

export default FormAnt;
