class Maze {
    
    constructor(grid, type) {
        this.maze = null;
        if (type === "horizontal" || type === "vertical") {
            this.maze = new HorizontalVerticalMaze(grid, type)
        } else {
            this.maze = new RandomMaze(grid)
        }
    }

    getMaze() {
        return this.maze.getMaze();
    }

}

class HorizontalVerticalMaze {
    constructor(grid, type) {
        this.grid = grid.slice();
        this.gridWidth = grid[0].length;
        this.gridHeight = grid.length;
        this.mazify(0, this.gridWidth, 0,  this.gridHeight, type);
    }

    getMaze() {
        return this.grid;
    }

    mazify(lowWidth, highWidth, lowHeight, highHeight, type) {
        if (type === "vertical") {
            let mid = Math.floor((lowWidth + highWidth)/2)
            if ((highWidth - lowWidth) > 2) {
                for(let i = lowHeight; i < highHeight; i++) {
                    let curNode = this.grid[i][mid];
                    if(!curNode.start && !curNode.end) {
                        curNode.wall = true;
                    } 
                }

                let midHeight = Math.floor((lowHeight+highHeight)/2);
                let topRandom = Math.floor(Math.random() * (midHeight - lowHeight)) + lowHeight;
                let botRandom = Math.floor(Math.random() * (highHeight - midHeight)) + midHeight; 
                this.grid[topRandom][mid].wall = false;
                this.grid[botRandom][mid].wall = false;

                this.mazify(lowWidth, mid, lowHeight, highHeight, "horizontal");
                this.mazify(mid+1, highWidth, lowHeight, highHeight, "horizontal");
            }
            
        }

        if (type === "horizontal") {
            let mid = Math.floor((lowHeight + highHeight)/2);
            if((highHeight - lowHeight) > 2) {
                for(let i = lowWidth; i < highWidth; i++) {
                    let curNode = this.grid[mid][i];
                    if(!curNode.start && !curNode.end) {
                        curNode.wall = true;
                    } 
                }

                let midWidth = Math.floor((lowWidth+highWidth)/2);
                let topRandom = Math.floor(Math.random() * (midWidth - lowWidth)) + lowWidth;
                let botRandom = Math.floor(Math.random() * (highWidth - midWidth)) + midWidth; 
                this.grid[mid][topRandom].wall = false;
                this.grid[mid][botRandom].wall = false;

                this.mazify(lowWidth, highWidth, lowHeight, mid, "vertical");
                this.mazify(lowWidth, highWidth, mid+1, highHeight, "vertical");
            }

        }
    }
}

class RandomMaze {

    constructor(grid) {
        this.grid = grid.slice();
        this.gridWidth = grid[0].length;
        this.gridHeight = grid.length;
        this.mazify(0, this.gridWidth, 0,  this.gridHeight, "horizontal");
    }

    getMaze() {
        return this.grid;
    }

    mazify(lowWidth, highWidth, lowHeight, highHeight, type) {
        if (type === "vertical") {
            let mid = Math.floor((lowWidth + highWidth)/2)
            if ((highWidth - lowWidth) > 2) {
                for(let i = lowHeight; i < highHeight; i++) {
                    let curNode = this.grid[i][mid];
                    let chance = Math.random();
                    if(!curNode.start && !curNode.end && chance <= .50) {
                        curNode.wall = true;
                    } else if(!curNode.start && !curNode.end) {
                        curNode.wall = false;
                    }
                }
                this.mazify(lowWidth, mid, lowHeight, highHeight, "horizontal");
                this.mazify(mid+1, highWidth, lowHeight, highHeight, "horizontal");
            }
            
        }

        if (type === "horizontal") {
            let mid = Math.floor((lowHeight + highHeight)/2);
            if((highHeight - lowHeight) > 2) {
                for(let i = lowWidth; i < highWidth; i++) {
                    let curNode = this.grid[mid][i];
                    let chance = Math.random();
                    if(!curNode.start && !curNode.end && chance < .50) {
                        curNode.wall = true;
                    } else if(!curNode.start && !curNode.end) {
                        curNode.wall = false;
                    }
                }
                this.mazify(lowWidth, highWidth, lowHeight, mid, "vertical");
                this.mazify(lowWidth, highWidth, mid+1, highHeight, "vertical");
            }

        }

    }
}

export { Maze };