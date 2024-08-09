import { Footer } from "@/components/footer/Footer"
import { Header } from "@/components/header/Header"
import { Outlet } from "react-router-dom"

export const LayoutPage = () => {
	return (
		<div>
			<Header />
			<Outlet />
			<Footer />
		</div>
	)
}
