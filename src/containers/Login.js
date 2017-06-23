import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { loginRequest } from 'actions/authentication';
import { Authentication } from 'components';

const propTypes = {};
const defaultProps = {};
const mapStateToProps = (state) => {
    return {
        status : state.authentication.login.status
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        loginRequest: (id, pw) => {
            return dispatch(loginRequest(id,pw));
        }
    };
};

class Login extends Component {

    constructor(props){
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
    };

    handleLogin(id, pw){
        return this.props.loginRequest(id, pw).then(
            () => {
                if(this.props.status === "SUCCESS") {
                    let loginData = {
                        isLoggedIn : true,
                        username : id
                    };

                    document.cookie = 'key='+ btoa(JSON.stringify(loginData));
                    Materialize.toast('Welcome, ' + id + '!', 2000);
                    return true;
                } else {
                    let $toastContent = $('<span style="color: #FFB4BA">Incorrect username or password</span>');
                    Materialize.toast($toastContent, 2000);
                    return false;
                }
            }
        );
    }

    render(){
        return(
            <div>
                <Authentication mode={true}
                    onLogin={this.handleLogin}
                />
            </div>
        );
    }
}

Login.propTypes = propTypes;
Login.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(Login);