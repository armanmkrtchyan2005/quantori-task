import { Button } from "@/components/ui/button/Button"
import { Input } from "@/components/ui/input/Input"
import { useAuthenticateUserMutation } from "@/store/api"
import { useAuth } from "@/store/hooks/useAuth"
import {
	ChangeEventHandler,
	FormEventHandler,
	useCallback,
	useEffect,
	useState,
} from "react"
import { useNavigate } from "react-router-dom"
import styles from "./login.module.css"

export const LoginPage = () => {
	const [login] = useAuthenticateUserMutation()
	const { isAuthenticated } = useAuth()
	const [loginData, setLoginData] = useState({ username: "", password: "" })

	const [errorMessage, setErrorMessage] = useState<string | null>(null)

	const navigate = useNavigate()

	const handleLoginDataChange = useCallback<
		ChangeEventHandler<HTMLInputElement>
	>(event => {
		const { name, value } = event.target

		setLoginData(prev => ({ ...prev, [name]: value }))
	}, [])

	const handleLogin = useCallback<FormEventHandler<HTMLFormElement>>(
		async event => {
			event.preventDefault()

			if (errorMessage) {
				return
			}

			try {
				await login(loginData).unwrap()
			} catch (error) {
				setErrorMessage("Wrong username or password")
			}
		},
		[errorMessage, login, loginData, navigate]
	)

	useEffect(() => {
		if (isAuthenticated) {
			navigate("/", { replace: true })
		}
	}, [isAuthenticated, navigate])

	useEffect(() => {
		const { username, password } = loginData

		if (!username) {
			return setErrorMessage("Write your username")
		}

		if (!password) {
			return setErrorMessage("Write your password")
		}

		setErrorMessage(null)
	}, [loginData])

	return (
		<main className={styles.loginPage}>
			<form onSubmit={handleLogin} className={styles.loginContainer}>
				<div className={styles.loginHeader}>
					<h1>Login</h1>
				</div>
				<div className={styles.loginContent}>
					<Input
						name="username"
						onChange={handleLoginDataChange}
						placeholder="Email"
					/>
					<Input
						name="password"
						onChange={handleLoginDataChange}
						placeholder="Password"
						type="password"
					/>
					<span className="error-text">{errorMessage}</span>
				</div>
				<div className={styles.loginFooter}>
					<Button variant="outline">Cancel</Button>
					<Button type="submit">Login</Button>
				</div>
			</form>
		</main>
	)
}
