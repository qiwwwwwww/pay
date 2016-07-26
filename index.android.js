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
  Image
} from 'react-native';


var OutlineNav = require('./OutlineNav');
var FrontNav = require('./FrontNav');
var SearchNav = require('./SearchNav');
var Profile = require('./Profile');


var ScrollableTabView = require('react-native-scrollable-tab-view');

class pay_by_data extends Component {
  render(){
    return (
      <ScrollableTabView 
        tabBarPosition='bottom'
        tabBarUnderlineColor='#009688'
        tabBarActiveTextColor='#009688'
        tabBarInactiveTextColor='#607D8B'
            initialPage={0}>
        <FrontNav tabLabel="Featured" />
        <OutlineNav tabLabel="Popular" />
        <SearchNav tabLabel="Search" />
        <Profile tabLabel="Profile" />

      </ScrollableTabView>

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
    image:{
    width: 10,
    height: 10,

  },
});


AppRegistry.registerComponent('pay_by_data', () => pay_by_data);
