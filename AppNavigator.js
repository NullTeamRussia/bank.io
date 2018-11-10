/**
 * Table View images (clickable)
 * by NullTeam <geowatson, de1ay>
 */

import React from 'react';
import {
    createStackNavigator,
} from 'react-navigation';
import { MapsScreen } from "./src/Maps/MapsScreen";
import MainScreen from "./src/Main/MainScreen";
import SettingsScreen from "./src/Settings/SettingsScreen";
import CardsScreen from "./src/Cards/CardsScreen";

const AppNavigator = createStackNavigator(
    {
        Main: { screen: MainScreen },
        Maps: { screen: MapsScreen },
        Settings: { screen: SettingsScreen },
        Cards: {screen: CardsScreen }
    },
    {
        initialRouteName: "Main"
    });

export default AppNavigator;