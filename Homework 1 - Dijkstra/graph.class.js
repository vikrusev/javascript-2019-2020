const gHelper = require('./graph.helper.js');

class Graph {

    constructor() {
        this.graph = {};
    }

    shortestPath(x, y) {
        if (this.nodeExists(x) && this.nodeExists(y)) {
            const operate = gHelper(this.graph);
            return operate.dijkstra(x, y);
        }
        else {
            console.error('There is a non-existent node'); // just print
        }
    }

    fillNode(line) {
        const [x, y, z] = line.split(' ');

        !this.graph[x] && (this.graph[x] = {});
        !this.graph[y] && (this.graph[y] = {});

        if (!this.edgeExists(x, y)) {
            this.graph[x][y] = z;
            this.graph[y][x] = z;
        }
        else {
            console.log(`Duplicated edge: ${x} <-> ${y}`);
        }
    }

    nodeExists(x) {
        return Object.keys(this.graph).includes(x);
    }

    edgeExists(x, y) {
        return this.graph[x][y] || this.graph[y][x];
    }
}

module.exports = Graph;