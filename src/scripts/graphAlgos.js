import {isValid, generateNeeded, getDistance } from "./utilities.js";
import{ SearchStrategy } from "./graph/SearchStrategy"

const around = [[-1, 0], [0, 1], [1,0], [0,-1]];

function runGraphType(graph, type, nodestart, nodeend) {
    let frontier = new SearchStrategy(type);
    const ROWS = graph.length;
    const COLS = graph[0].length;
    const seen = generateNeeded(ROWS, COLS, false);
    frontier.push(graph[nodestart[0]][nodestart[1]]);
    seen[nodestart[0]][nodestart[1]] = true;
    const searched = [];
    let path = [];
    searched.push(graph[nodestart[0]][nodestart[1]])
    
    while (frontier.length() > 0) {
        const cur = frontier.pop();
        const currow = cur.i
        const curcol = cur.j
        searched.push(graph[currow][curcol])
        if (currow == nodeend[0] && curcol == nodeend[1]) {
            path = backTrack(cur)
            return [searched, path];
        }
        for (var near= 0; near < around.length; near++) {
            const newrow = currow + around[near][0];
            const newcol = curcol + around[near][1];
            if (isValid(newrow, newcol, ROWS, COLS) && !seen[newrow][newcol]){
                seen[newrow][newcol] = true;
                graph[newrow][newcol].dist = getDistance(graph[newrow][newcol], graph[nodeend[0]][nodeend[1]])
                frontier.push(graph[newrow][newcol])
                graph[newrow][newcol].from = cur
               
            }
            
        }
       
    }
    return [searched, path];
}

function backTrack(node) {
    const path = [];
    node = node.from;
    while (node.from !== null) {
        path.unshift(node);
        node = node.from;
    }
    return path;
}

export { runGraphType }