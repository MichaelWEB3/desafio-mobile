# ✅ Bennu Task App

Uma aplicação de lista de tarefas (To-Do) com **backend em Node.js** e **app mobile em React Native**, desenvolvida com foco em **performance, organização e escalabilidade**.

🎥 [Assista à demonstração em vídeo](https://youtube.com/shorts/gsW-9P7LqxQ)

<div align="center">
  <img src="/assets/preview/previewLight.png" alt="Preview Light" width="300" />
  <img src="/assets/preview/previewDark.png" alt="Preview Dark" width="300" />
</div>

<br/>

<p align="center">
  <img src="https://img.shields.io/badge/React_Native-0.79.0-blue?style=flat&logo=react" />
  <img src="https://img.shields.io/badge/Node.js-18+-green?style=flat&logo=node.js" />
  <img src="https://img.shields.io/badge/TypeScript-blue?style=flat&logo=typescript" />
  <img src="https://img.shields.io/badge/Redux-Toolkit-critical?style=flat&logo=redux" />
  <img src="https://img.shields.io/badge/Jest-Tested-%23C21325?style=flat&logo=jest" />
</p>

---

## 🧠 Tecnologias

### 📱 **Mobile (React Native + TypeScript)**

- ⚛️ React Native `0.79.0`
- 📜 TypeScript
- 🧭 React Navigation
- 🧵 Styled Components
- 🧠 Redux Toolkit + Persist
- 🔁 Redux Query
- 🌿 Dotenv
- 🧪 Jest + Testing Library

### 🌐 **Backend (Node.js + Express)**

- Node.js `18+`
- Express.js
- API RESTful
- CRUD completo de tarefas

---

## 📦 Estrutura do Projeto

📦 BennuTaskApp/
├── / # API Node.js com Express
└── TodoApp/ # Aplicativo React Native


---

## 🚀 Funcionalidades

✅ Visualização por status: **Todas**, **Ativas**, **Concluídas**  
📝 Criação, edição e exclusão de tarefas  
✨ Marcação como concluída com **animação fluida**  
💾 Persistência com **Redux Persist**  
🔗 Integração com a API usando **Redux Query**
✨ Modo Claro e Modo escuro conforme o aparelho do usurio esteja **Dark/Light**  

---

## 📲 Rodando o App Mobile

```bash
# 1. Vá até a pasta do app
cd TodoApp

# 2. Instale as dependências
yarn

# 3. Inicie o Metro Bundler
yarn start

# 4. Redirecione a porta para o Android
adb reverse tcp:9001 tcp:9001

# 5. Execute no emulador android
yarn android

# 5. Execute no emulador IOS
yarn IOS


🧪 Testes
# 1. Vá até a pasta do app
cd TodoApp

# 2 Execute os testes unitários
yarn test


🌐 Rodando o Backend


# 1. Instale as dependências
npm

# 3. Inicie o servidor
npm start


⚙️ Variáveis de Ambiente

Crie um arquivo .env em TodoApp/:

API_BASE_URL=...

👨‍💻 Scripts Úteis (package.json)

"scripts": {
  "android": "react-native run-android",
  "ios": "react-native run-ios",
  "lint": "eslint .",
  "start": "react-native start",
  "test": "jest"
}

📁 Principais Dependências

react-native
react-redux, @reduxjs/toolkit
redux-persist
redux-query
styled-components
zod, react-hook-form
jest, @testing-library/react-native


🧼 Padrões e Boas Práticas

Componentização e organização modular
Validações com zod
Formulários otimizados com react-hook-form
Tipagem rigorosa com TypeScript
Linting e formatação com eslint e prettier


✨ Contribuições

Sinta-se livre para contribuir com novas ideias, melhorias e correções. Basta abrir uma issue ou pull request! 🚀
```

<p align="center"> Feito com 💙 por <strong>Michael</strong> </p> 