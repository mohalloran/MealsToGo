import React from 'react';
import {RegisterScreen} from '../../features/account/screens/register.screen';
import {AccountScreen} from '../../features/account/screens/account.screen';
import {LoginScreen} from '../../features/account/screens/login.screen';
import {NavigationContainer} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const AccountStack = createStackNavigator();

export const AccountNavigator = () => {
    return (
        <NavigationContainer>
            <AccountStack.Navigator headerMode="none">
                <AccountStack.Screen name = "main" component={AccountScreen} />
                <AccountStack.Screen name = "login" component={LoginScreen} />
                <AccountStack.Screen name = "register" component={RegisterScreen} />
            </AccountStack.Navigator>
        </NavigationContainer>
    )
}