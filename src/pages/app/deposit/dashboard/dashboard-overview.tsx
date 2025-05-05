import { Card } from "@/components/ui/card"
import { useQuery } from "@tanstack/react-query"
import { Package, Phone, MapPin, Map } from "lucide-react"
import { EmptyProfile } from "./empty-profile"
import { getDepositDatas } from "@/api/deposit/get-datas"

export function DashboardOverview() {
  const { data, isLoading } = useQuery({
    queryKey: ["depositData"],
    queryFn: getDepositDatas,
  })

  if (isLoading) {
    return <EmptyProfile />
  }

  if (!data?.response) {
    return <div className="text-center py-8 text-muted-foreground">Nenhum dado de depósito disponível</div>
  }

  const depositData = data.response

  return (
    <div className="grid grid-cols-4 gap-4 max-xl:grid-cols-2 max-sm:grid-cols-1 max-sm:gap-3">
      {/* Medication Count Card */}
      <Card className="p-5 flex flex-col gap-3 rounded-lg border-border/50 hover:border-primary/30 transition-colors group">
        <div className="flex items-center justify-between">
          <strong className="text-2xl font-semibold text-primary">
            {depositData.total_medicamentos}
          </strong>
          <div className="p-2 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
            <Package className="w-5 h-5 text-primary" />
          </div>
        </div>
        <span className="text-sm font-medium text-muted-foreground">Unidades de Medicamentos</span>
      </Card>

      {/* Location Card */}
      <Card className="p-5 flex flex-col gap-3 rounded-lg border-border/50 hover:border-primary/30 transition-colors group">
        <div className="flex items-center justify-between">
          <strong className="text-xl font-semibold">
            {depositData.cidade}
          </strong>
          <div className="p-2 rounded-full bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors">
            <Map className="w-5 h-5 text-blue-500" />
          </div>
        </div>
        <span className="text-sm font-medium text-muted-foreground">
          {depositData.rua}, {depositData.numero} • {depositData.logradouro}
        </span>
      </Card>

      {/* Contact Card */}
      <Card className="p-5 flex flex-col gap-3 rounded-lg border-border/50 hover:border-primary/30 transition-colors group">
        <div className="flex items-center justify-between">
          <strong className="text-xl font-semibold text-foreground">
            +244 {depositData.contacto}
          </strong>
          <div className="p-2 rounded-full bg-green-500/10 group-hover:bg-green-500/20 transition-colors">
            <Phone className="w-5 h-5 text-green-500" />
          </div>
        </div>
        <span className="text-sm font-medium text-muted-foreground">Contacto do Depósito</span>
      </Card>

      {/* Geolocation Card */}
      <Card className="p-5 flex flex-col gap-3 rounded-lg border-border/50 hover:border-primary/30 transition-colors group">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <strong className="text-sm font-medium">
              <span className="text-muted-foreground">Long: </span>
              {depositData.geolocalizacao_deposito.longitude.toFixed(4)}
            </strong>
            <strong className="text-sm font-medium">
              <span className="text-muted-foreground">Lat: </span>
              {depositData.geolocalizacao_deposito.latitude.toFixed(4)}
            </strong>
          </div>
          <div className="p-2 rounded-full bg-amber-500/10 group-hover:bg-amber-500/20 transition-colors">
            <MapPin className="w-5 h-5 text-amber-500" />
          </div>
        </div>
        <span className="text-sm font-medium text-muted-foreground">Geolocalização</span>
      </Card>
    </div>
  )
}