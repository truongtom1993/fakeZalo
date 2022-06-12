import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Divider, Form, Input, InputNumber, Modal, Select } from 'antd';
import moment from 'moment';
import { Fragment, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { converDataFormToMessage, converMessageToDataForm } from '../../helpers';
import { useAppSelector } from '../../hooks';
import { Author, Emoji, Message, TypeOfTime } from '../../interface/IMessage';
import { changeCurrentMessage, exampleCurrentMessageReply, ICurrentMessageReply } from '../../slice/CurrentMessageSlice';
import { addMessage, changeMessageById, importMessageList, setRandomTime } from '../../slice/DataSlice';
import { createExampleMessage } from '../../utils';
import FormMessageType from './FormMessageType';

export interface IDataForm {
	index: number;
	user: Author;
	idMessage: string;
	idReply: string;
	timeType: TypeOfTime;
	timeValue: moment.Moment | string;
	emoji: Emoji;
	numberEmoji: number | undefined;
	messageType: 'text' | 'call' | 'image' | 'record';
	textContent?: string;
	imageURL?: string;
	callType?: string;
	callDuration?: string;
	recordDuration?: string;
}

const { Option } = Select;

const initFormValues = {
	user: 'me',
	idMessage: '',
	idReply: '',
	timeType: 'auto',
	timeValue: moment(),
	emoji: '',
	numberEmoji: 0,
	messageType: 'text',
	callType: 'incomming',
	stepRandomTime: 600,
};

const FormAnt = () => {
	const [form] = Form.useForm();
	const { setFieldsValue, getFieldsValue } = form;
	const dispatch = useDispatch();
	const currentMessage = useAppSelector<Message>(s => s.currentMessageReducer.currentMessage);
	const currentMessageReply = useAppSelector<ICurrentMessageReply>(s => s.currentMessageReducer.currentMessageReply);

	useEffect(() => {
		setForm(currentMessage, 'load');
	}, [currentMessage]);

	useEffect(() => {
		setFieldsValue({ idReply: currentMessageReply.idReply });
	}, [currentMessageReply]);

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
			const result = converMessageToDataForm(data);
			setFieldsValue(result);
			return;
		}

		if (type === 'edit') {
			const index = data.index;
			const newData = converDataFormToMessage({ ...data, index }, form.getFieldValue('idReply') ? currentMessageReply : exampleCurrentMessageReply);
			dispatch(changeMessageById({ id: newData.id, data: newData }));
			return;
		}

		if (type === 'add') {
			const newData = createExampleMessage(-1);
			dispatch(addMessage({ data: newData }));
			dispatch(changeCurrentMessage(newData));
			return;
		}
	};

	const getForm = () => {
		return { ...getFieldsValue(true), index: currentMessage.index };
	};
	const createMessage = () => {
		setForm(void 0, 'add');
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
		dispatch(importMessageList({ data: [] }));
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
	const handleChangeUser = (e: string) => {
		if (e === 'separate') {
			form.setFieldsValue({ timeType: 'separate' });
			return;
		}
		form.setFieldsValue({ timeType: 'auto' });
	};

	const handleChangeTimeType = (e: string) => {
		if (e === 'separate') {
			form.setFieldsValue({ user: 'separate' });
		}
	};

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
					<div className='flex items-center'>
						<span className='w-28 mb-6 whitespace-nowrap'>ID Message: </span>
						<Form.Item name='idMessage' className='flex-grow'>
							<Input disabled />
						</Form.Item>
					</div>

					<div className='flex items-center mb-0'>
						<span className='w-28 mb-6 whitespace-nowrap'>ID Reply: </span>
						<Form.Item name='idReply' className='flex-grow'>
							<Input allowClear disabled className='inputTextField' />
						</Form.Item>
					</div>
				</div>
				<Divider style={{ marginTop: '0' }}>
					<b>Time</b>
				</Divider>
				<div>
					<Form.Item label='Vị trí time' name='timeType' labelAlign='left'>
						<Select onChange={e => handleChangeTimeType(e)}>
							<Option value='auto'>Auto</Option>
							<Option value='separate'>Giữa</Option>
						</Select>
					</Form.Item>
				</div>
				<div>
					<Form.Item label='Chọn thời gian' name='timeValue' labelAlign='left'>
						<DatePicker showTime className='datePicker' placeholder='Chọn ngày giờ' />
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
					<b>Message</b>
				</Divider>
				<div className='flex gap-4'>
					<div className='flex flex-grow space-x-2 w-auto items-center'>
						<span className='mb-6'>User</span>
						<Form.Item name='user' wrapperCol={{ span: 24 }} required>
							<Select onChange={e => handleChangeUser(e)}>
								<Option value='you'>You</Option>
								<Option value='me'>Me</Option>
								<Option value='separate'>Separate Time</Option>
							</Select>
						</Form.Item>
					</div>
					<div className='flex flex-grow space-x-2'>
						<p className='mb-6'>Index: </p>
						<Form.Item name='index'>
							<Input disabled />
						</Form.Item>
					</div>
				</div>

				<FormMessageType currentMessage={currentMessage} />

				<div className='flex gap-2 justify-center'>
					<Button type='primary' htmlType='submit' className='flex-grow text-white'>
						Edit
					</Button>
					<Button onClick={createMessage}>Add</Button>
					<Button type='dashed' onClick={resetForm}>
						Reset Form
					</Button>
					<Button type='dashed' onClick={confirm}>
						ClearAllData
					</Button>
				</div>

				<Divider>
					<b>Random Time</b>
				</Divider>

				<div>
					<Form.Item label='Start Time' name='randomTime' labelAlign='left'>
						<DatePicker showTime className='datePicker' placeholder='Chọn ngày giờ' />
					</Form.Item>
				</div>
				<div>
					<Form.Item label='Step Time' name='stepRandomTime' labelAlign='left' tooltip='Bước nhảy giữa các tin nhắn, đơn vị giây'>
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
