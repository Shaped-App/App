//Matching-Browse-1
import React, {Component} from 'react';
import {SafeAreaView, View, Text} from 'react-native';

import styles from '../Static/main_style.js';
import QuestionList from './QuestionList';

export default class BrowseOneScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: props.questions,
    };
  }

  render() {
    return (
      <SafeAreaView style={styles.match__background}>
        <View style={styles.screen__header}>
          <Text style={styles.text}>First answer a question</Text>
          <Text style={styles.text}>Then see other people's response!</Text>
        </View>
        <QuestionList questions={this.state.questions} />
      </SafeAreaView>
    );
  }
}
