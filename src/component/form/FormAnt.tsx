import { Form, Input, Button, Checkbox, Select, DatePicker, Row, Col, InputNumber } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Comment } from '../../interface/IComment';
import { changeProfile } from '../../slice/ProfileSlice';
import { RootState } from '../../store/store';
import moment from 'moment';
import FormCommentType from './FormCommentType';

const { Option } = Select;

const formField = {
	user: '',
	idComment: '',
	idReply: '',
	timeLocation: '',
	timeValue: '',
	emoji: '',
	numberEmoji: '',
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
				<Row>
					<Col span={4}>
						<Form.Item label='User' name='user'>
							<Select>
								<Option value='You'>You</Option>
								<Option value='Me'>Me</Option>
							</Select>
						</Form.Item>
					</Col>

					<Col span={9} offset={1}>
						<Form.Item label='ID Comment' name='idComment'>
							<Input />
						</Form.Item>
					</Col>

					<Col span={9} offset={1}>
						<Form.Item label='ID Reply' name='idReply'>
							<Input />
						</Form.Item>
					</Col>
				</Row>

				<Row>
					<Col span={9}>
						<Form.Item label='Vị trí time' name='timeLocation'>
							<Select>
								<Option value='Trái'>Trái</Option>
								<Option value='Giữa'>Giữa</Option>
								<Option value='Phải'>Phải</Option>
							</Select>
						</Form.Item>
					</Col>
					<Col span={9} offset={3}>
						<Form.Item label='Chọn thời gian' name='timeValue' labelAlign='left' labelCol={{ span: 11 }}>
							<DatePicker showTime onChange={onChange} onOk={onOk} />
						</Form.Item>
					</Col>
				</Row>

				<Row>
					<Col span={6}>
						<Form.Item name='emoji' label='Emoji'>
							<Select placeholder='Icon'>
								<Option value='Strong'>👍 Like</Option>
								<Option value='Heart'>❤ Heart</Option>
								<Option value='Lol'>😁 Lol</Option>
								<Option value='Wow'>😮 Wow</Option>
								<Option value='Cry'>😭 Cry</Option>
								<Option value='Angry'>😡 Angry</Option>
							</Select>
						</Form.Item>
					</Col>
					<Col flex='auto'>
						<Form.Item name='numberEmoji' label='Số lượng'>
							<InputNumber min={1} max={10} onChange={onChange} />
						</Form.Item>
					</Col>
				</Row>

				<Row>
					<Form.Item label='Dấu phân cách thời gian' name='separateTimeValue' labelCol={{ span: 12 }} labelAlign='left'>
						<DatePicker showTime onChange={onChange} onOk={onOk} />
					</Form.Item>
				</Row>

				<FormCommentType commentType={currentComment.comment?.type} />

				<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
					<Button type='default' htmlType='submit'>
						Sửa
					</Button>
					<Button type='default' htmlType='submit'>
						Thêm mới
					</Button>
					<Button type='default' onClick={handleChangeProfile}>
						Thay đổi profile
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
};

export default FormAnt;
