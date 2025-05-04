import { editMedicinal } from "@/api/deposit/edit-medicinal"
import { Medicamento } from "@/api/deposit/get-medicinals"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  EditMedicinalFormData,
  editMedicinalSchema,
} from "@/schemas/edit-medicinal"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { format } from "date-fns"
import { Loader2, SaveAllIcon, UploadCloud } from "lucide-react"
import { useState, useRef } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

interface Props {
  medicamento: Medicamento
}

export function EditMedDialog({ medicamento }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<EditMedicinalFormData>({
    resolver: zodResolver(editMedicinalSchema),
    defaultValues: {
      nome_comercial: medicamento.nome_comercial,
      nome_generico: medicamento.nome_generico,
      origem_medicamento: medicamento.origem,
      validade_medicamento: medicamento.validade,
      preco_medicamento: medicamento.preco,
      quantidade_disponivel: medicamento.quantidade_disponivel,
      categoria_medicamento: medicamento.categoria,
      imagem_url: medicamento.imagem
    }
  })

  const [modalState, setModalState] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const imagem_url = watch("imagem_url")

  const queryClient = useQueryClient()

  const { mutateAsync: editMedicinalFn } = useMutation({
    mutationFn: async (data: {
      id_medicamento: string
      categoria_medicamento: string
      nome_generico_medicamento: string
      nome_comercial_medicamento: string
      origem_medicamento: string
      validade_medicamento: string
      preco_medicamento: number
      imagem_url: string
      quantidade_disponivel_medicamento: number
    }) => {
      return editMedicinal(data)
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["my-medicines"],
        refetchType: "active",
      })
      setModalState(false)
      toast.success("Medicamento atualizado com sucesso!")
    },
    onError(error: any) {
      toast.error(error?.response?.data?.message || "Erro ao atualizar medicamento")
    },
  })

  const handleImageUpload = async (file: File) => {
    setIsUploading(true)
    try {
      // Aqui você deve implementar o upload real para seu servidor
      // Esta é uma simulação que cria uma URL local para a imagem
      const imageUrl = URL.createObjectURL(file)
      
      setValue("imagem_url", imageUrl, { shouldValidate: true })
      setImageFile(file)
      toast.success("Imagem carregada com sucesso!")
    } catch (error) {
      toast.error("Falha ao carregar imagem")
      console.error("Erro no upload:", error)
    } finally {
      setIsUploading(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleImageUpload(file)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const onSubmit = handleSubmit(async (formData) => {
    try {
      // Aqui você deve substituir pela lógica real de upload
      // Se houver um arquivo selecionado, faça o upload primeiro
      let finalImageUrl = formData.imagem_url
      
      if (imageFile) {
        // Simulando upload - substitua pela sua API real
        setIsUploading(true)
        await new Promise(resolve => setTimeout(resolve, 1000))
        // Em produção, você enviaria o arquivo para seu servidor
        // e receberia a URL da imagem
        finalImageUrl = URL.createObjectURL(imageFile)
      }

      await editMedicinalFn({
        id_medicamento: medicamento.id_medicamento,
        categoria_medicamento: formData.categoria_medicamento,
        nome_generico_medicamento: formData.nome_generico,
        nome_comercial_medicamento: formData.nome_comercial,
        origem_medicamento: formData.origem_medicamento,
        validade_medicamento: formData.validade_medicamento,
        preco_medicamento: formData.preco_medicamento,
        imagem_url: finalImageUrl,
        quantidade_disponivel_medicamento: formData.quantidade_disponivel,
      })
    } catch (error) {
      console.error("Erro ao editar medicamento:", error)
    } finally {
      setIsUploading(false)
    }
  })

  return (
    <Dialog open={modalState} onOpenChange={setModalState}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="text-amber-600 hover:text-amber-700 hover:bg-amber-50"
          size="sm"
        >
          Editar
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-4xl rounded-lg">
        <DialogHeader className="border-b pb-4">
          <DialogTitle className="text-2xl font-semibold text-gray-800">
            Editar Medicamento
          </DialogTitle>
          <p className="text-sm text-gray-500">{medicamento.nome_comercial}</p>
        </DialogHeader>

        <form onSubmit={onSubmit} className="mt-4 flex flex-col gap-6">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-6 lg:flex-row">
              {/* Seção da Imagem */}
              <div className="w-full lg:w-1/3">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-gray-700">Imagem do Medicamento</Label>
                    <div 
                      className="relative aspect-square overflow-hidden rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 cursor-pointer"
                      onClick={triggerFileInput}
                    >
                      {imagem_url ? (
                        <img
                          src={imagem_url}
                          alt="Preview do medicamento"
                          className="h-full w-full object-cover"
                          onError={() => setValue("imagem_url", "", { shouldValidate: true })}
                        />
                      ) : (
                        <div className="flex h-full flex-col items-center justify-center text-gray-400 p-4 text-center">
                          <UploadCloud className="h-8 w-8 mb-2" />
                          <span>Clique para adicionar uma imagem</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <input
                      id="imagem_file"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                      ref={fileInputRef}
                    />
                    <div className="flex flex-col gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={triggerFileInput}
                        disabled={isUploading}
                        className="flex items-center justify-center gap-2"
                      >
                        {isUploading ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <UploadCloud className="h-4 w-4" />
                        )}
                        <span>{imageFile ? "Alterar imagem" : "Selecionar imagem"}</span>
                      </Button>
                      {imageFile && (
                        <p className="text-sm text-gray-500 truncate">
                          Arquivo: {imageFile.name}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="imagem_url" className="text-gray-700">
                      Ou informe a URL da imagem
                    </Label>
                    <Input
                      id="imagem_url"
                      {...register("imagem_url")}
                      placeholder="https://exemplo.com/imagem.jpg"
                      className="focus:ring-amber-500 focus:border-amber-500"
                    />
                    {errors.imagem_url && (
                      <p className="text-sm text-red-600">
                        {errors.imagem_url.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Seção dos Dados */}
              <div className="w-full lg:w-2/3">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="nome_comercial" className="text-gray-700">
                      Nome Comercial*
                    </Label>
                    <Input
                      id="nome_comercial"
                      {...register("nome_comercial")}
                      placeholder="Ex: Paracetamol"
                      className="focus:ring-amber-500 focus:border-amber-500"
                    />
                    {errors.nome_comercial && (
                      <p className="text-sm text-red-600">
                        {errors.nome_comercial.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="nome_generico" className="text-gray-700">
                      Nome Genérico*
                    </Label>
                    <Input
                      id="nome_generico"
                      {...register("nome_generico")}
                      placeholder="Ex: Acetaminofeno"
                      className="focus:ring-amber-500 focus:border-amber-500"
                    />
                    {errors.nome_generico && (
                      <p className="text-sm text-red-600">
                        {errors.nome_generico.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="origem_medicamento" className="text-gray-700">
                      Origem*
                    </Label>
                    <Input
                      id="origem_medicamento"
                      {...register("origem_medicamento")}
                      placeholder="Ex: Portugal"
                      className="focus:ring-amber-500 focus:border-amber-500"
                    />
                    {errors.origem_medicamento && (
                      <p className="text-sm text-red-600">
                        {errors.origem_medicamento.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="validade_medicamento" className="text-gray-700">
                      Validade*
                    </Label>
                    <Input
                      id="validade_medicamento"
                      type="date"
                      {...register("validade_medicamento")}
                      className="focus:ring-amber-500 focus:border-amber-500"
                    />
                    {errors.validade_medicamento && (
                      <p className="text-sm text-red-600">
                        {errors.validade_medicamento.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="preco_medicamento" className="text-gray-700">
                      Preço Unitário*
                    </Label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                        R$
                      </span>
                      <Input
                        id="preco_medicamento"
                        type="number"
                        step="0.01"
                        {...register("preco_medicamento", { valueAsNumber: true })}
                        placeholder="0.00"
                        className="pl-8 focus:ring-amber-500 focus:border-amber-500"
                      />
                    </div>
                    {errors.preco_medicamento && (
                      <p className="text-sm text-red-600">
                        {errors.preco_medicamento.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="quantidade_disponivel" className="text-gray-700">
                      Quantidade Disponível*
                    </Label>
                    <Input
                      id="quantidade_disponivel"
                      type="number"
                      {...register("quantidade_disponivel", { valueAsNumber: true })}
                      placeholder="Ex: 100"
                      className="focus:ring-amber-500 focus:border-amber-500"
                    />
                    {errors.quantidade_disponivel && (
                      <p className="text-sm text-red-600">
                        {errors.quantidade_disponivel.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="categoria_medicamento" className="text-gray-700">
                      Categoria*
                    </Label>
                    <Input
                      id="categoria_medicamento"
                      {...register("categoria_medicamento")}
                      placeholder="Ex: Analgésico"
                      className="focus:ring-amber-500 focus:border-amber-500"
                    />
                    {errors.categoria_medicamento && (
                      <p className="text-sm text-red-600">
                        {errors.categoria_medicamento.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end border-t pt-4">
              <Button
                type="submit"
                disabled={isSubmitting || isUploading}
                className="w-full sm:w-auto px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg shadow-sm transition-colors duration-200"
              >
                {isSubmitting || isUploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {isUploading ? "Enviando imagem..." : "Salvando..."}
                  </>
                ) : (
                  <>
                    <SaveAllIcon className="mr-2 h-4 w-4" />
                    Salvar Alterações
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}