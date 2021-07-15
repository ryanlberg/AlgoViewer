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
        runSelected: props.runSelected,
        resetState: props.resetState,
        mazify: props.mazify
      }
    }

    render () {
      return (
        
      <Navbar bg="dark" variant="dark">
        <div className="navbar-brand-center">AlgoView</div>
        <Nav>
          <Dropdown className="btn" as={ButtonGroup}>
            <Button className='btn-info'>Choose an Algorithm!</Button>

            <Dropdown.Toggle className='btn-info'  id="dropdown-split-basic" />

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => this.state.resetState("BFS")}>BFS</Dropdown.Item>
              <Dropdown.Item onClick={() => this.state.resetState("DFS")}>DFS</Dropdown.Item>
              <Dropdown.Item onClick={() => this.state.resetState("ASTAR")}>ASTAR</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown className="btn" as={ButtonGroup}>
            <Button className='btn-info' variant="success">Maze Type!</Button>

            <Dropdown.Toggle className='btn-info'  id="dropdown-split-basic" />

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => this.state.mazify("vertical")}>Vertical Split</Dropdown.Item>
              <Dropdown.Item onClick={() => this.state.mazify("horizontal")}>Horizontal Split</Dropdown.Item>
              <Dropdown.Item onClick={() => this.state.mazify("random")}>Random Maze</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Button className="btn-info" id="simulate" onClick={() => this.props.runSelected() }> Lets See it!</Button>
          
          </Nav>
      </Navbar>
      )
        
    }
}