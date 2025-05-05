import { api } from "@/services/axios"
import { jwtDecode } from "jwt-decode"

interface DepositDatasResponse
{
    response:{
        cidade: string
        contacto: number
        logradouro: string
        numero: number
        rua: string
        geolocalizacao_deposito:{
            latitude: number, 
            longitude: number
        }
        total_medicamentos: number
    }
}

 async function getDepositDatas() {
    const storedToken = localStorage.getItem("accessToken")

    if (!storedToken || typeof storedToken !== "string") {
        throw new Error("Token de autenticação ausente ou inválido")
    }

    const { id_entidade } = jwtDecode<any>(storedToken)

    try {
        const response = await api.get<DepositDatasResponse>(
            `/entity/deposit/myDatas/${id_entidade}`,
            {
                headers: {
                    Authorization: `Bearer ${storedToken}`,
                },
            }
        )
        console.log(response.data)
        return response.data
    } catch (error) {
        console.log(error)
    }
} 

export {getDepositDatas}