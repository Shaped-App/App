import React, {Component} from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';

import Icon from '../Utility/Icon';
import styles from '../Static/main_style.js';
import ReadMore from 'react-native-read-more-text';

class Response extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: props.response,
      username: props.username,
      response_id: props.response_id,
      time: props.time,
      reply: '',
      disabled: true,
      expand: false,
      //nav: props.nav,
      answered: false,
      sent: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSend = this.handleSend.bind(this);
  }

  handleChange(value) {
    this.setState({reply: value, disabled: value === ''});
  }

  handleSend() {
    console.log('Press the send button!');
    this.setState({sent: true, expand: false});
  }

  render() {
    return (
      <View style={styles.class__container}>
        <View style={styles.response__header}>
          <Icon name="profile" size={30} />
          <Text style={[styles.text__header, {marginLeft: 16}]}>
            {this.state.username} · {this.state.time}
          </Text>
        </View>
        <View style={{marginBottom: 16}}>
          <ReadMore numberOfLines={4}>
            <Text style={styles.text}>{this.state.response}</Text>
          </ReadMore>
        </View>
        {this.state.sent ? (
          <View style={styles.message__sent}>
            <Text style={styles.message__sent__text}>Sent!</Text>
          </View>
        ) : (
          <TextInput
            style={this.state.expand ? styles.multi : styles.answer__container}
            placeholder={'Start typing...'}
            onChangeText={value => this.handleChange(value)}
            multiline={this.state.expand}
            onFocus={() => this.setState({expand: true})}
            onBlur={() => this.setState({expand: false})}
            value={this.state.reply}
          />
        )}
        {this.state.expand ? (
          <TouchableOpacity
            onPress={this.handleSend}
            disabled={this.state.disabled}
            style={[
              styles.send__button,
              {backgroundColor: this.state.disabled ? '#bfbfbf' : '#89cf50'},
            ]}>
            <Icon name="send" size={20} />
          </TouchableOpacity>
        ) : (
          <View />
        )}
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

  render() {
    return (
      <ScrollView style={styles.content__container}>
        {this.state.responses.map(res => (
          <Response
            response={res.response}
            username={res.username}
            response_id={res.id}
            time={res.time}
            key={res.id}
          />
        ))}
      </ScrollView>
    );
  }
}
