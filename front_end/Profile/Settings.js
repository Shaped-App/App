import React, {Component} from 'react';
import {
  SafeAreaView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

import pro_styles from '../Static/profile_style';

export default class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            navigation: props.navigation,
        };
    }

    render(){
        return(
            <SafeAreaView style={pro_styles.background}>
                <View>
                    <Text>Edit Account Info</Text>
                    <Text>Match Preferences</Text>
                    <Text>Edit</Text>
                    <Text>Feedback</Text>
                    <Text>About</Text>
                    <Text>Log out</Text>
                </View>
            </SafeAreaView>
        );
    }
}