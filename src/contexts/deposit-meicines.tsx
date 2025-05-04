import { createContext, ReactNode, useState } from "react"

interface MedicinesContextProps {
	medicines: number
	updateMedicines: (newValue: number) => void
}
export const MedicinesContext = createContext({} as MedicinesContextProps)

export function MedicinesContextProvider({
	children,
}: {
	children: ReactNode
}) {
	const [medicines, setMedicines] = useState(0)

	function updateMedicines(newValue: number) {
		setMedicines(newValue)
	}

	return (
		<MedicinesContext.Provider value={{ medicines, updateMedicines }}>
			{children}
		</MedicinesContext.Provider>
	)
}
