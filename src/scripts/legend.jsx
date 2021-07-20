import { render } from '@testing-library/react';
import React, {Component} from 'react';
import "../css/legend.css";

export default class Legend extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render() {
        return(
            <div>
                <br></br>
                <ul class="ul">
                    <li>Start Node</li>
                    <li>End Node</li>
                    <li>Wall</li>
                    <li>Path</li>
                </ul>

            </div>
        )
    }
}