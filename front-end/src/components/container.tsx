import React from "react"

interface IContainerProps {
	children: React.ReactNode | React.ReactNode[]
	atributes?: React.HTMLAttributes<HTMLDivElement>
}

const Container: React.FC<IContainerProps> = ({ children, atributes }) => {
	const classProp = atributes?.className
	return (
		<>
			<div className={`max-w-[1400px] m-auto px-3 max-phone2:px-1 ${classProp ? classProp : ""}`} >
				{children}
			</div>
		</>
	)
}
export default Container