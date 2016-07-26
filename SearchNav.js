
import React, {
  Component,
} from 'react';
import {
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
  Navigator,
  BackAndroid,
  TouchableHighlight
} from 'react-native';

var SearchPage = require('./SearchPage');
var SearchResults = require('./SearchResults');
var DetailPage = require('./DetailPage');

const routestack = [{name:"page1", title:"search"},{name: "page2", title:"results"}, {name: "page3", title:"detail"}];

var _navigator;
BackAndroid.addEventListener('hardwareBackPress', () => {
  if (_navigator && _navigator.getCurrentRoutes().length > 1) {
    _navigator.pop();
    return true;
  }
  return false;
});


class SearchNav extends Component{

  navigatorRenderScene(route, navigator){
    _navigator=navigator;
    switch(route.name){
      case 'page1':
        return (<SearchPage navigator={navigator}  route={route}/>);
      case 'page2':
        return (<SearchResults navigator={navigator} route={route}/>);
      case 'page3':
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


module.exports = SearchNav;