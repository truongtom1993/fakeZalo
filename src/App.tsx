import { useState } from 'react'
import './stylesheet/reset.css'
import './stylesheet/App.css'
import './stylesheet/tailwind.css'
import { listComment, profile } from './data/data'
import Header from './component/Header'
import Footer from './assets/img/footer.png'
import CommentMain from './component/comment'

function App() {
	

	return (
		<div className="App ml-10 mt-10 mb-10 shadow-lg font-segoe">
			<Header name={profile.name} status={profile.status} />
			<div className="main bg-[#E2E9F1] overflow-y-scroll flex-grow flex-col overscroll-y-contain">
				{listComment.map((element,index) => {
					return <CommentMain key={index} data={element} isLastCommentText={(element.author=== listComment[index-1]?.author && element.comment.type !== listComment[index+1]?.comment?.type) ? true : false}/>
				})}
			</div>
			<div className="footer">
				<img src={Footer} alt="footer" className='h-[48px]' />
			</div>
		</div>
	)
}

export default App
