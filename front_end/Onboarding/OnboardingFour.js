//Onboarding-4
import React, {Component} from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
} from 'react-native';

import styles from '../Static/main_style.js';
import onboardingStyles from '../Static/onboarding_style.js';

import {onboardingFive} from './OnboardingNav';
import {DoneButton, GenderPicker, OnboardingInput} from './OnboardingComponents';

export default class OnboardingFour extends Component {
    constructor(props){
        super(props);
        this.state = {
            gender: "",
            name: "",
            birthday: Date(),
            zipCode: "",
            done: false,
            navigation: props.navigation
        };

        this.onDonePress = this.onDonePress.bind(this);
        this.checkDone = this.checkDone.bind(this);

        this.setGender = this.setGender.bind(this);
        this.setName = this.setName.bind(this);
        this.setBirthday = this.setBirthday.bind(this);
        this.setZipCode = this.setZipCode.bind(this);

        this.state.navigation.setOptions({headerRight: () => (
            <DoneButton active={this.state.done} onPress={this.onDonePress}/>
        )})
    }

    onDonePress() {
        this.state.navigation.navigate(onboardingFive,{
            navigation: this.state.navigation,
        });
    }

    checkDone() {
        this.setState({done: this.state.name !== "" && this.state.birthday !== Date() && this.state.zipCode !== ""})
        this.state.navigation.setOptions({headerRight: () => (
            <DoneButton active={this.state.done} onPress={this.onDonePress}/>
        )})
    }

    setGender(input) {
        setTimeout(() => {
            this.setState({gender: input});
            this.checkDone();
        }, 0);
    }

    setName(value) {
        this.setState({name: value})
        this.checkDone();
    }

    setBirthday(value) {
        this.setState({birthday: value})
        this.checkDone();
    }

    setZipCode(value) {
        this.setState({zipCode: value})
        this.checkDone();
    }

    render(){
        return(
            <SafeAreaView style={onboardingStyles.background}>
                <View style={[styles.content__container, styles.content__centering]}>
                    <GenderPicker gender={this.state.gender} setGender={this.setGender}/>
                    <OnboardingInput text={"Name"} placeholder={"Start typing..."} changeText={this.setName}/>
                    <OnboardingInput text={"Birthday"} placeholder={"MM/DD/YYYY"} changeText={this.setBirthday}/>
                    <OnboardingInput text={"Zip Code"} placeholder={"00000"} changeText={this.setZipCode}/>
                </View>
            </SafeAreaView>
        );
    }
}
