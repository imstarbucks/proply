import { createClient } from "@supabase/supabase-js";
import type { Context, MiddlewareHandler } from "hono";
import { env } from "hono/adapter";

declare module "hono" {
	interface ContextVariableMap {
		userId: string;
	}
}

type SupabaseEnv = {
	SUPABASE_URL: string;
	SUPABASE_SERVICE_ROLE_KEY: string;
};

export const getSupabase = (c: Context) => {
	const { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY } = env<SupabaseEnv>(c);
	return createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
};

export const authMiddleware = (): MiddlewareHandler => {
	return async (c, next) => {
		const authHeader = c.req.header("Authorization");
		if (!authHeader?.startsWith("Bearer ")) {
			return c.json({ success: false, error: "Unauthorized" }, 401);
		}

		const token = authHeader.slice(7);
		const supabase = getSupabase(c);
		const { data: { user }, error } = await supabase.auth.getUser(token);

		if (error || !user) {
			return c.json({ success: false, error: "Unauthorized" }, 401);
		}

		c.set("userId", user.id);
		await next();
	};
};
