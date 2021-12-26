import React, { useCallback, useEffect, useLayoutEffect, useMemo, useState, useContext, useReducer, useRef, Suspense, memo, lazy, Fragment } from 'react'
import { TypeOfTime } from '../../interface/IComment'
type tTime = { type?: TypeOfTime, value: Date}
interface Props {
	time: tTime
}


const TimeComponent = ({time}: Props) => {
	function render(time: tTime) {
		if (time.type === 'left') {
			return <p className='text-[10px] px-2 mr-2 mt-2 ml-9 text-white bg-gray-400 bg-opacity-80 rounded-xl self-start font-robo'>
				{time.value.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
			</p>
		}
		if (time.type === 'right') {
			return <p className='text-[10px] px-2 mr-2 mt-2 text-white bg-gray-400 bg-opacity-80 rounded-xl self-end font-robo'>
				{time.value.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
			</p>
		}
		if (time.type === 'center') {
			return <p className='text-[10px] px-2 font-robo mr-2 mb-2 mt-3 h-[16px] flex items-center text-white bg-gray-400 bg-opacity-80 rounded-xl self-center'>
				{time.value.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric'})}
			</p>
		}
	}

	return (<Fragment>
		{render(time)}
	</Fragment>)
}
export default TimeComponent