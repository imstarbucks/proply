"use client";

import { useEffect, useRef, useState } from "react";
import { Message, useChat } from "./hooks/useChat";
import Markdown from "react-markdown";

export default function Home() {
	const inputRef = useRef<HTMLInputElement>(null);
	const { sendMessage, messages, pending, error } = useChat();
	const [input, setInput] = useState("");
	const bottomRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		bottomRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages, pending]);

	const handleSend = (e: React.FormEvent) => {
		e.preventDefault();
		if (!input.trim() || pending) return;
		sendMessage(input.trim());
		setInput("");
		inputRef.current?.focus();
	};

	return (
		<main className="min-h-screen flex flex-col items-center justify-center px-4 py-16 bg-canvas">
			{/* Header */}
			<div className="w-full max-w-2xl mb-10">
				<div className="flex items-center gap-2 mb-6">
					<span className="w-1 h-4 bg-gold rounded-full" />
					<p className="text-xs tracking-[0.25em] uppercase text-ink-soft font-body">
						Proply · AI Concierge
					</p>
				</div>
				<h1 className="font-display text-[3.25rem] font-semibold leading-[1.05] text-ink">
					Find your perfect
					<br />
					<em className="not-italic text-gold">property.</em>
				</h1>
				<p className="mt-3 text-sm text-ink-soft font-body leading-relaxed max-w-sm">
					Ask me anything — pricing, availability, floor plans, or neighbourhood
					insights.
				</p>
			</div>

			{/* Chat window */}
			<div className="w-full max-w-2xl flex flex-col rounded-2xl overflow-hidden h-[58vh] bg-surface border border-line shadow-[0_8px_40px_rgba(0,0,0,0.08)]">
				{/* Messages */}
				<div className="messages-scroll flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-3">
					{messages.length === 0 ? (
						<EmptyState />
					) : (
						messages.map((m, i) =>
							m.type === "user" ? (
								<UserBubble key={i} message={m.message} />
							) : (
								<BotBubble
									key={i}
									message={m.message}
									webSearch={m.webSearch}
								/>
							)
						)
					)}
					{pending && <TypingIndicator />}
					{error && (
						<p className="text-xs text-center py-2 text-error">{error}</p>
					)}
					<div ref={bottomRef} />
				</div>

				{/* Input */}
				<div className="border-t border-line px-5 py-4">
					<form
						onSubmit={handleSend}
						className="flex items-center gap-3 bg-subtle rounded-xl px-4 py-3 focus-within:ring-1 focus-within:ring-line transition-all"
					>
						<input
							ref={inputRef}
							type="text"
							value={input}
							onChange={(e) => setInput(e.target.value)}
							placeholder="Ask about this property…"
							disabled={pending}
							className="flex-1 bg-transparent text-sm text-ink placeholder:text-ink-faint outline-none disabled:opacity-40 font-body"
						/>
						<button
							type="submit"
							disabled={!input.trim() || pending}
							className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-150 ${
								input.trim() && !pending
									? "bg-accent hover:bg-accent-light"
									: "bg-line cursor-not-allowed"
							}`}
						>
							<SendIcon active={!!input.trim() && !pending} />
						</button>
					</form>
				</div>
			</div>

			{/* Footer */}
			<p className="mt-6 text-xs text-ink-faint font-body">
				Powered by <span className="text-gold">Proply AI</span>
			</p>
		</main>
	);
}

/* ── Sub-components ─────────────────────────────────────────── */

interface BubbleProps {
	message: Message["message"];
	webSearch?: Message["webSearch"];
}

const EmptyState = () => (
	<div className="flex-1 flex flex-col items-center justify-center gap-4 py-8">
		<div className="w-12 h-12 rounded-2xl bg-subtle border border-line flex items-center justify-center">
			<BuildingIcon />
		</div>
		<div className="text-center">
			<p className="text-sm font-medium text-ink mb-1">
				How can I help you today?
			</p>
			<p className="text-xs text-ink-soft max-w-[220px] leading-relaxed">
				Ask about pricing, availability, floor plans, or anything about this
				property.
			</p>
		</div>
		<div className="flex flex-wrap gap-2 justify-center mt-1">
			{[
				"What's the price range?",
				"Any available units?",
				"Tell me about amenities",
			].map((s) => (
				<span
					key={s}
					className="text-xs px-3 py-1.5 rounded-full border border-line text-ink-soft bg-subtle"
				>
					{s}
				</span>
			))}
		</div>
	</div>
);

const UserBubble = ({ message }: BubbleProps) => (
	<div className="message-enter flex justify-end">
		<span className="max-w-[72%] px-4 py-2.5 rounded-2xl rounded-br-sm text-sm leading-relaxed bg-bubble-user text-canvas font-body">
			{message}
		</span>
	</div>
);

const BotBubble = ({ message, webSearch }: BubbleProps) => (
	<div className="message-enter flex flex-col items-start gap-1.5">
		{webSearch && (
			<span className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-gold-light text-gold border border-gold/20">
				<svg
					width="10"
					height="10"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2.5"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<circle cx="11" cy="11" r="8" />
					<path d="m21 21-4.35-4.35" />
				</svg>
				{webSearch}
			</span>
		)}
		<span className="max-w-[72%] px-4 py-2.5 rounded-2xl rounded-bl-sm text-sm leading-relaxed bg-bubble-bot text-ink border border-line font-body">
			{message ? (
				<Markdown>{message}</Markdown>
			) : (
				<span className="text-ink-faint">…</span>
			)}
		</span>
	</div>
);

const TypingIndicator = () => (
	<div className="message-enter flex justify-start">
		<span className="px-4 py-3 rounded-2xl rounded-bl-sm flex items-center gap-1.5 bg-bubble-bot border border-line">
			<span className="dot w-1.5 h-1.5 rounded-full bg-ink-faint" />
			<span className="dot w-1.5 h-1.5 rounded-full bg-ink-faint" />
			<span className="dot w-1.5 h-1.5 rounded-full bg-ink-faint" />
		</span>
	</div>
);

const SendIcon = ({ active }: { active: boolean }) => (
	<svg
		width="14"
		height="14"
		viewBox="0 0 16 16"
		fill="none"
		className={active ? "text-canvas" : "text-ink-faint"}
	>
		<path d="M14 8L2 2l2.5 6L2 14l12-6z" fill="currentColor" />
	</svg>
);

const BuildingIcon = () => (
	<svg
		width="20"
		height="20"
		viewBox="0 0 24 24"
		fill="none"
		className="stroke-ink-soft"
		strokeWidth="1.5"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<rect x="3" y="3" width="18" height="18" rx="1" />
		<path d="M9 3v18M15 3v18M3 9h18M3 15h18" />
	</svg>
);
