import { ShoppingCart } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

export function EmptyOrdersState() {
	return (
		<motion.div
			className="flex flex-col items-center justify-center py-12 px-4 text-center"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
		>
			<div className="bg-emerald-50 p-6 rounded-full mb-6">
				<ShoppingCart className="h-12 w-12 text-emerald-600" />
			</div>

			<motion.h3
				className="text-2xl font-bold text-gray-800 mb-2"
				initial={{ y: 20 }}
				animate={{ y: 0 }}
			>
				Nenhuma encomenda feita!
			</motion.h3>

			<motion.p
				className="text-gray-500 mb-8 max-w-md"
				initial={{ y: 20 }}
				animate={{ y: 0 }}
				transition={{ delay: 0.1 }}
			>
				Parece que não fez nenhuma encomenda
			</motion.p>

			<motion.div
				initial={{ y: 20 }}
				animate={{ y: 0 }}
				transition={{ delay: 0.2 }}
				whileHover={{ scale: 1.02 }}
				whileTap={{ scale: 0.98 }}
			>
				<Button className="bg-emerald-500 rounded-full">
					<Link to="/farmacia">Começar</Link>
				</Button>
			</motion.div>
		</motion.div>
	)
}
