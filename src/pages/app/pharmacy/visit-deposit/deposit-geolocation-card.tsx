import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { MapPin } from "lucide-react"

interface Props {
	latitude: number
	longitude: number
}
export function DepositGeoLocationCard({ latitude, longitude }: Props) {
	return latitude !== 0 ? (
		<Card className="p-5 flex flex-col gap-2 shadow-sm rounded-lg justify-between text-foreground">
			<div className="flex g-2">
				<strong className="flex">{longitude}</strong>
				{" / "}
				<strong className="flex">{latitude}</strong>
			</div>
			<div className=" font-light text-sm flex items-center justify-between">
				<span>Geolocalização</span>
				<MapPin className="w-4 h-4" />
			</div>
		</Card>
	) : (
		<Card className="p-5 flex flex-col gap-2 shadow-sm rounded-lg justify-between text-foreground">
			<Skeleton className="w-32 h-4" />
			<div className=" font-light text-sm flex items-center justify-between">
				<Skeleton className="w-16 h-4" />
				<Skeleton className="w-4 h-4" />
			</div>
		</Card>
	)
}
