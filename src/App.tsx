import { Fragment, useRef, useState } from 'react';
import { HiOutlineChevronDoubleDown } from 'react-icons/hi';
import Footer from './assets/img/footer.png';
import Avatar from './component/Avatar';
import MainMessage from './component/message/MainMessage';
import FormAnt from './component/form/FormAnt';
import FormProfile from './component/form/FormProfile';
import Header from './component/Header';
import { useAppSelector } from './hooks';
import { Message } from './interface/IMessage';
import './stylesheet/App.css';
import './stylesheet/reset.css';
import './stylesheet/tailwind.css';
import { Tooltip } from 'antd';

function throttle(callback: Function, limit: number) {
	let waiting = false;
	return function () {
		if (!waiting) {
			callback.apply(callback, arguments);
			waiting = true;
			setTimeout(function () {
				waiting = false;
			}, limit);
		}
	};
}

const mainHeigth = 867; //px
const minHeigthToScrool = 267; //px

function App() {
	const [scrollProcess, setScrollProcess] = useState(true);
	const messageList = useAppSelector<Message[]>(state => state.messageListReducer.data);
	const messageListLength = Array.isArray(messageList) ? messageList.length : 0;
	const messageContainerRef = useRef(null);

	function getScrollProcess(event: React.UIEvent<HTMLElement>) {
		const target = event.target as Element;
		const containerScrollHeight = target.scrollHeight;
		const containerScrollTop = target.scrollTop;

		containerScrollTop + mainHeigth >= containerScrollHeight - minHeigthToScrool ? setScrollProcess(false) : setScrollProcess(true);
	}

	function changeMessageContainerScroll() {
		const element = messageContainerRef.current as Element;
		element.scrollTop = element.scrollHeight;
	}

	return (
		<div className='pl-2 pt-2 flex'>
			<div id='zalo_main' className='App font-segoe relative mr-2'>
				<Header />
				<div className='main bg-[#E2E9F1] overflow-y-scroll flex-grow flex-col w-[480px]' onScroll={throttle(getScrollProcess, 100)} ref={messageContainerRef}>
					{messageList &&
						messageList.map((data, index) => {
							let isFirstMessage = false;
							let isLastMessageAuthor = false;
							if (data.author !== messageList[index - 1]?.author || messageList[index - 1].time.type === 'separate') {
								isFirstMessage = true;
							}
							if (data.author !== messageList[index + 1]?.author || messageList[index + 1].time.type === 'separate') {
								isLastMessageAuthor = true;
							}

							return (
								<Fragment key={index}>
									<MainMessage index={index} data={data} isLastMessage={isLastMessageAuthor} isFirstMessage={isFirstMessage} />

									{index === messageListLength - 1 && data.author === 'me' && (
										<div className='lastMessage'>
											<Avatar width='20px' height='20px' isLastOfMessageList />
										</div>
									)}
								</Fragment>
							);
						})}
				</div>

				<div className='footer' onClick={() => setScrollProcess(!scrollProcess)}>
					<Tooltip title='Click để ẩn hiện nút Scroll'>
						<img src='https://i.postimg.cc/7YJ7yq5V/footer-zalo.png' alt='footer' className='h-[48px]' />
					</Tooltip>
				</div>

				<Fragment>
					{scrollProcess && (
						<div
							className='bg-white rounded-full shadow-lg absolute bottom-16 right-4 h-8 w-8 flex justify-center items-center cursor-pointer'
							onClick={changeMessageContainerScroll}
						>
							<HiOutlineChevronDoubleDown className='opacity-70' />
						</div>
					)}
				</Fragment>
			</div>

			<div className='flex h-auto border-2 rounded p-2 mr-2'>
				<FormAnt />
			</div>

			<div className='flex h-auto border-2 rounded p-2 mr-2'>
				<FormProfile />
			</div>
		</div>
	);
}

export default App;
