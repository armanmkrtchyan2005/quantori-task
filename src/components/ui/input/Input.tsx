import { FC, InputHTMLAttributes, useId } from "react"
import styles from "./input.module.css"

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	labelClassName?: string
}

export const Input: FC<InputProps> = ({
	labelClassName,
	placeholder,
	className,
	...props
}) => {
	const id = useId()
	return (
		<div className={styles.formInput}>
			<input
				placeholder={placeholder}
				className={`${styles.input} ${className}`}
				id={id}
				{...props}
			/>
			<label htmlFor={id} className={`${styles.inputLabel} ${labelClassName}`}>
				{placeholder}
			</label>
		</div>
	)
}
