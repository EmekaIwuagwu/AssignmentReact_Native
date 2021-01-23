import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';

import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

import Splash from './src/Splash';
import Home from './src/Home';
import Favourites from './src/Favourites';

const HomeNavigator = createStackNavigator({
  'Home': {
    screen: Home,
    navigationOptions: ({navigation}) => ({
      headerLeft: () => (
        <TouchableOpacity
          style={{marginLeft: 20}}
          onPress={() => navigation.toggleDrawer()}>
          <Icon name="menu" size={12} />
        </TouchableOpacity>
      ),
    }),
  },
});

const FavouritesNavigator = createStackNavigator({
  'Favourites': {
    screen: Favourites,
    navigationOptions: ({navigation}) => ({
      headerLeft: () => (
        <TouchableOpacity
          style={{marginLeft: 20}}
          onPress={() => navigation.toggleDrawer()}>
          <Icon name="menu" size={12} />
        </TouchableOpacity>
      ),
    }),
  },
});

const DrawerNavigator = createDrawerNavigator({
  Home: {
    navigationOptions: {
      drawerIcon: (
        <Image
          source={{uri: 'asset:/icons/home.png'}}
          style={{width: 21, height: 21}}
        />
      ),
      drawerLabel: 'Home',
    },
    screen: HomeNavigator,
  },

  Favourites: {
    navigationOptions: {
      drawerIcon: (
        <Image
          source={{uri: 'asset:/icons/heart.png'}}
          style={{width: 21, height: 21}}
        />
      ),
      drawerLabel: 'Favourites',
    },
    screen: FavouritesNavigator,
  },

});

const AppSwitchNavigator = createSwitchNavigator({
  Splash : {screen : Splash},
  Drawer: {screen: DrawerNavigator},
},

{
  initialRouteName: 'Splash'
});

const App = createAppContainer(AppSwitchNavigator);

export default App;