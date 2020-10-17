//Onboarding-3
import React, {Component} from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';

import styles from '../Static/main_style.js';
import onboardingStyles from '../Static/onboarding_style.js';

import {onboardingFour} from './OnboardingNav';

export default class OnboardingThree extends Component {
    constructor(props){
        super(props);
        this.state = {
            navigation: props.navigation
        };
        this.onNextPress = this.onNextPress.bind(this);
    }

    onNextPress() {
        this.state.navigation.navigate(onboardingFour,{
            navigation: this.state.navigation,
        });
    }

    render(){
        return(
            <SafeAreaView style={onboardingStyles.background}>
                <View style={[styles.content__container, styles.content__centering]}>
                    <Text>temp placement for photo display</Text>
                    <TouchableOpacity style={[onboardingStyles.button, {margin: 30}]} onPress={this.onNextPress}>
                        <Text style={styles.text__header}>Next</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }
}
