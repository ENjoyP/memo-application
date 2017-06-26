import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    data : PropTypes.object,
    ownership : PropTypes.bool
};
const defaultProps = {
    data : {
        _id : 'id1234567890',
        writer : 'Writer',
        contents : 'Contents',
        is_edited : false,
        date : {
            edited : new Date(),
            created : new Date()
        },
        starred : []
    },
    ownership : true
};

class Memo extends Component {

    constructor(props){
        super(props);
    };

    componentDidUpdate() {
            $('#dropdown-button-' + this.props.data._id).dropdown({
                belowOrigin : true
            });
    }

    componentDidMount() {
        $('#dropdown-button-' + this.props.data._id).dropdown({
            belowOrigin : true
        });
    }

    render(){
        const { data, ownership } = this.props;

        const dropDownMenu = (
            <div className="option-button">
                <a href="javascript:;" 
                    className="dropdown-button" 
                    id={`dropdown-button-${data._id}`} 
                    data-activates={`dropdown-${data._id}`}>
                    <i className="material-icons icon-button">more_vert</i>
                </a>
                <ul id={`dropdown-${data._id}`} className="dropdown-content">
                    <li><a href="javascript:;">Edit</a></li>
                    <li><a href="javascript:;">Remove</a></li>
                </ul>
            </div>
        );

        const memoView = (
            <div className="card">
                <div className="info">
                    <a href="javascript:;" className="username">{data.writer}</a> wrote a log · {/*<TimeAgo date={data.date.created} />*/}
                    { ownership ? dropDownMenu : undefined }
                </div>
                <div className="card-content">
                    {data.contents}
                </div>
                <div className="footer">
                    <i className="material-icons log-footer-icon star icon-button">star</i>
                    <span className="star-count">{data.starred.length}</span>
                </div>
            </div>
        );

        return(
            <div className="container memo">
                {memoView}
            </div>
        );
    }
}

Memo.propTypes = propTypes;
Memo.defaultProps = defaultProps;

export default Memo;