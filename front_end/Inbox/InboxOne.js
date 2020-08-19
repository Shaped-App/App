// Figma Screen: Inbox 1
import React, {Component} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

import SingleMessage from './Message';
import Icon from '../Utility/Icon';
import styles from '../Static/main_style';
import inbox_style from '../Static/inbox_style';

export default class InboxOneScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      incoming: [],
      inbox: [],
      expand: false,
      //navigation: props.navigation for later
    };
    this.onPressExpand = this.onPressExpand.bind(this);
  }

  onPressExpand() {
    if (this.state.incoming.length) {
      this.setState({expand: !this.state.expand});
    }
  }

  render() {
    return (
      <SafeAreaView style={inbox_style.message__background}>
        <View style={inbox_style.content_container}>
          <View style={styles.class__container}>
            <View style={inbox_style.align__row}>
              <Text style={inbox_style.incoming__header}>
                Incoming Messages
              </Text>
              {this.state.incoming.length ? (
                <View style={inbox_style.notification}>
                  <Text style={inbox_style.notification__number}>
                    {this.state.incoming.length}
                  </Text>
                </View>
              ) : (
                <View />
              )}
              <TouchableHighlight
                onPress={this.onPressExpand}
                underlayColor="lightgray"
                style={{marginLeft: 'auto'}}>
                {this.state.expand ? (
                  <View style={{transform: [{rotate: '180deg'}]}}>
                    <Icon name="arrow" size={16} />
                  </View>
                ) : (
                  <View>
                    <Icon name="arrow" size={16} />
                  </View>
                )}
              </TouchableHighlight>
            </View>
            {this.state.expand ? (
              <ScrollView style={inbox_style.bar}>
                {this.state.incoming.map(msg => (
                  <View style={{marginTop: 24}}>
                    <Message
                      name={msg.name}
                      message={msg.message}
                      time={msg.time}
                      chatID={msg.chatID}
                      key={msg.chatID}
                    />
                  </View>
                ))}
              </ScrollView>
            ) : (
              <View />
            )}
          </View>
          <ScrollView>
            {this.state.inbox.map(msg => (
              <View style={styles.class__container}>
                <Message
                  name={msg.name}
                  message={msg.message}
                  time={msg.time}
                  chatID={msg.chatID}
                  key={msg.chatID}
                />
              </View>
            ))}
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}
