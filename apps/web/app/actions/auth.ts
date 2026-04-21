"use server";

import { createClient } from "@/app/lib/supabase/server";
import { redirect } from "next/navigation";

export type LoginState = { error?: string } | undefined;

export async function login(_state: LoginState): Promise<LoginState> {
	const supabase = await createClient();
	const { data, error } = await supabase.auth.signInWithOAuth({
		provider: "google",
		options: {
			redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
		},
	});

	if (error) {
		return { error: error.message };
	}

	if (data.url) {
		redirect(data.url);
	}
}

export async function logout(): Promise<LoginState> {
	const supabase = await createClient();
	const { error } = await supabase.auth.signOut();

	if (error) {
		return { error: error.message };
	}

	redirect("/login");
}
