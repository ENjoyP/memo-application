import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';

const propTypes = {
    totalCount : PropTypes.number.isRequired,
    pageSize : PropTypes.number.isRequired,
    perPage : PropTypes.number.isRequired
};

const defaultProps = {
    totalCount : 0,
    pageSize : 10,
    perPage : 10
};

class Pagination extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            data : [],
            offset : 0
        };

        this.handlePageClick = this.handlePageClick.bind(this);
    }

    handlePageClick(data) {
        let selected = data.selected;
        let offset = Math.ceil(selected * this.props.perPage);

        this.setState({ offset: offset }, () => {
            //this.loadCommentsFromServer();
        });
    };
    
    render() {
        return (
            <div className="container">
                <div className="pagingBox card" style={{"textAlign" : "center"}}>
                    <ReactPaginate
                        previousLabel={'<'}
                        nextLabel={'>'}
                        breakLabel={'...'}
                        breakClassName={'break-me'}
                        pageCount={1}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={10}
                        onPageChange={this.handlePageClick}
                        containerClassName={'pagination'}
                        subContainerClassName={'pages pagination'}
                        activeClassName={'active'}
                    />
                </div>
            </div>
        );
    }
}

Pagination.propTypes = propTypes;
Pagination.defaultProps = defaultProps;

export default Pagination;