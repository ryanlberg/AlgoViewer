import React, {Component} from 'react';
import { runGraphType } from './graphAlgos';
import { makeGrid, generateGridWithNewNode} from './utilities';
import Navbar from './navbar.jsx';

const NODESIZE = 34;

const GRID_HEIGHT = Math.floor( (window.innerHeight - NODESIZE * 2 - 25) / NODESIZE);
const GRID_WIDTH = Math.floor((window.innerWidth-NODESIZE*2) / NODESIZE);

const ROWEND = GRID_HEIGHT;
const COLEND = GRID_WIDTH;
let NODEROWSTART = 0;
let NODECOLSTART = 0;
let NODEROWEND = ROWEND - 1;
let NODECOLEND = COLEND -1;

let startClicked = false
let endClicked = false



window.onresize = () => { window.location.reload(); };

class Square extends Component {
  constructor(props) {
    super(props);
    this.state = {
      row: props.row,
      col: props.col,
      start: props.start,
      end: props.end,
      handleDown: props.handleClick,
      handleMove: props.handleMove,
      handleUp: props.handleUp
    };
  }

  
  render() {
    let classname = '';
    if (this.props.start) {
      classname = ' square-start'
    } else if (this.props.end) {
      classname = ' square-end'
    } else {}
    return (
        <div id={String(this.props.row) + "-" + String(this.props.col)} className={`square` + classname} onMouseDown={() => this.props.handleDown(this.props.row, this.props.col)} onMouseUp={() => this.props.handleUp()} onMouseMove={() => this.props.handleMove(this.props.row, this.props.col)}>
        </div>
    )  
    
  }
}

export default class Board extends Component {
    constructor() {
      super();
      this.state = {
        grid: []
      };
    }

    componentDidMount() {
      const grid = makeGrid(ROWEND, COLEND, NODEROWSTART, NODECOLSTART, NODEROWEND, NODECOLEND);
      this.setState({ grid });
    }

    resetState = () => {
      const grid = this.state.grid
      for(let i = 0; i < ROWEND; i++) {
        for(let j = 0; j < COLEND; j++) {
          //let cur = this.grid[i][j]
          if (i === NODEROWSTART && j === NODECOLSTART || i === NODEROWEND && j === NODECOLEND) {
            continue;
          }
          let id = String(i) + '-' + String(j);
          document.getElementById(id).className = 'square';
        }
      }
      this.setState({grid })
    }

    runSelected = () =>{
      this.resetState();
      let selection = document.getElementById("selected");
      let btn = document.getElementById("simulate");
      btn.disable = true;
      let searchOrder = runGraphType(this.state.grid, selection.value, [NODEROWSTART, NODECOLSTART], [NODEROWEND, NODECOLEND]);
      this.animate(searchOrder[0], searchOrder[1]);

    }

    animate = (searchOrder, path) => {
      for (let i = 0; i < searchOrder.length; i++) {
        setTimeout(() => {
          const curSquare = searchOrder[i];
          if (curSquare.end) {
            for (let j = 0; j < path.length; j++) {
              setTimeout(() => {
                const pathSquare = path[j];
                const id = String(pathSquare.i) + '-' + String(pathSquare.j);
                document.getElementById(id).className = 'square square-path';
              }, 60 * j);
            }
          }
          if (!curSquare.start && !curSquare.end) {
            const id = String(curSquare.i) + '-' + String(curSquare.j);
            document.getElementById(id).className = 'square square-seen';
          }
        }, 10 * i);
      }
    }

    handleDown = (i, j) => {
      if (i === NODEROWSTART && j === NODECOLSTART) {
        this.resetState();
        startClicked = true;
      } else if (i === NODEROWEND && j === NODECOLEND) {
        this.resetState();
        endClicked = true;
      }
    }
  
    handleMove = (i, j) => {
      if (startClicked) {
        if(!(i === NODEROWSTART && j === NODECOLSTART)) {
          const updatedGrid = generateGridWithNewNode(this.state.grid, [NODEROWSTART, NODECOLSTART], [NODEROWEND, NODECOLEND], i, j, startClicked, endClicked)
          this.setState({grid: updatedGrid})
          NODEROWSTART = i;
          NODECOLSTART = j;
        }
      } else if (endClicked) {
        if(!(i === NODEROWEND && j === NODECOLEND)){
          const updatedGrid = generateGridWithNewNode(this.state.grid, [NODEROWSTART, NODECOLSTART], [NODEROWEND, NODECOLEND], i, j, startClicked, endClicked)
          this.setState({grid: updatedGrid})
          NODEROWEND = i;
          NODECOLEND = j;
        }
      }
      
    }
  
  
    handleUp = () => {
      startClicked = false;
      endClicked = false;
    }
   

    render() {
      const { grid } = this.state;  
      return (
        
        <div>
          <button id="simulate" onClick={ this.runSelected }> Lets See it!</button>
          <select id="selected" onChange={ this.resetState }>
            <option value="BFS">Bfs</option>
            <option value="DFS">Dfs</option>
            <option value="ASTAR">Astar</option>
          </select>
          <div className='gridcol'>
            {grid.map((row, id) => {
              return (
                <div key={id}>
                  {row.map((square, rowkey) => {
                    const {i, j, start, end} = square;
                    return (
                      <Square
                        key={rowkey}
                        row={i}
                        end={end}
                        start={start}
                        col={j}
                        handleDown ={this.handleDown}
                        handleMove = {this.handleMove}
                        handleUp = {this.handleUp}
                        >
                        </Square>
                    );
                  })}
                </div>
              );
            })}
          </div>

          
          </div>
      )
  }
}



