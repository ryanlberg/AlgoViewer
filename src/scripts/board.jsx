import React, {Component} from 'react';
import { runGraphType } from './graph/graphAlgos';
import { makeGrid, generateGridWithNewNode} from './utilities';
import { Maze } from './maze/maze'
import Square from './square';
import MyNavbar from './navbar.jsx';
import SubBanner from './subbanner.jsx';

const NODESIZE = 34;
const NAVBARSIZE = 75;

const GRID_HEIGHT = Math.floor( (window.innerHeight - NODESIZE * 2 - NAVBARSIZE) / NODESIZE);
const GRID_WIDTH = Math.floor((window.innerWidth-NODESIZE*2) / NODESIZE);
const ROWEND = GRID_HEIGHT;
const COLEND = GRID_WIDTH;

let NODEROWSTART = 0;
let NODECOLSTART = 0;
let NODEROWEND = ROWEND - 1;
let NODECOLEND = COLEND -1;

window.onresize = () => { window.location.reload(); };

export default class Board extends Component {
    constructor() {
      super();
      this.state = {
        grid: [],
        running: false,
        downClick: false,
        startClicked: false,
        endclicked: false,
        strategy: "BFS"
      };
    }

    componentDidMount() {
      const grid = makeGrid(ROWEND, COLEND, NODEROWSTART, NODECOLSTART, NODEROWEND, NODECOLEND);
      this.setState({ 
        grid: grid,
      });
    }
    
    resetState = (algo) => {
      if(!this.state.running) {
      
        for(let i = 0; i < ROWEND; i++) {
          for(let j = 0; j < COLEND; j++) {
            if (i === NODEROWSTART && j === NODECOLSTART || i === NODEROWEND && j === NODECOLEND) {
              continue;
            }
            const id = String(i) + '-' + String(j);
            if (!this.state.grid[i][j].wall) {
              document.getElementById(id).className = 'square';
            }
          }
        }
        this.setState({ 
          strategy: algo
        });
    }
      
      
    }

    runSelected = () => {
      this.resetState(this.state.strategy)
      //this.setState({running: true})
      const searchOrder = runGraphType(this.state.grid, this.state.strategy, [NODEROWSTART, NODECOLSTART], [NODEROWEND, NODECOLEND]);
      this.animate(searchOrder[0], searchOrder[1]);
    }

    enableButton = () => {
      //console.log("Enable Button")
      this.setState({running: false})
    };

    animate = (searchOrder, path) => {
      for (let i = 0; i < searchOrder.length; i++) {
        this.animateTimer = setTimeout(() => {
          //console.log("animating frontier")
          const curSquare = searchOrder[i];
          if (curSquare.end) {
              this.animatePath(path);
          }
        
          if (!curSquare.start && !curSquare.end) {
            const id = String(curSquare.i) + '-' + String(curSquare.j);
            document.getElementById(id).className = 'square square-seen';
          }
        }, 10 * i);
      }
      this.enableButton();
    }
    
    

    animatePath = (path) => {
      for (let j = 0; j < path.length; j++) {
        this.pathTimer = setTimeout(() => {
          const pathSquare = path[j];
          const id = String(pathSquare.i) + '-' + String(pathSquare.j);
          document.getElementById(id).className = 'square square-path';
        }, 20 * j);
      }
    }
     
    handleDown = (i, j) => {
      if (i === NODEROWSTART && j === NODECOLSTART) {
        this.resetState(this.state.strategy);
        this.setState({
          downClick: true,
          startClicked: true
        })
      } else if (i === NODEROWEND && j === NODECOLEND) {
        this.resetState(this.state.strategy);
        this.setState({
          downClick: true,
          endClicked: true
        })
        
      } else {
          const updatedGrid = generateGridWithNewNode(this.state.grid, [NODEROWSTART, NODECOLSTART], [NODEROWEND, NODECOLEND], i, j, this.state.startClicked, this.state.endClicked)
          this.setState({
            grid: updatedGrid,
            downClick: true
          })
        }

    }
  
    handleMove = (i, j) => {
      //console.log("handling Move")
      const downClicked = this.state.downClick;
      const startClicked = this.state.startClicked;
      const endClicked = this.state.endClicked;
      if (downClicked && startClicked) {
        if(!(i === NODEROWSTART && j === NODECOLSTART) && !this.state.running) {
          const updatedGrid = generateGridWithNewNode(this.state.grid, [NODEROWSTART, NODECOLSTART], [NODEROWEND, NODECOLEND], i, j, startClicked, endClicked);
          NODEROWSTART = i;
          NODECOLSTART = j;
          this.setState({
            grid: updatedGrid,
          })
          
        }
      } else if (downClicked && endClicked) {
          if(!(i === NODEROWEND && j === NODECOLEND)  && !this.state.running){
            const updatedGrid = generateGridWithNewNode(this.state.grid, [NODEROWSTART, NODECOLSTART], [NODEROWEND, NODECOLEND], i, j, startClicked, endClicked)
            NODEROWEND = i;
            NODECOLEND = j;
            this.setState({
              grid: updatedGrid,
              strategy: this.state.Strategy
            })
          }
      }
    }
  
    handleUp = () => {
      //console.log("handling up")
      this.setState({
        downClick: false,
        startClicked: false,
        endClicked: false,
        strategy: this.state.strategy
      })
    }

    mazify = () => {
      this.resetState(this.state.strategy);
      let maze = new Maze(this.state.grid, "vertical").getMaze();
      this.setState({
        grid: maze,
      })
    }
   
    render() {
      //const { grid } = this.state;  
      return (
        <div>
         <MyNavbar running={this.state.running} runSelected={this.runSelected} resetState={this.resetState} mazify={this.mazify}></MyNavbar>
          <SubBanner selected={this.state.strategy}></SubBanner>
          <div className='gridcol'>
            {this.state.grid.map((row, id) => {
              return (
                <div key={id}>
                  {row.map((square, rowkey) => {
                    const {i, j, start, wall, end} = square;
                    return (
                      <Square
                        key={rowkey}
                        row={i}
                        end={end}
                        wall={wall}
                        start={start}
                        col={j}
                        handleDown ={this.handleDown}
                        handleMove = {this.handleMove}
                        handleUp = {this.handleUp}
                        disabled = {this.props.running}
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



