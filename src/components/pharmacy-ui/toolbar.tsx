import { ReactNode } from "react"
import { ShoppingCart } from "lucide-react"
import { Link } from "react-router-dom"
import { Badge } from "../ui/badge"
import { useCart } from "@/hooks/useCart"
import { AccountMenu } from "./account-menu"

interface ToolbarProps {
	legend: string
	children?: ReactNode
}

export function Toolbar({ legend, children }: ToolbarProps) {
	const { totalItems } = useCart()

	return (
		<header className="w-full rounded-xl border-b bg-white/95 sticky top-0 z-50 px-4 py-3 shadow-sm border">
			<div className="flex items-center justify-between h-14">
				<div className="flex items-center gap-4">
					<div className="flex items-center gap-2">
						{children}
						<h1 className="text-lg text-gray-700">{legend}</h1>
					</div>
				</div>

				<div className="flex items-center gap-4">
					<Link
						to="/farmacia/carrinho-encomendas"
						className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
						aria-label="Shopping cart"
					>
						<ShoppingCart className="h-6 w-6 text-gray-700" />
						<Badge
							variant="destructive"
							className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0"
						>
							{totalItems > 9 ? "9+" : totalItems}
						</Badge>
					</Link>

					<AccountMenu />
				</div>
			</div>
		</header>
	)
}
