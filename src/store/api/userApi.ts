import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQueryWithLogout } from "./api"
import { User } from "./types"

export const userApi = createApi({
	reducerPath: "userApi",
	baseQuery: baseQueryWithLogout,
	tagTypes: ["User"],
	endpoints: builder => ({
		getMe: builder.query<User, void>({
			query: () => ({
				url: "auth/me",
			}),
			providesTags: ["User"],
		}),
	}),
})

export const { useGetMeQuery } = userApi
