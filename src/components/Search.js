import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { createHashHistory } from 'history';

const propTypes = {
    onClose : PropTypes.func,
    onSearch : PropTypes.func,
    usernames : PropTypes.array
};
const defaultProps = {
    onClose : () => {
        console.error('onClose not defined');
    },
    onSearch : (keyword) => {
        console.error('onSearch not defined');
    },
    usernames : []
};
const history = createHashHistory();

class Search extends Component {

    constructor(props){
        super(props);

        this.state = {
            keyword : ''
        };

        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);

        const listenEscKey = (evt) => {
            evt = evt || window.event;
            if (evt.keyCode == 27) {
                this.handleClose();
            }
        };

        document.onkeydown = listenEscKey;
    };

    handleClose() {
        this.handleSearch('');
        document.onkeydown = null;
        this.props.onClose();
    }

    handleChange(e) {
        this.setState({
            keyword : e.target.value
        });
        this.handleSearch(e.target.value);
    }

    handleSearch(keyword) {
        this.props.onSearch(keyword);
    }

    handleKeyDown(e) {
        if(e.keyCode === 13) {
            if(this.props.usernames.length > 0) {
                history.push('/wall/'+ this.props.usernames[0].username);
                this.handleClose();
            }
        }
    }

    render(){

        const mapDataToLinks = (data) => {
            return data.map((user, i) => {
                return (
                    <li key={i}><Link to={`/wall/${user.username}`}>{user.username}</Link></li>
                );
            });
        };

        return(
            <div className="search-screen white-text">
                <div className='right'>
                    <a className="waves-effect waves-light btn red lighten-1"
                        onClick={this.handleClose}>CLOSE</a>
                </div>
                <div className='container'>
                    <input
                        placeholder="Search a user"
                        value={this.state.keyword}
                        onChange={this.handleChange}
                        onKeyDown={this.handleKeyDown}/>
                    <ul className="search-results">
                        { mapDataToLinks(this.props.usernames) }
                    </ul>
                </div>
            </div>
        );
    }
}

Search.propTypes = propTypes;
Search.defaultProps = defaultProps;

export default Search;