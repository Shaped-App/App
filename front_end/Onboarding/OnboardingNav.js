import React, {Component} from 'react';
import {View} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

//Onboarding Screens
import Login from './Login';
import SignUp from './SignUp';
import SignIn from './SignIn';
import OnboardingOne from './OnboardingOne';
import OnboardingTwoA from './OnboardingTwoA';
import OnboardingTwoB from './OnboardingTwoB';
import OnboardingThree from './OnboardingThree';
import OnboardingFour from './OnboardingFour';
import OnboardingFive from './OnboardingFive';

import Icon from '../Utility/Icon';

const Stack = createStackNavigator();

export default class OnboardingStack extends Component {
    render() {
        return(
            <Stack.Navigator initialRouteName={login} screenOptions={stackOption}>
                <Stack.Screen name={login} component={Login} options={{headerShown: false}}/>
                <Stack.Screen name={signUp} component={SignUp} options={{headerShown: false}}/>
                <Stack.Screen name={signIn} component={SignIn} options={{headerShown: false}}/>
                <Stack.Screen name={onboardingOne} component={OnboardingOne} options={{title: "Add a profile picture", headerLeft: null}}/>
                <Stack.Screen name={onboardingTwoA} component={OnboardingTwoA} options={{title: "Upload Profile Photo"}}/>
                <Stack.Screen name={onboardingTwoB} component={OnboardingTwoB} options={{title: "Take Profile Photo"}}/>
                <Stack.Screen name={onboardingThree} component={OnboardingThree} options={{title: "Welcome!"}}/>
                <Stack.Screen name={onboardingFour} component={OnboardingFour} options={{title: "Introduce yourself"}}/>
                <Stack.Screen name={onboardingFive} component={OnboardingFive} options={{title: "Your Preferences"}}/>
            </Stack.Navigator>
        );
    };
};

const stackOption = {
    headerBackTitle: " ",
    headerBackImage: () => (
        <View style={{marginLeft: 36}}>
            <Icon name="back" size={18}/>
        </View>),
    headerTitleStyle: {fontSize: 20}
};

export const splash = "Splash";
export const login = "Login";
export const signIn = "SignIn";
export const signUp = "SignUp";
export const onboardingOne = "OnboardingOne";
export const onboardingTwoA = "OnboardingTwoA";
export const onboardingTwoB = "OnboardingTwoB";
export const onboardingThree= "OnboardingThree";
export const onboardingFour = "OnboardingFour";
export const onboardingFive = "OnboardingFive";
export const navBar = "NavBar";
