//Setting-Perference
import React, {Component} from 'react';
import {
    SafeAreaView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import {Picker} from '@react-native-community/picker';
import {GenderButton, AgePicker} from './PreferenceHelper';
import styles from '../Static/main_style';

const distances = [
    [1, 5],
    [5,10],
    [10,25],
    [25, 40]
];

export default class PreferenceScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            male: true,
            female: true,
            distance: [1, 5],
            upperBound: 45,
            lowerBound: 18,
            navigation: props.navigation    //not sure if I need this
        };
        this.onSelectGender = this.onSelectGender.bind(this);
        this.onChangeDistance = this.onChangeDistance.bind(this);
        this.onChangeAge = this.onChangeAge.bind(this);
        this.onPressSave = this.onPressSave.bind(this);
    }

    onSelectGender(gender){
        console.log("Selected Gender");
        //0 == male, 1 == female
        if(gender){ this.setState({ female: !this.state.female }); }
        else{ this.setState({ male: !this.state.male }); }
    }

    onChangeDistance(index){
        console.log("Distance changed");
        this.setState({distance: distances[index]});
    }

    onChangeAge(val, bound){
        console.log("Age changed");
        if(bound === 'lower'){
            this.setState({lowerBound: Math.min(val, this.state.upperBound)});
        }
        else{
            this.setState({upperBound: Math.max(val, this.state.lowerBound)});
        }
    }

    onPressSave(){
        console.log("Pressed save");
        //TODO
    }

    render(){
        return(
            <SafeAreaView style={styles.background}>
                <View style={[styles.content__container, { padding: '5%',flex: 1, flexDirection: 'column', justifyContent: 'space-between'}]}>
                    <View>
                        <Text style={[styles.text__header, {marginBottom: '7.5%', marginTop: '7.5%'}]}>Select Gender</Text>
                        <View style={styles.row__alignment}>
                            <View style={{width: '47.5%'}}>
                                <GenderButton
                                    select={this.state.male}
                                    gender={0}
                                    onSelectGender={this.onSelectGender}
                                />
                            </View>
                            <View style={{width: '47.5%'}}>
                                <GenderButton
                                    select={this.state.female}
                                    gender={1}
                                    onSelectGender={this.onSelectGender}
                                />
                            </View>
                        </View>
                        <Text style={[styles.text__header, { marginTop: '7.5%'}]}>Within</Text>
                        <View style={{alignItems: 'center'}}>
                            <Picker
                                selectedValue={this.state.distance}
                                style={{width: '70%', height: 132}}
                                itemStyle={{height: 132}}
                                onValueChange={(itemValue, itemIndex) => this.onChangeDistance(itemIndex)}
                            >
                                {distances.map((range) =>
                                    <Picker.Item label={range[0]+'-'+range[1]+' mi'} value={range}/>
                                )}
                            </Picker>
                        </View>
                        <Text style={styles.text__header}>Age Range</Text>
                        <View style={styles.row__alignment}>
                            <AgePicker
                                value={this.state.lowerBound}
                                bound='lower'
                                onChangeAge={this.onChangeAge}
                            />
                            <Text style={styles.text__header}>to</Text>
                            <AgePicker
                                value={this.state.upperBound}
                                bound='upper'
                                onChangeAge={this.onChangeAge}
                            />
                        </View>
                    </View>
                    <View>
                        <TouchableOpacity
                            style={styles.big__button}
                            onPress={this.onPressSave}
                        >
                            <Text style={styles.text__header}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}