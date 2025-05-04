import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { DepositMedicinalAvailableCard } from "./deposit-medicinals-available-card"
import { DepositLocationCard } from "./deposit-location-card"
import { DepositContactsCard } from "./deposit-contacts-card"
import { DepositGeoLocationCard } from "./deposit-geolocation-card"
import { Skeleton } from "@/components/ui/skeleton"

interface DepositOverViewProps {
	depositName: string | null
	available: number
	locale: string
	contacts: number
	latitude: number
	longitude: number
}
export function DepositOverView({
	depositName,
	available,
	locale,
	latitude,
	longitude,
	contacts,
}: DepositOverViewProps) {
	return (
		<div className="flex flex-col gap-2 w-full border bg-white p-4 rounded-md">
			<div className="flex items-center gap-2">
				<Avatar className="h-16 w-16">
					<AvatarImage src="[Nome da Imagem]" />
					<AvatarFallback className="font-bold border-2">
						{depositName?.charAt(0).toString()}
						{depositName?.charAt(9)}
					</AvatarFallback>
				</Avatar>

				{latitude !== 0 ? (
					<div className="flex flex-col gap-1">
						<strong className="font-bold text-xl">{depositName}</strong>
						<span className="text-foreground/80">Depósito de Medicamentos</span>
					</div>
				) : (
					<div className="flex flex-col gap-1">
						<Skeleton className="w-40 h-4" />
						<Skeleton className="w-32 h-4" />
					</div>
				)}
			</div>

			<div className="grid grid-cols-4 gap-4 mt-4 max-xl:grid-cols-2 max-sm:grid-cols-1">
				<DepositMedicinalAvailableCard available={available} />
				<DepositLocationCard locale={locale} />
				<DepositContactsCard contacts={contacts} />
				<DepositGeoLocationCard latitude={latitude} longitude={longitude} />
			</div>
		</div>
	)
}
