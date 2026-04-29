import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import chat from "./routes/chat";

const app = new Hono();

const FRONTEND_URL = process.env.FRONTEND_URL ?? "http://localhost:3000";

// TODO:
// Update widget url to embeded chatbot website url
const WIDGET_URL = process.env.WIDGET_URL ?? "http://localhost:4000";

app.use(logger());
app.use(
	cors({
		origin: [FRONTEND_URL, WIDGET_URL],
		allowMethods: ["GET", "POST", "OPTIONS"],
		allowHeaders: ["Content-Type", "X-Tenant-ID", "Authorization"],
	})
);

app.get("/health-check", (c) => {
	return c.json({
		success: true,
		message: "Ok!",
	});
});

app.route("/api", chat);

export default app;
