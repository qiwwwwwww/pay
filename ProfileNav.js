import React, {
  Component,
} from 'react';
import {
  AppRegistry,
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
  Navigator,
  BackAndroid,
  ToolbarAndroid
} from 'react-native';

var UsageList = require('./UsageList');
var Profile = require('./Profile');

const routestack = [{id:"UsageList", title:"UsageList"},{id: "Profile", title:"Profile"}];

var _navigator;
BackAndroid.addEventListener('hardwareBackPress', () => {
  if (_navigator && _navigator.getCurrentRoutes().length > 1) {
    _navigator.pop();
    return true;
  }
  return false;
});


class OutlineNav extends Component{

  navigatorRenderScene(route, navigator){
    _navigator=navigator;
    switch(route.name){
      case 'UsageList':
        return (<UsageList navigator={navigator}  route={route}/>);
      case 'Profile':
        return (<Profile navigator={navigator} route={route}/>);    
    }
  }

  render() {
    return (
      <Navigator
        initialRoute={routestack[0]}
        renderScene={this.navigatorRenderScene}
      />
    );
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
});


module.exports = OutlineNav;
