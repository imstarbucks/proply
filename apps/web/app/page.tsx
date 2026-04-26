import { redirect } from "next/navigation";
import { createClient } from "@/app/lib/supabase/server";
import { Logout } from "./components/shared/logout";

export default async function Home() {
	const supabase = await createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		redirect("/login");
	}

	return (
		<main>
			<h1>Dashboard</h1>
			<p>Email: {user.email}</p>
			<p>Name: {user.user_metadata?.full_name ?? "—"}</p>
			<p>Provider: {user.app_metadata?.provider}</p>
			<Logout />
		</main>
	);
}
