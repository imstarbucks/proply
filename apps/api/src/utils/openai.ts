import OpenAI from "openai";

const client = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

const getChatResponse = async (input: string) => {
	const response = await client.responses.create({
		model: "gpt-5.4-nano",
		input,
	});

	return response.output_text;
};

export { getChatResponse };
