//Matching-Browse-2
import React, {Component} from 'react';
import {
    SafeAreaView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import styles from '../Static/style';
import {browseThree} from '../NavBar';

export default class BrowseTwoScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
          question: props.route.params.question,
          question_id: props.route.params.question_id,
          answer: "",
          disabled: true,
          navigation: props.navigation
        };
        this.handleChange = this.handleChange.bind(this);
        this.handlePress = this.handlePress.bind(this);
    }

  handleChange(value) {
    this.setState({answer: value, disabled: value === ''});
  }

    handlePress(){
        this.state.navigation.navigate(browseThree,{
            question_id: this.state.question_id,
            question: this.state.question,
        });
    }

    render(){
        return(
            <SafeAreaView style={styles.match__background}>
                <View style={styles.screen__header}>
                    <Text style={styles.text__header}>{this.state.question}</Text>
                </View>
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
