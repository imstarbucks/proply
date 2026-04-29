export const getChatbotId = (): string | undefined => {
	const script = document.currentScript;
	const chatbotId = script?.dataset.chatbotId;

	return chatbotId;
};
