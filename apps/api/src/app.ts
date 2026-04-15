import { Hono } from "hono";
import { logger } from "hono/logger";
import chat from "./routes/chat";

const app = new Hono();

app.use(logger());

app.get("/health-check", (c) => {
	return c.json({
		success: true,
		message: "Ok!",
	});
});

app.route("/chat", chat);

export default app;
