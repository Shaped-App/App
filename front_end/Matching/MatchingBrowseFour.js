import React, {Component} from 'react';
import {SafeAreaView, View, Text, TouchableOpacity} from 'react-native';

import styles from '../Static/main_style.js';
import ResponseList from '../Matching/ResponseList';

const responses = [
  {username: 'username', id: 5, response: 'yeet', time: '5/7/2020'},
  {},
  {},
];

export default class BrowseFourScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: props.response,
    };
  }

  render() {
    return (
      <SafeAreaView style={styles.match__background}>
        <View style={styles.screen__header}>
          <Text style={styles.text}>Respond to start a conversation!</Text>
        </View>
        <ResponseList responses={responses} />
      </SafeAreaView>
    );
  }
}
