//Sign-Up
import React, {Component} from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    Image,
    Alert
} from 'react-native';

import auth from '@react-native-firebase/auth';

import styles from '../Static/main_style.js';
import onboardingStyles from '../Static/onboarding_style.js';

import {onboardingFour, signIn} from './OnboardingNav';
import {OnboardingInput} from './OnboardingComponents';

const emailInUseAlert = () =>
    Alert.alert(
        "Invalid email",
        "That email is already taken. Please enter a valid email.",
        [{ text: "OK" }],
        { cancelable: false }
    );

const emailInvalidAlert = () =>
    Alert.alert(
        "Invalid email",
        "That email is invalid. Please enter a valid email.",
        [{ text: "OK" }],
        { cancelable: false }
    );

const passwordMatchAlert = () =>
    Alert.alert(
        "Passwords don't match",
        "The entered passwords don't match.",
        [{ text: "OK" }],
        { cancelable: false }
    );

const passwordWeakAlert = () =>
    Alert.alert(
        "Password is too weak",
        "Please enter a password with at least 6 characters.",
        [{ text: "OK" }],
        { cancelable: false }
    );

export default class SignUp extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: "",
            phoneNumber: "",
            password: "",
            checkPassword: "",
            done: false,
            navigation: props.navigation
        };
        this.checkDone = this.checkDone.bind(this);
        this.onSignUpPress = this.onSignUpPress.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setPassword = this.setPassword.bind(this);
        this.setCheckPassword = this.setCheckPassword.bind(this);
        this.setPhoneNumber = this.setPhoneNumber.bind(this);
        this.onSignInPress = this.onSignInPress.bind(this);
    }

    checkDone() {
        this.setState({done: this.state.email && this.state.phoneNumber && this.state.password && this.state.checkPassword});
    }

    onSignUpPress() {
        if (this.state.password !== this.state.checkPassword) {
            passwordMatchAlert();
        } else {
            auth()
                .createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then(() => {
                    this.state.navigation.navigate(onboardingFour,{
                        navigation: this.state.navigation,
                        email: this.state.email,
                        phoneNumber: this.state.phoneNumber,
                    });
                })
                .catch(error => {
                    if (error.code === 'auth/email-already-in-use') {
                        emailInUseAlert();
                    }

                    if (error.code === 'auth/invalid-email') {
                        emailInvalidAlert();
                    }

                    if (error.code === 'auth/weak-password') {
                        passwordWeakAlert();
                    }

                    console.error(error);
            });
        }
    }

    setEmail(input) {
        this.setState({email: input});
        this.checkDone();
    }

    setPhoneNumber(input) {
        this.setState({phoneNumber: input});
        this.checkDone();
    }

    setPassword(input) {
        this.setState({password: input});
        this.checkDone();
    }

    setCheckPassword(input) {
        this.setState({checkPassword: input});
        this.checkDone();
    }

    onSignInPress() {
        this.state.navigation.navigate(signIn,{
            navigation: this.state.navigation,
        });
    }

    render(){
        return(
            <SafeAreaView style={onboardingStyles.background}>
                <View style={[styles.content__container, styles.content__centering, {width: 300}]}>
                    <Text style={{fontSize: 40, paddingBottom: 30}}>Sign Up</Text>
                    <OnboardingInput text={"Email"} placeholder={"example@email.com"} changeText={this.setEmail}/>
                    <OnboardingInput text={"Phone Number"} placeholder={"1234567890"} changeText={this.setPhoneNumber}/>
                    <OnboardingInput text={"Password"} placeholder={"Start typing..."} changeText={this.setPassword} secureTextEntry={true}/>
                    <OnboardingInput text={"Confirm Password"} placeholder={"Start typing..."} changeText={this.setCheckPassword} secureTextEntry={true}/>
                    <TouchableOpacity style={[onboardingStyles.button, {margin: 30, width: 200}]} onPress={this.onSignUpPress} disabled={!this.state.done}>
                        <Text style={[styles.text__header, this.state.done ? {color: 'black'} : {color: 'grey'}]}>Sign Up</Text>
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
