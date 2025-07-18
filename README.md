# Projeto Horários Escola

Sistema simples para gerenciar cadastros escolares e horários utilizando Node.js, Express e SQLite. Ao iniciar o servidor é criado um banco de dados `escola.db` com as tabelas necessárias.

## Instalação

1. Clone o repositório e entre na pasta do projeto:
   ```bash
   git clone <url-do-repositorio>
   cd projeto-horarios-escola
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```

## Executando o servidor

Inicie a aplicação com o comando:
```bash
npm start
```
O servidor escutará na porta `3000` por padrão. Acesse `http://localhost:3000` no navegador.

## Sobre

Este projeto contém várias páginas HTML para cadastro de usuários, escolas, níveis de acesso, turmas e outros elementos. As rotas de API em `index.js` gerenciam os dados no banco SQLite. O objetivo é servir de base para um sistema de organização de horários escolares.
