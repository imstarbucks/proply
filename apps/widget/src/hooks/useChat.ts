import { signal } from "@preact/signals";
import { useRef, useState } from "preact/hooks";
import { API_ENDPOINT } from "../lib/constant";

export type Message = {
	type: "user" | "bot";
	message: string;
};

const messagesSignal = signal<Message[]>([]);

export const useChat = () => {
	const API_URL = `${API_ENDPOINT}/api/chat`;
	const abortRef = useRef<AbortController | null>(null);
	const responseIdRef = useRef<string | null>(null);
	const [pending, setPending] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const sendMessage = async (message: string) => {
		if (pending) return;

		setError(null);
		setPending(true);
		messagesSignal.value = [...messagesSignal.value, { type: "user", message }];

		abortRef.current = new AbortController();

		try {
			const response = await fetch(API_URL, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					input: message,
					previous_response_id: responseIdRef.current ?? undefined,
				}),
				signal: abortRef.current.signal,
			});

			if (!response.ok) {
				throw new Error(`Request failed with status ${response.status}`);
			}

			const reader = response.body?.getReader();
			if (!reader) throw new Error("No response body");

			const decoder = new TextDecoder();
			let botMessage = "";
			let currentEvent = "";

			messagesSignal.value = [
				...messagesSignal.value,
				{ type: "bot", message: "" },
			];

			while (true) {
				const { done, value } = await reader.read();
				if (done) break;

				const raw = decoder.decode(value, { stream: true });

				for (const line of raw.split("\n")) {
					if (line.startsWith("event: ")) {
						currentEvent = line.slice(7).trim();
						continue;
					}

					if (!line.startsWith("data: ")) continue;
					const data = line.slice(6);

					if (currentEvent === "response_id") {
						responseIdRef.current = data.trim();
					} else if (currentEvent === "chunk") {
						if (!data.trim()) continue;
						botMessage += data;
						messagesSignal.value = [
							...messagesSignal.value.slice(0, -1),
							{ type: "bot", message: botMessage },
						];
					}
				}
			}
		} catch (err) {
			if (err instanceof Error && err.name === "AbortError") return;
			setError("Something went wrong while streaming.");
		} finally {
			setPending(false);
			abortRef.current = null;
		}
	};

	const stop = () => {
		abortRef.current?.abort();
	};

	return {
		messages: messagesSignal,
		pending,
		error,
		sendMessage,
		stop,
	};
};
