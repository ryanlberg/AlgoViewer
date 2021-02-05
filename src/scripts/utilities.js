function generateNeeded(rows, cols, filler) {
    let seen = [];
    for (var i = 0; i < rows; i++) {
        let row = [];
        for(var j = 0; j < cols; j++) {
            row.push(filler);
        }
        seen.push(row);
    }
    return seen;
}

function isValid(i, j, rows, cols) { 
    return i >= 0 && i < rows && j >= 0 && j < cols;
}

function getDistance(a, b) {
  return Math.sqrt(Math.pow(a.i - b.i, 2) + Math.pow(a.j - b.j, 2))
}

function makeGrid(ROWEND, COLEND, NODEROWSTART, NODECOLSTART, NODEROWEND, NODECOLEND) {
    let rows = [];
    for(let i = 0; i < ROWEND; i++ ){
      let cols = [];
      for (let j = 0; j < COLEND; j++) {
        if (i === NODEROWSTART && j === NODECOLSTART){
          cols.push({i: i, j: j, start: true, end: false, wall: false, from: null, dist: 0});
        } else if (i === NODEROWEND && j === NODECOLEND) {
          cols.push({i: i, j: j, start: false, end: true, wall: false, from: null, dist: 0});
        } else {
          cols.push({i: i, j: j, start: false, end: false, wall: false, from: null, dist: 0});
        }
      }
      rows.push(cols)
    }
    return rows
  }

  function generateGridWithNewNode(grid, oldstart, oldend, i, j, startClicked, endClicked) {
    const out = grid.slice();
    const newnode = grid[i][j]
    if (startClicked) {
      let startNode = grid[oldstart[0]][oldstart[1]]
      const old = {
        ...startNode,
        start: false,
      };
      const updateNode = {
        ...newnode,
        start: true,
      };
      out[i][j] = updateNode;
      out[oldstart[0]][oldstart[1]] = old;
    } else if (endClicked){
      let endNode = grid[oldend[0]][oldend[1]]
      const old = {
        ...endNode,
        end: false,
      };
      const updateNode = {
        ...newnode,
        end: true,
      };
      out[i][j] = updateNode;
      out[oldend[0]][oldend[1]] = old;
  
    }
    return out
  }

export {isValid, generateNeeded, makeGrid, getDistance, generateGridWithNewNode}