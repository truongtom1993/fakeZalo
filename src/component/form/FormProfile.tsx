import { Button, Form, Input } from 'antd';
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
				<div>
					<Form.Item label='User Name' name='userName' labelAlign='left'>
						<Input />
					</Form.Item>
				</div>
				<div>
					<Form.Item label='Status' name='status' labelAlign='left' tooltip='Phút'>
						<Input />
					</Form.Item>
				</div>
				<div>
					<Form.Item label='Avatar URL' name='avatarURL' labelAlign='left'>
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
