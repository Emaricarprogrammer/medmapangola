Vamos reestruturar o fluxo de `sign-in` no front-end para que ele trate o token JWT retornado pelo back-end de forma segura e adote a prática de usar `httpOnly cookies`. Como o JWT agora é armazenado em um cookie `httpOnly`, o front-end não precisará manipular diretamente o token JWT, o que aumenta a segurança. Aqui estão os passos:

### 1. **Chamada à API de Login** (no Front-end)

O backend está configurado para enviar o JWT no `httpOnly cookie`, então no front-end o fluxo de login não precisa lidar diretamente com o token. O foco será em receber a resposta e redirecionar o usuário para o dashboard correto com base no `role` do usuário.

Aqui está como reestruturar o front-end para o fluxo de login:

#### Passo 1: **Modifique a função `signIn`** para apenas enviar os dados e lidar com a resposta.

```ts
import { SignInData } from "@/schemas/sign-in"
import { api } from "@/services/axios"

// Não é mais necessário lidar com o token diretamente no front-end
export async function signIn(entity: SignInData) {
  return await api.post("/entidades/signin", {
    entity,
  })
}
```

#### Passo 2: **React Query para a Mutação (Login)**

Use a mutação do `React Query` para executar a função `signIn`, e com base na resposta do servidor, redirecionar o usuário para o dashboard correto.

```ts
import { useMutation } from "react-query"
import { useNavigate } from "react-router-dom"
import { signIn } from "@/services/sign-in"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { SignInData, signInScheme } from "@/schemas/sign-in"
import { toast } from "react-toastify"

export default function Login() {
  const navigate = useNavigate()

  // Mutação para executar o login
  const { mutate: handleSignIn, isLoading } = useMutation({
    mutationKey: ["signIn"],
    mutationFn: signIn,
    onSuccess: (response) => {
      // Se login for bem-sucedido, verificamos a role
      toast.success("Login realizado com sucesso!")

      const role = response.data.role // Esse dado deve vir do back-end dentro da resposta
      if (role === "pharmacy") {
        navigate("/dashboard/pharmacy")
      } else if (role === "deposit") {
        navigate("/dashboard/deposit")
      } else {
        navigate("/dashboard") // Default
      }
    },
    onError: () => {
      toast.error("Falha ao realizar o login.")
    },
  })

  // Formulário de login com react-hook-form e validação Zod
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<SignInData>({
    resolver: zodResolver(signInScheme),
  })

  // Função para tratar o submit do formulário
  async function onSubmit(data: SignInData) {
    handleSignIn(data) // Chama a mutação ao enviar o formulário
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="email"
        placeholder="Email"
        {...register("email")}
        disabled={isSubmitting || isLoading}
      />
      {errors.email && <p>{errors.email.message}</p>}

      <input
        type="password"
        placeholder="Password"
        {...register("password")}
        disabled={isSubmitting || isLoading}
      />
      {errors.password && <p>{errors.password.message}</p>}

      <button type="submit" disabled={isSubmitting || isLoading}>
        {isSubmitting ? "Entrando..." : "Entrar"}
      </button>
    </form>
  )
}
```

### 2. **Gerenciamento do Cookie JWT (httpOnly)**

Uma vez que o JWT é armazenado em um `httpOnly cookie` pelo back-end, o front-end não terá acesso direto ao token, o que é uma boa prática de segurança. O front-end simplesmente faz as requisições para as rotas protegidas e o cookie será automaticamente enviado junto pelo navegador.

### 3. **Proteção de Rotas com Base no Role**

Se você estiver usando React Router, pode proteger as rotas com base no `role` do usuário. Uma vez que o `role` está no JWT que o back-end validará, o back-end controlará o acesso às rotas protegidas.

Exemplo básico de proteção de rota:

```ts
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate()

  useEffect(() => {
    // Verificar se o usuário está autenticado (a lógica deve estar no back-end)
    axios
      .get("/dashboard") // Essa rota será protegida no back-end
      .then((response) => {
        const role = response.data.role
        if (role === "pharmacy") {
          navigate("/dashboard/pharmacy")
        } else if (role === "deposit") {
          navigate("/dashboard/deposit")
        }
      })
      .catch(() => {
        navigate("/login") // Redireciona se não estiver autenticado
      })
  }, [navigate])

  return children
}
```

### 4. **Conclusão**

- **O back-end agora armazena o JWT em um cookie `httpOnly`**, e o front-end não precisa lidar diretamente com o token.
- **O React Query trata a lógica de login** e, com base na resposta do servidor, redireciona o usuário para o dashboard correto (baseado no `role` do usuário).
- **As rotas protegidas podem ser verificadas no back-end**, que validará o token e permitirá o acesso ou redirecionará o usuário de acordo com sua role.

Essa abordagem deixa o front-end mais seguro e simples, pois ele não lida diretamente com tokens JWT e se foca apenas em navegar conforme a resposta do back-end.

