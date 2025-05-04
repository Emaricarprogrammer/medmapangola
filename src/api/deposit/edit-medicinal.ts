import { api } from "@/services/axios"

interface EditMedicinalBody {
    id_medicamento: string
    categoria_medicamento: string
    nome_generico_medicamento: string
    nome_comercial_medicamento: string
    origem_medicamento: string
    validade_medicamento: string
    preco_medicamento: number
    imagem_url: string
    quantidade_disponivel_medicamento: number
}

export async function editMedicinal(data: EditMedicinalBody) {
    const storedToken = localStorage.getItem("accessToken")

    if (!storedToken) {
        throw new Error("Token de autenticação ausente")
    }

    // Extrai o id_medicamento para usar na URL
    const { id_medicamento, ...bodyData } = data

    await api.patch(`/entity/deposit/medicine/${id_medicamento}`, bodyData, {
        headers: {
            Authorization: `Bearer ${storedToken}`,
            "Content-Type": "application/json",
        },
    })
}