import { Button, Divider, Form, Input, InputNumber } from 'antd';
import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Profile } from '../../interface/IComment';
import { changeProfile } from '../../slice/ProfileSlice';
import { RootState } from '../../store/store';

const FormProfile = () => {
	const [form] = Form.useForm();
	const dispatch = useDispatch();
	const profile = useSelector<RootState, Profile>(s => s.profileReducer.profile);

	const handleChangeProfile = () => {
		const data = form.getFieldsValue();
		dispatch(changeProfile(data));
	};
	const getProfile = () => {
		form.setFieldsValue(profile);
	};
	return (
		<Fragment>
			<Form name='basic' labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} autoComplete='off' form={form} initialValues={profile}>
				<Divider>
					<b>Thông tin của You</b>
				</Divider>
				<div>
					<Form.Item label='User Name' name='userName' labelAlign='left'>
						<Input />
					</Form.Item>
				</div>
				<div>
					<Form.Item label='Status' name='status' labelAlign='left' tooltip='(Phút), với 0 là vừa mới truy cập'>
						<InputNumber min={0} className='inputNumber' />
					</Form.Item>
				</div>

				<div className='my-6 h-32 aspect-square mx-auto rounded-md'>
					<img src={profile.avatarURL} alt='You avatar' />
				</div>

				<div>
					<Form.Item label='Avatar URL' name='avatarURL' labelAlign='left'>
						<Input allowClear />
					</Form.Item>
				</div>

				<Divider>
					<b>Thông tin của Me</b>
				</Divider>

				<div>
					<Form.Item label='User Name' name='myName' labelAlign='left'>
						<Input />
					</Form.Item>
				</div>

				<div className='my-6 h-32 aspect-square mx-auto border flex justify-center items-center rounded-md'>
					<img src={profile.myAvatarUrl} alt='My Avatar' />
				</div>

				<div>
					<Form.Item label='Avatar Me URL' name='myAvatarUrl' labelAlign='left'>
						<Input allowClear />
					</Form.Item>
				</div>

				<div className='flex gap-2'>
					<Button type='default' onClick={handleChangeProfile}>
						Change profile
					</Button>
					<Button type='default' onClick={getProfile}>
						Get profile
					</Button>
				</div>
			</Form>
		</Fragment>
	);
};
export default FormProfile;
