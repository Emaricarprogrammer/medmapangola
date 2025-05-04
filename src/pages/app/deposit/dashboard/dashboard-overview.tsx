import { getProfile } from "@/api/general/get-profile"
import { Card } from "@/components/ui/card"
import { useQuery } from "@tanstack/react-query"
import { Package, Phone, MapPin, Map } from "lucide-react"

export function DashboardOverview() {
	const { data } = useQuery({
		queryKey: ["profile"],
		queryFn: getProfile,
	})

	return (
		<div className="grid grid-cols-4 gap-4 max-xl:grid-cols-2 max-sm:hidden">
			<Card className="p-5 flex flex-col gap-2 rounded-lg shadow-sm justify-between text-foreground">
				<strong className="flex">{140}</strong>
				<div className="font-light text-sm flex items-center justify-between">
					<span>Unidade de Medicamentos</span>
					<Package className="w-4 h-4 max-sm:hidden" />
				</div>
			</Card>

			<Card className="p-5 flex flex-col gap-2 shadow-sm rounded-lg justify-between text-foreground">
				<strong className="flex">Angola, Luanda</strong>
				<div className=" font-light text-sm flex items-center justify-between">
					<span>Localização</span>
					<Map className="w-4 h-4 max-sm:hidden" />
				</div>
			</Card>

			<Card className="p-5 flex flex-col gap-2 shadow-sm rounded-lg justify-between text-foreground">
				<strong className="flex">+244 900 000 000</strong>
				<div className="font-light text-sm flex items-center justify-between">
					<span>Contacto</span>
					<Phone className="w-4 h-4 max-sm:hidden" />
				</div>
			</Card>

			<Card className="p-5 flex flex-col gap-2 shadow-sm rounded-lg justify-between text-foreground">
				<div className="flex">
					<strong className="flex">-3425.55/Log</strong>
					<strong className="flex">-3443.55/Lat</strong>
				</div>
				<div className=" font-light text-sm flex items-center justify-between">
					<span>Geolocalização</span>
					<MapPin className="w-4 h-4 max-sm:hidden" />
				</div>
			</Card>
		</div>
	)
}
