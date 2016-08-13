

'use strict';

import React, { Component } from 'react';
import{
  StyleSheet,
  Text,
  View,
  Image,
  BackAndroid,
  ToolbarAndroid,
  Navigator,
  DrawerLayoutAndroid,
  ListView,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';

var _navigate;

class UsageList extends Component {
	constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2
            }),
         user: null,

        };
        _navigate = this.props.navigate;
    }

  componentDidMount() {
        this._setupGoogleSignin();
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(['FrontPage', 'OutlinePage', 'SearchPage'])
        });
    }

  _renderMenuItem(item) {
        return(
            <TouchableHighlight style={styles.menuContainer} onPress={()=> this._onItemSelect(item)}>
            <Text style={{color:'#FFFFFF'}}>{item}</Text>
            </TouchableHighlight>
        );
    }
    
    _onItemSelect(item) {
        _navigate(item);
    }

    render() {

        if (!this.state.user) {
          return(
            <View style={styles.container}>
                <TouchableOpacity onPress={() => {this._signIn(); }}>
                 <View style={{marginBottom: 50}}>
                   <Text style={{color:'#FFFFFF'}}>Log in</Text>
                 </View>
                 </TouchableOpacity>
              <ListView
                  dataSource={this.state.dataSource}
                  renderRow={(item) => this._renderMenuItem(item)}
              />
            </View>
          );
      }

      var self_photo;
      if (this.state.user.photo !== null)
      {
          self_photo=
          <Image source={{uri: this.state.user.photo}}
            style={styles.avatar}/>;
      } else{
          self_photo=<Image source={require('./img/default.jpg')} 
          style={styles.avatar}/> ;

      }
      if (this.state.user) {
        return (
          <View style={styles.container}>
            <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 20}}>Welcome {this.state.user.name}</Text>
            
            {self_photo}
            
            <TouchableOpacity onPress={() => {this._signOut(); }}>
             <View style={{marginTop: 50}}>
               <Text>Your profile</Text>
             </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {this._signOut(); }}>
             <View style={{marginTop: 50}}>
               <Text>Log out</Text>
             </View>
            </TouchableOpacity>
            <ListView
                dataSource={this.state.dataSource}
                renderRow={(item) => this._renderMenuItem(item)}
            />
          </View>  
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
        backgroundColor: '#607D8B',
        flex:1
    },
  avatar: {
    borderWidth:2,
    borderColor:'#607D8B',
    borderRadius: 100,
    width: 48,
    height: 48,
    marginTop: 30,
    marginLeft:20,
  },
  login:{
    fontSize:35,

  },
  menuItem: {
        color: '#333',
        padding: 10,
        textAlign: 'left'
    }
});


module.exports = UsageList;

