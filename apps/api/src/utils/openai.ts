import OpenAI from "openai";

const client = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

const getChatResponse = async (
	input: string,
	previous_response_id?: string
) => {
	return client.responses.create({
		model: "gpt-5.4-mini",
		input,
		previous_response_id,
		instructions: `
    You are a property agent in Malaysia.

    You are responsible to answer the user question regarding property topic only.
    Perform Web Search if needed.

    If you are unable to get the result for some reason, perform google search.`,
		stream: true,
		tools: [
			{
				type: "web_search",
			},
		],
		tool_choice: "auto",
		include: ["web_search_call.action.sources"],
	});
};

export { getChatResponse };
