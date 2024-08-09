import { useGetMeQuery } from "@/store/api"

export const HomePage = () => {
	const { data, isLoading } = useGetMeQuery()

	console.log(isLoading)

	return (
		<div className="main-container">
			{!isLoading ? (
				<h1>
					Hi {data?.firstName} {data?.lastName}
				</h1>
			) : (
				"Loading..."
			)}
		</div>
	)
}
