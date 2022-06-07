import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { importCurrentComment } from '../../slice/CurrentCommentSlice';
import { importCommentList } from '../../slice/DataSlice';
import { importProfile } from '../../slice/ProfileSlice';

const UploadFile = () => {
	const [fileList, setFileList] = useState([]);
	const [uploading, setUploading] = useState(false);
	const dispatch = useDispatch();

	const handleUpload = () => {
		if (fileList[0].type !== 'application/json') {
			message.error('Chi co the import file .JSON');
			return;
		}
		const newFile = new FileReader();
		newFile.readAsText(fileList[0]);

		newFile.onload = function () {
			const result = newFile.result;
			const json = JSON.parse(result.toString());
			const { commentListReducer, currentCommentReducer, profileReducer } = json;
			if (commentListReducer || currentCommentReducer || profileReducer) {
				dispatch(
					importCurrentComment({ currentComment: currentCommentReducer.currentComment, currentCommentReply: currentCommentReducer.currentCommentReply }),
				);
				dispatch(importCommentList({ data: commentListReducer.data }));
				dispatch(importProfile({ profile: profileReducer.profile }));
			} else {
				message.error('Dữ liệu không phù hợp nên không thể import, vui lòng kiểm tra lại');
			}
		};
		return;
	};

	const props = {
		onRemove: (file: any) => {
			const index = fileList.indexOf(file);
			const newFileList = fileList.slice();
			newFileList.splice(index, 1);
			setFileList(newFileList);
		},
		beforeUpload: (file: any) => {
			if (fileList.length >= 1) {
				message.error('Chỉ cho phép upload 1 file cùng lúc');
				return false;
			}
			setFileList([...fileList, file]);
			return false;
		},
		fileList,
	};
	return (
		<>
			<Upload accept='.json,application/json' {...props}>
				<Button icon={<UploadOutlined />}>Select File</Button>
			</Upload>
			<Button
				type='primary'
				onClick={handleUpload}
				disabled={fileList.length === 0}
				loading={uploading}
				style={{
					marginTop: 16,
				}}
			>
				{uploading ? 'Uploading' : 'Start Upload'}
			</Button>
		</>
	);
};

export default UploadFile;
