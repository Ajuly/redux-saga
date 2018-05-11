import React,{Component} from 'react';
import {connect} from 'react-redux';
import actions from '../store/actions';

class Logout extends Component{
   
    render(){
        return (
            <div>
                token:{this.props.token}{this.props.error}
                <button onClick={this.props.logout}>退出</button>
            </div>
        )
    }
}
export default connect(
    state=>state.user,
    actions
)(Logout);