const fs = require('fs');

module.exports = {
    pwd: () => { process.stdout.write(process.cwd()) },
    date: () => { process.stdout.write(Date()) },
    ls: () => {
        fs.readdir('.', function (err, files) {
            if (err) throw err;
            files.forEach(function (file) {
                process.stdout.write(file.toString() + "\n");
            })
            process.stdout.write("prompt > ");
        });
    },
    echo: (args) => {
        process.stdout.write(args.join(' '));
    }
};

