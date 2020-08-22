//Setting-Perference Helper
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import {Picker} from '@react-native-community/picker';
import styles from '../Static/main_style';

class GenderButton extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <View>
                <TouchableOpacity
                    style={this.props.select ? pref_style.select__button : pref_style.unselect__button}
                    onPress={()=> this.props.onSelectGender(this.props.gender)}
                >
                    <Text style={[styles.text__header, {color: this.props.select ? '#ffffff' : '#16B7EA'}]}>
                        {this.props.gender ? "Female" : "Male"}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

var ageRange = Array.from(Array(45), (_, i) => i + 18);

class AgePicker extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <Picker
                selectedValue={this.props.value}
                style={{width: '45%', height: 132}}
                itemStyle={{height: 132}}
                onValueChange={(itemValue, itemIndex) => this.props.onChangeAge(itemValue, this.props.bound)}
            >
                {ageRange.map((age) =>
                    <Picker.Item label={String(age)} value={age}/>
                )}
            </Picker>
        );
    }
}

export {GenderButton, AgePicker};
const pref_style = StyleSheet.create({
    select__button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#16B7EA',
        borderRadius: 37,
        height: 52
    },
    unselect__button: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 37,
        borderWidth: 2,
        borderColor: '#16B7EA',
        height: 52
    },
});