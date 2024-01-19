import { Command, LogOut, User } from "lucide-react";
import { Fragment } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
	Dropdown,
	DropdownContent,
	DropdownItem,
	DropdownLabel,
	DropdownSeparator,
	DropdownTrigger,
} from "~/components/feedback/Dropdown";
import { Container } from "~/components/ui/Container";
import { useAuth } from "~/providers/auth.provider";

export const RootLayout = () => {
	return (
		<Fragment>
			<header className="sticky top-0 z-10 border-b bg-white py-4">
				<Container className="flex items-center justify-between">
					<Link to={"/"} className="flex flex-row items-center gap-x-2">
						<Command className="h-7 w-7" />
						<span className="hidden font-bold sm:inline-block">Test</span>
					</Link>
					<Profile />
				</Container>
			</header>
			<Outlet />
		</Fragment>
	);
};

const Profile = () => {
	const { user, onLogout } = useAuth();
	const navigate = useNavigate();

	return (
		<Dropdown>
			<DropdownTrigger>
				<User />
			</DropdownTrigger>
			<DropdownContent>
				<DropdownLabel>Hello, {user?.user_name}</DropdownLabel>
				<DropdownSeparator />
				<DropdownItem
					onClick={onLogout.bind(null, () => {
						navigate("/login");
					})}
				>
					<LogOut className="w-5 h-5 mr-2" />
					Logout
				</DropdownItem>
			</DropdownContent>
		</Dropdown>
	);
};
