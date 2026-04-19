"use client";

import { useRef, useState } from "react";
import { API_ENDPOINT } from "../lib/constant";

export type Message = {
	type: "user" | "bot";
	message: string;
	webSearch?: string;
};

export const useChat = () => {
	const abortRef = useRef<AbortController | null>(null);
	const responseIdRef = useRef<string | null>(null);
	const [messages, setMessages] = useState<Message[]>([]);
	const [pending, setPending] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const API_URL = API_ENDPOINT + "/api/chat";

	const sendMessage = async (message: string) => {
		if (pending) return;

		setError(null);
		setPending(true);
		setMessages((prev) => [...prev, { type: "user", message }]);

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
			let webSearch: string | undefined;

			setMessages((prev) => [...prev, { type: "bot", message: "" }]);

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
					} else if (currentEvent === "web_search") {
						webSearch = data.trim();
						setMessages((prev) => {
							const updated = [...prev];
							updated[updated.length - 1] = {
								...updated[updated.length - 1],
								webSearch,
							};
							return updated;
						});
					} else if (currentEvent === "chunk") {
						if (!data.trim()) continue;
						botMessage += data;
						setMessages((prev) => {
							const updated = [...prev];
							updated[updated.length - 1] = {
								type: "bot",
								message: botMessage,
								webSearch,
							};
							return updated;
						});
					}
				}
			}
		} catch (err) {
			if (err instanceof Error && err.name === "AbortError") return;
			setError("Something went wrong while streaming.");
      console.error(err)
		} finally {
			setPending(false);
			abortRef.current = null;
		}
	};

	const stop = () => {
		abortRef.current?.abort();
	};

	return {
		messages,
		pending,
		error,
		sendMessage,
		stop,
	};
};
