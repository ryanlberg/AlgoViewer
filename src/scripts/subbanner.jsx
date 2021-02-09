import React, {Component} from 'react';

export default class SubBanner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: props.selected
        }
    }

    getText() {
        return "You've chosen " + String(this.props.selected);
    }

    render() {
        return(
            <div >
                <div className='subbanner'>{this.getText()}</div>
            </div>
        )
    }
}