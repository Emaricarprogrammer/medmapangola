import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Helmet } from "react-helmet-async"
import { api } from "@/services/axios"
import { isAxiosError } from "axios"
import { jwtDecode } from "jwt-decode"
import { LogOut } from "lucide-react"
import { useEffect, useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { toast } from "sonner"

interface JwtPayload {
  access_level: "deposito" | "farmacia" | "admin"
  name?: string
}

export function AdminLayouth() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const storedToken = localStorage.getItem("accessToken")

  // Configuração do interceptor
  useEffect(() => {
    const interceptor = api.interceptors.response.use(
      response => response,
      error => {
        if (isAxiosError(error) && error.response?.status === 401) {
          handleSessionExpired()
        }
        return Promise.reject(error)
      }
    )
    return () => api.interceptors.response.eject(interceptor)
  }, [navigate])

  const handleSessionExpired = () => {
    localStorage.removeItem("accessToken")
    toast.warning("Sessão expirada, faça login novamente")
    navigate("/auth/entrar", { replace: true })
  }

  const handleLogout = () => {
    localStorage.removeItem("accessToken")
    toast.info("Sessão encerrada com sucesso")
    navigate("/auth/entrar", { replace: true })
  }

  // Verificação do token
  useEffect(() => {
    const verifyAccess = async () => {
		await new Promise((resolve) => setTimeout(resolve, 2000))

      if (!storedToken) {
        handleSessionExpired()
        return
      }

      try {
        const { access_level } = jwtDecode<JwtPayload>(storedToken)
        

        // Redireciona se não for admin
        if (access_level !== "admin") {
          const redirectPath = access_level === "deposito" 
            ? "/deposito" 
            : "/farmacia"
          navigate(redirectPath, { replace: true })
          return
        }

      } catch (error) {
        console.error("Falha na verificação do token:", error)
        handleSessionExpired()
      } finally {
        setIsLoading(false)
      }
    }

    verifyAccess()
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

  return (
    <>
      <Helmet title="Administrador" />
      
      <div className="bg-neutral-50/30 h-screen w-full text-neutral-900">
        {/* Header */}
        <header className="flex items-center justify-between border-b bg-white border-b-neutral-200 px-6 py-4">
          <img src="/logo-medmap.png" className="w-32" alt="Logo" />
          
          <div className="flex items-center gap-4">
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="text-sm font-medium">Sair</span>
            </button>
            
            <Avatar>
              <AvatarImage src="" />
              <AvatarFallback className="bg-blue-100 font-bold text-blue-600">
                AB
              </AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </>
  )
}