import { createContext, ReactNode, useState } from "react"

interface OrdersNumberContextProps {
	ordersnumber: number
	updateOrdersNumber: (newValue: number) => void
}
export const OrdersNumberContext = createContext({} as OrdersNumberContextProps)

export function OrdersNumberContextProvider({
	children,
}: {
	children: ReactNode
}) {
	const [ordersnumber, setOrdersNumber] = useState(0)

	function updateOrdersNumber(newValue: number) {
		setOrdersNumber(newValue)
	}

	return (
		<OrdersNumberContext.Provider value={{ ordersnumber, updateOrdersNumber }}>
			{children}
		</OrdersNumberContext.Provider>
	)
}
