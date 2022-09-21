const fs = require('fs');
const request = require('request');

module.exports = {
    pwd: (args, done) => { done(process.cwd()) },
    date: (args, done) => { done(Date()) },
    ls: (args, done) => {
        fs.readdir('.', function (err, files) {
            if (err) throw err;
            let out = '';
            files.forEach(function (file) {
                out = out + file + '\n';
            })
            done(out);
        });
    },
    echo: (args, done) => {
        done(args.join(' '));
    },
    cat: (file, done) => {
        fs.readFile(file[0], 'utf8', function (err, data) {
            if (err) throw err;
            done(data);
        });
    },
    head: (file, done) => {
        fs.readFile(file[0], 'utf8', function (err, data) {
            if (err) throw err;
            const lines = data.split('\n').slice(0, 9).join('\n'); //Separo por salto de línea, corto las primeras 10 y luego las uno separando por salto de linea.
            done(lines);
        });
    },
    tail: (file, done) => {
        fs.readFile(file[0], 'utf8', function (err, data) {
            if (err) throw err;
            const lines = data.split('\n').slice(-10).join('\n'); //En el metodo slice si coloco numeros negativos cuenta de atrás para adelante.
            done(lines);
        });
    },
    curl: (url, done) => {
        request(url[0], function (err, response, body) {
            if (err) throw err;
            done(body);
        });
    },
};

