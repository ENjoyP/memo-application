import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';

const propTypes = {
    mode : PropTypes.bool,
    onLogin : PropTypes.func,
    onRegister : PropTypes.func
};
const defaultProps = {
    mode : true,
    onLogin : (id, pw) => { console.error("login function not defined"); },
    onRegister : (id, pw) => { console.error("register function not defined"); }
};

class Authentication extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userid : "",
            username : "",
            password : "",
            idcheck : "N",
            checkIdBtnClass : "waves-effect waves-light red accent-2 btn",
            success : false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleCheckId = this.handleCheckId.bind(this);
    };

    handleChange(e) {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    };

    handleLogin() {
        let id = this.state.username;
        let pw = this.state.password;

        this.props.onLogin(id, pw).then(
            (success) => {
                if(!success) {
                    this.setState({
                        password : ''
                    });
                } else {
                    this.setState({
                        success : true
                    });
                }
            }
        );
    };

    handleRegister() {
        let id = this.state.username;
        let pw = this.state.password;
        let idcheck = this.state.idcheck;

        if(idcheck == "Y"){
            this.props.onRegister(id, pw).then(
                (result) => {
                    if(!result) {
                        this.setState({
                            userid : '',
                            username : '',
                            password : ''
                        });
                    } else {
                        this.setState({
                            success : true
                        });
                    }
                }
            );
        } else {
            alert("Please do ID duplicate check.");
        }
    }

    handleKeyPress(e){
        if(e.charCode === 13) {
            if(this.props.mode) {
                this.handleLogin();
            } else {
                this.handleRegister();
            }
        }
    }

    handleCheckId(e){
        let curClass = this.state.checkIdBtnClass;
        let id = this.state.userid;

        if(!id){
            alert("please enter ID");
            return;
        }

        if(curClass.indexOf("red") > 0)
            this.setState({
                checkIdBtnClass : "waves-effect waves-light blue accent-2 btn"
            });
        else 
            this.setState({
                checkIdBtnClass : "waves-effect waves-light red accent-2 btn"
            });
    }

    render(){
         const inputBoxes = (
            <div>
                <div className="input-field col s12 username">
                    <label>ID</label>
                    <input
                    name="userid"
                    type="text"
                    className="validate"
                    onChange={this.handleChange}
                    value={this.state.userid}
                    />
                </div>
                <div className="input-field col s12">
                    <label>Password</label>
                    <input
                    name="password"
                    type="password"
                    className="validate"
                    onChange={this.handleChange}
                    value={this.state.password}
                    onKeyPress={this.handleKeyPress}
                    />
                </div>
            </div>
        );
        
        const loginView = (
            <div>
                <div className="card-content">
                    <div className='row'>
                        {inputBoxes}
                        <a className="waves-effect waves-light btn"
                            onClick={this.handleLogin}>
                            SUBMIT
                        </a>
                    </div>
                    
                    <div className='footer'>
                        <div className='card-content'>
                            <div className='right'>
                                New Here? <Link to="/register"> Create an account</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
        const registerView = (
            <div className="card-content">
                <div className="row">
                    {inputBoxes}
                    <div className="input-field col s12">
                        <label>Name</label>
                        <input
                        name="username"
                        type="text"
                        className="validate"
                        onChange={this.handleChange}
                        value={this.state.username}
                        />
                    </div>
                    <a className={this.state.checkIdBtnClass} style={{"margin-bottom" : "10px"}}
                        onClick={this.handleCheckId}>
                        CHECK ID
                    </a>
                    <a className="waves-effect waves-light btn"
                        onClick={this.handleRegister}>
                        CREATE
                    </a>
                </div>
            </div>
        );

        return(
            <div className="container auth">
                <Link className="logo" to="/">HYCU CSH PROJECT</Link>
                <div className="card">
                    <div className="header green white-text center">
                        <div className="card-content">{this.props.mode ? "LOGIN" : "REGISTER"}</div>
                    </div>
                    { this.props.mode ? loginView : registerView }
                    { this.state.success ? <Redirect push to={this.props.mode? '/' : '/login'}/> : undefined}
                </div>
            </div>
        );
    }
}

Authentication.propTypes = propTypes;
Authentication.defaultProps = defaultProps;
Authentication.contextTypes = {
    router : PropTypes.object
}
export default Authentication;