import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Memo, Pagination } from 'components';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const propTypes = {
    data : PropTypes.array,
    currentUser : PropTypes.string,
    onEdit : PropTypes.func,
    onRemove : PropTypes.func,
    onStar : PropTypes.func
};
const defaultProps = {
    data : [],
    currentUser : '',
    onEdit : (id, index, contents) => {
        console.error('edit function not defined');
    },
    onRemove : (id, index) => {
        console.error('remove function not defined');
    },
    onStar : (id, index) => {
        console.error('star function not defined');
    }
};

class MemoList extends Component {

    constructor(props){
        super(props);
    };

    shouldComponentUpdate(nextProps, nextState) {
        let update = JSON.stringify(this.props) !== JSON.stringify(nextProps);
        return update;
    }

    render(){
        const mapToComponents = data => {
            if(data.length > 0)
                return data.map((memo, i) => {
                    return (
                        <Memo
                            data={memo}
                            ownership={(memo.writer === this.props.currentUser)}
                            key={memo._id}
                            index={i}
                            onEdit={this.props.onEdit}
                            onRemove={this.props.onRemove}
                            onStar={this.props.onStar}
                            currentUser={this.props.currentUser}
                            totalCount={data.length}
                        />
                    );
                });
            else
                return (
                    <Memo/>
                );
        };
        return(
            <div>
                <div className="container">
                    <div className="col z-depth-1" style={{"backgroundColor" : "#fff", "paddingTop" : "5px", "paddingBottom" : "5px", "paddingLeft": "20px"}}><strong>총 0건의 게시글</strong></div>
                </div>
                <ReactCSSTransitionGroup transitionName="memo" 
                    transitionEnterTimeout={2000}
                    transitionLeaveTimeout={1000}>
                    {mapToComponents(this.props.data)}
                </ReactCSSTransitionGroup>
                <Pagination/>
            </div>
        );
    }
}

MemoList.propTypes = propTypes;
MemoList.defaultProps = defaultProps;

export default MemoList;