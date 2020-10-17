//Sign-In
import React, {Component} from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    Image
} from 'react-native';

import auth from '@react-native-firebase/auth';

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
            done: false,
            navigation: props.navigation
        };
        this.checkDone = this.checkDone.bind(this);
        this.onSignInPress = this.onSignInPress.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setPassword = this.setPassword.bind(this);
        this.onSignUpPress = this.onSignUpPress.bind(this);
    }

    checkDone() {
        this.setState({done: this.state.email && this.state.password});
    }

    onSignInPress() {
        auth()
            .signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => {
                this.state.navigation.navigate(navBar,{
                    navigation: this.state.navigation,
                });
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                  console.log('That email address is already in use!');
                }

                if (error.code === 'auth/invalid-email') {
                  console.log('That email address is invalid!');
                }

                console.error(error);
        });
        
    }

    setEmail(input) {
        this.setState({email: input});
        this.checkDone();
    }

    setPassword(input) {
        this.setState({password: input});
        this.checkDone();
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
                    <OnboardingInput text={"Email"} placeholder={"Start typing..."} changeText={this.setEmail}/>
                    <OnboardingInput text={"Password"} placeholder={"Start typing..."} changeText={this.setPassword} secureTextEntry={true}/>
                    <TouchableOpacity style={[onboardingStyles.button, {margin: 30, width: 200}]} onPress={this.onSignInPress} disabled={!this.state.done}>
                        <Text style={[styles.text__header, this.state.done ? {color: 'black'} : {color: 'grey'}]}>Sign In</Text>
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
