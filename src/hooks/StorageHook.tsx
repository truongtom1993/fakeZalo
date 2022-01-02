import React, {useCallback, useEffect, useLayoutEffect, useMemo, useState, useContext, useReducer, useRef, Suspense, memo, lazy, Fragment} from 'react'
import { Comment } from '../interface/IComment';

const useStorageHook = (data: Comment) => {
	// const [data, setData] = useState(null)
	const dataStorage = window.localStorage.getItem('data');

	if (!dataStorage) {
		window.localStorage.setItem('data', '');
	}
	if (dataStorage) {
		window.localStorage.setItem('data',JSON.stringify(data))
	}
}
export default useStorageHook