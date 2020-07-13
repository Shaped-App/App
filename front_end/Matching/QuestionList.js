import React, {Component} from 'react';
import {
    ScrollView,
    Text,
    TouchableHighlight,
    View
} from 'react-native';

import styles from '../Static/style.js';

class Question extends Component {
    constructor(props) {
        super(props);
        this.state = {
            question: props.question,
            question_id: props.question_id,
        };
        this.onQuestionPress = this.onQuestionPress.bind(this);
    }

    onQuestionPress() {
        console.log("Pressed question!");
    }

    render(){
        return (
            <TouchableHighlight style = {styles.class__container}
            onPress = {this.onQuestionPress} underlayColor = "lightgray">
                <View>
                    <Text style={styles.text__header}>{this.state.question}</Text>
                </View>
            </TouchableHighlight>
        );
    }
}

export default class QuestionList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: props.questions,
            //navigation: props.navigation for later
        };
    }

    render(){
        return (
            <ScrollView>
                {this.state.questions.map(question => 
                <Question response={question.question} 
                question_id = {question.id} key={question.id}/>)}
            </ScrollView>
        );
    }
}