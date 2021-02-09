function mazify(grid) {
    const width = grid.length;
    const height = grid[0].length;
    let midHeight = Math.floor(height/2);
    console.log(width, height);
    console.log("in mazify");
}

function horizontalSplit(grid, left, right, top, bottom) {
    let mid = Math.floor((top+bottom)/2);

}

function verticalSplit(grid, left, right, top, bottom) {
    let mid = Math.floor((left+right)/2);
}



export { mazify }