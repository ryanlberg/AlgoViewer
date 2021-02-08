import React, {Component} from 'react';
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown'

export default class Navbar extends Component {
    constructor(props) {
      super(props);
      this.state = {
        running: props.running,
        runSelected: props.runSelected,
        resetState: props.resetState
      }
    }

    render () {
      return (
      <div className="Banner">
        <div class="btn-group">
          <h1>Try out some Algorthms!</h1>
         <Button className="btn center" disabled={this.props.running} id="simulate" onClick={() => this.props.runSelected() }> Lets See it!</Button>
         <select class="form-group" id="selected" disabled={this.props.running} id="selected" onChange={() => this.props.resetState()} >
            <option value="BFS">BFS</option>
            <option value="DFS">DFS</option>
            <option value="ASTAR">Astar</option>
          </select>
          </div>
        </div>
      )
        
    }
}