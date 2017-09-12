import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Memo } from 'components';

const propTypes = {
    data : PropTypes.array,
    currentUser : PropTypes.string,
    onEdit : PropTypes.func
};
const defaultProps = {
    data : [],
    currentUser : '',
    onEdit : (id, index, contents) => {
        console.error('edit function not defined');
    }
};

class MemoList extends Component {

    constructor(props){
        super(props);
    };

    render(){
        const mapToComponents = data => {
            return data.map((memo, i) => {
                return (
                    <Memo
                        data={memo}
                        ownership={(memo.writer === this.props.currentUser)}
                        key={memo._id}
                        index={i}
                        onEdit={this.props.onEdit}
                    />
                );
            });
        };
        return(
            <div>
                {mapToComponents(this.props.data)}
            </div>
        );
    }
}

MemoList.propTypes = propTypes;
MemoList.defaultProps = defaultProps;

export default MemoList;