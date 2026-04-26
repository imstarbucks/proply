import { logout } from "@/app/actions/auth";

export const Logout = () => {
	return (
		<form action={logout}>
			<button type="submit">Sign out</button>
		</form>
	);
};
