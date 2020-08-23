//Sign-In
import React, {Component} from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    Image
} from 'react-native';

import styles from '../Static/main_style.js';
import onboardingStyles from '../Static/onboarding_style.js';

import {signUp, navBar} from './OnboardingNav';
import {OnboardingInput} from './OnboardingComponents';

export default class SignUp extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: "",
            navigation: props.navigation
        };
        this.onSignInPress = this.onSignInPress.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setPassword = this.setPassword.bind(this);
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

    setPassword(input) {
        this.setState({password: input});
    }

    onSignUpPress() {
        this.state.navigation.navigate(signUp,{
            navigation: this.state.navigation,
        });
    }

    render(){
        return(
            <SafeAreaView style={onboardingStyles.background}>
                <View style={[styles.content__container, styles.content__centering, {width: 300}]}>
                    <Text style={{fontSize: 40, paddingBottom: 30}}>Sign In</Text>
                    <OnboardingInput text={"Email or phone number"} placeholder={"Start typing..."} changeText={this.setEmail}/>
                    <OnboardingInput text={"Password"} placeholder={"Start typing..."} changeText={this.setPassword}/>
                    <TouchableOpacity style={[onboardingStyles.button, {margin: 30, width: 200}]} onPress={this.onSignInPress}>
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
