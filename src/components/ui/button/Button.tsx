import { ButtonHTMLAttributes, FC } from "react"
import styles from "./button.module.css"

export type VariantType = "filled" | "outline"

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: VariantType
}

export const Button: FC<ButtonProps> = ({
	className,
	children,
	variant = "filled",
	...props
}) => {
	return (
		<button
			className={`${styles.button} ${styles[variant]} ${className}`}
			{...props}
		>
			{children}
		</button>
	)
}
