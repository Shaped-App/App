//Login
import React, {Component} from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';

import styles from '../Static/main_style.js';

import {signIn, signUp} from './OnboardingNav';

export default class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            navigation: props.navigation
        };
        this.onSignUpPress = this.onSignUpPress.bind(this);
        this.onSignInPress = this.onSignInPress.bind(this);
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
            <SafeAreaView style={styles.onboarding__background}>
                <View style={[styles.content__container, styles.content__centering]}>
                    <TouchableOpacity style={[styles.onboarding__button, {margin: 30}]} onPress={this.onSignUpPress}>
                        <Text style={styles.text__header}>Sign Up</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.onboarding__button, {margin: 30}]} onPress={this.onSignInPress}>
                        <Text style={styles.text__header}>Sign In</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }
}
