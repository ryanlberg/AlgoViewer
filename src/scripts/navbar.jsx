import React, {Component} from 'react';
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

export default class MyNavbar extends Component {
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
        
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">AlgoView</Navbar.Brand>
        <Nav className="mr-auto">
          <select className="btn center" id="selected" disabled={this.props.running} id="selected" onChange={() => this.props.resetState()} >
            <option value="BFS">BFS</option>
            <option value="DFS">DFS</option>
            <option value="ASTAR">Astar</option>
          </select>
          <Button className="btn" disabled={this.props.running} id="simulate" onClick={() => this.props.runSelected() }> Lets See it!</Button>
        </Nav>
      </Navbar>
        /*
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
        */
      )
        
    }
}