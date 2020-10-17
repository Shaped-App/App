import React, {Component} from 'react';
import {SafeAreaView, View, Text, TouchableOpacity} from 'react-native';

import styles from '../Static/main_style.js';
import ResponseList from '../Matching/ResponseList';
import { getAnswerList } from '../Static/config.js';

export default class BrowseFourScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: [],
      question_id: props.route.params.question_id,
    };
  }

  componentDidMount() {
    this.setState({response: getAnswerList(this.state.question_id)});
  }

  render() {
    return (
      <SafeAreaView style={styles.match__background}>
        <View style={styles.screen__header}>
          <Text style={styles.text}>Respond to start a conversation!</Text>
        </View>
        <ResponseList responses={this.state.response} question_id={this.state.question_id}/>
      </SafeAreaView>
    );
  }
}
