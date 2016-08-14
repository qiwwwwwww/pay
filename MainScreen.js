'use strict';

import React, { Component } from 'react';
import{
  StyleSheet,
  Text,
  View,
  Image,
  Navigator,
  TouchableOpacity,
  DrawerLayoutAndroid,
  TouchableHighlight,
  BackAndroid,

} from 'react-native';

var OutlinePage = require('./OutlinePage');
var SearchPage = require('./SearchPage');
var Profile = require('./Profile');
var FrontPage = require('./FrontPage');
var DetailPage = require('./DetailPage');
var SearchResults = require('./SearchResults');
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';

var _navigator; //用来保存navigator
BackAndroid.addEventListener('hardwareBackPress', () => {
    if (_navigator.getCurrentRoutes().length === 1) {
        return false;
    }
    _navigator.pop();
    return true;
});

var Part;
class MainScreen extends Component{
  constructor(props) {
    super(props);
    this.state={
      user:null,
      commet: 'hello',
    }
  }

  componentDidMount(){
    this._setupGoogleSignin();
  }


  openDrawer() {
    this.refs['DRAWER'].openDrawer()
  }

  configureScene(route, routeStack) {
      return Navigator.SceneConfigs.FloatFromRight;
  }
  

  renderScene(router, navigator) {
      Part = null;
      _navigator = navigator;

      switch (router.id) {
          case 'OutlinePage':
              Part = OutlinePage;
              break;
          case 'SearchPage':
              Part = SearchPage;
              break;
          case 'DetailPage':
              Part = DetailPage;
              break;    
          case 'FrontPage':
              Part = FrontPage;
              break;
          case 'SearchResults':
              Part = SearchResults;
              break;    
          case 'Profile':
              Part = Profile;
              break;
      }

      //注意这里将navigator作为属性props传递给了各个场景组件
      return <Part navigator = {navigator} route={router} />;
      }

  onNavPress(target) {
        _navigator.push({
            id: target,
            passProps:{user: this.state.user},

        });
        this.refs['DRAWER'].closeDrawer();
    
    }

