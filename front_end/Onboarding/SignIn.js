//Matching-Browse-1
import React, {Component} from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    Image
} from 'react-native';

import styles from '../Static/main_style.js';

import {signUp, navBar} from './OnboardingNav';
import {Logo, OnboardingInput} from './OnboardingComponents';

export default class SignUp extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: "",
            phoneNumber: "",
            navigation: props.navigation
        };
        this.onSignInPress = this.onSignInPress.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setPhoneNumber = this.setPhoneNumber.bind(this);
        this.onSignUpPress = this.onSignUpPress.bind(this);
    }

    onSignInPress() {
        this.state.navigation.navigate(navBar,{
            navigation: this.state.navigation,
        });
    }

    setEmail(input) {
        this.setState({email: input});
    }

    setPhoneNumber(input) {
        this.setState({phoneNumber: input});
    }

    onSignUpPress() {
        this.state.navigation.navigate(signUp,{
            navigation: this.state.navigation,
        });
    }

    render(){
        return(
            <SafeAreaView style={styles.onboarding__background}>
                <View style={[styles.content__container, styles.content__centering, {width: 300}]}>
                    <Logo/>
                    <OnboardingInput text={"Email"} placeholder={"example@email.com"} changeText={this.setEmail}/>
                    <OnboardingInput text={"Phone Number"} placeholder={"1234567890"} changeText={this.setPhoneNumber}/>
                    <TouchableOpacity style={[styles.onboarding__button, {margin: 30, width: 200}]} onPress={this.onSignInPress}>
                        <Text style={styles.text__header}>Sign In</Text>
                    </TouchableOpacity>
                    <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
                        <Text style={{padding: 10, fontSize: 16}}>Don't have an account?</Text>
                        <TouchableOpacity onPress={this.onSignUpPress}>
                            <Text style={{padding: 10, fontSize: 16, color: '#00678c'}}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}
