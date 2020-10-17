//Matching-Browse-1
import React, { Component } from 'react';
import {
  SafeAreaView,
  View,
  Text
} from 'react-native';

import auth from '@react-native-firebase/auth';

import styles from '../Static/main_style.js';
import { getQuestionList } from '../Static/config.js';
import QuestionList from '../Matching/QuestionList';

export default class BrowseOneScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      navigation: props.navigation,
    };
    this.fetchQuestionList = this.fetchQuestionList.bind(this);
    this.setQuestionList = this.setQuestionList.bind(this);
  }

componentDidMount() {

  auth().currentUser.getIdToken().then(idTokenResult => {
    const data = { token: idTokenResult };
    console.log(data);

    fetch('http://3.16.151.194:3000/test/tokenTest', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    }).then(function(response) {
      return response.json();
    }).then(function(data) {
      console.log(data);
    });
  });
  
    


    //this.fetchQuestionList();
  }

  setQuestionList(data){
    console.log(data);
    this.setState({questions: data});
  }

  fetchQuestionList(){
    getQuestionList(this.setQuestionList);
  }

  render() {
    return (
      <SafeAreaView style={styles.match__background}>
        <View style={styles.screen__header}>
          <Text style={styles.text}>First answer a question</Text>
          <Text style={styles.text}>Then see other people's response!</Text>
        </View>
        <QuestionList
          questions={this.state.questions}
          navigation={this.state.navigation}
        />
      </SafeAreaView>
    );
  }
}
