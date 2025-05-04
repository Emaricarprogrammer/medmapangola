import { createBrowserRouter } from "react-router-dom"

import { Landing } from "./pages/landing"

import { AuthLayout } from "./layouts/auth"
import { SignUp } from "./pages/auth/sign-up"
import { SignIn } from "./pages/auth/sign-in"
import { Recovery } from "./pages/auth/recovery"
import { ResetPassword } from "./pages/auth/reset-password"

import { PharmacyLayout } from "./layouts/pharmacy"
import { Home } from "./pages/app/pharmacy/home"
import { Deposits } from "./pages/app/pharmacy/deposits"
import { Orders } from "./pages/app/pharmacy/orders"
import { VisitDeposit } from "./pages/app/pharmacy/visit-deposit"
import { Cart } from "./pages/app/pharmacy/cart"
import { PharmacyProfile } from "./pages/app/pharmacy/profile"

import { AdminLayouth } from "./layouts/admin"
import { AdminDashboard } from "./pages/admin"

import { DepositLayout } from "./layouts/deposit"
import { Dashboard } from "./pages/app/deposit/dashboard"
import { Stock } from "./pages/app/deposit/stock"

import { NotFound } from "./pages/404"
import { DepositProfile } from "./pages/app/deposit/profile"

export const routes = createBrowserRouter([
	{
		path: "/",
		errorElement: <NotFound />,
		element: <Landing />,
	},

	{
		path: "/auth",
		element: <AuthLayout />,
		children: [
			{ path: "entrar", element: <SignIn /> },
			{ path: "criar-conta", element: <SignUp /> },
			{ path: "recuperar-credencias", element: <Recovery /> },
			{ path: "repor-credencias", element: <ResetPassword /> },
		],
	},

	{
		path: "/farmacia",
		element: <PharmacyLayout />,
		children: [
			{ path: "", element: <Home /> },
			{ path: "carrinho-encomendas", element: <Cart /> },
			{ path: "depositos-disponiveis", element: <Deposits /> },
			{ path: "encomendas", element: <Orders /> },
			{ path: "detalhes-deposito", element: <VisitDeposit /> },
			{ path: "perfil", element: <PharmacyProfile /> },
		],
	},

	{
		path: "/deposito",
		element: <DepositLayout />,
		children: [
			{ path: "", element: <Dashboard /> },
			{ path: "stock", element: <Stock /> },
			{ path: "perfil", element: <DepositProfile /> },
		],
	},

	{
		path: "/administrador",
		element: <AdminLayouth />,
		children: [{ path: "", element: <AdminDashboard /> }],
	},
])
