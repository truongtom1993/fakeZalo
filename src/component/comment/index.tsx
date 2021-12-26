import React, { useCallback, useEffect, useLayoutEffect, useMemo, useState, useContext, useReducer, useRef, Suspense, memo, lazy, Fragment } from 'react'
import { Comment } from '../../interface/IComment'
import CommentCall from './CommentCall';
import CommentImage from './CommentImage';
import CommentRecord from './CommentRecord';
import CommentText from './CommentText';
interface Props {
	data: Comment,
	isLastCommentText?: boolean
}
const CommentMain = ({ data, isLastCommentText }: Props) => {

	function renderComment(type: string) {
		switch (type) {
			case 'image':
				return <CommentImage data={data} />
			case 'text':
				return <CommentText data={data} isLastComment={isLastCommentText} />;
			case 'call':
				return <CommentCall data={data} />;
			case 'record':
				return <CommentRecord data={data} />;
		}
	}

	return <Fragment>
		<div className='px-2'>
			{renderComment(data.comment.type)}
		</div>
	</Fragment>
}
export default CommentMain