var http = require('http');
var fs = require('fs'); //Importamos el módulo fs que nos permite leer y escribir archivos del file system

http.createServer(function (req, res) {

	res.writeHead(200, { 'Content-Type': 'text/html' })
	var html = fs.readFileSync('./html/index.html'); //Lee el archivo de forma sincrónica
	res.end(html);

}).listen(1337, '127.0.0.1');