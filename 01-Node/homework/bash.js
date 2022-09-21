const commands = require('./commands/index.js');

// Output un prompt
process.stdout.write('prompt > ');
// El evento stdin 'data' se dispara cuando el user escribe una línea
process.stdin.on('data', function (data) {
    const args = data.toString().trim().split(' ');
    const cmd = args.shift();
    if (commands.hasOwnProperty(cmd)) {
        commands[cmd](args);
    } else {
        process.stdout.write('Comando inexistente');
    }
    process.stdout.write('\nprompt > ');
});

