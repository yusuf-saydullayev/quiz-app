export interface LoginDto {
    username: string;
    password: string;
}

export interface LoginResponse {
    id: number;
	username: string;
	email: string;
	firstName: string;
	lastName: string;
	gender: string;
	token: string;
}


export type RegisterDto = LoginDto;
export type RegisterResponse = {
    user_id: string;
    user_name: string;
};