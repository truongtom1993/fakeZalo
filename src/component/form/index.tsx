import { nanoid } from "nanoid";
import React, { FormEvent, Fragment } from "react";
import { useDispatch } from "react-redux";
import { Author, Comment, Emoji, TypeOfTime } from "../../interface/IComment";
import { pushData } from "../../slice/DataSlice";
import FormCommentType from "./FormCommentType";

const Form = () => {
	const dispatch = useDispatch()
	function addComment(event: FormEvent) {
		const data: any = {};
		event.preventDefault();
		const eventTarget = event.target as HTMLFormElement;
		const target = eventTarget.elements;
		data.id = nanoid();
		const author = target.namedItem("author") as RadioNodeList;
		data.author = author.value as Author;
		const timeType = target.namedItem("timeType") as RadioNodeList;
		const timeValue = target.namedItem("timeValue") as HTMLInputElement;
		data.time = {
			type: timeType.value as TypeOfTime,
			value: timeValue.valueAsDate,
		};
		const emojiIsVisible = target.namedItem("emojiIsVisible") as HTMLInputElement;
		const emojiType = target.namedItem("emojiType") as RadioNodeList;
		const emojiNumber = target.namedItem("emojiNumber") as HTMLInputElement;
		data.emoji = {
			show: emojiIsVisible.checked,
			type: emojiType.value as Emoji,
			number: +emojiNumber.value,
		};
		const separateIsVisible = target.namedItem("separateIsVisible") as HTMLInputElement;
		const separateTime = target.namedItem("separateTime") as HTMLInputElement;
		data.separate = {
			show: separateIsVisible.checked,
			time: separateTime.value,
		};
		const replyIsVisible = target.namedItem("replyIsVisible") as HTMLInputElement;
		const replyId = target.namedItem("replyId") as HTMLInputElement;
		data.reply = {
			show: replyIsVisible.checked,
			idComment: replyId.value,
		};

		const commentType = target.namedItem("comment_type") as RadioNodeList;
		const imageContent = target.namedItem("imageContent") as HTMLInputElement;
		const callType = target.namedItem("call_type") as RadioNodeList;
		const callDuration = target.namedItem("callDuration") as HTMLInputElement;
		const recordDuration = target.namedItem("recordDuration") as HTMLInputElement;
		const textContent = target.namedItem("textContent") as HTMLInputElement;

		function getComment(commentType: string) {
			switch (commentType) {
				case "image":
					return { imageContent: imageContent.value };
				case "call":
					return {
						callType: callType.value,
						callDuration: callDuration.value,
					};
				case "record":
					return { duration: recordDuration.value };
				case "text":
					return { content: textContent.value };
			}
		}

		const comment = {
			type: commentType.value,
			...getComment(commentType.value)
		}
		data.comment = comment;
		
		dispatch(pushData(data))

		console.log(data);
		
	}

	return (
		<Fragment>
			<form onSubmit={e => addComment(e)}>
				<div className="comment_form mr-10 flex flex-col border rounded-md px-4 divide-y justify-between space-y-4 shadow-md">
					<div className="show_id flex items-center pt-2">
						<div className="flex items-center">
							<span className="font-bold">ID:</span>
							<input type="text" className="border rounded px-2 ml-2 w-20" id="comment_id" />
						</div>
						<div className="ml-7 space-x-2">
							<label htmlFor="you">You</label>
							<input type="radio" name="author" id="you" value="you" defaultChecked />
							<label htmlFor="me">Me</label>
							<input type="radio" name="author" id="me" value="me" />
						</div>
					
						<button className="button_primary">Edit</button>
						<button className="button_primary">Add New</button>
					</div>
					<div className="show_time pt-2">
						<div className="flex space-x-3">
							<span className="font-bold">Time type:</span>
							<label htmlFor="time_left">Left</label>{" "}
							<input type="radio" name="timeType" id="time_left" value="left" defaultChecked/>
							<label htmlFor="time_center">Center</label>
							<input type="radio" name="timeType" id="time_center" value="center" />
							<label htmlFor="time_right">Right</label>
							<input type="radio" name="timeType" id="time_right" value="right" />
						</div>
						<div className="flex">
							<span>Value:</span>
							<input type="datetime-local" name="timeValue" id="time" />
						</div>
					</div>
					<div className="show_emoji flex flex-col pt-2 ">
						<p className="font-bold">Emoji Type</p>
						<div className="space-x-2 divide-x flex">
							<div className="">
								<label htmlFor="Strong">Strong</label>{" "}
								<input type="radio" name="emojiType" value={Emoji.Like} id="Strong" />
							</div>
							<div className="pl-3">
								<label htmlFor="Heart">Heart</label>{" "}
								<input type="radio" name="emojiType" value={Emoji.Heart} id="Heart" defaultChecked />
							</div>
							<div className="pl-3">
								<label htmlFor="LoL">LoL</label>{" "}
								<input type="radio" name="emojiType" value={Emoji.Lol} id="LoL" />
							</div>
							<div className="pl-3">
								<label htmlFor="Wow">Wow</label>{" "}
								<input type="radio" name="emojiType" value={Emoji.Wow} id="Wow" />
							</div>
							<div className="pl-3">
								<label htmlFor="Cry">Cry</label>{" "}
								<input type="radio" name="emojiType" value={Emoji.Cry} id="Cry" />
							</div>
							<div className="pl-3">
								<label htmlFor="Angry">Angry</label>{" "}
								<input type="radio" name="emojiType" value={Emoji.Angry} id="Angry" />
							</div>
						</div>
						<div className="flex space-x-3 mt-2">
							<label htmlFor="emojiIsVisible" className="">
								Visible
							</label>
							<input type="checkbox" name="emojiIsVisible" id="emojiIsVisible" />
							<span>Number</span>
							<input type="number" name="emojiNumber" className="px-2 border w-20 rounded-md" />
						</div>
					</div>
					<div className="show_separate pt-2">
						<div className="space-x-2 flex justify-between">
							<span className="font-bold">Separate</span>
							<div className="flex space-x-3">
								<span>Visible:</span>
								<input type="checkbox" name="separateIsVisible" id="show_separate" />
								<span className="">Time</span>
								<input type="datetime-local" name="separateTime" id="separate_time" />
							</div>
						</div>
					</div>
					<div className="show_reply flex items-cente pt-2">
						<div className="flex space-x-2">
							<span className="font-bold">Reply</span>
							<span className="">Visible:</span>
							<input type="checkbox" name="replyIsVisible" id="show_reply" />
							<span>ID Comment</span>
							<input type="text" name="replyId" className="px-2 border rounded-sm w-14" />
						</div>
					</div>
					<div className=" pt-2 pb-2">
						<FormCommentType />
					</div>
				</div>
			</form>
		</Fragment>
	);
};
export default Form;
