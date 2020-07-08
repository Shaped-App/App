//Matching-Home
import React, {Component} from 'react';
import { SafeAreaView, } from 'react-native';

import QuestionList from './QuestionList';

export default class MatchingHomeScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
          questions: props.questions
        };
    }

    render(){
        return(
            <SafeAreaView>
                <QuestionList questions = {this.state.questions}/>
            </SafeAreaView>
        );
    }
}