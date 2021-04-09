import React, {Component} from 'react';
import {
    Text,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    TextInput,
    View
} from 'react-native';

import Icon from '../Utility/Icon';
import styles from '../Static/main_style';
import inbox_style from '../Static/inbox_style';

class Message extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    const pos = this.props.owner ? {alignSelf: 'flex-end'} : {alignSelf: 'flex-start'};
    return (
      <View style={[pos, {width: 'auto'}]}>
        <SafeAreaView style={[styles.class__container, {width: '70%'}]}>
          <Text style={{padding: '5%'}}>{this.props.message}</Text>
        </SafeAreaView>
      </View>
    );
  }
}

export default class ChatRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
        name: props.route.params.name,
        time: props.route.params.time,
        chatID: props.route.params.chatID,
        accepted: props.route.params.accepted,
        chatLogs: [],
        send_msg : "",
        navigation: props.navigation
    };
    this.onPress = this.onPress.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSend = this.handleSend.bind(this);
  }

  componentDidMount() {
    this.state.navigation.setOptions({
      title: this.state.name,
    });
    console.log("Get chatlog");
  }

  handleChange(value){
    this.setState({send_msg: value});
  }
  
  handleSend(){
    if(this.state.send_msg === ""){
      console.log("Do not send!");
    }else{
      console.log(this.state.send_msg);
      this.setState({send_msg: ""});
    }
  }

  onPress(accept){
    if(accept){
      this.setState({accepted: accept});
    }else{
      console.log("Send to backend that it passed");
      this.state.navigation.goBack();
    }
  }

  render() {//alignSelf: 'flex-end'
    return (
        <SafeAreaView style = {[styles.background]}>
          <View style={{padding: '5%'}}>
            <ScrollView>
              {this.state.chatLogs.map(msg => (
                <Message message={msg.message} owner={msg.owner}/>
              ))}
            </ScrollView>
          </View>
          { this.state.accepted ?
            <View style={[inbox_style.align__row, {padding: '5%', justifyContent: 'space-between'}]}>
              <TextInput
                style={[styles.single__input, {width: '87.5%'}]}
                placeholder={"Start typing..."}
                onChangeText={value => this.handleChange(value)}
                multiline={true}
                value={this.state.send_msg}
              />
              <TouchableOpacity
                onPress={this.handleSend}
                style={inbox_style.send__button}>
                <Icon name="send" size={20} />
              </TouchableOpacity>
            </View>
            :<View style={[inbox_style.align__row, {justifyContent: 'center'}]}>
              <TouchableOpacity
                onPress={() => this.onPress(false)}
                style={[styles.button, {margin: 5}]}
              >
                <Text style={styles.text__header}>Pass</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.onPress(true)}
                style={[styles.button, {margin: 5}]}
              >
                <Text style={styles.text__header}>Accept</Text>
              </TouchableOpacity>
            </View>
          }
        </SafeAreaView>
    );
  }
}




