import React, {
	useCallback,
	useEffect,
	useLayoutEffect,
	useMemo,
	useState,
	useContext,
	useReducer,
	useRef,
	Suspense,
	memo,
	lazy,
	Fragment,
} from "react";
import { BsPlusSquareDotted } from "react-icons/bs";
import { Comment } from "../../interface/IComment";
import CommentCall from "./CommentCall";
import CommentImage from "./CommentImage";
import CommentRecord from "./CommentRecord";
import CommentText from "./CommentText";
interface Props {
	data: Comment;
	isLastCommentText?: boolean;
}
const CommentMain = ({ data, isLastCommentText }: Props) => {
	function renderComment(type: string) {
		switch (type) {
			case "image":
				return <CommentImage data={data} />;
			case "text":
				return <CommentText data={data} isLastComment={isLastCommentText} />;
			case "call":
				return <CommentCall data={data} />;
			case "record":
				return <CommentRecord data={data} />;
		}
	}

	return (
		<Fragment>
			<div className="comment_container px-2 relative">
				{renderComment(data.comment.type)}
				<BsPlusSquareDotted className="icon_edit_comment cursor-pointer" onClick={() => console.log(1)} />
			</div>
		</Fragment>
	);
};
export default CommentMain;
