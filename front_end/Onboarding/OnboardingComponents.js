import React, {Component} from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    Image,
    TouchableOpacity,
} from 'react-native';

import {Picker} from '@react-native-community/picker';

import styles from '../Static/main_style.js';
import onboardingStyles from '../Static/onboarding_style.js';

export const Logo = () => (
    <View style={{padding: 25, justifyContent: 'center', alignItems: 'center',}}>
        <Image style={{height: 125, width: 125}} source = {require('../Static/Icons/shapedLogo.png')}/>
        <Image style={{height: 75, width: 250}} source = {require('../Static/Icons/shapedText.png')}/>
    </View>
)


export const DoneButton = ({onPress, active}) => (
    <TouchableOpacity style={{padding: 15}} onPress={onPress} disabled={!active}>
        <Text style={active ? {color: 'black'} : {color: 'grey'}}>Done</Text>
    </TouchableOpacity>
)


export class GenderPicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gender: ""
        }
        this.handleFemale = this.handleFemale.bind(this);
        this.handleMale = this.handleMale.bind(this);
    }

    handleFemale = () => {
        this.setState({gender: "female"});
        this.props.setGender("female");
    }

    handleMale = () => {
        this.setState({gender: "male"});
        this.props.setGender("male");
    }

    render() {
        const gender = this.state.gender;
        return (
            <View style={onboardingStyles.container}>
                <Text style={{padding: 10}}>I identify as</Text>
                <View style={[this.props.gender ? true : true, {flexDirection:'row', justifyContent: 'space-between', paddingLeft: 30, paddingRight: 30}]}>
                    <TouchableOpacity style={[styles.button, gender === "female" ? {opacity: 1} : {opacity: .6}]}
                                      disabled={gender === "female"}
                                      onPress={this.handleFemale}>
                        <Text style={styles.text__header}>Female</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, gender === "male" ? {opacity: 1} : {opacity: .6}]}
                                      disabled={gender === "male"}
                                      onPress={this.handleMale}>
                        <Text style={styles.text__header}>Male</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

export class OnboardingInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: this.props.text,
            placeholder: this.props.placeholder,
        };
    }

    render() {
        return (
          <View style={onboardingStyles.container}>
              <Text style={{padding: 5}}>{this.state.text}</Text>
              <TextInput
                  style={[onboardingStyles.input]}
                  placeholder={this.state.placeholder}
                  onChangeText={value => this.props.changeText(value)}
                  multiline={false}
                  secureTextEntry={this.props.secureTextEntry}
              />
          </View>
        );
    };
}

export class InterestPicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <View style={[onboardingStyles.container, {margin: 10}]}>
                <Text style={{padding: 10, fontSize: 16}}>I am interested in finding a</Text>
                <View style={{flexDirection:'row', justifyContent: 'space-between', paddingLeft: 30, paddingRight: 30}}>
                    <TouchableOpacity style={[styles.button, this.props.friendship ? {opacity: 1} : {opacity: .6}]}
                                      onPress={() => this.props.setFriendship(!this.props.friendship)}>
                        <Text style={styles.text__header}>Friendship</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, this.props.relationship ? {opacity: 1} : {opacity: .6}]}
                                      onPress={() => this.props.setRelationship(!this.props.relationship)}>
                        <Text style={styles.text__header}>Relationship</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}


const distances = [
    [1, 5],
    [5, 10],
    [10, 25],
    [25, 40]
];

export class DistancePicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            distance: this.props.distance
        }
        this.setDistance = this.setDistance.bind(this);
    }

    setDistance(input) {
        this.setState({distance: input});
        this.props.setDistance(input);
    }

    render() {
        return (
            <View style={[onboardingStyles.container, {height: 150}]}>
                <Text style={{padding: 10, fontSize: 16}}>Within...</Text>
                <View style={{alignItems: 'center'}}>
                    <Picker
                        selectedValue={this.props.distance}
                        style={{width: '70%', height: 132}}
                        itemStyle={{height: 132}}
                        onValueChange={(itemValue, itemIndex) => this.setDistance(itemValue)}
                    >
                        {distances.map((range) =>
                            <Picker.Item label={range[0]+'-'+range[1]+' mi'} value={range}/>
                        )}
                    </Picker>
                </View>
            </View>
        )
    }
}

class AgePicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            age: this.props.age
        }
        this.setAge = this.setAge.bind(this);
    }

    setAge(input) {
        this.setState({age: input});
        this.props.setAgeBound(input);
    }

    render() {
        return (
            <Picker
                selectedValue={this.state.age}
                style={{width: '45%', height: 132}}
                itemStyle={{height: 132}}
                onValueChange={(itemValue, itemIndex) => this.setAge(itemValue)}
            >
                {this.props.ageArray.map((age) =>
                    <Picker.Item label={String(age)} value={age}/>
                )}
            </Picker>
        )
    }
}

export class AgeBoundPicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <View style={[onboardingStyles.container, {height: 150}]}>
                <Text style={{padding: 10, fontSize: 16}}>Age Range</Text>
                <View style={{flexDirection:'row', justifyContent: 'space-between', paddingLeft: 30, paddingRight: 30, alignItems: 'center'}}>
                    <AgePicker ageArray={this.props.lowerAgeArray} setAgeBound={this.props.setLowerAgeBound} age={this.props.lowerAge}/>
                    <Text style={{padding: 10}}>to</Text>
                    <AgePicker ageArray={this.props.upperAgeArray} setAgeBound={this.props.setUpperAgeBound} age={this.props.upperAge}/>
                </View>
            </View>
        )
    }
}
