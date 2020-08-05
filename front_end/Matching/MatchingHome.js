import React, {Component} from 'react';
import {SafeAreaView, View, Text, TouchableOpacity} from 'react-native';

import styles from '../Static/main_style.js';

export default class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SafeAreaView style={styles.match__background}>
        <View style={styles.screen__header} />
        <View style={[styles.content__container, styles.content__centering]}>
          <TouchableOpacity style={[styles.button, {margin: 30}]}>
            <Text style={styles.text__header}>Browse</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, {margin: 30}]}>
            <Text style={styles.text__header}>Random</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}
