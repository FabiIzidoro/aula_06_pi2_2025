const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');  // Importa o módulo path para servir arquivos estáticos

const app = express();
const alunos = [];  // O array de alunos

app.use(cors());
app.use(bodyParser.json());

// Servir arquivos estáticos (frontend)
app.use(express.static(path.join(__dirname, 'public')));  // Caminho para a pasta onde está o index.html

// Rota para pegar a lista de alunos
app.get('/alunos', (req, res) => {
    console.log("Rota GET /alunos chamada");
    res.json(alunos);  // Retorna a lista de alunos
});

// Rota para pegar um aluno específico pelo ID
app.get('/alunos/:id', (req, res) => {
    const { id } = req.params;
    const aluno = alunos.find(a => a.id == id);  // Busca pelo ID
    if (aluno) {
        res.json(aluno);  // Retorna os dados do aluno encontrado
    } else {
        res.status(404).send('Aluno não encontrado');  // Retorna erro se não encontrar
    }
});

// Rota para adicionar um novo aluno
app.post('/alunos', (req, res) => {
    const { nome, idade, curso } = req.body;
    const aluno = {
        id: Date.now(), // Gerando um ID único
        nome,
        idade,
        curso
    };
    alunos.push(aluno);
    res.status(201).json(aluno);  // Retorna o aluno criado com status 201
});

// Rota para atualizar um aluno
app.put('/alunos/:id', (req, res) => {
    const { id } = req.params;
    const { nome, idade, curso } = req.body;
    const aluno = alunos.find(a => a.id == id);
    if (aluno) {
        aluno.nome = nome;
        aluno.idade = idade;
        aluno.curso = curso;
        res.json(aluno);  // Retorna o aluno atualizado
    } else {
        res.status(404).send('Aluno não encontrado');
    }
});

// Rota para deletar um aluno
app.delete('/alunos/:id', (req, res) => {
    const { id } = req.params;
    const index = alunos.findIndex(a => a.id == id);
    if (index !== -1) {
        alunos.splice(index, 1);
        res.status(200).send('Aluno deletado');
    } else {
        res.status(404).send('Aluno não encontrado');
    }
});

// Servir o index.html ao acessar a raiz
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));  // Rendeiriza o arquivo HTML na raiz
});

// Iniciar o servidor na porta 3000
app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});
