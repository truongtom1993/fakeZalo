import React, { useState } from 'react';
import { Modal, Button, Space } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const confirm = () => {
	Modal.confirm({
		title: 'Confirm',
		icon: <ExclamationCircleOutlined />,
		content: 'Xác nhận xóa toàn bộ dữ liệu',
		okText: 'Đồng ý',
		cancelText: 'Hủy bỏ',
	});
};

const App = () => (
	<Space>
		<Button onClick={confirm}>Confirm</Button>
	</Space>
);

export default App;
