# Good Morning ☀️

App React Native de Frase do Dia com autenticação.

## 🚀 Como Rodar

```bash
npm install
npm start
```

Para rodar em dispositivo específico:

```bash
npm run android     # Android
npm run ios         # iOS
npm run web         # Navegador
```

## 📱 Funcionalidades

### Autenticação

- Login com validação
- Persistência de sessão
- Logout automático em caso de erro

### Frase do Dia

- Exibição da quote com autor
- Atualização a cada requisição
- Estados de loading e erro

### Deep Link

- URL: `https://goodmorning/quoteoftheDay`
- Verifica autenticação automaticamente
- Redireciona para login se necessário

## 🔑 Credenciais de Teste

```
Usuário: joaquim
Senha: salame1
```

## 🛠️ Tecnologias

- **Expo Router** - Navegação
- **Zustand** - Gerenciamento de estado
- **Zod** - Validação de formulários
- **Axios** - Requisições HTTP
- **AsyncStorage** - Persistência local

## 📁 Estrutura do Projeto

```
src/
  ├── app/                    # Rotas (Expo Router)
  │   ├── _layout.tsx         # Layout principal
  │   ├── index.tsx           # Home
  │   ├── login.tsx           # Tela de login
  │   └── quote.tsx           # Tela da frase
  ├── features/
  │   ├── auth/               # Autenticação
  │   │   ├── components/     # Inputs, botões
  │   │   ├── schemas/        # Validações Zod
  │   │   ├── services/       # API de auth
  │   │   └── store/          # Zustand store
  │   └── quotes/             # Frases
  │       ├── components/     # Cards, headers
  │       └── services/       # API de quotes
  └── shared/                 # Compartilhado
      ├── components/         # Loading, etc
      └── services/           # API client
```

## 🌐 APIs

### Autenticação

```
POST https://n8n.jrmendonca.com.br/webhook/testeReact/autenticar
```

### Frase do Dia

```
GET https://n8n.jrmendonca.com.br/webhook/18a8a172-0c9e-4dc3-9cf0-fe2c389e27eb/frasedodia
Header: token: <seu_token>
```

## 🎨 Features de UX

- Animações suaves
- Feedback visual em todas as ações
- Loading states
- Tratamento de erros amigável
- Layout responsivo

## 📝 Scripts Úteis

```bash
npm run lint        # Verifica código
npm run format      # Formata código
npm run fix         # Corrige tudo automaticamente
npm run check       # Verifica sem modificar
```

## 🐛 Troubleshooting

**Erro ao instalar dependências:**

```bash
rm -rf node_modules package-lock.json
npm install
```

**App não abre no Android:**

```bash
npx expo start -c  # Limpa cache
```

**Deep link não funciona:**

- Verifique se o app está instalado
- Teste com: `npx uri-scheme open goodmorning://quoteoftheDay --android`

## ✅ Checklist do Desafio

- [x] Tela de login funcional
- [x] Tela de frase do dia
- [x] Autenticação via API
- [x] Tratamento de erros
- [x] Deep linking
- [x] Interface responsiva
- [x] Código organizado
- [x] TypeScript strict
