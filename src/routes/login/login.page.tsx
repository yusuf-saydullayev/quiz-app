import { Link, useNavigate } from "react-router-dom";
import { TextField } from "~/components/form/TextField";
import { Form } from "~/components/form/Form";
import { Heading } from "~/components/typography/Heading";
import { Text } from "~/components/typography/Text";
import { Button } from "~/components/ui/Button";
import { Container } from "~/components/ui/Container";
import { useForm } from "react-hook-form";
import { useAuth } from "~/providers/auth.provider";
import { authApi } from "~/api/auth/auth.api";

interface LoginForm {
	username: string;
	password: string;
}

export const LoginPage = () => {
	const { onLogin } = useAuth();
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		clearErrors,
		formState: { errors },
	} = useForm<LoginForm>();

	async function onSubmit(formData: LoginForm) {
		const { password, username } = formData;

		clearErrors();

		const response = await authApi.login({
			username: username,
			password,
		});

		if (!response.ok) {
			return null;
		}

		const token = response.data;

		onLogin(token.token);
		navigate("/");
	}

	return (
		<section className="grow flex justify-center items-center mb-16">
			<Container className="mx-auto flex w-full flex-col justify-center sm:w-[350px]">
				<header className="flex flex-col mb-4 items-center">
					<Heading as="h1" level={3} className="mb-2">
						Quiz
					</Heading>
					<Text variant="muted">
						Enter your credentials to login to your account
					</Text>
					<Text>name: kminchelle</Text>
					<Text>password: 0lelplR</Text>
				</header>
				<div>
					<Form
						className="flex flex-col gap-y-3"
						onSubmit={handleSubmit(onSubmit)}
					>
						<TextField
							label="Username"
							type="text"
							labelProps={{
								required: true,
							}}
							{...register("username", {
								minLength: {
									value: 4,
									message: "Username must be at least 4 characters long",
								},
								maxLength: {
									value: 50,
									message: "Username must be at most 50 characters long",
								},
								required: {
									value: true,
									message: "Username is required",
								},
							})}
							error={errors.username?.message}
						/>
						<TextField
							label="Password"
							type="password"
							labelProps={{
								required: true,
							}}
							{...register("password", {
								minLength: {
									value: 5,
									message: "Password must be at least 5 characters long",
								},
								maxLength: {
									value: 50,
									message: "Password must be at most 50 characters long",
								},
								required: {
									value: true,
									message: "Password is required",
								},
							})}
							error={errors.password?.message}
						/>
						<Button
							type="submit"
							variant="contained"
							color="primary"
							className="w-full"
						>
							Login to your account
						</Button>
					</Form>
					<Link to={"/register"} className="block mx-auto w-fit mt-4">
						<Button variant="link" className="" asChild={true}>
							<span>Don't have an account? Sign up</span>
						</Button>
					</Link>
				</div>
			</Container>
		</section>
	);
};
