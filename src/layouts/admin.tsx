import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Helmet } from "react-helmet-async"
import { Outlet } from "react-router-dom"

export function AdminLayouth() {
	return (
		<>
			<Helmet title="Administrador" />

			<div className="bg-neutral-50/30 h-screen w-full text-neutral-900">
				<header className="flex items-center justify-between border-b bg-white  border-b-neutral-200 px-12 py-6">
					<img src="/logo-medmap.png" className="w-36" alt="" />

					<nav className="flex items-center gap-4">
						<h1 className="text-xl font-bold">Heezy</h1>
						<Avatar>
							<AvatarImage src="" />
							<AvatarFallback className="bg-neutral-200 font-bold">
								HZ
							</AvatarFallback>
						</Avatar>
					</nav>
				</header>

				<Outlet />
			</div>
		</>
	)
}
