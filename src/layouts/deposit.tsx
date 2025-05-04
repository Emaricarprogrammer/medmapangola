import { DepositNavbar } from "@/components/deposit-ui/navbar"
import { api } from "@/services/axios"
import { isAxiosError } from "axios"
import { jwtDecode } from "jwt-decode"
import { LogOut } from "lucide-react"
import { useEffect, useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { toast } from "sonner"

export function DepositLayout() {
	const navigate = useNavigate()
	const [isLoading, setIsLoading] = useState(true)

	const storedToken = localStorage.getItem("accessToken")

	useEffect(() => {
		const interceptorsId = api.interceptors.response.use(
			(request) => request,
			async (error) => {
				if (isAxiosError(error)) {
					const statusCode = error.status
					const message = error?.response?.data?.message

					if (
						statusCode === 401 &&
						message ===
							"Ooooops! Parece que a sua sessão está expirada, por favor faça login novamente"
					) {
						localStorage.removeItem("accessToken")
						navigate("/auth/entrar", { replace: true })
					}
				}
				return Promise.reject(error)
			}
		)

		return () => {
			api.interceptors.response.eject(interceptorsId)
		}
	}, [navigate])

	const handleLogout = async () => {
		toast.warning("Sessão terminada!")
		localStorage.removeItem("accessToken")
		navigate("/auth/entrar", { replace: true })
	}

	useEffect(() => {
		async function Verify() {
			await new Promise((resolve) => setTimeout(resolve, 2000))

			if (!storedToken || typeof storedToken !== "string") {
				navigate("/auth/entrar", { replace: true })
				setIsLoading(false)
				toast.warning("Sessão Expirada, Faça Login Novamente")
				return
			}

			try {
				const { access_level } = jwtDecode<any>(storedToken)
				if (access_level === "deposito") {
					setIsLoading(false)
				} else if (access_level === "farmacia") {
					navigate("/farmacia", { replace: true })
					setIsLoading(false)
				} else if (access_level === "admin") {
					navigate("/administrador", { replace: true })
					setIsLoading(false)
				} else {
					navigate("/auth/entrar", { replace: true })
					setIsLoading(false)
				}
			} catch (error) {
				console.error("Erro ao decodificar token:", error)
				localStorage.removeItem("accessToken")
				navigate("/auth/entrar", { replace: true })
				setIsLoading(false)
			}
		}

		Verify()
	}, [navigate, storedToken])

	if (isLoading) {
		return (
			<div className="flex gap-4 items-center justify-center h-screen bg-neutral-50">
				<img
					src="/logo-medmap.png"
					className="w-44 transition-transform hover:scale-105"
					alt="Logo"
				/>
				<div className="relative w-12 h-12">
					<div className="absolute inset-0 rounded-full border-4 border-emerald-300/30"></div>
					<div className="absolute inset-0 rounded-full animate-spin border-4 border-transparent border-t-emerald-500 border-r-emerald-500"></div>
					<div className="absolute inset-0 rounded-full animate-spin border-4 border-transparent border-b-emerald-300 border-l-emerald-300 animation-delay-300"></div>
					<div className="absolute inset-0 flex items-center justify-center">
						<div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></div>
					</div>
				</div>
			</div>
		)
	}

	if (!storedToken || typeof storedToken !== "string") {
		navigate("/auth/entrar", { replace: true })
		return null
	}

	try {
		const { access_level } = jwtDecode<any>(storedToken)
		if (access_level !== "deposito") {
			if (access_level === "farmacia") {
				navigate("/farmacia", { replace: true })
			} else if (access_level === "admin") {
				navigate("/administrador", { replace: true })
			} else {
				navigate("/auth/entrar", { replace: true })
			}
			return null
		}
	} catch (error) {
		localStorage.removeItem("accessToken")
		navigate("/auth/entrar", { replace: true })
		return null
	}

	return (
		<div className="flex antialiased bg-neutral-50 h-screen gap-0 max-sm:gap-0">
			<aside className="flex items-center z-50 flex-col justify-between w-fit max-sm:flex-row max-sm:left-0 max-sm:w-full bg-neutral-950 max-sm:h-fit max-sm:py-4 max-sm:px-6 max-sm:fixed max-sm:bottom-0 max-sm:shadow-md h-screen p-8 border-r border-neutral-700/50">
				<header className="flex flex-col w-44 gap-16 max-sm:flex-row max-sm:gap-4 max-sm:items-center">
					<div className="flex flex-col gap-5">
						<div className="flex items-end gap-2.5">
							<img src="/logo-white-1.png" className="w-9 h-9" alt="Logo" />
							<img
								src="/logo-white-2.png"
								className="max-sm:hidden h-6"
								alt="Brand Name"
							/>
						</div>
						<span className="w-full max-sm:hidden h-px bg-neutral-700/80 mt-2"></span>
					</div>
					<DepositNavbar />
				</header>
				<footer className="flex flex-col gap-6">
					<button
						onClick={handleLogout}
						className="flex items-center gap-3 max-sm:flex-col max-sm:gap-0 font-semibold max-sm:px-5 text-rose-400/90 hover:text-rose-300 transition-colors text-sm group"
					>
						<LogOut className="w-6 h-6 group-hover:scale-105 transition-transform" />
						<span>Sair</span>
					</button>
					<div className="max-sm:hidden text-sm text-neutral-500/90">
						Painel do Depósito © {new Date().getFullYear()}
					</div>
				</footer>
			</aside>
			<div className="flex-1 overflow-auto p-6 bg-white/50">
				<Outlet />
			</div>
		</div>
	)
}
