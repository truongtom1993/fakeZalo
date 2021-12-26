import React, {useCallback, useEffect, useLayoutEffect, useMemo, useState, useContext, useReducer, useRef, Suspense, memo, lazy, Fragment} from 'react'

const Avatar = () => {

	return (<Fragment>
		<div className='rounded-full w-7 h-7 border box-content bg-contain bg-no-repeat flex-shrink-0' style={{backgroundImage: 'url(src/assets/img/avatar.png)'}}>
		</div>
	</Fragment>)
}
export default Avatar