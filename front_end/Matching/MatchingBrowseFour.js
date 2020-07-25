import React, {Component} from 'react';
import {SafeAreaView, View, Text, TouchableOpacity} from 'react-native';

import styles from '../Static/main_style.js';
import ResponseList from '../Matching/ResponseList';

// const responses = [
//   {
//     response:
//       'The high from this week was seeing a deer on my hike. The low was not being able to buy toilet paper from the grocery store. No buffalo :( Just a bison hehe',
//     username: 'User987',
//     response_id: '4',
//     time: '7/8/20',
//     key: '0',
//   },
//   {
//     response:
//       'This week was great because I slept 8 hours a week every day!! I’m not sure if I have a low :) The buffalo was that I started working on a really cool project.',
//     username: 'User',
//     response_id: '4',
//     time: '7/9/20',
//     key: '1',
//   },
//   {
//     response: 'String response.',
//     username: 'User123',
//     response_id: '4',
//     time: '7/8/20',
//     key: '2',
//   },
// ];

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
