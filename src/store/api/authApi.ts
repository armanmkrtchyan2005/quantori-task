import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { AuthenticationUserRequest, AuthenticationUserResponse } from "./types"

export const authApi = createApi({
	reducerPath: "authApi",
	baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE_URL }),
	endpoints: builder => ({
		authenticateUser: builder.mutation<
			AuthenticationUserResponse,
			AuthenticationUserRequest
		>({
			query: body => ({
				url: "auth/login",
				method: "POST",
				body,
			}),
		}),
	}),
})

export const { useAuthenticateUserMutation } = authApi
