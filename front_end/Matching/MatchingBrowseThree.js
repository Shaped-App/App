import React, {Component} from 'react';
import {SafeAreaView, View, Text, TouchableOpacity} from 'react-native';

import {browseFour} from '../NavBar';
import styles from '../Static/main_style.js';

export default class BrowseThreeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: props.route.params.question,
      question_id: props.route.params.question_id,
      navigation: props.navigation
    };
    this.handlePress = this.handlePress.bind(this);
  }

  handlePress(){
    console.log("Pressed Button!");
    this.state.navigation.navigate(browseFour,{
        question_id: this.state.question_id,
    });
  }

  render() {
    return (
      <SafeAreaView style={styles.match__background}>
        <View style={styles.screen__header} />
        <View style={[styles.content__container, styles.content__centering]}>
          <Text style={[styles.text__success]}>Success!</Text>
          <Text>Your response has been recorded.</Text>
          <Text>Now explore what others have said.</Text>
          <TouchableOpacity onPress={this.handlePress} style={[styles.button, {margin: 30}]}>
            <Text style={styles.text__header}>Let's go</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}
