//Matching-Browse-1
import React, {Component} from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';

import styles from '../Static/main_style.js';

import {onboardingTwoA, onboardingTwoB} from './OnboardingNav';
// importing this causes a "require cycle", which creates a warning (calling OnboardingOne from OnboardingNav and vice versa)
// probably better to have a constants file instead to store these options?

export default class OnboardingOne extends Component {
    constructor(props){
        super(props);
        this.state = {
            navigation: props.navigation
        };
        this.onCameraRollPress = this.onCameraRollPress.bind(this);
        this.onTakePhotoPress = this.onTakePhotoPress.bind(this);
    }

    onCameraRollPress() {
        console.log('camera roll button pressed');
        this.state.navigation.navigate(onboardingTwoA,{
            navigation: this.state.navigation,
        });
    }

    onTakePhotoPress() {
        console.log('camera roll button pressed');
        this.state.navigation.navigate(onboardingTwoB,{
            navigation: this.state.navigation,
        });
    }

    render(){
        return(
            <SafeAreaView style={styles.onboarding__background}>
                <View style={[styles.content__container, styles.content__centering]}>
                    <TouchableOpacity style={[styles.onboarding__button, {margin: 30}]} onPress={this.onCameraRollPress}>
                        <Text style={styles.text__header}>Upload From Camera Roll</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.onboarding__button, {margin: 30}]} onPress={this.onTakePhotoPress}>
                        <Text style={styles.text__header}>Take Photo From Camera</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }
}
