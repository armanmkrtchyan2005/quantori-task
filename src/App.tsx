import { Suspense } from "react"
import { PageLoader } from "./components/page-loader/PageLoader"
import { ReactRouterProvider } from "./router/Provider"

const App = () => {
	return (
		<>
			<Suspense fallback={<PageLoader />}>
				<ReactRouterProvider />
			</Suspense>
		</>
	)
}

export default App
