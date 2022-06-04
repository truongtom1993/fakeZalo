import React, { useCallback, useEffect, useLayoutEffect, useMemo, useState, useContext, useReducer, useRef, Suspense, memo, lazy, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { ICurrentCommentReply } from '../../slice/CurrentCommentSlice';
import { RootState } from '../../store/store';
interface IProps {
	commentReply: ICurrentCommentReply;
}
const CommentReply = ({ commentReply }: IProps) => {
	const idReply2 = useSelector<RootState, { idReply: string; index: number }>(s => s.currentCommentReducer.currentCommentReply);

	return <Fragment>{commentReply && commentReply.idReply && <div>{idReply2.idReply}</div>}</Fragment>;
};
export default CommentReply;
