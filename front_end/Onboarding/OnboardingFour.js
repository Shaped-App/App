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
            <DoneButton active={true} onPress={this.onDonePress}/>
            // DEBUGGING THIS. when passing in a bool as props, even when updating the state here, it doesn't rerender
            // the done button with the appropriate changes. Therefore I'll leave it like this for now, but this should
            // be changed down the road if we can make it so the user can only continue after filling everything in.
        )})
    }

    onDonePress() {
        this.state.navigation.navigate(onboardingFive,{
            navigation: this.state.navigation,
        });
    }

    checkDone() {
        this.state.name !== "" && this.state.birthday !== Date() && this.state.zipCode !== "" ? this.setState({done: true}) : this.setState({done: false});
    }

    setGender(input) {
        this.setState({gender: input});
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
            <SafeAreaView style={styles.onboarding__background}>
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
