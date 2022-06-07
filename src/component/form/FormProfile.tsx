import { Button, Divider, Form, Input, InputNumber } from 'antd';
import moment from 'moment';
import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Profile } from '../../interface/IComment';
import { changeProfile } from '../../slice/ProfileSlice';
import { RootState } from '../../store/store';
import { store } from '../../store/store';
import UploadFile from '../upload/Upload';

interface IFormData {
	status: number;
	userName: string;
	avatarURL: string;
	myName: string;
	myAvatarUrl: string;
}

function mapDataToForm(profile: Profile): IFormData {
	return {
		avatarURL: profile.avatarURL,
		myAvatarUrl: profile.myAvatarUrl,
		myName: profile.myName,
		status: profile.status,
		userName: profile.userName,
	};
}

const FormProfile = () => {
	const [form] = Form.useForm();
	const dispatch = useDispatch();
	const profile = useSelector<RootState, Profile>(s => s.profileReducer.profile);

	useEffect(() => {
		form.setFieldsValue(mapDataToForm(profile));
	}, [profile]);

	const handleChangeProfile = () => {
		const data = form.getFieldsValue();
		dispatch(changeProfile(data));
	};
	const getProfile = () => {
		form.setFieldsValue(profile);
	};
	const handleExportData = () => {
		const reduxStore = store.getState();
		const blob = new Blob([JSON.stringify(reduxStore)], { type: 'text/json;charset=utf-8' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = `Export FakeZalo Data ${moment().format('YYYY-MM-DD HH:mm:ss')}.json`;
		a.click();
		URL.revokeObjectURL(url);
	};
	return (
		<Fragment>
			<Form name='basic' labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} autoComplete='off' form={form} initialValues={profile}>
				<Divider>
					<b>Your Profile</b>
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

				<div className='flex mb-4 space-x'>
					<img src={profile.avatarURL} alt='You avatar' className='object-cover h-28 aspect-square mx-auto rounded-lg shadow' />
					<img src={profile.myAvatarUrl} alt='My Avatar' className='object-cover h-28 aspect-square mx-auto rounded-lg shadow' />
				</div>

				<div>
					<Form.Item label='Your Avatar' name='avatarURL' labelAlign='left'>
						<Input allowClear />
					</Form.Item>
				</div>

				<Divider>
					<b>My Profile</b>
				</Divider>

				<div>
					<Form.Item label='My Name' name='myName' labelAlign='left'>
						<Input />
					</Form.Item>
				</div>

				<div>
					<Form.Item label='My Avatar' name='myAvatarUrl' labelAlign='left'>
						<Input allowClear />
					</Form.Item>
				</div>

				<div className='flex gap-2 justify-center'>
					<Button type='default' onClick={handleChangeProfile}>
						Change profile
					</Button>
					<Button type='default' onClick={getProfile}>
						Get profile
					</Button>
				</div>

				<Divider>
					<b>Import/Export</b>
				</Divider>
				<div className='flex gap-2 justify-center'>
					<Button type='default' onClick={handleExportData}>
						Export
					</Button>
				</div>
				<div>
					<UploadFile />
				</div>
			</Form>
		</Fragment>
	);
};
export default FormProfile;
