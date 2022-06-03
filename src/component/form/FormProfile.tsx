import React, { useCallback, useEffect, useLayoutEffect, useMemo, useState, useContext, useReducer, useRef, Suspense, memo, lazy, Fragment } from 'react';
import { Form, Input, Button, Checkbox, Select, DatePicker, Row, Col, InputNumber, Radio, Divider } from 'antd';
import { changeProfile } from '../../slice/ProfileSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Profile } from '../../interface/IComment';
import { RootState } from '../../store/store';
import html2canvas from 'html2canvas';

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
	const captureZalo = () => {
		// html2canvas(document.getElementById('zalo_main')).then(canvas => {
		// 	document.body.appendChild(canvas);
		// });
		// const findEl = document.getElementById('zalo_main');
		// html2canvas(findEl).then(canvas => {
		// 	const link = document.createElement('a');
		// 	document.body.appendChild(link);
		// 	link.download = 'cmp-image.jpg';
		// 	link.href = canvas.toDataURL();
		// 	link.click();
		// 	link.remove();
		// });
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

				<div className='flex gap-2'>
					<Button type='default' onClick={captureZalo}>
						Capture
					</Button>
				</div>
			</Form>
		</Fragment>
	);
};
export default FormProfile;
