import { Fragment, useRef, useState } from 'react';
import { HiOutlineChevronDoubleDown } from 'react-icons/hi';
import Footer from './assets/img/footer.png';
import Avatar from './component/Avatar';
import CommentMain from './component/comment/CommentMain';
import FormAnt from './component/form/FormAnt';
import FormProfile from './component/form/FormProfile';
import Header from './component/Header';
import { useAppSelector } from './hooks';
import { Comment } from './interface/IComment';
import './stylesheet/App.css';
import './stylesheet/reset.css';
import './stylesheet/tailwind.css';

function throttle(callback: Function, limit: number) {
	let waiting = false;
	return function () {
		if (!waiting) {
			callback.apply(this, arguments);
			waiting = true;
			setTimeout(function () {
				waiting = false;
			}, limit);
		}
	};
}

function App() {
	const [scrollProcess, setScrollProcess] = useState(true);
	const commentList = useAppSelector<Comment[]>(state => state.commentListReducer.data);
	const commentListLength = Array.isArray(commentList) ? commentList.length : 0;
	const commentContainerRef = useRef(null);

	function getScrollProcess(event: React.UIEvent<HTMLElement>) {
		const target = event.target as Element;
		const containerScrollHeight = target.scrollHeight;
		const containerScrollTop = target.scrollTop;

		containerScrollTop + 867 >= containerScrollHeight - 267 ? setScrollProcess(false) : setScrollProcess(true);
	}

	function changeCommentContainerScroll() {
		const element = commentContainerRef.current as Element;
		element.scrollTop = element.scrollHeight;
	}

	return (
		<div className='pl-2 pt-2 flex'>
			<div id='zalo_main' className='App font-segoe relative mr-2'>
				<Header />
				<div className='main bg-[#E2E9F1] overflow-y-scroll flex-grow flex-col w-[480px]' onScroll={throttle(getScrollProcess, 200)} ref={commentContainerRef}>
					{commentList &&
						commentList.map((data, index) => {
							let isFirstComment: boolean = false;
							let isLastCommentAuthor: boolean = false;
							if (data.author !== commentList[index - 1]?.author || commentList[index - 1].time.type === 'separate') {
								isFirstComment = true;
							}
							if (data.author !== commentList[index + 1]?.author || commentList[index + 1].time.type === 'separate') {
								isLastCommentAuthor = true;
							}

							return (
								<Fragment key={index}>
									<CommentMain index={index} data={data} isLastComment={isLastCommentAuthor} isFirstComment={isFirstComment} />

									{index === commentListLength - 1 && (
										<div className='lastComment'>
											<Avatar width='20px' height='20px' isLastOfCommentList />
										</div>
									)}
								</Fragment>
							);
						})}
				</div>

				<div className='footer' onClick={() => setScrollProcess(!scrollProcess)}>
					<img src={Footer} alt='footer' className='h-[48px]' />
				</div>

				<Fragment>
					{scrollProcess && (
						<div
							className='bg-white rounded-full shadow-lg absolute bottom-16 right-4 h-8 w-8 flex justify-center items-center cursor-pointer'
							onClick={changeCommentContainerScroll}
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
