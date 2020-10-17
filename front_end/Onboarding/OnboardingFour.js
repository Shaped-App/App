//Onboarding-4
import React, {Component} from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
} from 'react-native';

import moment from "moment";

import styles from '../Static/main_style.js';
import onboardingStyles from '../Static/onboarding_style.js';

import {onboardingFive} from './OnboardingNav';
import {DoneButton, GenderPicker, OnboardingInput} from './OnboardingComponents';

const badDateAlert = () =>
    Alert.alert(
      "Invalid birthday",
      "Please enter a valid birthday.",
      [{ text: "OK" }],
      { cancelable: false }
    );

const badZipCodeAlert = () =>
    Alert.alert(
      "Invalid ZIP Code",
      "Please enter a valid ZIP Code.",
      [{ text: "OK" }],
      { cancelable: false }
    );

export default class OnboardingFour extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: props.route.params.email,
            phoneNumber: props.route.params.phoneNumber,
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
        var date = moment(this.state.birthday);
        if (!date.isValid()) {
            badDateAlert();
        } else if (isNaN(this.state.zipCode)) {
            badZipCodeAlert();
        } else {
            this.state.navigation.navigate(onboardingFive,{
                navigation: this.state.navigation,
                email: this.state.email,
                phoneNumber: this.state.phoneNumber,
                gender: this.state.gender,
                name: this.state.name,
                birthday: this.state.birthday,
                zipCode: this.state.zipCode,
            });
        }
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
        this.setState({birthday: new Date(value)})
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
                    <OnboardingInput text={"ZIP Code"} placeholder={"00000"} changeText={this.setZipCode}/>
                </View>
            </SafeAreaView>
        );
    }
}
