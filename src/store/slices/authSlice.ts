import { createSlice } from "@reduxjs/toolkit"
import { authApi } from "../api"
import { RootStore } from "../store"

export interface AuthState {
	token: string | null
	isAuthenticated: boolean
}

const authSlice = createSlice({
	name: "auth",
	initialState: () => {
		const storedData = localStorage.getItem("token")

		if (!storedData) {
			return { token: null, isAuthenticated: false }
		}

		const { token } = JSON.parse(storedData)

		return { token, isAuthenticated: true } as AuthState
	},
	reducers: {
		logout: state => {
			localStorage.removeItem("token")
			state.token = null
			state.isAuthenticated = false
		},
	},
	extraReducers: builder => {
		builder.addMatcher(
			authApi.endpoints.authenticateUser.matchFulfilled,
			(state, { payload }) => {
				localStorage.setItem("token", JSON.stringify({ token: payload.token }))
				state.token = payload.token
				state.isAuthenticated = true
			}
		)
	},
})

export const { reducer: authReducer, actions: authActions } = authSlice

export const { logout } = authSlice.actions

export const getAuthenticationStatus = (state: RootStore) => ({
	token: state.auth.token,
	isAuthenticated: state.auth.isAuthenticated,
})

export const selectToken = (state: RootStore) => state.auth.token
export const selectAuthenticationStatus = (state: RootStore) =>
	state.auth.isAuthenticated
