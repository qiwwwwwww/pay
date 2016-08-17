/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  BackAndroid,
  ToolbarAndroid,
  Navigator

} from 'react-native';

var MainScreen = require('./MainScreen');

var _navigator;
BackAndroid.addEventListener('hardwareBackPress', () => {
  if (_navigator && _navigator.getCurrentRoutes().length > 1) {
    _navigator.pop();
    return true;
  }
  return false;
});



class pay_by_data extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      splashed: false,
    };
  }

  componentDidMount() {
    setTimeout(() =>{
        this.setState({
          splashed: true,
        });
      },10,);
  }

  navigatorRenderScene(route, navigator) {
    _navigator = navigator;
    if (route.name === 'MainScreen') {
      return (
        <View style={styles.container}>
          <MainScreen navigator={navigator}/>
        </View>
      );
    }
  }

  render() {
    if (this.state.splashed) {
      var initialRoute = {name: 'MainScreen'};
      return (
        <Navigator
          style={styles.container}
          initialRoute={initialRoute}
          configureScene={() => Navigator.SceneConfigs.FadeAndroid}
          renderScene={this.navigatorRenderScene}
        />
      );
    } else {
      return (
      <View style={{flex: 1, backgroundColor: '#009688', alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{color: 'white', fontSize: 32,}}>Pay By Data</Text>
      </View>
      );
    }
  }

}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  toolbar: {
    backgroundColor: '#a9a9a9',
    height: 56,
  },
    image:{
    width: 10,
    height: 10,

  },
});


AppRegistry.registerComponent('pay_by_data', () => pay_by_data);
