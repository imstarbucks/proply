import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import chat from "./routes/chat";

const app = new Hono();

app.use(logger());
app.use(
	cors({
		origin: process.env.FRONTEND_URL ?? "http://localhost:3000",
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
