//Setting-Nofication
import React, {Component} from 'react';
import {
    SafeAreaView,
    Switch,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import styles from '../Static/main_style';
import pro_styles from '../Static/profile_style';

export default class Notification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            navigation: props.navigation,
            allow: true,
            request: true,
            dm: true,
        };
    }

    render(){
        return(
            <SafeAreaView style={[styles.background, {alignItems: 'center', flex: 1, flexDirection: 'column',}]}>
                <View style={styles.content__container}>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={pro_styles.category_header}>Allow notifications</Text>
                        <Switch
                            trackColor={{ false: "#CBCBCB", true: "#16B7EA" }}
                            onValueChange={() => this.setState({allow: !this.state.allow})}
                            value={this.state.allow}
                            style={{ alignSelf: 'center', marginLeft: 'auto' }}
                        />
                    </View>
                    <View style={{flexDirection: 'row' }}>
                        <Text style={pro_styles.category_header}>Direct Messages requests</Text>
                        <Switch
                            trackColor={{ false: "#CBCBCB", true: "#16B7EA" }}
                            onValueChange={() => this.setState({request: !this.state.request})}
                            value={this.state.request}
                            style={{ alignSelf: 'center', marginLeft: 'auto' }}
                        />
                    </View>
                    <View style={{flexDirection: 'row' }}>
                        <Text style={pro_styles.category_header}>Direct Messages</Text>
                        <Switch
                            trackColor={{ false: "#CBCBCB", true: "#16B7EA" }}
                            onValueChange={() => this.setState({dm: !this.state.dm})}
                            value={this.state.dm}
                            style={{ alignSelf: 'center', marginLeft: 'auto' }}
                        />
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}