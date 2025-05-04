import { Table, TableBody } from "@/components/ui/table"
import { Pagination } from "@/components/general-ui/pagination"
import { Toolbar } from "@/components/pharmacy-ui/toolbar"

import { OrderTableRow } from "./order-table-row"
import { OrderTableHead } from "./order-table-head"

import { Helmet } from "react-helmet-async"
import { Package } from "lucide-react"

import { useQuery } from "@tanstack/react-query"
import { getOrders } from "@/api/pharmacy/get-orders"
import { OrderTableRowSkeleton } from "./orders-skeleton"

export function Orders() {
	const { data: result } = useQuery({
		queryKey: ["orders"],
		queryFn: getOrders,
	})

	return (
		<>
			<Helmet title="Encomendas" />

			<div className="w-full">
				<Toolbar
					children={<Package className="text-emerald-700 h-6 w-6" />}
					legend="Encomendas"
				/>

				<div className="h-[37rem] overflow-y-scroll flex flex-col justify-between">
					<div className="mt-8 bg-white p-4 rounded-lg border shadow-sm">
						<Table className="w-full">
							<OrderTableHead />

							<TableBody>
								{result &&
									result?.response?.map((pedido) =>
										pedido?.pedidos?.map((item) =>
											item?.medicamento?.map((item1) => {
												return (
													<OrderTableRow
														key={item1.id_medicamento}
														order={item1}
														status={item.status}
														quantidade_medicamentos={
															item.quantidade_medicamentos
														}
														data_aquisicao={item.data_aquisicao}
													/>
												)
											})
										)
									)}
								{!result &&
									Array.from({ length: 8 }).map((_, index) => {
										return <OrderTableRowSkeleton key={index} />
									})}
							</TableBody>
						</Table>
					</div>
				</div>

				<div>
					<Pagination
						currentPage={result?.pagination?.currentPage || 1}
						legend="Pedidos"
						totalItem={result?.pagination?.totalItems || 0}
						perPage={result?.pagination?.itemsPerPage || 8}
					/>
				</div>
			</div>
		</>
	)
}
