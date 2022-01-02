import React, { Fragment, useState } from "react";

const FormCommentType = () => {
	const [commentType, setCommentType] = useState<string>("text");
	const [callType, setCallType] = useState("incomming");
	function renderCommentInput(type: string) {
		switch (type) {
			case "image":
				return (
					<div>
						<input type="file" name="inputFileImage" id="inputFileImage" className="file:px-3 file:rounded-sm file:font-bold file:bg-white file:border hover:file:bg-gray-100 file:py-1 file:cursor-pointer" />
						<input
							type="text"
							className="border px-2 w-full rounded-md mt-2"
							placeholder="URL"
							name="imageContent"
						/>
					</div>
				);
			case "call":
				return (
					<div>
						<div className="space-x-2">
							<span>Call Type:</span>
							<label htmlFor="Incomming">Incomming</label>
							<input
								type="radio"
								name="call_type"
								id="Incomming"
								onChange={() => setCallType("incomming")}
							/>
							<label htmlFor="Outgoing">Outgoing</label>
							<input
								type="radio"
								name="call_type"
								id="Outgoing"
								onChange={() => setCallType("outgoing")}
							/>
							<label htmlFor="Missed">Missed</label>
							<input type="radio" name="call_type" id="Missed" onChange={() => setCallType("missed")} />
						</div>
						{callType !== "missed" && (
							<div className="space-x-2">
								<span>Duration: </span>
								<input type="text" className="px-2 border rounded-md" name="callDuration" />
							</div>
						)}
					</div>
				);
			case "record":
				return (
					<div>
						<div className="space-x-2">
							<span>Duration: </span>
							<input type="text" className="px-2 border rounded-md " name="recordDuration" />
						</div>
					</div>
				);

			case "text":
				return (
					<div className="flex">
						<textarea
							name="textContent"
							id="text_comment"
							rows={9}
							className="border rounded-md w-full p-2"
						></textarea>
					</div>
				);
		}
	}
	return (
		<Fragment>
			<div className="flex flex-col">
				<div className=" flex">
					<span className="mr-4 font-bold">Comment type:</span>
					<div className="divide-x flex space-x-2">
						<div className="pl-2 space-x-2">
							<label htmlFor="Image">Image</label>

							<input
								type="radio"
								name="comment_type"
								value="image"
								id="Image"
								onChange={() => setCommentType("image")}
							/>
						</div>
						<div className="pl-2 space-x-2">
							<label htmlFor="Call">Call</label>
							<input
								type="radio"
								name="comment_type"
								value="call"
								id="Call"
								onChange={() => setCommentType("call")}
							/>
						</div>
						<div className="pl-2 space-x-2">
							<label htmlFor="Record">Record</label>
							<input
								type="radio"
								name="comment_type"
								value="record"
								id="Record"
								onChange={() => setCommentType("record")}
							/>
						</div>
						<div className="pl-2 space-x-2">
							<label htmlFor="Text">Text</label>
							<input
								type="radio"
								name="comment_type"
								value="text"
								id="Text"
								onChange={() => setCommentType("text")}
								defaultChecked
							/>
						</div>
					</div>
				</div>

				<div className="pt-2">{renderCommentInput(commentType)}</div>
			</div>
		</Fragment>
	);
};
export default FormCommentType;
