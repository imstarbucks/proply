import { cn } from "../lib/utils";

interface BubbleProps {
	type: "user" | "bot";
	message: string;
	error?: string;
}

export const Bubble = ({ type, message, error }: BubbleProps) => {
	return (
		<div className="flex items-center w-full">
			{error ? (
				<span className="px-2 py-1 rounded-md border border-red-900 text-red-900 bg-white">
					{error}
				</span>
			) : (
				<span
					className={cn(
						"px-2 py-1 rounded-md border",
						type === "bot"
							? "me-auto ms-0 bg-gray-300 border-gray-500"
							: "me-0 ms-auto bg-blue-400 border-blue-950"
					)}
				>
					{message}
				</span>
			)}
		</div>
	);
};
