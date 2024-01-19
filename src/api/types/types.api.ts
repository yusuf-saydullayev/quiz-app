export interface SuccessResponse<T> {
    ok: true;
    data: T;
    code: number;
    error?: never;
}

export interface ErrorResponse<T = unknown> {
    ok: false;
    data?: never;
    code: number;
    error: T;
}

export type ApiResponse<T = unknown, E = unknown> = | SuccessResponse<T> | ErrorResponse<E>;

export interface Questions {
    results: Result[];
    response_code :number
}

export interface Result {
    type: Type;
    difficulty: Difficulty;
    category: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
}

export type Difficulty = "medium" | "hard" | "easy";

export type Type = "multiple" | "boolean";
