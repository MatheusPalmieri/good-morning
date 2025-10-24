# Good Morning - Projeto React Native

## Ferramentas de Qualidade de Código

Este projeto está configurado com ESLint, Prettier e Husky para garantir a qualidade do código.

### 📋 Scripts Disponíveis

#### Desenvolvimento

- `npm start` - Inicia o servidor Expo
- `npm run android` - Executa no Android
- `npm run ios` - Executa no iOS
- `npm run web` - Executa no navegador

#### Verificação de Código

- `npm run lint` - Verifica todo o projeto com ESLint
- `npm run lint:fix` - Corrige automaticamente problemas do ESLint
- `npm run format` - Formata todo o projeto com Prettier
- `npm run format:check` - Verifica formatação sem modificar arquivos
- `npm run check` - Executa lint e verificação de formatação
- `npm run fix` - Corrige lint e formatação automaticamente

### 🔍 ESLint

O ESLint está configurado com as seguintes regras:

- **Regras Gerais**: Previne uso de `var`, `debugger`, e importações duplicadas
- **TypeScript**: Detecta variáveis não utilizadas, uso de `any` (warning)
- **React/React Native**: Rules of Hooks e exhaustive-deps
- **Import**: Ordenação automática de imports (alfabética e por tipo)
- **Prettier**: Integração completa para garantir formatação consistente

### 💅 Prettier

Configuração do Prettier:

- Single quotes
- Ponto e vírgula obrigatório
- Trailing commas (ES5)
- Tab width: 2 espaços
- Print width: 80 caracteres
- Arrow parens: avoid

### 🪝 Husky + Lint-Staged

**Automação no Git Commit:**

Antes de cada commit, automaticamente:

1. ESLint verifica e corrige os arquivos modificados
2. Prettier formata os arquivos modificados
3. Apenas os arquivos modificados são verificados (mais rápido!)

**Arquivos verificados:**

- JavaScript/TypeScript: `*.{js,jsx,ts,tsx}`
- Outros: `*.{json,md}`

### 🚀 Como Usar

#### Verificar todo o projeto

```bash
npm run check
```

#### Corrigir automaticamente todo o projeto

```bash
npm run fix
```

#### Verificar apenas arquivos modificados (manual)

```bash
npx lint-staged
```

#### Commit automático com verificação

```bash
git add .
git commit -m "sua mensagem"
# Os hooks executarão automaticamente!
```

### 🎯 Benefícios

- ✅ Código consistente e padronizado
- ✅ Menos erros em produção
- ✅ Commits mais limpos
- ✅ Revisão de código mais fácil
- ✅ Menos conflitos de merge

### 📝 Notas

- O pre-commit hook pode ser pulado com `--no-verify`, mas não é recomendado
- Warnings (⚠️) não bloqueiam commits, apenas erros (❌)
- Configure seu editor para formatar ao salvar para melhor experiência
