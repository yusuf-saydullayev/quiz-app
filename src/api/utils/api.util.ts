import { AxiosError } from "axios";
import { ErrorResponse } from "~/api/types/types.api";

export const generateApiError = (error: unknown): ErrorResponse => {
    let errorCode = 500;
    let errorMessage = 'Unknown error';

    if (error instanceof AxiosError) {
        errorCode = error.response?.status ?? errorCode;
        errorMessage = error.response?.data?.message ?? errorMessage;
    }

    return {
        ok: false,
        code: errorCode,
        error: errorMessage,
    };
}