      render() {
        if (!this.state.user) {
          var navigationView = (
            <View style={{flex: 1, backgroundColor: '#607D8B'}}>
              <Text style={{margin: 10, fontSize: 15, textAlign: 'left', color: '#000000'}}>I'm in the Drawer!</Text>
              <GoogleSigninButton style={{width: 230, height: 48, marginTop:300}} color={GoogleSigninButton.Color.Light} size={GoogleSigninButton.Size.Wide} onPress={() => { this._signIn(); }}/>
              <Text style={styles.button} onPress={() => this.onNavPress('OutlinePage')}>OutlinePage</Text>
              <Text style={styles.button} onPress={() => this.onNavPress('FrontPage')}>FrontPage</Text>
              <Text style={styles.button} onPress={() => this.onNavPress('SearchPage')}>SearchPage</Text>
              <Text style={styles.button} onPress={() => this.onNavPress('Profile')}>Profile</Text>
            </View>
          );
      return (
          <DrawerLayoutAndroid
            ref={'DRAWER'}
            drawerWidth = {200}
            drawerPosition={DrawerLayoutAndroid.positions.Left}
            renderNavigationView={() => navigationView}>
            <Navigator
                initialRoute ={{id: 'FrontPage'}}
                configureScene = {this.configureScene}
                renderScene = {this.renderScene}
                navigationBar={
                <Navigator.NavigationBar
                    style={styles.navBar}
                    routeMapper={{
                      LeftButton:(route, navigator, index, navState) => {
                            switch(route.id){
                              case 'FrontPage':
                              case 'OutlinePage':
                              case 'SearchPage':
                              case 'Profile':
                                return(
                                    <TouchableOpacity
                                        style={styles.navBarLeftButton}
                                        onPress={() => this.refs['DRAWER'].openDrawer()}>
                                        <Image
                                            source={require('./img/menu.png')}
                                            style={{width: 40, height: 40, marginLeft: 8, marginRight: 8}} />
                                    </TouchableOpacity>
                                         );
                              default:
                                return (
                                    <TouchableOpacity
                                      style={styles.navBarLeftButton}
                                      onPress={() => {_navigator.pop()}}>
                                      <Image
                                         source={require('./img/return.png')}
                                         style={{width: 30, height: 30, marginLeft: 10}} />
                                    </TouchableOpacity>
                                      );
                                    }
                                  },
                      RightButton:(route, navigator, index, navState)=> {
                                return (
                                     <TouchableOpacity
                                         style={styles.navBarRightButton}>
                                         <Image
                                            source={require('./img/menu.png')}
                                            style={{width: 30, height: 30, marginLeft: 10}} />
                                      </TouchableOpacity>
                                      ); 
                                    },
 
                      Title:(route, navigator, index, navState)=> {
                                return (
                                 <Text style={[styles.navBarText, styles.navBarTitleText]}>
                                    {route.id}
                                 </Text>
                             );
                          },
                      }}
                    />
                  }
                  >
              </Navigator>
            </DrawerLayoutAndroid>

          );

        }
        var self_photo;
        if (this.state.user.photo !== null)
          {
            self_photo=
              <Image source={{uri: this.state.user.photo}}
                style={styles.thumbnail}/>;

          } else{
            self_photo=<Image source={require('./img/default.jpg')} 
                style={styles.thumbnail}/> ;

          }
        if (this.state.user) {

          var navigationView = (
            <View style={{flex: 1, backgroundColor: '#607D8B'}}>
              <Text style={{margin: 10, fontSize: 15, textAlign: 'left', color: '#000000'}}>I'm in the Drawer!</Text>
              <Text style={{margin: 10, fontSize: 15, textAlign: 'left', color: '#000000'}}>{this.state.user.name}</Text>
              <Text style={styles.button} onPress={() => {this._signOut();}}> Log Out</Text>
              <Text style={styles.button} onPress={() => this.onNavPress('Profile')}>My Profile</Text>
              <Text style={styles.button} onPress={() => this.onNavPress('OutlinePage')}>OutlinePage</Text>
              <Text style={styles.button} onPress={() => this.onNavPress('FrontPage')}>FrontPage</Text>
              <Text style={styles.button} onPress={() => this.onNavPress('SearchPage')}>SearchPage</Text>

            </View>
          );

         
          return (
          <DrawerLayoutAndroid
            ref={'DRAWER'}
            drawerWidth = {200}
            drawerBackgroundColor="#607D8B"
            drawerPosition={DrawerLayoutAndroid.positions.Left}
            renderNavigationView={() => navigationView}>
              <Navigator
                  initialRoute ={{id: 'FrontPage'}}
                  configureScene = {this.configureScene}
                  renderScene = {this.renderScene}
                  navigationBar={
                    <Navigator.NavigationBar
                      style={styles.navBar}
                      routeMapper={{
                         LeftButton:(route, navigator, index, navState) => {
                            switch(route.id){
                              case 'FrontPage':
                              case 'OutlinePage':
                              case 'SearchPage':
                              case 'Profile':
                                return(
                                    <TouchableOpacity
                                        style={styles.navBarLeftButton}
                                        onPress={() => this.refs['DRAWER'].openDrawer()}>
                                        <Image
                                            source={require('./img/menu.png')}
                                            style={{width: 40, height: 40, marginLeft: 8, marginRight: 8}} />
                                    </TouchableOpacity>
                                         );
                              default:
                                return (
                                    <TouchableOpacity
                                      style={styles.navBarLeftButton}
                                      onPress={() => {_navigator.pop()}}>
                                      <Image
                                         source={require('./img/return.png')}
                                         style={{width: 30, height: 30, marginLeft: 10}} />
                                    </TouchableOpacity>
                                      );
                                    }
                                  },
                        RightButton:(route, navigator, index, navState)=> {
                              return (
                                     <TouchableOpacity
                                         style={styles.navBarRightButton}>
                                         <Image
                                            source={require('./img/menu.png')}
                                            style={{width: 30, height: 30, marginLeft: 10}} />
                                      </TouchableOpacity>
                                      ); 
                                    },
 
                         Title:(route, navigator, index, navState)=> {
                             return (
                                 <Text style={[styles.navBarText, styles.navBarTitleText]}>
                                    {route.id}
                                 </Text>
                             );
                          },
                      }}
                    />
                  }
                >
              </Navigator>
            </DrawerLayoutAndroid>

          );
      }
  }
  async _setupGoogleSignin() {
    try {
      await GoogleSignin.hasPlayServices({ autoResolve: true });
      await GoogleSignin.configure({
        scopes: ['https://www.googleapis.com/auth/userinfo.profile'],
        webClientId: '180845818599-aob33qcolnb66ec3e2afkjsl8drgu4sf.apps.googleusercontent.com',
        offlineAccess: true
      });

      const user = await GoogleSignin.currentUserAsync();
      console.log(user);
      this.setState({user});
       _navigator.push({
            id: 'FrontPage',
            passProps:{user: this.state.user},

        });

    }
    catch(err) {
      console.log("Play services error", err.code, err.message);
    }
  }

  _signIn() {
    GoogleSignin.signIn()
    .then((user) => {
      console.log(user);
      this.setState({user: user});
       _navigator.push({
            id: 'FrontPage',
            passProps:{user: this.state.user},

        }); 

    })
    .catch((err) => {
      console.log('WRONG SIGNIN', err);
    })
    .done();
  }

  _signOut() {
    GoogleSignin.revokeAccess().then(() => GoogleSignin.signOut()).then(() => {
      this.setState({user: null});
    })
    .done();
  }

}   

var styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        flex: 1, //flex-grow:1 等分剩余空间
        justifyContent: 'center', //定义了项目在主轴上的对齐方式
        alignItems: 'center', //定义项目在交叉轴上如何对齐
    },
    button: {
        borderRadius: 5,
        marginTop: 20,
        color:'#000000',
    },
    navBar: {
        backgroundColor: '#009688',
     },
    navBarText: {
         color: 'white',
         fontSize: 16,
         marginVertical: 10,
     },
    navBarTitleText: {
         fontWeight: '500',
         marginVertical: 9,
         color:"#FFFFFF"
     },
    navBarLeftButton: {
         paddingLeft: 10,
     },
    navBarRightButton: {
         padding: 10,
         paddingTop: 5
     },

});


module.exports = MainScreen;

