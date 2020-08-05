import React, { Component } from 'react';
import {
    ScrollView,
    Text,
    TouchableHighlight,
    View
} from 'react-native';

import styles from '../Static/main_style.js';
import Icon from '../Utility/Icon';
import { BrowseOption } from '../NavBar';

class Question extends Component {
    constructor(props) {
        super(props);
        this.state = {
            question: props.question,
            question_id: props.question_id,
            navigation: props.navigation
        };
        this.onQuestionPress = this.onQuestionPress.bind(this);
    }

    onQuestionPress() {
        this.state.navigation.navigate(BrowseOption[1], {
            question: this.state.question,
            question_id: this.state.id,
        });
    }

    render() {
        return (
            <TouchableHighlight style={styles.class__container}
                onPress={this.onQuestionPress} underlayColor="lightgray">
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ flex: 9 }}>
                        <Text style={styles.text__header}>{this.state.question}</Text>
                    </View>
                    <View style={{ flex: 1, transform: [{ rotate: '180deg' }] }}>
                        <Icon name='back' size={16} />
                    </View>
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
            navigation: props.navigation
        };
    }

    render() {
        return (
            <ScrollView style={styles.content__container}>
                {this.state.questions.map((question) =>
                    <Question question={question.question} question_id={question.id}
                        navigation={this.state.navigation} key={question.id} />)}
            </ScrollView>
        );
    }
}
