import { Button } from "@/components/ui/button"
import { Package, ShoppingBag, Star, Truck } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { priceFormatter } from "@/utils/formatter"
import { Medicinal } from "@/@types/medicinals"
import { useCart } from "@/hooks/useCart"

interface MedicinalProps {
	medicinal: Medicinal
}

export function DepositMedicinalCard({ medicinal }: MedicinalProps) {
	const { addMedicinalToCart } = useCart()

	return (
		<div className="bg-white border border-gray-200 gap-4 p-5 flex rounded-xl max-sm:p-4 max-sm:flex-col hover:shadow-md transition-shadow duration-300">
			<div className="relative">
				<img
					className="w-20 h-20 max-sm:w-28 max-sm:h-28 rounded-lg object-cover border border-gray-100"
					src={medicinal.imagem}
					alt={medicinal.nome_comercial}
				/>
				<Badge
					variant="outline"
					className="absolute -top-2 -right-2 bg-white shadow-sm flex items-center gap-1"
				>
					<Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
					<span className="text-xs">4.8</span>
				</Badge>
			</div>

			<div className="flex-1 flex flex-col gap-3">
				<div className="flex flex-col gap-1">
					<h3 className="font-semibold text-foreground text-base line-clamp-2">
						{medicinal.nome_generico}
					</h3>
					<div className="flex items-center gap-2">
						<span className="text-emerald-600 font-bold text-lg">
							{priceFormatter.format(medicinal.preco)}
						</span>
						<span className="text-muted-foreground text-sm">/Caixa</span>
					</div>
				</div>

				<div className="space-y-2">
					<div className="flex items-center gap-2 text-sm">
						<Truck className="text-muted-foreground h-4 w-4" />
						<span className="text-muted-foreground flex items-center gap-1">
							<span className="font-medium text-foreground">Origem</span>
							{medicinal.origem}
						</span>
					</div>

					<div className="flex items-center gap-2 text-sm">
						<Package className="text-muted-foreground h-4 w-4" />
						<span className="text-muted-foreground flex items-center gap-1">
							<span className="font-medium text-foreground">
								{medicinal.quantidade_disponivel}
							</span>
							unidades disponíveis
						</span>
					</div>
				</div>

				<footer className="mt-auto pt-3 gap-4 border-t flex items-center justify-between">
					<Button
						onClick={() => {
							addMedicinalToCart(medicinal)
						}}
						className="gap-2 text-sm h-10 ml-auto bg-emerald-600 hover:bg-emerald-700"
					>
						<ShoppingBag className="w-4 h-4" />
						Encomendar
					</Button>
				</footer>
			</div>
		</div>
	)
}
