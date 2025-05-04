import { getDeposit } from "@/api/pharmacy/get-deposit"
import { Card } from "@/components/ui/card"
import { useQuery } from "@tanstack/react-query"
import { jwtDecode } from "jwt-decode"
import { Package, Phone, MapPin, Map } from "lucide-react"
import { EmptyProfile } from "./empty-profile"

export function DashboardOverview() {
	const storedToken = localStorage.getItem("accessToken")
	if (!storedToken || typeof storedToken !== "string") {
		throw new Error("Token de autenticação ausente ou inválido")
	}
	const { id_entidade } = jwtDecode<any>(storedToken)

	const { data, isFetching } = useQuery({
		queryKey: ["deposit", { depsitId: id_entidade }],
		queryFn: async () => {
			if (!id_entidade) return
			return getDeposit(id_entidade)
		},
		enabled: !!id_entidade,
	})

	if (isFetching) {
		return <EmptyProfile />
	}

	return (
		<div className="grid grid-cols-4 gap-4 max-xl:grid-cols-2 max-sm:hidden">
			<Card className="p-5 flex flex-col gap-2 rounded-lg shadow-sm justify-between text-foreground">
				<strong className="flex">
					{data?.response?.medicamentos_deposito?.length}
				</strong>
				<div className="font-light text-sm flex items-center justify-between">
					<span>Unidade de Medicamentos</span>
					<Package className="w-4 h-4 max-sm:hidden" />
				</div>
			</Card>

			<Card className="p-5 flex flex-col gap-2 shadow-sm rounded-lg justify-between text-foreground">
				<strong className="flex">
					{data?.response.pais}, {data?.response.cidade}
				</strong>
				<div className=" font-light text-sm flex items-center justify-between">
					<span>Localização</span>
					<Map className="w-4 h-4 max-sm:hidden" />
				</div>
			</Card>

			<Card className="p-5 flex flex-col gap-2 shadow-sm rounded-lg justify-between text-foreground">
				<strong className="flex">+244 {data?.response.contacto}</strong>
				<div className="font-light text-sm flex items-center justify-between">
					<span>Contacto</span>
					<Phone className="w-4 h-4 max-sm:hidden" />
				</div>
			</Card>

			<Card className="p-5 flex flex-col gap-2 shadow-sm rounded-lg justify-between text-foreground">
				<div className="flex">
					<strong className="flex">
						-{data?.response.geolocalizacao_deposito.longitude}/Log
					</strong>
					<strong className="flex">
						-{data?.response.geolocalizacao_deposito.latitude}/Log
					</strong>
				</div>
				<div className=" font-light text-sm flex items-center justify-between">
					<span>Geolocalização</span>
					<MapPin className="w-4 h-4 max-sm:hidden" />
				</div>
			</Card>
		</div>
	)
}
