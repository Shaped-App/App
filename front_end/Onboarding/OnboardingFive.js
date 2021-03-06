//Onboarding-5
import React, {Component} from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';

import styles from '../Static/main_style.js';
import onboardingStyles from '../Static/onboarding_style.js';

import {navBar} from './OnboardingNav';
import {InterestPicker, DistancePicker, AgeBoundPicker} from './OnboardingComponents';

export default class OnboardingFive extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: props.route.params.email,
            phoneNumber: props.route.params.phoneNumber,
            gender: props.route.params.gender,
            name: props.route.params.name,
            birthday: props.route.params.birthday,
            zipCode: props.route.params.zipCode,
            friendship: false,
            relationship: false,
            distance: 0,
            upperAgeBound: 0,
            lowerAgeBound: 0,
            done: false,
            navigation: props.navigation
        };
        this.checkDone = this.checkDone.bind(this);
        this.onNextPress = this.onNextPress.bind(this);
        this.setFriendship = this.setFriendship.bind(this);
        this.setRelationship = this.setRelationship.bind(this);
        this.setDistance = this.setDistance.bind(this);
        this.setLowerAgeBound = this.setLowerAgeBound.bind(this);
        this.setUpperAgeBound = this.setUpperAgeBound.bind(this);
    }

    checkDone() {
        setTimeout(() => {
            this.setState({done: this.state.friendship || this.state.relationship});
        }, 0);
    }

    setFriendship(input) {
        this.setState({friendship: input});
        this.checkDone();
    }

    setRelationship(input) {
        this.setState({relationship: input});
        this.checkDone();
    }

    setDistance(input) {
        this.setState({distance: input});
    }

    setLowerAgeBound(input) {
        this.setState({lowerAgeBound: input});
    }

    setUpperAgeBound(input) {
        this.setState({upperAgeBound: input});
    }

    onNextPress() {
        // TODO: send all info to the backend
        this.state.navigation.navigate(navBar);
    }

    render(){
        console.log(this.state.birthday);
        var ageDifMs = Date.now() - this.state.birthday;
        var ageDate = new Date(ageDifMs); // miliseconds from epoch
        const age = Math.abs(ageDate.getUTCFullYear() - 1970);
        console.log(age);

        let lowerAgeArray = [];
        let upperAgeArray = [];

        for (let i = 0; i < 5; ++i) {
            if (age - i >= 18) {
                lowerAgeArray.push(age - i);
            }
            upperAgeArray.push(age + i);
        }
        console.log(lowerAgeArray);
        console.log(upperAgeArray);

        return(
            <SafeAreaView style={onboardingStyles.background}>
                <View style={[styles.content__container, styles.content__centering]}>
                    <InterestPicker friendship={this.state.friendship} relationship={this.state.relationship} setFriendship={this.setFriendship} setRelationship={this.setRelationship}/>
                    <DistancePicker setDistance={this.setDistance} distance={this.state.distance}/>
                    <AgeBoundPicker lowerAgeArray={lowerAgeArray} upperAgeArray={upperAgeArray} setLowerAgeBound={this.setLowerAgeBound} setUpperAgeBound={this.setUpperAgeBound} lowerAge={this.state.lowerAgeBound} upperAge={this.state.upperAgeBound}/>
                    <TouchableOpacity style={[onboardingStyles.button, {margin: 30, height: 80}]} onPress={this.onNextPress} disabled={!this.state.done}>
                        <Text style={[this.state.done ? {color: 'black'} : {color: 'grey'}, {fontSize: 20, fontWeight: '600'}]}>Save</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }
}
