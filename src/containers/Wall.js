import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Home } from 'containers';

const propTypes = {};
const defaultProps = {};

class Wall extends Component {

    constructor(props){
        super(props);
    };

    render(){
        return(
            <Home username={this.props.match.params.username}></Home>
        );
    }
}

Wall.propTypes = propTypes;
Wall.defaultProps = defaultProps;

export default Wall;