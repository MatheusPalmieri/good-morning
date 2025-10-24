
# Desafio Técnico – App "Frase do Dia"

Parabéns por chegar à fase final do processo seletivo. Agora é hora de colocar a mão no código.

## 🎯 Objetivo

Criar um aplicativo React Native com as seguintes funcionalidades:
- Tela de login (com autenticação via API)
- Tela que exibe a "frase do dia" após o login
- Interface agradável, fluida e intuitiva
- Código limpo, organizado e de fácil leitura

## 📦 Funcionalidades obrigatórias

### 1. Tela de Login
- Campos: usuário e senha
- Chamada POST para a API de autenticação:
  ```
  https://n8n.jrmendonca.com.br/webhook/testeReact/autenticar
  ```
- Payload:
  ```json
  {
    "username": "joaquim",
    "password": "salame1"
  }
  ```
- Se sucesso: navegar para próxima tela com o token armazenado
- Se falhar: lidar com o erro de forma clara para o usuário

### 2. Tela de Frase do Dia
- Consumir esta API com o token:
  ```
  https://n8n.jrmendonca.com.br/webhook/18a8a172-0c9e-4dc3-9cf0-fe2c389e27eb/frasedodia
  ```
- Header:
  ```
  token: <token_recebido>
  ```
- Exibir o conteúdo de `quoteoftheday` na tela

## 🌐 Funcionalidade adicional – Deep Link

Após o app estar instalado, o seguinte endereço deve abrir o app:
```
https://<seuapp>/quoteoftheDay
```

**Comportamento esperado:**
- Se o usuário estiver autenticado: exibe a Frase do Dia
- Caso contrário: redireciona para login

## 📋 Regras e Avaliação

Você será avaliado pelos seguintes critérios:

| Critério                         | Peso |
|----------------------------------|------|
| Organização do código            | ★★★★☆
| UX e beleza visual               | ★★★★☆
| Clareza na estrutura do projeto  | ★★★☆☆
| Tratamento de erros              | ★★★☆☆
| Foco e escopo dentro do prazo    | ★★★★☆

## ⏰ Prazo

- Entrega até **domingo, 27/10 às 23:59 (horário de Brasília)**
- Commits após esse horário desclassificam automaticamente o candidato

## 📤 Entrega

- Repositório público no GitHub
- README explicando como rodar o app
- Enviar link do GitHub por e-mail

---

Boa sorte!  
Simples bem feito > complexo mal feito.
