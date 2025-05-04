import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import {
	ArrowUpRightFromSquare,
	MapPin,
	Package,
	ShoppingCart,
	Star,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Medicinal } from "@/@types/medicinals"
import { DetailsDialog } from "./details-dialog"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/hooks/useCart"
import { priceFormatter } from "@/utils/formatter"

interface MedicinalProps {
	medicinal: Medicinal
}

export function MedicinalCard({ medicinal }: MedicinalProps) {
	const { addMedicinalToCart } = useCart()

	return (
		<div className="bg-white border border-gray-200 gap-4 p-5 flex rounded-tl-2xl rounded-br-2xl max-sm:p-4 max-sm:flex-col hover:shadow-md transition-shadow duration-300">
			<div className="relative">
				<img
					className="w-20 h-20 max-sm:w-28 max-sm:h-28 rounded-lg object-cover border border-gray-100"
					src={medicinal.imagem}
					alt={medicinal.nome_generico}
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
						<MapPin className="text-muted-foreground h-4 w-4" />
						<div className="grid">
							<span className="font-medium">
								{medicinal?.deposito?.firma_deposito}
							</span>
							<span className="text-muted-foreground text-xs">
								{medicinal?.deposito?.rua}, {medicinal?.deposito?.logradouro}
							</span>
						</div>
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
					<Dialog>
						<DialogTrigger asChild>
							<Button
								variant="outline"
								className="gap-2 text-sm h-10 px-3 rounded-xl"
							>
								<ArrowUpRightFromSquare className="w-4 h-4" />
								Detalhes
							</Button>
						</DialogTrigger>

						<DetailsDialog medicinal={medicinal} />
					</Dialog>

					<Button
						className="gap-2 text-sm h-10 bg-emerald-600 hover:bg-emerald-700 rounded-xl"
						onClick={() => {
							addMedicinalToCart(medicinal)
						}}
					>
						<ShoppingCart className="w-4 h-4" />
						Encomendar
					</Button>
				</footer>
			</div>
		</div>
	)
}
