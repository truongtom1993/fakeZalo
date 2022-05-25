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
};

const FormAnt = () => {
	const [form] = Form.useForm();
	const { setFieldsValue, getFieldsValue } = form;
	const dispatch = useDispatch();
	const currentComment = useSelector<RootState, Comment | {}>(s => s.currentCommentReducer.currentComment);

	useEffect(() => {
		setForm(currentComment);
	}, [currentComment]);

	const onFinish = (values: any) => {
		console.log('Success:', values);
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
					<Form.Item label='user' name='user'>
						<Select placeholder='Chọn người gửi'>
							<Option value='You'>You</Option>
							<Option value='Me'>Me</Option>
						</Select>
					</Form.Item>
					<Form.Item label='ID Comment' name='idComment'>
						<Input />
					</Form.Item>
					<Form.Item label='ID Reply' name='idReply'>
						<Input />
					</Form.Item>
				</Row>

				<Row justify='space-between'>
					<Col span={12}>
						<Form.Item label='Vị trí time' name='timeLocation' labelCol={{ span: 12, offset: 0 }}>
							<Select placeholder='Chọn ví trí hiển thị thời gian'>
								<Option value='Trái'>Trái</Option>
								<Option value='Giữa'>Giữa</Option>
								<Option value='Phải'>Phải</Option>
							</Select>
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item label='Chọn thời gian' name='timeValue'>
							<DatePicker showTime onChange={onChange} onOk={onOk} />
						</Form.Item>
					</Col>
				</Row>

				<Row>
					<Col span={12}>
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
					<Col span={12}>
						<Form.Item name='numberEmoji' label='Số lượng'>
							<InputNumber min={1} max={10} onChange={onChange} />
						</Form.Item>
					</Col>
				</Row>

				<Row>
					<Form.Item label='Dấu phân cách thời gian' name='separateTimeValue'>
						<DatePicker showTime onChange={onChange} onOk={onOk} />
					</Form.Item>
				</Row>

				<Row>
					<FormCommentType />
				</Row>

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
			<Button onClick={getForm}>GetForm</Button>
			<Button onClick={setForm}>SetForm</Button>
			<Button onClick={resetForm}>ResetField</Button>
		</div>
	);
};

export default FormAnt;
