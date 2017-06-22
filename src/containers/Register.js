import React, { Component, PropTypes } from 'react';

const propTypes = {};
const defaultProps = {};

class Register extends Component {

    constructor(props){
        super(props);
    };

    render(){
        return(
            <div>
                <Authentication mode={false}/>
            </div>
        );
    }
}

Register.propTypes = propTypes;
Register.defaultProps = defaultProps;

export default Register;