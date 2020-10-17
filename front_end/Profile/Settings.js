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
import styles from '../Static/main_style';
import { account, preference, notification, feedback } from '../NavBar';

export default class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            navigation: props.navigation,
        };
        this.onPressLogOut = this.onPressLogOut.bind(this);
    }

    onPressLogOut(){
        console.log("Logout");
    }

    render(){
        return(
            <SafeAreaView style={styles.background}>
                <View style={{ flex: 1, padding: '5%'}}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate(account)}>
                        <Text style={pro_styles.category_header}>Edit Account Info</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate(preference)}>
                        <Text style={pro_styles.category_header}>Match Preferences</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate(notification)}>
                        <Text style={pro_styles.category_header}>Notification</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate(feedback)}>
                        <Text style={pro_styles.category_header}>Feedback</Text>{/*this is going to be a link*/}
                    </TouchableOpacity>
                    {/*<TouchableOpacity>
                        <Text style={pro_styles.category_header}>About</Text>
                    </TouchableOpacity>*/}
                    <View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center'}}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={this.onPressLogOut}
                        >
                            <Text style={styles.text__header}>Log Out</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}