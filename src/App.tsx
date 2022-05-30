import { useEffect, useRef, useState } from 'react';
import { HiOutlineChevronDoubleDown } from 'react-icons/hi';
import Footer from './assets/img/footer.png';
import CommentMain from './component/comment';
import FormAnt from './component/form/FormAnt';
import FormProfile from './component/form/FormProfile';
import Header from './component/Header';
import { listComment } from './data/data';
import { useAppSelector } from './hooks';
import './stylesheet/App.css';
import './stylesheet/reset.css';
import './stylesheet/tailwind.css';

function App() {
	const [scrollProcess, setScrollProcess] = useState(true);
	const commentList = useAppSelector(state => state.commentListReducer);
	const commentContainerRef = useRef(null);

	function getScrollProcess(event: React.UIEvent<HTMLElement>) {
		const target = event.target as Element;
		const containerScrollHeight = target.scrollHeight;
		const containerScrollTop = target.scrollTop;

		containerScrollTop / containerScrollHeight >= 0.23 ? setScrollProcess(false) : setScrollProcess(true);
	}

	function changeCommentContainerScroll() {
		const element = commentContainerRef.current as Element;
		element.scrollTop = element.scrollHeight;
	}

	return (
		<div className='pl-2 pt-2 flex'>
			<div className='App font-segoe relative mr-2'>
				<Header />
				<div className='main bg-[#E2E9F1] overflow-y-scroll flex-grow flex-col w-[480px]' onScroll={getScrollProcess} ref={commentContainerRef}>
					{commentList.data.map((element, index) => {
						return (
							<CommentMain
								key={index}
								data={element}
								isLastCommentText={
									element.author === listComment[index - 1]?.author && element.comment.type !== listComment[index + 1]?.comment?.type ? true : false
								}
							/>
						);
					})}
				</div>

				<div className='footer'>
					<img src={Footer} alt='footer' className='h-[48px]' />
				</div>
				{scrollProcess && (
					<div
						className='bg-white rounded-full shadow-lg absolute bottom-16 right-4 h-8 w-8 flex justify-center items-center cursor-pointer'
						onClick={changeCommentContainerScroll}
					>
						<HiOutlineChevronDoubleDown className='opacity-70' />
					</div>
				)}
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
