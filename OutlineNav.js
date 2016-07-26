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

var OutlinePage = require('./OutlinePage');
var DetailPage = require('./DetailPage');

const routestack = [{name:"page1", title:"outline"},{name: "page2", title:"detail"}];

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
      case 'page1':
        return (<OutlinePage navigator={navigator}  route={route}/>);
      case 'page2':
        return (<DetailPage navigator={navigator} route={route}/>);    
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
