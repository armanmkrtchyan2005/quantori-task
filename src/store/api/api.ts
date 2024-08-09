import {
	BaseQueryFn,
	FetchArgs,
	fetchBaseQuery,
	FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react"
import { RootStore } from "../store"

const baseQuery = fetchBaseQuery({
	baseUrl: import.meta.env.VITE_API_BASE_URL,
	prepareHeaders: (headers, { getState }) => {
		const token = (getState() as RootStore).auth.token
		if (token) {
			headers.set("authorization", `Bearer ${token}`)
		}

		return headers
	},
})

export const baseQueryWithLogout: BaseQueryFn<
	string | FetchArgs,
	unknown,
	FetchBaseQueryError
> = async (args, api, extraOptions) => {
	const result = await baseQuery(args, api, extraOptions)

	if (
		result.error &&
		(result.error.status === 403 || result.error.status === 500)
	) {
		api.dispatch({
			type: "auth/logout",
		})
	}

	return result
}
