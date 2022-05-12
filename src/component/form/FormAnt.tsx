import { Form, Input, Button, Checkbox, Select, DatePicker, Row, Col, InputNumber } from 'antd';
import { useDispatch } from 'react-redux';
import { changeProfile } from '../../slice/ProfileSlice';

const { Option } = Select;

const initialValues = { remember: true };

const FormAnt = () => {
	const [form] = Form.useForm();
	const dispatch = useDispatch();

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

	return (
		<div className='flex h-auto border-2 rounded p-2 mr-2'>
			<Form
				name='basic'
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 16 }}
				initialValues={initialValues}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete='off'
				className='border-2 rounded'
			>
				<Row>
					<Form.Item label='Username' name='username' rules={[{ required: true, message: 'Please input your username!' }]}>
						<Input />
					</Form.Item>
				</Row>

				<Row>
					<Form.Item label='User' name='user'>
						<Select placeholder='Chọn người gửi'>
							<Option value='You'>You</Option>
							<Option value='Me'>Me</Option>
						</Select>
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
					<Form.Item label='ID Comment Reply' name='idReply'>
						<Input />
					</Form.Item>
				</Row>

				<Row>
					<Form.Item label='Loại comment' name='commentType'>
						<Select placeholder='Chọn loại comment'>
							<Option value='text'>Văn bản</Option>
							<Option value='image'>Ảnh</Option>
							<Option value='call'>Cuộc gọi</Option>
							<Option value='record'>Ghi âm</Option>
						</Select>
					</Form.Item>
				</Row>

				<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
					<Button type='primary' htmlType='submit'>
						Sửa
					</Button>
					<Button type='primary' htmlType='submit'>
						Thêm mới
					</Button>
					<Button type='primary' onClick={handleChangeProfile}>
						Thay đổi profile
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
};

export default FormAnt;
