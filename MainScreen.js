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
import Modal from 'react-native-root-modal';

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


var _navigator; 
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
      visible: false
    }
  }

  componentDidMount(){
    this._setupGoogleSignin();
  }

  showModal = () => {
        this.setState({
            visible: true
        });
    };

  hideModal = () => {
      this.setState({
          visible: false
      });
  };


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
    var navigationView;
    if (!this.state.user) {
      navigationView = (
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
    }

    if (this.state.user) {
   
    var self_photo;
    if (this.state.user.photo !== null)
      {
        self_photo=
          <Image source={{uri: this.state.user.photo}}
            style={styles.thumbnail}/>;
      } else{
        self_photo=
          <Image source={require('./img/default.png')} 
              style={styles.thumbnail}/> ;
      }
      navigationView = (
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
      }
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
                                            style={styles.navBarIcon} />
                                    </TouchableOpacity>
                                         );
                              default:
                                return (
                                    <TouchableOpacity
                                      style={styles.navBarLeftButton}
                                      onPress={() => {_navigator.pop()}}>
                                      <Image
                                         source={require('./img/return.png')}
                                         style={styles.navBarIcon} />
                                    </TouchableOpacity>
                                      );
                                    }
                                  },
                      RightButton:(route, navigator, index, navState)=> {
                               return (
                                    <View>
                                     <TouchableOpacity
                                         style={styles.navBarRightButton}
                                                 onPress={this.showModal}>
                                         <Image
                                            source={require('./img/about.png')}
                                            style={styles.navBarIcon} />
                                      </TouchableOpacity>
                                      <Modal 
                                        style={styles.modal}
                                        visible={this.state.visible}>
                                        <TouchableHighlight
                                            style={[styles.button_01, styles.close]}
                                            underlayColor="#aaa"
                                            onPress={this.hideModal}
                                            >
                                        <Image
                                         source={require('./img/close.png')}
                                         style={{width: 20, height: 20, marginLeft: 10 }} />

                                        </TouchableHighlight>

                                        <View style={styles.modalContainer}>
                                            <Text style={styles.aboutTitle}>About Pay by Data</Text>
                                            <Text style={styles.aboutContent}>With the spreading usage of mobile devices, user generated data collection becomes a grey legal area issue. The reasons are due to less obvious position of usage statements and vague notifications by developers. In other words, there is a gap between users and developers on mobile data collections. </Text>
                                            <View style={styles.separator} />

                                            <Text style={styles.aboutSubTitle}>How does this work?</Text>
                                              <View style={{flex: 1, flexDirection: 'row', marginTop:10}}>
                                              
                                                <View>
                                                  <Image
                                                    source={require('./img/find.png')}
                                                    style={{width: 40, height: 40, marginLeft: 10,marginRight:10}} />
                                                </View>
                                                
                                                <View>
                                                  <Text style={styles.step}>STEP 1: Find your favourite App.</Text>
                                                </View>
                                              
                                              </View>

                                              <View style={{flex: 1, flexDirection: 'row', marginTop:10,}}>
                                              
                                                <View>
                                                  <Image
                                                    source={require('./img/download.png')}
                                                    style={{width: 40, height: 40, marginLeft: 10,marginRight:10}} />
                                                </View>
                                                
                                                <View>
                                                  <Text style={styles.step}>STEP 2: Download it.</Text>
                                                </View>

                                              </View>

                                              <View style={{flex: 1, flexDirection: 'row', marginTop:10,}}>
                                              
                                                <View>
                                                  <Image
                                                    source={require('./img/enjoy.png')}
                                                    style={{width: 40, height: 40, marginLeft: 10,marginRight:10}} />
                                                </View>
                                                
                                                <View>
                                                  <Text style={styles.step}>STEP 3: Enjoy using it.</Text>
                                                </View>

                                              </View>
                                              <View style={styles.separator} />
                                              <Text style={styles.aboutSubTitle}>Please contact elfishing07@gmail.com for any question.</Text>
                                              <Text style={styles.copyRight}>Copyright © Pay By Data 2016</Text>

                                        </View>
                                      </Modal>
                                      </View>
                                      ); 
                                   }, 

                      Title:(route, navigator, index, navState)=> {
                                 switch (route.id) {
                                    case 'OutlinePage':
                                      return (
                                      <Text style={styles.navBarText}>All Apps</Text>
                                      );

                                    case 'SearchPage':
                                                  return (
                                      <Text style={styles.navBarText}>Search</Text>
                                      );
                                    case 'DetailPage':
                                                return (
                                      <Text style={styles.navBarText}>Details</Text>
                                      );   
                                    case 'FrontPage':
                                                  return (
                                      <Text style={styles.navBarText}>Featured</Text>
                                      );
                                    case 'SearchResults':
                                                 return (
                                      <Text style={styles.navBarText}>Search Results</Text>
                                      ); 
                                    case 'Profile':
                                                 return (
                                      <Text style={styles.navBarText}>Your Profile</Text>
                                      );
                                    case 'Review':
                                                  return (
                                      <Text style={styles.navBarText}>Write A Review</Text>
                                      );  
                                    case 'ViewReview':
                                                  return (
                                      <Text style={styles.navBarText}>View Reviews</Text>
                                      );  
                                    case 'Category':
                                                  return (
                                      <Text style={styles.navBarText}>Category</Text>
                                      ); 
                               
                                }
                          
                          },
                      }}
                    />
                  }
                  >
              </Navigator>
            </DrawerLayoutAndroid>

          );

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
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
    },
    button: {
        borderRadius: 5,
        marginTop: 20,
        color:'#000000',
    },
    navBar: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
     },
    navBarText: {
        fontWeight: 'bold',
        marginLeft:70,
        color: 'white',
        fontSize: 20,
        marginVertical: 10,
        marginTop:12,
     },
    navBarLeftButton: {
         paddingLeft: 10,
         marginTop:5,
     },
    navBarIcon:{
        width: 30, 
        height: 30, 
        marginLeft: 8, 
        marginRight: 8, 
        marginTop:8,
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
    button_01: {
        padding: 10
    },
    close: {
        position: 'absolute',
        right: 20,
        top: 40,
    },
    modalContainer: {
        marginTop:80,
        marginLeft:20,
        marginRight:20,
    },
    aboutTitle: {
        color: '#fff',
        fontSize:25,
        fontWeight:'bold',
        textAlign:'center',
    },
    aboutContent: {
        color: '#fff',
        fontSize:15,
        marginTop:5,
    },
    aboutSubTitle: {
        color: '#fff',
        fontSize:20,
        fontWeight:'bold',
        textAlign:'left',
        marginTop:10
    },
    step: {
        color: '#fff',
        fontSize:15,
        fontWeight:'bold',
        textAlign:'left',
        marginTop:10
    },
    copyRight: {
        color: '#fff',
        fontSize:10,
        fontWeight:'bold',
        textAlign:'center',
        marginBottom:10,
        marginTop:20,
    },
    modal: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    separator: {
        marginTop:10,
        backgroundColor: '#FFFFFF',
        height: StyleSheet.hairlineWidth,
        marginVertical: 10,
        marginLeft:10,
        marginRight:10
  },
});


module.exports = MainScreen;

