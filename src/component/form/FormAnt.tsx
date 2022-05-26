import { Form, Input, Button, Checkbox, Select, DatePicker, Row, Col, InputNumber, Radio, Divider } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Comment } from '../../interface/IComment';
import { changeProfile } from '../../slice/ProfileSlice';
import { RootState } from '../../store/store';
import moment from 'moment';
import FormCommentType from './FormCommentType';

const { Option } = Select;

const formField = {
	user: 'me',
	idComment: '',
	idReply: '',
	timeLocation: '',
	timeValue: '',
	emoji: '',
	numberEmoji: 1,
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
		setForm(currentComment);
	}, [currentComment]);

	const onFinish = (values: any) => {
		setForm(values);
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
	const handleChangeProfile = () => {
		dispatch(
			changeProfile({
				name: 'Truong Tom',
				status: Math.round(Math.random() * 60),
				avatar: 'src/assets/img/avatar.png',
			}),
		);
	};

	const resetForm = () => {
		form.resetFields();
	};
	const setForm = (data: any) => {
		const result = {
			user: data?.author || '',
			idComment: data?.id || '',
			idReply: data?.reply || '',
			timeLocation: data?.time?.type || '',
			// timeValue: data?.time?.value || '',
			emoji: data?.emoji?.type || '',
			numberEmoji: data?.emoji?.number || '',
			separateTimeValue: data?.separate?.time || '',
			commentType: data?.comment?.type || '',
			textContent: data.comment?.content,
		};

		const result2 = {
			timeValue: moment('2020-01-03', 'YYYY-MM-DD'),
		};

		setFieldsValue(result);
	};

	const getForm = () => {
		const result = getFieldsValue(true);
		console.info(`🎁 src/component/form/FormAnt.tsx	Line:80	ID:f1620c`, result);
	};
	const handleUserChange = (value: string) => {
		switch (value) {
			case 'You':
				form.setFieldsValue({ timeLocation: 'left' });
				break;
			case 'Me':
				form.setFieldsValue({ timeLocation: 'right' });
				break;
			default:
				break;
		}
	};
	const handleSelectEmoji = () => {};

	return (
		<div className='flex h-auto border-2 rounded p-2 mr-2'>
			<Form
				name='basic'
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 16 }}
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
						<DatePicker showTime onChange={onChange} onOk={onOk} className='datePicker' />
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
					<Button type='default' htmlType='submit'>
						Add
					</Button>
					<Button onClick={resetForm}>Reset Form</Button>
					<Button type='default' onClick={handleChangeProfile}>
						Change profile
					</Button>
				</div>
			</Form>
		</div>
	);
};

export default FormAnt;
