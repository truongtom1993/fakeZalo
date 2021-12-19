import { useState } from 'react'
import './stylesheet/reset.css'
import './stylesheet/App.css'
import './stylesheet/tailwind.css'
import { data, profile } from './data/data'
import Header from './component/Header'


function App() {

	return (
		<div className="App ml-10 mt-10 shadow-lg">
			<Header name='Chú Hùng' time={20000} />
			<div className="main"></div>
			<div className="footer"></div>
		</div>
	)
}

export default App
