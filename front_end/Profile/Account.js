//Setting-Account
import React, {Component} from 'react';
import {
    SafeAreaView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import styles from '../Static/main_style';

export default class AccountScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: "",
            email: "",
            phonenumber: "",
            password: "",
            navigation: props.navigation
        };
        this.handleChange = this.handleChange.bind(this);
        this.onPressSave = this.onPressSave.bind(this);
    }

    handleChange(key, value){
        let state = this.state;
        state[key] = value.replace(/\s/g, '');
        this.setState(state);
    }

    onPressSave(){
        console.log("Pressed save");
        //add error checking
    }

    render(){
        return(
            <SafeAreaView style={styles.background}>
                <View style={[styles.content__container, { padding: '5%',flex: 1, flexDirection: 'column', justifyContent: 'space-between'}]}>
                    <View>
                        <Text style={[styles.text__header, {marginBottom: 16}]}>Profile Information</Text>
                        <Text style={styles.text}>Username</Text>
                        <TextInput
                            style={styles.single__input}
                            value={this.state.username}
                            onChangeText={value => this.handleChange("username", value)}
                        />
                        <Text style={styles.text}>Email Address</Text>
                        <TextInput
                            style={styles.single__input}
                            value={this.state.email}
                            onChangeText={value => this.handleChange("email", value)}
                        />
                        <Text style={styles.text}>Phone Number</Text>
                        <TextInput
                            style={styles.single__input}
                            value={this.state.phonenumber}
                            onChangeText={value => this.handleChange("phonenumber", value)}
                        />
                        <Text style={styles.text}>Change Password</Text>
                        <TextInput
                            style={styles.single__input}
                            value={this.state.password}
                            onChangeText={value => this.handleChange("password", value)}
                            secureTextEntry={true}
                        />
                    </View>
                    <View>
                        <TouchableOpacity
                            style={styles.big__button}
                            onPress={this.onPressSave}
                        >
                            <Text style={styles.text__header}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}