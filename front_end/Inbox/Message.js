import React, {Component} from 'react';
import {
    Text,
    TouchableHighlight,
    View
} from 'react-native';

import Icon from '../Utility/Icon';
import styles from '../Static/style';
import inbox_style from '../Static/inbox_style';

export default class Message extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
            message: props.message,
            time: props.time,
            chatID: props.chatID
            //navigation: props.navigation for later
        };
        this.onPressMessage = this.onPressMessage.bind(this);
    }

    onPressMessage() {
        console.log("Pressed Message!");
    }

    render(){
        return(
            <TouchableHighlight
            onPress = {this.onPressMessage} underlayColor = 'lightgray'>
                <View>
                    <View style={inbox_style.align__row}>
                        <View style={{width: '10%'}}>
                            <Icon size={40} name={'profile'}/>
                        </View>
                        <View style={{marginLeft: 16, width: '85%'}}>
                            <View style={{flex: 1, flexDirection: 'row',alignItems: 'center'}}>
                                <Text style={[styles.text__header]}>{this.state.name}</Text>
                                <Text style={[styles.text, {marginLeft: 'auto'}]}>{this.state.time}</Text>
                            </View>
                            <View style={{width: '80%'}}>
                                <Text style={styles.text} numberOfLines={1}>{this.state.message}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }
}