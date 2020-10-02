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
            email: props.email,
            phoneNumber: props.phoneNumber,
            gender: props.gender,
            name: props.name,
            birthday: props.birthday,
            zipCode: props.zipCode,
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
        return(
            <SafeAreaView style={onboardingStyles.background}>
                <View style={[styles.content__container, styles.content__centering]}>
                    <InterestPicker friendship={this.state.friendship} relationship={this.state.relationship} setFriendship={this.setFriendship} setRelationship={this.setRelationship}/>
                    <DistancePicker setDistance={this.setDistance}/>
                    <AgeBoundPicker lowerAgeArray={[18, 19, 20]} upperAgeArray={[20, 21, 22]} setLowerAgeBound={this.setLowerAgeBound} setUpperAgeBound={this.setUpperAgeBound}/>
                    <TouchableOpacity style={[onboardingStyles.button, {margin: 30, height: 80}]} onPress={this.onNextPress} disabled={!this.state.done}>
                        <Text style={[this.state.done ? {color: 'black'} : {color: 'grey'}, {fontSize: 20, fontWeight: '600'}]}>Save</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }
}
