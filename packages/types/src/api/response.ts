type APIResponseSuccess = {
	success: true;
	message: string;
};

type APIResponseFailed = {
	success: false;
	error: unknown;
};

export type APIResponse = APIResponseSuccess | APIResponseFailed;
