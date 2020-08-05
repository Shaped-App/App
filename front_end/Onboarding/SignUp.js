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

import {onboardingOne, signIn} from './OnboardingNav';
import {Logo, OnboardingInput} from './OnboardingComponents';

export default class SignUp extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: "",
            phoneNumber: "",
            password: "",
            navigation: props.navigation
        };
        this.onSignUpPress = this.onSignUpPress.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setPhoneNumber = this.setPhoneNumber.bind(this);
        this.onSignInPress = this.onSignInPress.bind(this);
    }

    onSignUpPress() {
        this.state.navigation.navigate(onboardingOne,{
            navigation: this.state.navigation,
        });
    }

    setEmail(input) {
        this.setState({email: input});
    }

    setPhoneNumber(input) {
        this.setState({phoneNumber: input});
    }

    setPassword(input) {
        this.setState({password: input});
    }

    onSignInPress() {
        this.state.navigation.navigate(signIn,{
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
                    <OnboardingInput text={"Password"} placeholder={"Start typing..."} changeText={this.setPassword}/>
                    <OnboardingInput text={"Confirm Password"} placeholder={"Start typing..."} changeText={this.setPassword}/>
                    <TouchableOpacity style={[styles.onboarding__button, {margin: 30, width: 200}]} onPress={this.onSignUpPress}>
                        <Text style={styles.text__header}>Sign Up</Text>
                    </TouchableOpacity>
                    <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
                        <Text style={{padding: 10, fontSize: 16}}>Already have an account?</Text>
                        <TouchableOpacity onPress={this.onSignInPress}>
                            <Text style={{padding: 10, fontSize: 16, color: '#00678c'}}>Sign In</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}
