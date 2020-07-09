import React, {Component} from 'react';
import {
    ScrollView,
    StyleSheet, 
    Text,
    TouchableOpacity,
    View,
    TextInput
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import ReadMore from 'react-native-read-more-text';

class Response extends Component {
    constructor(props) {
        super(props);
        this.state = {
            response: props.response,
            username: props.username,
            response_id: props.response_id,
            reply: "",
            disabled: true,
            expand: false,
            //nav: props.nav,
            answered: false,
            sent: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSend = this.handleSend.bind(this);
    }

    handleChange(value){
        this.setState({reply: value});
        if(value === ""){
            this.setState({disabled: true});
        } else{
            this.setState({disabled: false});
        }
    }

    handleSend(){
        console.log("Press the send button!");
        this.setState({sent: true, expand: false});
    }

    handleViewResponse(){
        console.log("Viewing Response");
    }

    render(){
        const send_color = this.state.disabled ? '#bfbfbf' : '#89cf50';
        return(
            <View style={styles.response__container}>
                <View style={styles.response_header}>
                    <Icon name='person-circle-sharp' size={30}/>
                    <Text style={styles.username}>{this.state.username}</Text>
                </View>
                <View style={{marginBottom: 16}}>
                    <ReadMore numberOfLines={4}>
                        <Text style={styles.text}>{this.state.response}</Text>
                    </ReadMore>
                </View>
                { this.state.sent ? 
                    <TouchableOpacity style={styles.message_sent}>
                        <Text style={styles.message_sent_text}>Sent! View Your Response&gt;</Text>
                    </TouchableOpacity> 
                    : <TextInput style={this.state.expand ? styles.multi: styles.answer_container}
                    placeholder={"Start typing..."} onChangeText={value => this.handleChange(value)} 
                    multiline={this.state.expand} onFocus={()=> this.setState({expand: true})}
                    onBlur={()=> this.setState({expand: false})} value={this.state.reply}/> }
                    { this.state.expand ? 
                        <TouchableOpacity onPress={this.handleSend} disabled={this.state.disabled} 
                        style={[styles.send_button, {backgroundColor: send_color}]}>
                        <Icon name='paper-plane' size={20} color='white'/>
                        </TouchableOpacity>
                        : <View></View> }
            </View>
        );
    }
}

export default class ResponseList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            responses: props.responses,
            //nav: props.nav
        };
    }

    render(){
        let response_list = [];
        let res = this.state.responses;
        for(let i = 0; i < res.length; i++){
            response_list.push(<Response response={res[i]['response']} 
            username={res[i]['user']} response_id = {res[i]['id']} key={res[i]['id']}/>);
        }
        return(
            <ScrollView style={{backgroundColor: '#d0faaf'}}>
                {response_list}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    response__container: {
        backgroundColor: 'rgba(255,255,255,0.7)',
        borderRadius: 20,
        marginBottom: 16,
        padding: '5%',
        width: '100%'
    },
    text: {
        color: '#808080',
        fontSize: 14,
    },
    button_enabled: {
        color: '#89cf50'
    },
    response_header: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16
    },
    username: {
        fontSize: 16,
        marginLeft: 16
    },
    answer_container: {
        backgroundColor: '#ffffff',
        borderRadius: 6,
        fontSize: 14,
        padding: 8
    },
    multi: {
        backgroundColor: '#ffffff',
        height: 150,
        borderRadius: 6,
        fontSize: 14,
        padding: 8
    },
    send_button: {
        zIndex: 2,
        bottom: 16,
        right: 16,
        alignSelf: 'flex-end',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        backgroundColor: 'lightgray',
        flex: 1,
        borderRadius: 15,
        width: 30,
        height: 30,
    },
    message_sent: {
        backgroundColor: '#89cf50',
        borderRadius: 6,
        padding: 8
    },
    message_sent_text: {
        fontSize: 14,
        color: '#ffffff',
        fontWeight: 'bold'
    }
});

/*import ResponseList from './Matching/ResponseList';
export default class App extends Component {
  render(){
      const res = [
    { response: "Hello my name is Bob Ross. Welcome to today's episode. Today we will be painting a picture of Terry Crews.",
      user: "Bob Ross",
      id: 0
    },
    { response: "Hello my name is Bob Ross. Welcome to today's episode. Today we will be painting a picture of Terry Crews.",
      user: "Bob Ross",
      id: 1
    },
  ];
  return (
    <SafeAreaView>
      <ResponseList responses={res}/>
    </SafeAreaView>
  );
  }
};*/