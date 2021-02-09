import React, {Component} from 'react';
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Dropdown from 'react-bootstrap/Dropdown'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'


export default class MyNavbar extends Component {
    constructor(props) {
      super(props);
      this.state = {
        running: props.running,
        runSelected: props.runSelected,
        resetState: props.resetState,
        mazify: props.mazify
      }
    }

    render () {
      return (
        
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">AlgoView</Navbar.Brand>
        <Nav>
          <Dropdown className="btn-grup " as={ButtonGroup}>
            <Button className='btn btn-info' variant="success">Choose an Algorithm!</Button>

            <Dropdown.Toggle className='btn-info'  id="dropdown-split-basic" />

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => this.state.resetState("BFS")}>BFS</Dropdown.Item>
              <Dropdown.Item onClick={() => this.state.resetState("DFS")}>DFS</Dropdown.Item>
              <Dropdown.Item onClick={() => this.state.resetState("ASTAR")}>ASTAR</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Button className="btn-info" disabled={this.props.running} id="simulate" onClick={() => this.props.runSelected() }> Lets See it!</Button>
          <Button className="btn-info" disabled={this.props.running} id='maxbutton' onClick={() => this.props.mazify()}>Make a Maze</Button>
          </Nav>
      </Navbar>
      )
        
    }
}