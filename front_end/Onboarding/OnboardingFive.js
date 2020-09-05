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
            friendship: false,
            relationship: false,
            distance: 0,
            upperAgeBound: 0,
            lowerAgeBound: 0,
            done: false,
            navigation: props.navigation
        };
        this.onNextPress = this.onNextPress.bind(this);
        this.setFriendship = this.setFriendship.bind(this);
        this.setRelationship = this.setRelationship.bind(this);
        this.setDistance = this.setDistance.bind(this);
        this.setLowerAgeBound = this.setLowerAgeBound.bind(this);
        this.setUpperAgeBound = this.setUpperAgeBound.bind(this);
    }

    setFriendship(input) {
        this.setState({friendship: input});
    }

    setRelationship(input) {
        this.setState({relationship: input});
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
        this.state.navigation.navigate(navBar);
    }

    render(){
        return(
            <SafeAreaView style={onboardingStyles.background}>
                <View style={[styles.content__container, styles.content__centering]}>
                    <InterestPicker friendship={this.state.friendship} relationship={this.state.relationship} setFriendship={this.setFriendship} setRelationship={this.setRelationship}/>
                    <DistancePicker setDistance={this.setDistance}/>
                    <AgeBoundPicker lowerAgeArray={[18, 19, 20]} upperAgeArray={[20, 21, 22]} setLowerAgeBound={this.setLowerAgeBound} setUpperAgeBound={this.setUpperAgeBound}/>
                    <TouchableOpacity style={[onboardingStyles.button, {margin: 30, height: 80}]} onPress={this.onNextPress}>
                        <Text style={{color: 'black', fontSize: 20, fontWeight: '600'}}>Save</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }
}
