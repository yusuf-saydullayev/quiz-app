import jwtDecode from "jwt-decode";
import {
	FC,
	ReactNode,
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react";
import { useCookies } from "react-cookie";

interface AuthUser {
	user_id: number;
	user_name: string;
}

interface AuthContext {
	status: "auth" | "guest" | "loading";
	user: AuthUser | null;
	onLogin: (token: string) => void;
	onLogout: (cb: () => void) => void;
}

interface AuthTokenData {
	id: number;
	username: string;
	email: string;
	firstName: string;
	lastName: string;
	gender: string;
	image: string;
	iat: number;
	exp: number;
}

const AuthContext = createContext<AuthContext | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};

interface AuthProviderProps {
	children: ReactNode;
}
export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
	const [cookies, setCookies, removeCookies] = useCookies();

	const [status, setStatus] = useState<AuthContext["status"]>("loading");
	const [user, setUser] = useState<AuthContext["user"]>(null);

	function onLogin(token: string) {
		const tokenData = jwtDecode<AuthTokenData>(token);

		const user = {
			user_id: tokenData.id,
			user_name: tokenData.username,
		};

		setCookies("td-auth-token", token, {
			path: "/",
			expires: new Date(tokenData.exp * 1000),
		});

		setStatus("auth");
		setUser(user);
	}

	function onLogout(cb: () => void) {
		removeCookies("td-auth-token", { path: "/" });

		setStatus("guest");
		setUser(null);
		cb();
	}

	const onRefresh = useCallback(() => {
		const token = cookies["td-auth-token"];

		if (!token) {
			setStatus("guest");
			setUser(null);
			return;
		}

		const tokenData = jwtDecode<AuthTokenData>(token);

		if (tokenData.exp * 1000 < Date.now()) {
			onLogout(() => console.log("Token expired"));
			return;
		}

		const user = {
			user_id: tokenData.id,
			user_name: tokenData.username,
		};

		setStatus("auth");
		setUser(user);
	}, [cookies]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		onRefresh();
	}, []);

	const contextValue: AuthContext = {
		onLogin,
		onLogout,
		status,
		user,
	};

	return (
		<AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
	);
};
