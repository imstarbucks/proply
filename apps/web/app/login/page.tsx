"use client";

import { useActionState } from "react";
import { login, type LoginState } from "@/app/actions/auth";

const LoginPage = () => {
	const [state, action, isPending] = useActionState<LoginState, FormData>(
		login,
		undefined
	);

	return (
		<form action={action}>
			<button type="submit" disabled={isPending}>
				{isPending ? "Redirecting..." : "Sign in with Google"}
			</button>
			{state?.error && <p>{state.error}</p>}
		</form>
	);
};

export default LoginPage;
