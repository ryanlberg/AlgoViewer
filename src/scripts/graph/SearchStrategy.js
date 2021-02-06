import {minHeap} from './Minheap';

/**
 * Acts as a strtagey pattern implementaton of a DataStructure for the graph
 * algorithms.
 */
class SearchStrategy {
    constructor(type) {
        if (type === "BFS") {
            this.g = new Bfs();
        } else if (type === "DFS") {
            this.g = new Dfs();
        } else if (type === "ASTAR") {
            this.g = new Astar();
        } else {
            this.g = null
        }
    }

    pop() {
        return this.g.pop();
    }

    push(item) {
        this.g.push(item);
    }

    length() {
        return this.g.length();
    }
}

class Dfs {
    constructor() {
        this.frontier = []
    }
    
    pop() {
        return this.frontier.pop();
    }

    push(item) {
        return this.frontier.push(item)
    }

    length() {
        return this.frontier.length;
    }
}

class Bfs {
    constructor() {
        this.frontier = [];
    }

    pop() {
        return this.frontier.shift();
    }

    push(item) {
        this.frontier.push(item);
    }

    length() {
        return this.frontier.length;
    }
}

class Astar {
    constructor() {
        this.frontier = new minHeap();
    }

    pop() {
        return this.frontier.pop();
    }

    push(item) {
        this.frontier.push(item)
    }

    length() {
        return this.frontier.length();
    }

}

export {SearchStrategy};