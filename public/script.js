const API_URL = 'http://localhost:3000/alunos'; // A URL da API

// Selecionando os elementos do frontend
const alunosList = document.getElementById("alunos-list");
const form = document.getElementById("aluno-form");
const nomeInput = document.getElementById("nome");
const idadeInput = document.getElementById("idade");
const cursoInput = document.getElementById("curso");
const editForm = document.getElementById('form-edicao');

// Variáveis de controle
let editingAlunoId = null; // Armazenar o id do aluno que está sendo editado

// Função para carregar os alunos da API
async function carregarAlunos() {
    alunosList.innerHTML = '';  // Limpar a lista antes de recarregar
    try {
        const response = await fetch(API_URL);
        const alunos = await response.json();  // Obtém a resposta e converte para JSON

        alunos.forEach(aluno => {
            const alunoItem = document.createElement('li');
            alunoItem.innerHTML = `${aluno.nome} - ${aluno.idade} anos - ${aluno.curso}
                <button onclick="atualizarAluno(${aluno.id})">Editar</button>
                <button onclick="deletarAluno(${aluno.id})">Deletar</button>`;
            alunosList.appendChild(alunoItem);  // Adiciona o item na lista
        });
    } catch (error) {
        console.error('Erro ao carregar alunos:', error);
    }
}

// Função para adicionar um novo aluno
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const novoAluno = {
        nome: nomeInput.value,
        idade: idadeInput.value,
        curso: cursoInput.value
    };

    // Enviar o novo aluno para a API
    await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novoAluno)
    });

    nomeInput.value = '';
    idadeInput.value = '';
    cursoInput.value = '';

    carregarAlunos(); // Recarregar a lista de alunos
});

// Função para editar um aluno
async function atualizarAluno(id) {
    console.log(`Editar aluno com ID: ${id}`); // Log para debugar

    // Mostrar o formulário de edição
    editForm.style.display = 'block';
    
    // Exibir a URL que será chamada
    const url = `${API_URL}/${id}`;
    console.log(`URL para busca do aluno: ${url}`);

    // Fazer a requisição e verificar se a resposta foi bem-sucedida
    const response = await fetch(url);

    if (!response.ok) {
        console.error(`Erro ao buscar o aluno com ID ${id}`);
        return;
    }

    // Se a resposta for válida, extrair os dados
    const aluno = await response.json();
    console.log(`Dados do aluno: `, aluno); // Log para verificar os dados

    // Preencher os campos do formulário com os dados do aluno
    document.getElementById("edit-nome").value = aluno.nome;
    document.getElementById("edit-idade").value = aluno.idade;
    document.getElementById("edit-curso").value = aluno.curso;

    // Armazenar o ID do aluno que está sendo editado
    editingAlunoId = aluno.id;
}

// Salvar a edição de aluno
document.getElementById('save-btn').addEventListener('click', async () => {
    const nome = document.getElementById('edit-nome').value;
    const idade = document.getElementById('edit-idade').value;
    const curso = document.getElementById('edit-curso').value;

    const alunoAtualizado = {
        nome,
        idade,
        curso
    };

    console.log(`Atualizando aluno com ID: ${editingAlunoId}`); // Log para debugar
    await fetch(`${API_URL}/${editingAlunoId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(alunoAtualizado)
    });

    // Atualizar a lista de alunos após atualização
    await carregarAlunos(); // Recarregar a lista para refletir as mudanças

    // Fechar o formulário de edição
    editForm.style.display = 'none';
    editingAlunoId = null; // Resetar a variável de controle
});

// Cancelar a edição
document.getElementById('cancel-btn').addEventListener('click', () => {
    editForm.style.display = 'none';
    editingAlunoId = null; // Resetar a variável de controle
});

// Função para deletar um aluno
async function deletarAluno(id) {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    carregarAlunos(); // Atualizar a lista após a exclusão
}

// Carregar os alunos ao inicializar a página
carregarAlunos();
