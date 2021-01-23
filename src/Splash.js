import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class Splash extends Component {
    componentDidMount()
    {
        setTimeout(() =>{
            this.props.navigation.navigate('Home');
        },4000)
    }

  render() {
    return (
      <View>
        <Text> Splash </Text>
      </View>
    );
  }
}
