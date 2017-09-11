import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Write, MemoList } from 'components';
import { memoPostRequest, memoListRequest } from 'actions/memo';


const propTypes = {};
const defaultProps = {};

class Home extends Component {

    constructor(props){
        super(props);
        this.handlePost = this.handlePost.bind(this);
        this.loadNewMemo = this.loadNewMemo.bind(this);
        this.loadOldMemo = this.loadOldMemo.bind(this);

        this.state = {
            loadingState : false
        };
    };

    componentDidMount() {

        const loadMemoLoop = () => {
            this.loadNewMemo().then(
                () => {
                    this.memoLoaderTimeoutId = setTimeout(loadMemoLoop, 5000);
                }
            );
        };
        
        const loadUntilScrollable = () => {
            if($("body").height() < $(window).height()) {
                this.loadOldMemo().then(
                    () => {
                        if(!this.props.isLast) {
                            loadUntilScrollable();
                        }
                    }
                );
            }
        }

        this.props.memoListRequest(true).then(
            () => {
                loadUntilScrollable();
                loadMemoLoop();
            }
        );

        $(window).scroll(() => {
            if($(document).height() - $(window).height() - $(window).scrollTop() < 250){
                if(!this.state.loadingState) {
                    this.loadOldMemo();
                    this.setState({
                        loadingState : true
                    });
                }
            } else {
                if(this.state.loadingState) {
                    this.setState({
                        loadingState : false
                    });
                }
            }
        });
    }

    componentWillUnmount() {
        clearTimeout(this.memoLoaderTimeoutId);
        $(window).unbind();
    }

    handlePost(contents) {
        return this.props.memoPostRequest(contents).then(
            () => {
                if(this.props.postStatus.status === "SUCCESS") {
                    this.loadNewMemo().then(
                        () => {
                            Materialize.toast('Success!', 2000);
                        }
                    );
                } else {
                    let $toastContent;
                    switch(this.props.postStatus.error) {
                        case 1:
                            $toastContent = $('<span style="color : #FFB4BA">You are not logged in</span>');
                            Materialize.toast($toastContent, 2000);
                            setTimeout(()=>{ location.reload(false);}, 2000);
                            break;
                        case 2:
                            $toastContent = $('<span style="color : #FFB4BA">Please write someting</span>');
                            Materialize.toast($toastContent, 2000);
                            break;
                        default :
                            $toastContent = $('<span style="color : #FFB4BA">Someting Broke</span>');
                            Materialize.toast($toastContent, 2000);
                            break;
                    }
                }
            }
        );
    }

    loadNewMemo() {
        if( this.props.listStatus === 'WAITING' )
            return new Promise((resolve, reject) => {
                resolve();
            });

        if( this.props.memoData.length === 0 )
            return this.props.memoListRequest(true);

        return this.props.memoListRequest(false, 'new', this.props.memoData[0]._id);
    }

    loadOldMemo() {
        if(this.props.isLast) {
            return new Promise((resolve, reject) => {
                resolve();
            });
        }

        let lastId = this.props.memoData[this.props.memoData.length - 1]._id;
        return this.props.memoListRequest(false, 'old', lastId).then(() => {
            if(this.props.isLast) {
                Materialize.toast('You are reading the last page', 2000);
            }
        });
    }

    render(){
        const write = (<Write onPost={this.handlePost}/>);

        var mockData = [
            {
                "_id": "578b958ec1da760909c263f4",
                "writer": "velopert",
                "contents": "Testing",
                "__v": 0,
                "is_edited": false,
                "date": {
                    "edited": "2016-07-17T14:26:22.428Z",
                    "created": "2016-07-17T14:26:22.428Z"
                },
                "starred": []
            },
            {
                "_id": "578b957ec1da760909c263f3",
                "writer": "velopert",
                "contents": "Data",
                "__v": 0,
                "is_edited": false,
                "date": {
                    "edited": "2016-07-17T14:26:06.999Z",
                    "created": "2016-07-17T14:26:06.999Z"
                },
                "starred": []
            },
            {
                "_id": "578b957cc1da760909c263f2",
                "writer": "velopert",
                "contents": "Mock",
                "__v": 0,
                "is_edited": false,
                "date": {
                    "edited": "2016-07-17T14:26:04.195Z",
                    "created": "2016-07-17T14:26:04.195Z"
                },
                "starred": []
            },
            {
                "_id": "578b9579c1da760909c263f1",
                "writer": "velopert",
                "contents": "Some",
                "__v": 0,
                "is_edited": false,
                "date": {
                    "edited": "2016-07-17T14:26:01.062Z",
                    "created": "2016-07-17T14:26:01.062Z"
                },
                "starred": []
            },
            {
                "_id": "578b9576c1da760909c263f0",
                "writer": "velopert",
                "contents": "Create",
                "__v": 0,
                "is_edited": false,
                "date": {
                    "edited": "2016-07-17T14:25:58.619Z",
                    "created": "2016-07-17T14:25:58.619Z"
                },
                "starred": []
            },
            {
                "_id": "578b8c82c1da760909c263ef",
                "writer": "velopert",
                "contents": "blablablal",
                "__v": 0,
                "is_edited": false,
                "date": {
                    "edited": "2016-07-17T13:47:46.611Z",
                    "created": "2016-07-17T13:47:46.611Z"
                },
                "starred": []
            }
        ];

        return(
            <div className="wrapper">
                {this.props.isLoggedIn ? write : undefined}
                <MemoList data={this.props.memoData/*mockData*/} currentUser={this.props.currentUser} />
            </div>
        );
    }
}

Home.propTypes = propTypes;
Home.defaultProps = defaultProps;

const mapStateToProps = (state) => {
    return {
        isLoggedIn : state.authentication.status.isLoggedIn,
        postStatus : state.memo.post,
        currentUser : state.authentication.status.currentUser,
        memoData : state.memo.list.data,
        listStatus : state.memo.list.status,
        isLast : state.memo.list.isLast
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        memoPostRequest: (contents) => {
            return dispatch(memoPostRequest(contents));
        },
        memoListRequest: (isInitial, listType, id, username) => {
            return dispatch(memoListRequest(isInitial, listType, id, username))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);