import { configureStore } from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { authApi, userApi } from "./api"
import { authReducer } from "./slices"

export const store = configureStore({
	reducer: {
		auth: authReducer,

		[authApi.reducerPath]: authApi.reducer,
		[userApi.reducerPath]: userApi.reducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware()
			.concat(authApi.middleware)
			.concat(userApi.middleware),
})

export type RootStore = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useStateDispatch = () => useDispatch<AppDispatch>()
export const useStateSelector: TypedUseSelectorHook<RootStore> = useSelector
