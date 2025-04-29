# Frontend: FURIA App

## Visão Geral

**FURIA App** é uma aplicação frontend desenvolvida para fãs da FURIA Esports, permitindo que acompanhem partidas, assistam streams, interajam no chat, ganhem pontos e resgatem recompensas. A aplicação oferece uma experiência completa para os fãs, com integração em tempo real e sistema de gamificação.

## Tecnologias Utilizadas

- **React 19**: Framework JavaScript para construção da interface  
- **TypeScript**: Tipagem estática para melhor desenvolvimento  
- **Material UI 7**: Biblioteca de componentes para interface de usuário  
- **React Router Dom 7**: Gerenciamento de rotas na aplicação  
- **Socket.IO Client**: Comunicação em tempo real  
- **Axios**: Requisições HTTP para a API  
- **React Hook Form + Yup**: Gerenciamento e validação de formulários  
- **Date-fns**: Manipulação de datas  
- **JWT Decode**: Decodificação de tokens JWT  
- **Vite**: Ferramenta de build e desenvolvimento  

## Estrutura do Projeto

### `src/components`: Componentes reutilizáveis

- **Layout**: Componentes estruturais (`Header`, `Footer`, `ChatBox`, `MainLayout`)  
- **Componentes específicos**: `MatchCard`, `PlayerCard`, `ProductCard`, `StreamCard`  

### `src/contexts`: Contextos React para estado global

- `AuthContext`: Gerenciamento de autenticação  
- `ChatContext`: Comunicação em tempo real  
- `PointsContext`: Sistema de pontos e recompensas  

### `src/pages`: Páginas da aplicação

- `Home`, `Login`, `Register`, `UserProfile`, `Rewards`, entre outras  

### `src/services`: Serviços de comunicação

- `api.ts`: Configuração do Axios  
- `socket.ts`: Configuração do Socket.IO  

### Outras pastas

- `src/theme`: Tema personalizado Material UI  
- `src/types`: Definições de tipos TypeScript  

## Principais Funcionalidades

- **Autenticação**: Sistema completo de registro e login de usuários  
- **Perfil de Usuário**: Visualização e edição de dados pessoais  
- **Chat em Tempo Real**: Interação com outros usuários da plataforma  
- **Sistema de Pontos**: Gamificação com pontos por participação  
- **Recompensas**: Resgate de produtos exclusivos com pontos  
- **Notícias**: Informações atualizadas sobre a FURIA  
- **Partidas**: Acompanhamento de jogos ao vivo e agendados  
- **Streams**: Visualização de transmissões dos jogadores  

## Como Rodar o Projeto

### Pré-requisitos

- Node.js (versão 18 ou superior)  
- NPM ou Yarn  

### Passo a Passo

#### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/furia-app.git
cd furia-app
```

#### 2. Instale as dependências

```bash
npm install
# ou
yarn install
```

#### 3. Configure o arquivo de ambiente

Crie um arquivo `.env.local` na raiz do projeto com o conteúdo:

```env
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

#### 4. Execute o projeto em modo de desenvolvimento

```bash
npm run dev
# ou
yarn dev
```

#### 5. Acesse a aplicação

