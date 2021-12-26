import React, {useCallback, useEffect, useLayoutEffect, useMemo, useState, useContext, useReducer, useRef, Suspense, memo, lazy, Fragment} from 'react'
import { Comment } from '../../interface/IComment'
interface Props{
	data: Comment
}
const CommentCall = ({data}: Props) => {

	return (<Fragment>
		<div>
			Comment Call
		</div>
	</Fragment>)
}
export default CommentCall