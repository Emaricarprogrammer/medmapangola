import { Helmet } from "react-helmet-async"
import { House, Package } from "lucide-react"

import { OrdersTableHead } from "./orders-table-head"
import { OrdersTableRow } from "./orders-table-row"
import { DashboardOverview } from "./dashboard-overview"

import { Table, TableBody } from "@/components/ui/table"
import { Toolbar } from "@/components/deposit-ui/toolbar"
import { Pagination } from "@/components/general-ui/pagination"
import { useQuery } from "@tanstack/react-query"
import { jwtDecode } from "jwt-decode"
import { getOrders } from "@/api/deposit/get-orders"
import { EmptyOrdersState } from "./empty-orders"
import { OrdersTableRowSkeleton } from "./order-skeleton"

export function Dashboard() {
	const storedToken = localStorage.getItem("accessToken")
	if (!storedToken || typeof storedToken !== "string") {
		throw new Error("Token de autenticação ausente ou inválido")
	}
	const { id_entidade } = jwtDecode<any>(storedToken)

	const { data: result, isFetching } = useQuery({
		queryKey: ["my-orders", id_entidade || 0],
		queryFn: async () => {
			if (!id_entidade) return
			return getOrders(id_entidade)
		},

		enabled: !!id_entidade,
	})

	return (
		<>
			<Helmet title="Dashboard - Depósito" />

			<div className="w-full">
				<Toolbar
					children={<House className="text-emerald-700 h-6 w-6" />}
					legend="Painel do Depósito"
				/>

				<div className="bg-white p-5  border border-neutral-200 rounded-lg  mt-4">
					<DashboardOverview />

					<div className="mt-10 flex items-center justify-between">
						<h1 className="font-medium flex items-center gap-1 text-neutral-800">
							<Package className="w-5 h-5" />
							Últimos Pedidos em 24h
						</h1>
					</div>
					<div className="mt-6 bg-white h-[22rem] overflow-y-scroll p-4 rounded-lg border shadow-sm">
						<Table className="w-full">
							<OrdersTableHead />

							{isFetching &&
								Array.from({ length: 3 }).map(() => {
									return <OrdersTableRowSkeleton />
								})}

							<TableBody>
								{!isFetching &&
									result?.response?.map((order) => {
										return (
											<OrdersTableRow order={order} key={order.id_aquisicao} />
										)
									})}
							</TableBody>
						</Table>
					</div>

					{!isFetching && result?.response === undefined && (
						<EmptyOrdersState />
					)}

					<Pagination
						currentPage={1}
						totalItem={20}
						perPage={3}
						legend="Pedidos"
					/>
				</div>
			</div>
		</>
	)
}
