import styles from "./footer.module.css"

export const Footer = () => {
	return (
		<footer className={`${styles.footerContainer}`}>
			<div className="container">&copy; Copyright 2024</div>
		</footer>
	)
}
