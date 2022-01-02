import { Fragment, useEffect, useRef, useState } from "react";
import "./stylesheet/reset.css";
import "./stylesheet/App.css";
import "./stylesheet/tailwind.css";
import { listComment, profile } from "./data/data";
import Header from "./component/Header";
import Footer from "./assets/img/footer.png";
import CommentMain from "./component/comment";
import { HiOutlineChevronDoubleDown } from "react-icons/hi";
import Form from "./component/form";
import { Comment } from "./interface/IComment";
import { useAppSelector } from "./hooks";

function App() {
	const [scrollProcess, setScrollProcess] = useState(true);
	const [data, setData] = useState(listComment)
	const state = useAppSelector(state => state.ListCommentReducer)

	useEffect(() => {
		window.localStorage.setItem('data', JSON.stringify(state.data))
		console.log(state.data);
		
	}, [state.data])
	const commentContainerRef = useRef();

	function getScrollProcess(event: React.UIEvent<HTMLElement>) {
		const target = event.target as Element;
		const containerScrollHeight = target.scrollHeight;
		const containerScrollTop = target.scrollTop;
		
		(containerScrollTop/containerScrollHeight) >= 0.23 ? setScrollProcess(false) : setScrollProcess(true);
	}

	function changeCommentContainerScroll() {
		const element = commentContainerRef.current as Element;
		element.scrollTop = element.scrollHeight;
	}

	return (
		<div className="flex justify-end items-center">
			<Form/>
			<div className="App shadow-lg font-segoe relative mr-10">
				<Header name={profile.name} status={profile.status} />
				<div
					className="main bg-[#E2E9F1] overflow-y-scroll flex-grow flex-col"
					onScroll={getScrollProcess}
					ref={commentContainerRef}
				>
					{state.data.map((element, index) => {
						return (
							<CommentMain
								key={index}
								data={element}
								isLastCommentText={
									element.author === listComment[index - 1]?.author &&
									element.comment.type !== listComment[index + 1]?.comment?.type
										? true
										: false
								}
							/>
						);
					})}
				</div>

				<div className="footer">
					<img src={Footer} alt="footer" className="h-[48px]" />
				</div>
				{scrollProcess && (
					<div
						className="bg-white rounded-full shadow-lg absolute bottom-16 right-4 h-8 w-8 flex justify-center items-center cursor-pointer"
						onClick={changeCommentContainerScroll}
					>
						<HiOutlineChevronDoubleDown className="opacity-70" />
					</div>
				)}
			</div>
		</div>
	);
}

export default App;
