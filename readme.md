# 📝 Atividade Prática 03 - Atualização de Alunos no Frontend

## Descrição

Este projeto implementa uma funcionalidade para **editar os dados dos alunos** de forma interativa no frontend. A aplicação consome uma API existente (`Node.js + Express + MongoDB`) para realizar operações de leitura e atualização dos alunos.

A função `atualizarAluno(id)` foi implementada para permitir que os dados de um aluno (nome, idade e curso) sejam atualizados diretamente no frontend, com envio para o backend utilizando a API.

## Tecnologias

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express, MongoDB
- **Métodos de requisição**: Fetch API (`PUT`/`PATCH`)

## Funcionalidades

- **Carregar Alunos**: Lista de alunos carregada automaticamente.
- **Adicionar Aluno**: Formulário para adicionar novos alunos.
- **Editar Aluno**: Clique em "editar", altere os dados e clique em "salvar".
- **Deletar Aluno**: Clique em "deletar" para remover um aluno.

## Como Usar

### Passo 1: Clonar o Repositório

Clone o repositório para sua máquina local:

```bash
git clone https://github.com/FabiIzidoro/aula_06_pi2_2025
cd aula_06_pi2_2025

```
2. Instale as dependências:
```bash
npm install
```
3. Execute o servidor:
```bash
node app.js
```
O servidor será iniciado na porta 3000. Você pode acessar a API em http://localhost:3000.

> Desenvolvido por Fabiana Izidoro Luz. Aluna do curso de Ciência da Computação - IFTM
