import React, {Component} from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableHighlight,
    View
} from 'react-native';

class Question extends Component {
    constructor(props) {
        super(props);
        this.state = {
            question: props.question,
            id: props.id,
        };
        this.onQuestionPress = this.onQuestionPress.bind(this);
    }
    onQuestionPress() {
        console.log("Pressed question!");
    }
    render(){
        return (
            <TouchableHighlight style={styles.question__container}
            onPress={this.onQuestionPress} underlayColor="lightgray">
                <View>
                    <Text style={styles.question__header}>{this.state.question}</Text>
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
        let question_list = [];
        for(let i in this.state.questions){
            question_list.push(<Question question={this.state.questions[i]} 
                id={i} key={i}/>);
        }
        return (
            <ScrollView>
                {question_list}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    question__container: {
        backgroundColor: '#eaf9ea',
        borderRadius: 20,
        marginBottom: 15,
        padding: '5%',
        width: '100%'
    },
    question__header: {
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold'
    },
});