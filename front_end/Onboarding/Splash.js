//Splash-screen
import React, {Component} from 'react';
import {
    SafeAreaView,
    View
} from 'react-native';

import styles from '../Static/main_style.js';
import onboardingStyles from '../Static/onboarding_style.js';

import {login} from './OnboardingNav';
import {Logo} from './OnboardingComponents';

export default class SignUp extends Component {
    constructor(props){
        super(props);
        this.state = {
            navigation: props.navigation
        };
    }

    render() {
        return (
            <SafeAreaView style={onboardingStyles.background}>
                <View style={[styles.content__container, styles.content__centering, {width: 300}]}>
                    <Logo/>
                </View>
            </SafeAreaView>
        )
    }

}
