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
    <MatchStack.Navigator initialRouteName={BrowseOption[0]}
    screenOptions={stackOption}>
        <MatchStack.Screen name={BrowseOption[0]} component={BrowseOneScreen}
        options={{title: "Matching"}}/>
        <MatchStack.Screen name={BrowseOption[1]} component={BrowseTwoScreen}
        options={{title: "Response"}}/>
        <MatchStack.Screen name={BrowseOption[2]} component={BrowseThreeScreen}
        options={{headerShown: false}}/>
    </MatchStack.Navigator>
  );
}

const InboxStack = createStackNavigator();

function InboxNav() {
    return(
        <InboxStack.Navigator initialRouteName={InboxOption[0]}
        screenOptions={stackOption}>
            <InboxStack.Screen name={InboxOption[0]} component={InboxOneScreen}
            options={{title: "Messages"}}/>
        </InboxStack.Navigator>
    );
}

const ProfileStack = createStackNavigator();

function ProfileNav() {
    return(
        <ProfileStack.Navigator initialRouteName={ProfileOption[0]}
        screenOptions={stackOption}>
            <ProfileStack.Screen name={ProfileOption[0]} component={ProfileOneScreen}
            options={({navigation}) => ({
              title: " ",
              headerRight: () => (
                <SettingIcon navigation={navigation}/>
              )
            })}/>
            <ProfileStack.Screen name={ProfileOption[1]} component={Settings}
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
    if (routeName === BrowseOption[2]) {
      return false;
    }
    return true;
  }

  render(){
    return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name={tabOption[0]} component={MatchNav}
          options={({route}) => ({
            tabBarVisible: this.getTabBarVisibility(route)
          })}/>
          <Tab.Screen name={tabOption[1]} component={InboxNav}/>
          <Tab.Screen name={tabOption[2]} component={ProfileNav}/>
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

export const tabOption = ["Matching", "Inbox", "Profile"];
export const BrowseOption = ["BrowseOne", "BrowseTwo", "BrowseThree", "BrowseFour"];
export const InboxOption = ["InboxOne", "InboxTwo", "InboxThree"];
export const ProfileOption = ["ProfileOne", "Settings"];