import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import React, { ReactChild, useState } from 'react';
import { useDispatch } from 'react-redux';
import { importCurrentComment } from '../../slice/CurrentCommentSlice';
import { importCommentList } from '../../slice/DataSlice';
import { importProfile } from '../../slice/ProfileSlice';

interface IProps {
	children?: ReactChild;
}

const UploadFile = ({ children }: IProps) => {
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
			if (commentListReducer) {
				dispatch(importCommentList({ data: commentListReducer.data }));
			}
			if (currentCommentReducer) {
				dispatch(
					importCurrentComment({ currentComment: currentCommentReducer.currentComment, currentCommentReply: currentCommentReducer.currentCommentReply }),
				);
			}
			if (profileReducer) {
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
			setFileList([file]);
			return false;
		},
		fileList,
	};
	return (
		<>
			<div className='flex space-x-2 justify-center items-start'>
				<Upload accept='.json,application/json' showUploadList={true} maxCount={1} className='max-w-[10rem]' {...props}>
					<Button icon={<UploadOutlined />}>Import File</Button>
				</Upload>
				<Button className='m-0 text-white' type='dashed' onClick={handleUpload} disabled={fileList.length === 0} loading={uploading}>
					{uploading ? 'Uploading' : 'Start Upload'}
				</Button>
				{children}
			</div>
		</>
	);
};

export default UploadFile;
