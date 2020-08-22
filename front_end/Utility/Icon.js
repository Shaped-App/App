import React, {Component} from 'react';
import {
    View,
    Image
} from 'react-native';

const iconURL = {
    'send': require('../Static/Icons/send.png'),
    'profile': require('../Static/Icons/profile.png'),
    'arrow': require('../Static/Icons/arrow.png'),
    'back': require('../Static/Icons/back.png'),
    'setting': require('../Static/Icons/setting.png'),
};

export default class Icon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            size: props.size,
            url: iconURL[props.name]
        };
    }

    render(){
        return(
            <View>
                <Image source={this.state.url}
                style={{height: this.state.size, width: this.state.size}}/>
            </View>
        );
    }
}