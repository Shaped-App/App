import React, {Component} from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    Image,
    TouchableOpacity,
} from 'react-native';

import ScrollPicker from 'react-native-wheel-scroll-picker';

import styles from '../Static/main_style.js';

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
        }
    }

    render() {
        return (
            <View style={styles.onboarding__container}>
                <Text style={{padding: 10}}>I identify as</Text>
                <View style={{flexDirection:'row', justifyContent: 'space-between', paddingLeft: 30, paddingRight: 30}}>
                    <TouchableOpacity style={[styles.button, this.props.gender === "female" ? {opacity: 1} : {opacity: .6}]}
                                      onPress={() => this.props.setGender("female")}>
                        <Text style={styles.text__header}>Female</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, this.props.gender === "male" ? {opacity: 1} : {opacity: .6}]}
                                      onPress={() => this.props.setGender("male")}>
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
          <View style={styles.onboarding__container}>
              <Text style={{padding: 5}}>{this.state.text}</Text>
              <TextInput
                  style={[styles.onboarding__input]}
                  placeholder={this.state.placeholder}
                  onChangeText={value => this.props.changeText(value)}
                  multiline={false}
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
            <View style={[styles.onboarding__container, {margin: 10}]}>
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

export class DistancePicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <View style={[styles.onboarding__container, {height: 150}]}>
                <Text style={{padding: 10, fontSize: 16}}>Within...</Text>
                <ScrollPicker
                    dataSource={[
                         '1-5',
                         '5-10',
                         '10-25',
                    ]}
                    selectedIndex={1}
                    onValueChange={(data, selectedIndex) => {
                        this.props.setDistance(data);
                    }}
                    wrapperHeight={90}
                    wrapperWidth={150}
                    wrapperBackground={'#AAEBFF'}
                    itemHeight={30}
                    highlightColor={'#808080'}
                    highlightBorderWidth={1}
                    activeItemColor={'#222121'}
                    itemColor={'#B4B4B4'}
                />
            </View>
        )
    }
}

class AgePicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <ScrollPicker
                dataSource={this.props.ageArray}
                selectedIndex={1}
                onValueChange={(data, selectedIndex) => {
                    this.props.setAgeBound(data);
                }}
                wrapperHeight={90}
                wrapperWidth={150}
                wrapperBackground={'#AAEBFF'}
                itemHeight={30}
                highlightColor={'#808080'}
                highlightBorderWidth={1}
                activeItemColor={'#222121'}
                itemColor={'#B4B4B4'}
            />
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
            <View style={[styles.onboarding__container, {height: 150}]}>
                <Text style={{padding: 10, fontSize: 16}}>Age Range</Text>
                <View style={{flexDirection:'row', justifyContent: 'space-between', paddingLeft: 30, paddingRight: 30, alignItems: 'center'}}>
                    <AgePicker ageArray={this.props.lowerAgeArray} setAgeBound={this.props.setLowerAgeBound}/>
                    <Text style={{padding: 10}}>to</Text>
                    <AgePicker ageArray={this.props.upperAgeArray} setAgeBound={this.props.setUpperAgeBound}/>
                </View>
            </View>
        )
    }
}
