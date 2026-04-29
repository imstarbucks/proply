import { useState } from "preact/hooks";
import { useChat, type Message } from "./hooks/useChat";
import type { TargetedInputEvent, TargetedSubmitEvent } from "preact";
import { Bubble } from "./components/bubble";

interface WidgetProps {
	chatbotId: string;
}

const Widget = ({ chatbotId }: WidgetProps) => {
	const { messages, sendMessage, error } = useChat();
	const [input, setInput] = useState("");

	const onInput = (event: TargetedInputEvent<HTMLInputElement>) =>
		setInput(event.currentTarget.value);

	const handleSubmit = async (event: TargetedSubmitEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const value = formData.get("message");
		if (typeof value === "string" && value.trim()) sendMessage(value);
	};

	return (
		<div className="w-7xl">
			<div>Chatbot id: {chatbotId}</div>
			{messages.value.map((message: Message) => (
				<Bubble
					type={message.type}
					message={message.message}
					error={error ?? undefined}
				/>
			))}
			<form onSubmit={handleSubmit}>
				<input
					id="message"
					type="text"
					name="message"
					value={input}
					onInput={onInput}
					placeholder="Type something here..."
				/>
			</form>
		</div>
	);
};

export default Widget;
