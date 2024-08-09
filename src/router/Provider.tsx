import { PageLoader } from "@/components/page-loader/PageLoader"
import { ErrorPage } from "@/pages/error/ErrorPage"
import { LayoutPage } from "@/pages/layout/LayoutPage"
import { lazy, Suspense } from "react"
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom"
import { PrivateRoute } from "./PrivateOutlet"

const HomePage = lazy(() =>
	import("@/pages/home/HomePage").then(module => ({
		default: module.HomePage,
	}))
)

const LoginPage = lazy(() =>
	import("@/pages/auth/login/Login").then(module => ({
		default: module.LoginPage,
	}))
)

const router = createBrowserRouter([
	{
		path: "",
		element: <LayoutPage />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: "",
				element: (
					<PrivateRoute to="/login" asChild>
						<Suspense fallback={<PageLoader />}>
							<HomePage />
						</Suspense>
					</PrivateRoute>
				),
				errorElement: <ErrorPage />,
			},
			{
				path: "login",
				element: <LoginPage />,
				errorElement: <ErrorPage />,
			},
		],
	},
	{
		path: "*",
		element: <Navigate to="/" replace />,
	},
])

export const ReactRouterProvider = () => {
	return <RouterProvider router={router} />
}
