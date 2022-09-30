// const bodyParser = require("body-parser");
const express = require("express");

const STATUS_USER_ERROR = 422;
let id = 1;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
let posts = [];

const server = express();
// to enable parsing of json bodies for post requests
server.use(express.json());

// TODO: your code to handle requests

server.post('/posts', (req, res) => {
    const { author, title, contents } = req.body;
    if (!author || !title || !contents) {
        res.status(STATUS_USER_ERROR).json({
            error: "No se recibieron los parámetros necesarios para crear el Post"
        });
    } else {
        const newPost = {
            id,
            author,
            title,
            contents,
        };
        posts.push(newPost);
        id++;
        res.json(newPost);
    };
});

server.post('/posts/author/:author', (req, res) => {
    const { title, contents } = req.body;
    if (!title || !contents || !req.params.author) {
        res.status(STATUS_USER_ERROR).json({
            error: "No se recibieron los parámetros necesarios para crear el Post"
        });
    } else {
        const newPost = {
            id,
            author,
            title,
            contents,
        };
        posts.push(newPost);
        id++;
        res.json(newPost);
    };
});

server.get('/posts', (req, res) => {
    if (req.query.term) {
        const filtro = posts.filter(post =>
            post.title.includes(req.query.term) || post.contents.includes(req.query.term));
        res.json(filtro);
    } else {
        res.json(posts);
    };
});

server.get('/posts/:author', (req, res) => {
    const { author } = req.params; //hago destructuring y saco la prop author de params
    const filtro = posts.filter(post => post.author === author); //o req.params.author si no hice destructuring
    if (filtro.length === 0) {
        res.status(STATUS_USER_ERROR).json({
            error: "No se recibieron los parámetros necesarios para crear el Post"
        });
    } else {
        res.json(filtro);
    };
});

server.get('/posts/:author/:title', (req, res) => {
    const { author, title } = req.params;
    const filtro = posts.filter(post => post.author === author && post.title === title);
    if (filtro.length === 0) {
        res.status(STATUS_USER_ERROR).json({
            error: "No existe ningun post con dicho titulo y autor indicado"
        });
    } else {
        res.json(filtro);
    };
});

server.put('/posts', (req, res) => {
    const { id, title, contents } = req.body;
    const postId = posts.find(post => post.id === id);
    if (!id || !title || !contents) {
        res.status(STATUS_USER_ERROR).json({
            error: "No se recibieron los parámetros necesarios para crear el Post"
        });
    } else if (!postId) {
        res.status(STATUS_USER_ERROR).json({
            error: "El Id no corresponde a un post existente"
        });
    } else {
        postId.title = title;
        postId.contents = contents;
        res.json(postId);
    };
});

server.delete('/posts', (req, res) => {
    const { id } = req.body;
    const postId = posts.find(post => post.id === id);
    if (!id) {
        res.status(STATUS_USER_ERROR).json({
            error: "El campo Id está incompleto"
        });
    } else if (!postId) {
        res.status(STATUS_USER_ERROR).json({
            error: "El Id no corresponde a un post existente"
        });
    } else {
        posts = posts.filter(post => post.id !== id);
        res.json({ success: true });
    };
});

server.delete('/author', (req, res) => {
    const { author } = req.body;
    const postAuthor = posts.filter(post => post.author === author);
    if (!author) {
        res.status(STATUS_USER_ERROR).json({
            error: "No existe el autor indicado"
        });
    } else if (postAuthor.length === 0) {
        res.status(STATUS_USER_ERROR).json({
            error: "No existe el autor indicado"
        });
    } else {
        posts = posts.filter(post => post.author !== author);
        res.json(postAuthor);
    };
});


module.exports = { posts, server };
