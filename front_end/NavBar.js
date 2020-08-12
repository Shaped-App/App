import React, {Component} from 'react';
import {View} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

//Matching-Browse Screens
import BrowseOneScreen from './Matching/MatchingBrowseOne';
import BrowseTwoScreen from './Matching/MatchingBrowseTwo';
import BrowseThreeScreen from './Matching/MatchingBrowseThree';
//Inbox Screens
import InboxOneScreen from './Inbox/InboxOne';
//Profile Screens
import ProfileOneScreen from './Profile/ProfileOne';
import Settings from './Profile/Settings';
import { SettingIcon } from './Profile/UserProfileComponents';

import Icon from './Utility/Icon';

const MatchStack = createStackNavigator();

function MatchNav() {
  return(
    <MatchStack.Navigator initialRouteName={browseOne}
    screenOptions={stackOption}>
        <MatchStack.Screen name={browseOne} component={BrowseOneScreen}
        options={{title: "Matching"}}/>
        <MatchStack.Screen name={browseTwo} component={BrowseTwoScreen}
        options={{title: "Response"}}/>
        <MatchStack.Screen name={browseThree} component={BrowseThreeScreen}
        options={{headerShown: false}}/>
    </MatchStack.Navigator>
  );
}

const InboxStack = createStackNavigator();

function InboxNav() {
    return(
        <InboxStack.Navigator initialRouteName={inboxOne}
        screenOptions={stackOption}>
            <InboxStack.Screen name={inboxOne} component={InboxOneScreen}
            options={{title: "Messages"}}/>
        </InboxStack.Navigator>
    );
}

const ProfileStack = createStackNavigator();

function ProfileNav() {
    return(
        <ProfileStack.Navigator initialRouteName={userProfile}
        screenOptions={stackOption}>
            <ProfileStack.Screen name={userProfile} component={ProfileOneScreen}
            options={({navigation}) => ({
              title: " ",
              headerRight: () => (
                <SettingIcon navigation={navigation}/>
              )
            })}/>
            <ProfileStack.Screen name={settings} component={Settings}
            options={{
              title: "Settings",
            }}/>
        </ProfileStack.Navigator>
    );
}

const Tab = createBottomTabNavigator();

export default class NavBar extends Component {
  getTabBarVisibility = (route) => {
    const routeName = route.state
      ? route.state.routes[route.state.index].name
      : '';
    if (routeName === BrowseTwo) {
      return false;
    }
    return true;
  }

  render(){
    return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name={tabMatch} component={MatchNav}
          options={({route}) => ({
            tabBarVisible: this.getTabBarVisibility(route)
          })}/>
          <Tab.Screen name={tabInbox} component={InboxNav}/>
          <Tab.Screen name={tabProfile} component={ProfileNav}/>
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}

const stackOption = {
    headerBackTitle: " ",
    headerBackImage: () => (
        <View style={{marginLeft: 36}}>
            <Icon name="back" size={18}/>
        </View>),
    headerTitleStyle: {fontSize: 20}
};

//tab option
export const tabMatch = "Matching";
export const tabInbox = "Inbox";
export const tabProfile = "Profile";
//browse option
export const browseOne = "BrowseOne";
export const browseTwo = "BrowseTwo";
export const browseThree = "BrowseThree";
export const browseFour = "BrowseFour";
//inbox option
export const inboxOne = "InboxOne";
export const inboxTwo = "InboxTwo";
export const inboxThree = "InboxThree";
//profile option
export const userProfile = "UserProfile";
export const settings = "Settings";