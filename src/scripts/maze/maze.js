class Maze {
    
    constructor(grid, type) {
        this.grid = grid.slice();
        this.gridWidth = grid[0].length;
        this.gridHeight = grid.length;
        this.newmazify(0, this.gridWidth, 0,  this.gridHeight, type);
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
                let changed = false;
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

    newmazify(lowWidth, highWidth, lowHeight, highHeight, type) {
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

                this.newmazify(lowWidth, mid, lowHeight, highHeight, "horizontal");
                this.newmazify(mid+1, highWidth, lowHeight, highHeight, "horizontal");
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
                console.log(topRandom, botRandom);
                this.grid[mid][topRandom].wall = false;
                this.grid[mid][botRandom].wall = false;

                this.newmazify(lowWidth, highWidth, lowHeight, mid, "vertical");
                this.newmazify(lowWidth, highWidth, mid+1, highHeight, "vertical");
            }

        }

    }
}

export { Maze };