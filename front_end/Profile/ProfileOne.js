import React, {Component} from 'react';

import UserProfile from './UserProfile';

export default class ProfileOneScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            navigation: props.navigation
        };
    }
    render(){
        return (
            <UserProfile userID={1234} isOwner={true} navigation={this.state.navigation}/>
        );
    }
}