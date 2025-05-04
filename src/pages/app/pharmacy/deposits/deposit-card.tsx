import { useNavigate } from "react-router-dom"
import { ArrowUpRight, Box, MapPin, Package, Truck } from "lucide-react"
import { Deposito } from "@/api/pharmacy/get-deposities"

interface Deposit {
	deposit: Deposito
}
export function DepositCard({ deposit }: Deposit) {
	const navigate = useNavigate()

	function handleVisitDeposit() {
		navigate(`/farmacia/detalhes-deposito?id=${deposit.id_entidade}`)
	}

	return (
		<div className="bg-white border h-80 p-6 cursor-pointer justify-evenly flex flex-col gap-4 rounded-2xl border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 hover:border-gray-200 group">
			<div className="flex items-start gap-4">
				<div className="relative">
					<Truck className="w-8 h-8" />
					<div className="absolute -bottom-2 -left-2 bg-emerald-500 p-1 rounded-full border-2 border-white">
						<Box className="h-3 w-3 text-white" />
					</div>
				</div>

				<div className="flex-1">
					<h3 className="text-xl font-medium text-gray-900">
						{deposit.firma_entidade}
					</h3>
					<p className="text-sm text-gray-500 flex items-center gap-1.5 mt-1">
						<MapPin className="h-4 w-4 text-gray-400" />
						<span>
							{deposit.cidade} - {deposit.rua}
						</span>
					</p>
				</div>
			</div>

			<div className="grid grid-cols-2 gap-3 mt-2 w-full">
				<div className=" rounded-xl">
					<p className="flex items-center gap-1 text-gray-500">
						<Package className="w-4 h-4" />
						<span>Unidades</span>
					</p>

					<p className="text-lg text-gray-900 mt-4 w-56">
						{deposit.medicamentos.length > 0 && (
							<p className="flex items-center gap-2">
								<span className="text-sm text-emerald-500 font-bold bg-emerald-50 px-4 py-2 rounded-xl">
									{deposit.medicamentos.length}
								</span>
								<span className="text-sm"> Unidades Disponíveis</span>
							</p>
						)}

						{deposit.medicamentos.length === 0 && (
							<p className="flex items-center gap-2">
								<span className="text-sm text-rose-500 font-bold bg-rose-50 px-4 py-2 rounded-xl">
									{deposit.medicamentos.length}
								</span>
								<span className="text-sm"> Unidades Disponíveis</span>
							</p>
						)}
					</p>
				</div>
			</div>

			<button
				onClick={handleVisitDeposit}
				className="mt-2 flex border items-center justify-center gap-2 text-sm font-medium text-emerald-600 hover:bg-emerald-600 hover:text-white  transition-all duration-300 w-full py-3 rounded-xl group-hover:shadow-emerald-sm"
			>
				<ArrowUpRight className="w-4 h-4" />
				<span>Visitar Depósito</span>
			</button>
		</div>
	)
}