Aqui estão alguns **insights, aprendizados e dicas** relacionadas à autenticação e segurança no front-end, baseados no cenário que você está lidando (autenticação com JWT via cookies `httpOnly` e React):

### 1. **Autenticação e Armazenamento de Tokens**

- **Não armazene JWT no `localStorage` ou `sessionStorage`**: Evite guardar tokens diretamente no `localStorage` ou `sessionStorage`, pois esses locais são vulneráveis a ataques XSS (Cross-Site Scripting). **Faça**: Use cookies com a flag `httpOnly` e `secure`, que não podem ser acessados pelo JavaScript e são enviados automaticamente em cada requisição.
- **Evite expor dados sensíveis no front-end**: Como você não tem controle total sobre o que os usuários podem ver no front-end, dados confidenciais devem sempre ser processados no back-end. **Faça**: Mantenha o controle de autenticação e autorização no servidor, e apenas exponha o mínimo necessário no front-end.

### 2. **Redirecionamento e Controle de Acesso**

- **Centralize o controle de rotas protegidas**: Proteja rotas sensíveis com verificações de autenticação. **Faça**: Utilize middlewares no front-end para verificar se o usuário tem acesso a uma rota com base em sua role ou status de autenticação, mas o back-end deve ser o guardião final dessas permissões.
- **Evite armazenar diretamente o role no front-end**: O role do usuário deve ser validado no back-end para evitar que um usuário mal-intencionado altere essas informações no front. **Faça**: Envie o role no token JWT e valide no servidor.

### 3. **Manutenção de Sessão**

- **Renove o token regularmente**: Se o token tem um tempo de expiração curto, implemente a renovação automática com refresh tokens ou solicite ao usuário que faça login novamente. **Faça**: Utilize refresh tokens armazenados de forma segura no servidor.
- **Use cookies `SameSite=Strict` sempre que possível**: Isso evita que o cookie seja enviado junto com requisições de outros sites (protegendo contra ataques CSRF). **Faça**: Sempre configure cookies com `SameSite=Strict` para evitar o envio involuntário para terceiros.

### 4. **Práticas com React e Autenticação**

- **Manuseio de `useState` para autenticação**:
  - **Faça**: Utilize `useState` para controlar o estado de "carregando" e "erro" ao fazer login, para fornecer feedback imediato ao usuário enquanto o processo de autenticação está em andamento.
  - **Não faça**: Não armazene diretamente informações sensíveis (como tokens) em `useState`. Isso pode expor os dados de maneira insegura.
- **Sempre use `useEffect` para verificar autenticação ao carregar a página**:
  - **Faça**: Dentro de um `useEffect`, verifique no back-end (com uma chamada de API) se o usuário está autenticado antes de mostrar qualquer conteúdo sensível. Dessa forma, você sempre garante que a sessão está válida.
  - **Não faça**: Evite confiar apenas em verificações no front-end. Elas podem ser manipuladas.

### 5. **Manipulação de Estado Global (Autenticação)**

- **Use Context API ou Gerenciadores de Estado (Redux)**: Para compartilhar o estado de autenticação entre múltiplos componentes, evite passar props para todos os componentes.
  - **Faça**: Utilize o Context API ou Redux para armazenar estados como `isAuthenticated` e `userRole`. Isso facilita a distribuição desse estado entre os componentes que precisam dessa informação.
  - **Não faça**: Evite múltiplos `useState` em vários componentes para armazenar o status de autenticação. Isso pode gerar inconsistência.

### 6. **Segurança ao Gerar Formulários de Login**

- **Sanitize os inputs**: **Faça**: Sempre sanitize e valide os dados de login antes de enviá-los para o back-end. Isso ajuda a prevenir ataques como SQL Injection e XSS.
- **Use HTTPS**: **Faça**: Garanta que todas as comunicações entre o front-end e o back-end utilizem HTTPS para proteger os dados em trânsito, principalmente ao enviar credenciais.
- **Proteja seu login contra ataques de força bruta**: **Faça**: Implemente medidas como tempo de espera entre tentativas de login ou CAPTCHAs no back-end para evitar que o sistema seja sobrecarregado por tentativas repetidas de login.

### 7. **Dicas Adicionais para Uso de React com Autenticação**

- **Considere rotas privadas**:
  - **Faça**: Crie componentes de rotas privadas que apenas renderizam o conteúdo se o usuário estiver autenticado. Use uma lógica de verificação no back-end para validar o token de autenticação.
  - **Não faça**: Evite redirecionar para páginas sensíveis sem verificar a autenticação.
- **Seja explícito com feedback ao usuário**: **Faça**: Ao lidar com autenticação, forneça feedback claro, como "Login bem-sucedido" ou "Credenciais inválidas", e mostre indicadores de carregamento enquanto o login está sendo processado.

Essas dicas são práticas que ajudam a manter seu front-end seguro, especialmente quando lidamos com autenticação e segurança do usuário.
