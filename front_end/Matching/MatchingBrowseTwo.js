//Matching-Browse-2
import React, {Component} from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
} from 'react-native';

import styles from '../Static/style.js';

export default class BrowseTwoScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
          question: props.question,
          answer: "",
          disabled: true
        };
        this.handleChange = this.handleChange.bind(this);
        this.handlePress = this.handlePress.bind(this);
    }

    handleChange(value){
        this.setState({answer: value, disabled: value === ""});
    }

    handlePress(){
        console.log("Press Save!");
        console.log(this.state.answer);
    }

    render(){
        return(
            <SafeAreaView style={styles.match__background}>
                <View style={styles.screen__header}></View>
                <View style={styles.content__container}>
                    <TextInput style={[styles.class__container, {height: 300, paddingTop: 20}]}
                    placeholder={"Start typing..."} onChangeText={value => this.handleChange(value)}
                    multiline={true}/>
                    <TouchableOpacity onPress={this.handlePress} disabled={this.state.disabled}
                    style={[styles.button,{alignSelf: 'flex-end'}]}>
                        <Text style={styles.text__header}>Save</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }
}