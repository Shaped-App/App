//Setting-Feedback
import React, {Component} from 'react';
import {
    SafeAreaView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import styles from '../Static/main_style';

export default class FeedbackScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            feedback: "",
            navigation: props.navigation
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(value){
        this.setState({feedback: value});
    }

    handleSubmit(){
        //TODO
        console.log("Pressed Submit!");
    }

    render(){
        return(
            <SafeAreaView style={[styles.background, {alignItems: 'center'}]}>
                <View style={[styles.content__container, { padding: '5%',flex: 1, flexDirection: 'column', justifyContent: 'space-between'}]}>
                    <View>
                        <Text style={[styles.text__header, {marginBottom: '15%'}]}>
                            We’re always looking for more ways to improve Shaped. 
                            Help us improve by writing your feedback below. Thank you!
                        </Text>
                        <TextInput
                            style={[styles.class__container, {height: 300, paddingTop: 20}]}
                            placeholder={"Start typing..."}
                            onChangeText={value => this.handleChange(value)}
                            multiline={true}
                        />
                    </View>
                    <TouchableOpacity
                        onPress={this.handleSubmit}
                        disabled={this.state.feedback === ""}
                        style={[styles.big__button, this.state.feedback === "" && {backgroundColor: '#EAEAEA'}]}
                    >
                        <Text style={styles.text__header}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }
}