import { render } from "preact";
import { getChatbotId } from "./lib/utils-chatbot";
import Widget from "./widget";
import styles from "./index.css?inline";

const init = () => {
	const chatbotId = getChatbotId();
	if (!chatbotId) {
		console.error("@proply/widget: Unable to object chatbot id");
		return;
	}

	const host = document.createElement("div");
	const shadow = host.attachShadow({ mode: "open" });

	const style = document.createElement("style");
	style.textContent = styles;
	shadow.appendChild(style);

	document.body.append(host);
	mount(shadow, chatbotId);
};

const mount = (shadow: ShadowRoot, chatbotId: string) => {
	return render(<Widget chatbotId={chatbotId} />, shadow);
};

init();
