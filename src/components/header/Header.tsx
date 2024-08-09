import { useAuth } from "@/store/hooks/useAuth"
import { logout } from "@/store/slices"
import { useStateDispatch } from "@/store/store"
import { useReducer } from "react"
import { RxAvatar } from "react-icons/rx"
import { Link } from "react-router-dom"
import { Button } from "../ui/button/Button"
import styles from "./header.module.css"

export const Header = () => {
	const { isAuthenticated } = useAuth()
	const dispatch = useStateDispatch()

	const [isNavOpened, handleToggleNav] = useReducer(state => !state, false)

	return (
		<header className={styles.headerContainer}>
			<div className={styles.headerContent}>
				<div className={styles.headerLeftSide}>
					<div className={styles.headerAccount}>
						<RxAvatar />
					</div>
					<nav className={styles.headerNavLinks}>
						<ul>
							<li>
								<Link to="/">Home</Link>
							</li>
							<li>
								<Link to="/">Contact</Link>
							</li>
							<li>
								<Link to="/">About</Link>
							</li>
						</ul>
					</nav>
				</div>
				<div className={styles.headerRightSide}>
					{isAuthenticated ? (
						<Button onClick={() => dispatch(logout())}>Logout</Button>
					) : (
						<Button>
							<Link to={"/login"}>Login</Link>
						</Button>
					)}
				</div>
				<div className={styles.mobileContainer}>
					<button className={styles.burgerMenu} onClick={handleToggleNav}>
						<span></span>
						<span></span>
						<span></span>
					</button>
					<ul
						className={`${styles.mobileNav} ${
							isNavOpened ? styles.mobileNavActive : ""
						}`}
					>
						<li>
							<Link to="/">Home</Link>
						</li>
						<li>
							<Link to="/">Contact</Link>
						</li>
						<li>
							<Link to="/">About</Link>
						</li>
						<li>
							<Link to="/">Login</Link>
						</li>
					</ul>
				</div>
			</div>
		</header>
	)
}
