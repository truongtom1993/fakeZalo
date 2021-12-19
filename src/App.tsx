import { useState } from 'react'
import './stylesheet/reset.css'
import './stylesheet/App.css'
import './stylesheet/tailwind.css'
import { data, profile } from './data/data'
import Header from './component/Header'
import Footer from './assets/img/footer.png'

function App() {

	const getArray = (total: number) => {
		const array = []
		for (let i = 0; i < total; i++) {
			array.push(<div className="h-96 bg-white border" key={i}>Index {i+ 1}</div>)
		}
		return array
	}

	return (
		<div className="App ml-10 mt-10 shadow-lg">
			<Header name='Dang Nhat Truong' time={31} />
			<div className="main bg-gray-100 overflow-y-scroll flex-grow flex-col overscroll-y-contain">
				{getArray(100)}
			</div>
			<div className="footer ">
				<img src={Footer} alt="footer" className='h-[48px]' />
			</div>
		</div>
	)
}

export default App
