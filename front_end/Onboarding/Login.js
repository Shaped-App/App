//Login
import React, {Component} from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';

import auth from '@react-native-firebase/auth';

import styles from '../Static/main_style.js';
import onboardingStyles from '../Static/onboarding_style.js';
import LoginTest from './test.js';

import {Logo} from './OnboardingComponents';
import {signIn, signUp, navBar} from './OnboardingNav';

export default class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            navigation: props.navigation
        };
        this.onSignUpPress = this.onSignUpPress.bind(this);
        this.onSignInPress = this.onSignInPress.bind(this);
    }

    componentDidMount() {
        auth().onAuthStateChanged(user => {
            if (user) {
                //this.props.navigation.navigate(navBar);
            }
        })
    }

    onSignUpPress() {
      this.state.navigation.navigate(signUp,{
          navigation: this.state.navigation,
      });
    }

    onSignInPress() {
      this.state.navigation.navigate(signIn,{
          navigation: this.state.navigation,
      });
    }

    render(){
        return(
            <SafeAreaView style={onboardingStyles.background}>
                <View style={[styles.content__container, styles.content__centering]}>
                    <Logo/>
                    {LoginTest}
                    <TouchableOpacity style={[onboardingStyles.button, {margin: 20, height: 70}]} onPress={this.onSignUpPress}>
                        <Text style={onboardingStyles.large__button}>Sign Up</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[onboardingStyles.button, {margin: 20, height: 70}]} onPress={this.onSignInPress}>
                        <Text style={onboardingStyles.large__button}>Sign In</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }
}
