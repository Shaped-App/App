import React, {Component} from 'react';
import {SafeAreaView, View, Text, TouchableOpacity} from 'react-native';

import styles from './Static/style.js';

export default class BrowseThreeScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SafeAreaView style={styles.match__background}>
        <View style={styles.screen__header} />
        <View
          style={[
            styles.content__container,
            {
              // TODO - Add these to the style. For review.
              height: '90%',
              justifyContent: 'center',
              alignItems: 'center',
            },
          ]}>
          <Text style={[{fontWeight: 'bold', fontSize: 20, margin: 10}]}>
            Success!
          </Text>
          <Text>Your response has been recorded.</Text>
          <Text>Now explore what others have said.</Text>
          <TouchableOpacity
            style={[
              styles.button,
              {
                margin: 30,
                // Created from https://ethercreative.github.io/react-native-shadow-generator/
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 3,
                },
                shadowOpacity: 0.29,
                shadowRadius: 4.65,

                elevation: 7,
              },
            ]}>
            <Text style={styles.text__header}>Let's go</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}
