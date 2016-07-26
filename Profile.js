import React, { Component } from 'react';
import { 
  AppRegistry, 
  StyleSheet, 
  Text, 
  View, 
  ActivityIndicator, 
  TouchableOpacity, 
  Image,
  ListView,
  Dimensions} from 'react-native';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';

var width = Dimensions.get('window').width; //full width

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state={
      user: null
    }
  }

  componentDidMount(){
    this._setupGoogleSignin();
  }


  render(){
    if (!this.state.user) {
          return (
            <View style={styles.header}>
              <GoogleSigninButton style={{width: 312, height: 48, marginTop:300}} color={GoogleSigninButton.Color.Light} size={GoogleSigninButton.Size.Wide} onPress={() => { this._signIn(); }}/>
            </View>
          );

  }
    var self_photo;
    if (this.state.user.photo !== null)
  {
    self_photo=
      <Image source={{uri: this.state.user.photo}}
        style={styles.thumbnail}/>;

  } else{
    self_photo=<Image source={require('./img/app.png')} 
        style={styles.thumbnail}/> ;

  }
    if (this.state.user) {
      return (
        <View style={styles.container}>
        
        <View style={styles.header} >
        {self_photo}
        <Text style={styles.name}>{this.state.user.name}</Text>
        <View style={styles.image_style}>
        <Image source={require('./img/user.png')} style={styles.image}/>
        <Image source={require('./img/detail.png')} style={styles.image}/>
        <Image source={require('./img/star.png')} style={styles.image}/>
        <Image source={require('./img/edit.png')} style={styles.image}/>
        <TouchableOpacity onPress={() => {this._signOut(); }}>
        <Image source={require('./img/del.png')} style={styles.image}/>
          </TouchableOpacity>

        </View>
        </View>

          <View style={styles.separator} />
          <View style={styles.body}>

          <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 20}}>Welcome {this.state.user.name}</Text>
          <Text>Your email is: {this.state.user.email}</Text>
          <Text>Your photo is: </Text>

        </View>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#FFFFFF',
  },
  header: {
    alignItems: 'center',
    flex:0.25,
    width: width,
    backgroundColor:'#009688',
},
  thumbnail: {
    borderWidth:2,
    borderColor:'#B6B6B6',
    borderRadius: 100,
    width: 120,
    height: 120,
    marginTop: 30,
  },
  name: {
    fontSize: 25, 
    fontWeight: 'bold', 
    marginTop: 10,
    color: '#FFF',
    },
  image_style: {
    flexDirection:'row',
  },
  image:{
    width: 30,
    height: 30,
    marginTop:30,
    marginLeft:20,
    marginRight:20,
        padding: 10,

  },
  body: {
    flex:0.25,
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    backgroundColor:'#FFFFFF',
},

});




module.exports=Profile;