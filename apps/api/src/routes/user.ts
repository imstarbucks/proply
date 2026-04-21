import { Hono } from "hono";
import { authMiddleware, getSupabase } from "../middleware/auth.middleware";

const app = new Hono();
app.use("*", authMiddleware());

app.get("/me", async (c) => {
	const supabase = getSupabase(c);
	const userId = c.get("userId");

	const { data, error } = await supabase.auth.admin.getUserById(userId);

	if (error) {
		return c.json({ success: false, error: error.message }, 500);
	}

	return c.json({ success: true, data: { user: data.user } });
});

export default app;
