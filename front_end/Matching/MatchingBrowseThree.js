import React, {Component} from 'react';
import {SafeAreaView, View, Text, TouchableOpacity} from 'react-native';

import styles from '../Static/style.js';

export default class BrowseThreeScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SafeAreaView style={styles.match__background}>
        <View style={styles.screen__header} />
        <View style={[styles.content__container, styles.content__centering]}>
          <Text style={[{fontWeight: 'bold', fontSize: 20, margin: 10}]}>
            Success!
          </Text>
          <Text>Your response has been recorded.</Text>
          <Text>Now explore what others have said.</Text>
          <TouchableOpacity style={[styles.button, {margin: 30}]}>
            <Text style={styles.text__header}>Let's go</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}