A aplicação estará disponível em: [http://localhost:5173](http://localhost:5173)

### Build para produção

```bash
npm run build
# ou
yarn build
```

## Integração com o Backend

A aplicação frontend depende do backend para funcionar corretamente. Certifique-se de que o servidor backend esteja em execução e acessível na URL configurada no arquivo `src/config.ts`.

## Sistema de Pontos e Recompensas

Os usuários ganham pontos através de:

- **Login diário**: 20 pontos  
- **Envio de mensagens no chat**: 1 ponto por mensagem  
- **Assistir partidas**: 10 pontos  
- **Assistir highlights**: 5 pontos  
- **Tempo de navegação**: 5 pontos a cada 5 minutos  

Pontos podem ser trocados por recompensas físicas como mousepads, camisetas e outros produtos exclusivos.

## Layout Responsivo

A aplicação é totalmente responsiva:

- Layout específico para dispositivos móveis  
- Drawer para menu em telas pequenas  
- Chat flutuante em dispositivos móveis  

## Customização de Tema

O tema da aplicação pode ser customizado no arquivo `src/theme/theme.ts`, permitindo alterações nas cores, tipografia e componentes da aplicação.# Frontend: FURIA App

## Visão Geral

**FURIA App** é uma aplicação frontend desenvolvida para fãs da FURIA Esports, permitindo que acompanhem partidas, assistam streams, interajam no chat, ganhem pontos e resgatem recompensas. A aplicação oferece uma experiência completa para os fãs, com integração em tempo real e sistema de gamificação.

## Tecnologias Utilizadas

- **React 19**: Framework JavaScript para construção da interface  
- **TypeScript**: Tipagem estática para melhor desenvolvimento  
- **Material UI 7**: Biblioteca de componentes para interface de usuário  
- **React Router Dom 7**: Gerenciamento de rotas na aplicação  
- **Socket.IO Client**: Comunicação em tempo real  
- **Axios**: Requisições HTTP para a API  
- **React Hook Form + Yup**: Gerenciamento e validação de formulários  
- **Date-fns**: Manipulação de datas  
- **JWT Decode**: Decodificação de tokens JWT  
- **Vite**: Ferramenta de build e desenvolvimento  

## Estrutura do Projeto

### `src/components`: Componentes reutilizáveis

- **Layout**: Componentes estruturais (`Header`, `Footer`, `ChatBox`, `MainLayout`)  
- **Componentes específicos**: `MatchCard`, `PlayerCard`, `ProductCard`, `StreamCard`  

### `src/contexts`: Contextos React para estado global

- `AuthContext`: Gerenciamento de autenticação  
- `ChatContext`: Comunicação em tempo real  
- `PointsContext`: Sistema de pontos e recompensas  

### `src/pages`: Páginas da aplicação

- `Home`, `Login`, `Register`, `UserProfile`, `Rewards`, entre outras  

### `src/services`: Serviços de comunicação

- `api.ts`: Configuração do Axios  
- `socket.ts`: Configuração do Socket.IO  

### Outras pastas

- `src/theme`: Tema personalizado Material UI  
- `src/types`: Definições de tipos TypeScript  

## Principais Funcionalidades

- **Autenticação**: Sistema completo de registro e login de usuários  
- **Perfil de Usuário**: Visualização e edição de dados pessoais  
- **Chat em Tempo Real**: Interação com outros usuários da plataforma  
- **Sistema de Pontos**: Gamificação com pontos por participação  
- **Recompensas**: Resgate de produtos exclusivos com pontos  
- **Notícias**: Informações atualizadas sobre a FURIA  
- **Partidas**: Acompanhamento de jogos ao vivo e agendados  
- **Streams**: Visualização de transmissões dos jogadores  

## Como Rodar o Projeto

### Pré-requisitos

- Node.js (versão 18 ou superior)  
- NPM ou Yarn  

### Passo a Passo

#### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/furia-app.git
cd furia-app
```

#### 2. Instale as dependências

```bash
npm install
# ou
yarn install
```

#### 3. Configure o arquivo de ambiente

Crie um arquivo `.env.local` na raiz do projeto com o conteúdo:

```env
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

#### 4. Execute o projeto em modo de desenvolvimento

```bash
npm run dev
# ou
yarn dev
```

#### 5. Acesse a aplicação

A aplicação estará disponível em: [http://localhost:5173](http://localhost:5173)

### Build para produção

```bash
npm run build
# ou
yarn build
```

## Integração com o Backend

A aplicação frontend depende do backend para funcionar corretamente. Certifique-se de que o servidor backend esteja em execução e acessível na URL configurada no arquivo `src/config.ts`.

## Sistema de Pontos e Recompensas

Os usuários ganham pontos através de:

- **Login diário**: 20 pontos  
- **Envio de mensagens no chat**: 1 ponto por mensagem  
- **Assistir partidas**: 10 pontos  
- **Assistir highlights**: 5 pontos  
- **Tempo de navegação**: 5 pontos a cada 5 minutos  

Pontos podem ser trocados por recompensas físicas como mousepads, camisetas e outros produtos exclusivos.

## Layout Responsivo

A aplicação é totalmente responsiva:

- Layout específico para dispositivos móveis  
- Drawer para menu em telas pequenas  
- Chat flutuante em dispositivos móveis  

## Customização de Tema

O tema da aplicação pode ser customizado no arquivo `src/theme/theme.ts`, permitindo alterações nas cores, tipografia e componentes da aplicação.