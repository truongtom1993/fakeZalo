import { useState } from 'react'
import './stylesheet/reset.css'
import './stylesheet/App.css'
import './stylesheet/tailwind.css'
import { data, profile } from './data/data'
import Header from './component/Header'
import Footer from './assets/img/footer.png'

function App() {

	return (
		<div className="App ml-10 mt-10 shadow-lg">
			<Header name='Truong Tom' time={31} />
			<div className="main bg-gray-100 overflow-y-auto flex-grow flex-col overscroll-y-contain">
				<div className="h-52 bg-white border"></div>
				<div className="h-52 bg-white border"></div>
				<div className="h-52 bg-white border"></div>
				<div className="h-52 bg-white border"></div>
				<div className="h-52 bg-white border"></div>
				<div className="h-52 bg-white border"></div>
				<div className="h-52 bg-white border"></div>
				<div className="h-52 bg-white border"></div>
				<div className="h-52 bg-white border"></div>
				<div className="h-52 bg-white border"></div>
			</div>
			<div className="footer ">
				<img src={Footer} alt="footer" className='h-[48px]' />
			</div>
		</div>
	)
}

export default App
