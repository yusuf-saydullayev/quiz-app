import "~/styles/global.css";
import React from "react";
import { CookiesProvider } from "react-cookie";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "~/providers/auth.provider";
import { RouterProvider } from "react-router-dom";
import { router } from "~/routes";
import store, { persister } from "~/store/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

// biome-ignore lint/style/noNonNullAssertion: <explanation>
ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<CookiesProvider>
			<AuthProvider>
				<Provider store={store}>
					<PersistGate loading={null} persistor={persister}>
						<RouterProvider router={router} />
					</PersistGate>
				</Provider>
			</AuthProvider>
		</CookiesProvider>
	</React.StrictMode>,
);
