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
var Review = require('./Review');
var ViewReview =require('./ViewReview');
var Category =require('./Category');
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
var MD = require('react-native-material-design');
var {
    Card, Button, Avatar, Drawer, Divider, COLOR, TYPO
} = MD;


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
          case 'Review':
              Part = Review;
              break;    
          case 'ViewReview':
              Part = ViewReview;
              break;  
          case 'Category':
              Part = Category;
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

        this.setState({
            route: target
          });

        this.refs['DRAWER'].closeDrawer();
    
    }



      render() {
        if (!this.state.user) {
          var navigationView = (
            <Drawer theme='dark'>
            <Drawer.Header image={<Image source={require('./img/background.jpg')} />}>
                <View style={styles.header}>
                <Image source={require('./img/default.png')} style={styles.thumbnail}/>
                    <Text style={[styles.text, COLOR.paperGrey50, TYPO.paperFontSubhead]}>Guest</Text>
                </View>
            </Drawer.Header>

            <Drawer.Section
                  items={[{
                    icon: 'home',
                    value: 'Featured',
                    active: !this.state.route || this.state.route  === 'FrontPage',
                    onPress: () => this.onNavPress('FrontPage'),
                    onLongPress: () => this.onNavPress('FrontPage')
                },
                {
                    icon: 'message',
                    value: 'All Apps',
                    active: !this.state.route  || this.state.route  === 'OutlinePage',
                    onPress: () => this.onNavPress('OutlinePage'),
                    onLongPress: () => this.onNavPress('OutlinePage')
                },
                {
                    icon: 'search',
                    value: 'Search',
                    active: !this.state.route  || this.state.route  === 'SearchPage',
                    onPress: () => this.onNavPress('SearchPage'),
                    onLongPress: () => this.onNavPress('SearchPage')
                },
                {
                    icon: 'settings',
                    value: 'Log in via Google',
                    onPress: () => this._signIn(),
                    onLongPress: () => this._signIn()
                }]}
            />
        </Drawer>
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
                            switch(route.id){
                              case 'Review':
                                return (
                                     <TouchableOpacity
                                         style={styles.navBarRightButton}>
                                         <Image
                                            source={require('./img/star.png')}
                                            style={{width: 30, height: 30, marginLeft: 10}} />
                                      </TouchableOpacity>
                                );

                              default:
                                return (
                                     <TouchableOpacity
                                         style={styles.navBarRightButton}>
                                         <Image
                                            source={require('./img/like.png')}
                                            style={{width: 30, height: 30, marginLeft: 10}} />
                                      </TouchableOpacity>
                                      ); 
                                    }
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
            self_photo=<Image source={require('./img/default.png')} 
                style={styles.thumbnail}/> ;

          }
        if (this.state.user) {

            var navigationView = (
            <Drawer theme='dark'>
            <Drawer.Header image={<Image source={require('./img/background.jpg')} />}>
                <View style={styles.header}>
                      {self_photo}
                    <Text style={[styles.text, COLOR.paperGrey50, TYPO.paperFontSubhead]}>{this.state.user.name}</Text>
                </View>
            </Drawer.Header>

            <Drawer.Section
                  items={[{
                    icon: 'home',
                    value: 'Featured',
                    active: this.state.route  === 'FrontPage',
                    onPress: () => this.onNavPress('FrontPage'),
                    onLongPress: () => this.onNavPress('FrontPage')
                },
                {
                    icon: 'message',
                    value: 'ALL Apps',
                    active: this.state.route  === 'OutlinePage',
                    onPress: () => this.onNavPress('OutlinePage'),
                    onLongPress: () => this.onNavPress('OutlinePage')
                },
                {
                    icon: 'search',
                    value: 'Search',
                    active: this.state.route  === 'SearchPage',
                    onPress: () => this.onNavPress('SearchPage'),
                    onLongPress: () => this.onNavPress('SearchPage')
                },
                {
                    icon: 'face',
                    value: 'My Profile',
                    active: this.state.route  === 'Profile',
                    onPress: () => this.onNavPress('Profile'),
                    onLongPress: () => this.onNavPress('Profile')
                },
                {
                    icon: 'settings',
                    value: 'Log Out',
                    onPress: () => this._signOut(),
                    onLongPress: () => this._signOut()
                }
                ]}
            />
        </Drawer>
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
                                         style={{width: 20, height: 20, marginLeft: 10 }} />
                                    </TouchableOpacity>
                                      );
                                    }
                                  },
                        RightButton:(route, navigator, index, navState)=> {
                            switch(route.id){
                              case 'Review':
                                return (
                                     <TouchableOpacity
                                         style={styles.navBarRightButton}>
                                         <Image
                                            source={require('./img/star.png')}
                                            style={{width: 30, height: 30, marginLeft: 10}} />
                                      </TouchableOpacity>
                                );

                              default:
                              return (
                                     <TouchableOpacity
                                         style={styles.navBarRightButton}>
                                         <Image
                                            source={require('./img/like.png')}
                                            style={{width: 30, height: 30, marginLeft: 10}} />
                                      </TouchableOpacity>
                                      ); 
                                    }
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
         marginTop:5,
     },
    navBarRightButton: {
         padding: 10,
         paddingTop: 5
     },
  thumbnail: {
    borderWidth:2,
    marginLeft:20,
    borderColor:'#607D8B',
    borderRadius: 100,
    width: 100,
    height: 100,
    marginTop: 20,
  },

});


module.exports = MainScreen;

