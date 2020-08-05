//Matching-Browse-1
import React, {Component} from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';

import styles from '../Static/main_style.js';

import {onboardingThree} from './OnboardingNav';
import {DoneButton} from './OnboardingComponents';

export default class OnboardingTwoA extends Component {
    constructor(props){
        super(props);
        this.state = {
            navigation: props.navigation
        };
        this.onDonePress = this.onDonePress.bind(this);
        this.state.navigation.setOptions({headerRight: () => (
            <DoneButton active={true} onPress={this.onDonePress}/>
        )})
    }

    onDonePress() {
        this.state.navigation.navigate(onboardingThree,{
            navigation: this.state.navigation,
        });
    }

    render(){
        return(
            <SafeAreaView style={styles.onboarding__background}>
                <View style={[styles.content__container, styles.content__centering]}>
                    <Text>temp placement for photo upload</Text>
                </View>
            </SafeAreaView>
        );
    }
}
