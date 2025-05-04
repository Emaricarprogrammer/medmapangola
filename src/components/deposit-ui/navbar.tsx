import { MedicinesContext } from "@/contexts/deposit-medicines"
import { House, Package, User } from "lucide-react"
import { useContext } from "react"
import { NavLink } from "react-router-dom"

export function DepositNavbar() {
	const { medicines } = useContext(MedicinesContext)

	return (
		<nav className="flex flex-col gap-10 font-light max-sm:flex-row max-sm:text-sm max-sm:gap-neutral-300 tracking-wide">
			<NavLink
				to="/deposito"
				className="flex items-center gap-2 max-sm:gap-0 max-sm:flex-col text-neutral-400 font-semibold hover:text-neutral-200"
			>
				<House className="h-5 w-5 max-sm:w-5 max-sm:h-5" />
				<span className="max-sm:xs">Dashboard</span>
			</NavLink>

			<NavLink
				to="/deposito/stock"
				className="flex items-center relative gap-2 max-sm:gap-0 max-sm:flex-col text-neutral-400 font-semibold hover:text-neutral-200"
			>
				<Package className="h-5 w-5 max-sm:w-5 max-sm:h-5" />
				<span className="max-sm:xs">Stock</span>

				<div className="w-5 h-5 flex items-center max-lg:left-6 justify-center text-xs absolute left-20 -top-1 rounded-lg bg-amber-600 text-white">
					{medicines > 9 ? "+9" : medicines}
				</div>
			</NavLink>

			<NavLink
				to="/deposito/perfil"
				className="flex items-center gap-2 max-sm:gap-0 max-sm:flex-col text-neutral-400 font-semibold hover:text-neutral-200"
			>
				<User className="h-5 w-5 max-sm:w-5 max-sm:h-5" />
				<span className="max-sm:xs">Perfil</span>
			</NavLink>
		</nav>
	)
}
