const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

//dados
let filmes = [];
let proximoId = 1;

// CREATE
app.post('/filmes', (req, res) => {
    
    const {genero, titulo, ano} = req.body;

    if (!genero || !titulo || !ano) {
        return res.status(400).json({error: 'Todos os campos são obrigatórios.'});
    }
    const novoFilme = {
        id: proximoId++,
        genero,
        titulo,
        ano
    };

    
    filmes.push(novoFilme);

    res.status(201).json({ message: 'Filme adicionado com sucesso!', filme: novoFilme });

});

// READ - listar
app.get('/filmes', (req, res) => {
    res.json(filmes);
});

// READ - buscar ID
app.get('/filmes/:id', (req, res) => {
    
    const id = parseInt(req.params.id);
    
    const filme = filmes.find(f => f.id === id);
    
    if (!filme) {
        return res.status(404).json({error: 'Filme não encontrado.'});
    }
    res.json(filme);
});

//UPDATE - atualizar 
app.put('/filmes/:id', (req, res) => {

    const id = parseInt(req.params.id);
    const {genero, titulo, ano} = req.body;

    if (!genero || !titulo || !ano) {
        return res.status(400).json({error: 'Todos os campos são obrigatórios.'});
    }

    const filmeIndex = filmes.findIndex(f => f.id === id);
    
    if (filmeIndex === -1) {
        return res.status(404).json({error: 'Filme não encontrado.'});
    }

    filmes[filmeIndex] = {id, genero, titulo, ano};
    
    res.json(filmes[filmeIndex]);

});

// DELETE
app.delete('/filmes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = filmes.findIndex(f => f.id === id);

    if (index === -1) {
        return res.status(404).json({error: 'Filme não encontrado.'});
    }

    filmes.splice(index, 1);
    res.json({message: 'Filme deletado com sucesso.'});
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});