# Frontend Vue/Nuxt

## Requisitos

- [Node.js](https://nodejs.org/) (versão recomendada: 18+)
- [pnpm](https://pnpm.io/)

## Subindo o Projeto

1. Clone o repositório e navegue até o diretório do projeto:
   ```sh
   git clone <seu-repositorio>
   cd <seu-repositorio>
   ```
2. Crie um arquivo `.env` na raiz do projeto e configure a URL da API:
    ```
    API_URL=http://localhost:8000
    ```
## Instalação das Dependências

Execute o seguinte comando para instalar as dependências do projeto:

```sh
pnpm install
```

## Executando o Servidor de Desenvolvimento

Para iniciar o frontend em ambiente de desenvolvimento, utilize o comando:

```sh
pnpm dev
```

O projeto estará acessível em `http://localhost:3000/` por padrão.

## Build para Produção

Para gerar os arquivos de build do frontend, utilize:

```sh
pnpm build
```

Os arquivos serão gerados na pasta `.output/`. Dependendo da configuração do Nuxt, o comando para iniciar a aplicação em produção pode variar.

## Scripts Disponíveis

- **Instalar dependências:** `pnpm install`
- **Iniciar o servidor de desenvolvimento:** `pnpm dev`
- **Gerar build para produção:** `pnpm build`
- **Executar o projeto em modo de produção:** `pnpm start` (se aplicável)
