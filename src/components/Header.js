import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Search } from 'components';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const propTypes = {
    isLoggedIn : PropTypes.bool,
    onLogout : PropTypes.func,
    usernames : PropTypes.array,
    onSearch : PropTypes.func
};
const defaultProps = {
    isLoggedIn : false,
    onLogout : () => { console.error("logout function not defined"); },
    usernames : [],
    onSearch : () => { console.error("search function not defined"); }
};

class Header extends Component {

    constructor(props){
        super(props);

        this.toggleSearch = this.toggleSearch.bind(this);
        this.handleSearch = this.handleSearch.bind(this);

        this.state = {
            search : false
        }
    };

    toggleSearch() {
        this.setState({
            search : !this.state.search
        });
    }

    handleSearch(keyword) {
        this.props.onSearch(keyword);
    }

    render(){
        const loginBtn = (
            <li>
                <Link to="/login">
                    <i className="material-icons">vpn_key</i>
                </Link>
            </li>
        );

        const logoutBtn = (
            <li>
                <a href="javascript:;" onClick={this.props.onLogout}>
                    <i className="material-icons">lock_open</i>
                </a>
            </li>
        );
        return(
            <div>
                <nav>
                    <div className="nav-wrapper green darken-1">
                        <Link to="/" className="brand-logo center">HYCU CSH PROJECT</Link>

                        <ul>
                            <li><a onClick={this.toggleSearch}><i className="material-icons">search</i></a></li>
                        </ul>

                        <div className="right">
                            <ul>
                                { this.props.isLoggedIn ? logoutBtn : loginBtn }
                            </ul>
                        </div>
                    </div>
                </nav>
                <ReactCSSTransitionGroup transitionName="search" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
                    { this.state.search ? <Search onClose={this.toggleSearch} onSearch={this.handleSearch} usernames={this.props.usernames}/> : undefined }
                </ReactCSSTransitionGroup>
            </div>
        );
    }
}

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default Header;