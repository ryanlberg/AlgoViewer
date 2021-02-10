class Maze {
    
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
                let changed = false;
                for(let i = lowHeight; i < highHeight; i++) {
                    let curNode = this.grid[i][mid];
                    if(!curNode.start && !curNode.end) {
                        curNode.wall = true;
                    } else {
                        changed = true;
                    }
                }
                if (!changed) {
                    let gap = Math.floor(Math.random() * (highHeight - lowHeight)) + lowHeight;
                    this.grid[gap][mid].wall = false;
                }
                this.mazify(lowWidth, mid, lowHeight, highHeight, "horizontal");
                this.mazify(mid+1, highWidth, lowHeight, highHeight, "horizontal");
            }
            
        }

        if (type === "horizontal") {
            let mid = Math.floor((lowHeight + highHeight)/2);
            if((highHeight - lowHeight) > 2) {
                let changed = false;
                for(let i = lowWidth; i < highWidth; i++) {
                    let curNode = this.grid[mid][i];
                    if(!curNode.start && !curNode.end) {
                        curNode.wall = true;
                    } else {
                        changed = true;
                    }
                }
                if (!changed) {
                    let gap = Math.floor(Math.random() * (highWidth - lowWidth)) + lowWidth;
                    this.grid[mid][gap].wall = false;
                }
                this.mazify(lowWidth, highWidth, lowHeight, mid, "vertical");
                this.mazify(lowWidth, highWidth, mid+1, highHeight, "vertical");
            }

        }

    }
}

export { Maze };