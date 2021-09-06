const express = require('express');
const { request } = require('http');
const app = express();
app.use(express.json());
const {uuid} = require('uuidv4');
//porta.
// listen tem que ser a ultima linha do file de servidor.

app.get('/', (req, res) => {
    res.send("bem-vindo ao app!");
});

app.get('/sobre', (req, res)=>{
    return res.send("Minha página sobre");
});

app.get("/blog", (req, res)=> {
    res.send("bem-vindo ao blog!");
});

app.get('/params/:name/:color', (req, res) => {
    res.send('<h1>Olá, ' + req.params.name + ', sua cor favorita é ' + req.params.color + '</h1>');
});


const projects = [];
app.get('/projects', (request, response) => {
    const { title } = request.query;

    if(title) {
        // poderia fazer ternario
        const results = projects.filter(project => project.title.includes(title));
        return response.json(results);
    }
    return response.json(projects);
});

app.get('/projects/:id', (request, response) => {
    const { id } = request.params;
    const projectIndex = projects.findIndex(project => project.id === id);

    if(projectIndex < 0) {
        return response.status(400).json({eror: "Projeto não encontrado!"});
    }
    return response.json(projects[projectIndex]);
});


app.post('/projects/save', (request, response) => {
    console.log(request.body);   
    const { title, owner } = request.body;

    const id = uuid(); // gera um id unicso

    const project = {
        id,
        title,
        owner  
    };

    projects.push(project);

    return response.json(project);
});

app.delete('/projects/:id', (request, response) => {
    const { id } = request.params;

    const projectIndex = projects.findIndex(project => project.id === id);

    if(projectIndex < 0) {
        return response.status(400).json({eror: "Projeto não encontrado!"});
    }

    // segundo param é quantos quero remover
    projects.splice(projectIndex, 1);

    return response.status(204).json({message: 'Projeto removido com sucesso!'});
});

app.put('/projects/:id', (request, response) => {
    const { id } = request.params;
    const { title, owner } = request.body;

    const projectIndex = projects.findIndex(project => project.id === id);

    if(projectIndex < 0) {
        return response.status(400).json({eror: "Projeto não encontrado!"});
    }

    const project = {
        id,
        title,
        owner  
    };

    projects[projectIndex] = project;

    return response.json(project);
});


app.listen(8081, () => {
    console.log("Backend started!");
});