const fs = require("fs");
const Graph = require('./graph.class.js');

const sourceFile = './input.txt';
const targetFile = './output.txt';

const newLine = '\r\n';
const example = 0;

let graph = new Graph();

let readFile = (path) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, { encoding: 'utf-8' } , (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            else {
                resolve(data.split('------')[example].trim().replace(/[ ]{2,}/g, ' '));
            }
        });
    })
}

try {
    readFile(sourceFile).then(fileContent => {

        let [nodes, args] = fileContent.split(`${newLine}${newLine}`);
        nodes.split(newLine).map(node => graph.fillNode(node.trim()));

        let output = '';

        args.split(newLine)
            .map(arg => {
                arg = arg.trim().split(' ');
                let [from, to] = [arg[1], arg[2]];

                let result = graph.shortestPath(from, to);
                output += `${from}->${to}: ${result}${newLine}`;
            });

        fs.writeFile(targetFile, output.trim(), (err) => {
            if (err) {
                throw err;
            }
        });
    });
}
catch (err) {
    console.error(`Error occured: ${err}`);
}