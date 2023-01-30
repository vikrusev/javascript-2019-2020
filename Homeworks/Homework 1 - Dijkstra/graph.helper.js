const __INF__ = 9999999;

const GraphHelper = (g = {}) => {

    const graph = g;

    let distances = {}; // we do not want arrays
    let visited = {};

    let dijkstra = (x, y) => {
        reset(x);
        let result = shortestPath(x, y);

        return result === __INF__ ? 'unreachable' : result;
    }

    let shortestPath = (x, y) => {
        visited[x] = true;

        let min = __INF__;
        let element;

        for (let el in graph[x]) {
            if (visited[el]) {
                continue;
            }

            if (distances[el] > distances[x] + +graph[x][el]) {
                distances[el] = distances[x] + +graph[x][el];
            }

            if (distances[el] < min) {
                min = distances[el];
                element = el;
            }
        }

        if (!element) {
            return distances[y];
        }

        return shortestPath(element, y);
    }

    let reset = (x) => {
        for (let node of Object.keys(graph)) {
            visited[node] = false;
            distances[node] = __INF__;
        }
        
        distances[x] = 0;
    }

    return { dijkstra }
}

module.exports = GraphHelper;