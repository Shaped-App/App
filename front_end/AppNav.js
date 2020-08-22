import React, {Component} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import OnboardingNav from './Onboarding/OnboardingNav';
import NavBar from './NavBar';

const Stack = createStackNavigator();

export default class OnboardingStack extends Component {
    render() {
        return(
            <NavigationContainer>
                <Stack.Navigator initialRouteName={"OnboardingNav"}>
                    <Stack.Screen name={"OnboardingNav"} component={OnboardingNav} options={{headerShown: false}}/>
                    <Stack.Screen name={"NavBar"} component={NavBar} options={{headerShown: false}}/>
                </Stack.Navigator>
            </NavigationContainer>
        );
    };
};
