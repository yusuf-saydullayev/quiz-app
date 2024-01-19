import { createBrowserRouter } from "react-router-dom";
import { AuthLayout, RootLayout } from "~/layouts";
import { LoginPage } from "~/routes/login";
import { HomePage } from "~/routes/home";
import { RegisterPage } from "./register";
import { QuestionsPage } from "~/routes/questions";
import { ScorePage } from "~/routes/score";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <AuthLayout />,
		children: [
			{
				path: "/",
				element: <RootLayout />,
				children: [
					{
						path: "/",
						element: <HomePage />,
					},
				],
			},
		],
	},
	{
		path: "/login",
		element: <LoginPage />,
	},
	{
		path: "/register",
		element: <RegisterPage />,
	},
	{
		path: "/questions",
		element: <RootLayout />,
		children: [
			{
				path: "/questions",
				element: <QuestionsPage />,
			},
		],
	},
	{
		path: "/score",
		element: <RootLayout />,
		children: [
			{
				path: "/score",
				element: <ScorePage />,
			},
		],
	},
]);
