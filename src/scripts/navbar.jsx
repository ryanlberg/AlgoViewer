import React, {Component} from 'react';


export default class Navbar extends Component {
    constructor() {
      super();
    }

    render () {
      return (
      <div>
        <nav class="navbar navbar-default">
        <div class="container-fluid">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">Algorithms</a>
        </div>
    
     
          <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav">
              <li><a href="#">Link</a></li>
              <li>
                <select class="dropdown navbar-default container-fluid">
                  <option>BFS</option>
                  <option>DFS</option>
                  <option>A*</option>
                </select>
              </li>
            </ul>
          </div>
        </div>
        </nav>
        </div>
      )
        
    }
}