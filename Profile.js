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
  ScrollView,
  Dimensions
} from 'react-native';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import {TabLayoutAndroid, TabAndroid} from "react-native-android-kit";

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
    self_photo=<Image source={require('./img/default.jpg')} 
        style={styles.thumbnail}/> ;

  }
    if (this.state.user) {
      return (
        <View style={styles.container}>
        
        <View style={styles.header} >
        {self_photo}
        <Text style={styles.name}>{this.state.user.name}</Text>
        </View>
        
        <View style={styles.tabView}>
        <TabLayoutAndroid style={{height:60}} backgroundColor="#009688" indicatorTabColor="#727272"
          indicatorTabHeight={2} scrollable={false} center={false}>

          <TabAndroid text="user" textSize={16} textColor="white" selectedTextColor="#727272"
                icon="user" iconPosition="top">
          <View style={styles.body}>
          <View style={styles.section1}>
          <Text style={{fontSize: 25, fontWeight: 'bold',marginLeft: 10}}> ABOUT </Text>
           <View style={styles.separator} />
          <Text style={{fontSize: 15, fontWeight: 'bold',marginLeft: 10}}> Name</Text>
          <Text style={{fontSize: 20, margin: 10}}>{this.state.user.name}</Text>
          <View style={styles.separator} />
          <Text style={{fontSize: 15, fontWeight: 'bold',marginLeft: 10}}> Email</Text>
          <Text style={{fontSize: 20, margin: 10}}>{this.state.user.email}</Text>
          <View style={styles.separator} />

          <TouchableOpacity onPress={() => {this._signOut(); }}>
          <Text style={{fontSize: 20, fontWeight: 'bold', marginLeft: 10}}> Log Out </Text>
          </TouchableOpacity>
          </View>
          </View>
          </TabAndroid>

          <TabAndroid text="Favorite" textSize={16} textColor="white" selectedTextColor="#727272"
                icon="heart" iconPosition="top">
            <ScrollView>
            <Text>FloatingButtonAndroid Examples</Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
              Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
              Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.
            </Text>
            </ScrollView>
          </TabAndroid>

          <TabAndroid text="Recent" textSize={16} textColor="white" selectedTextColor="#727272"
                icon="fen" iconPosition="top">
            <Text>Hello, I'm the last tab: nothing to show</Text>
          </TabAndroid>

        </TabLayoutAndroid>
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
    flex:0.2,
    width: width,
    backgroundColor:'#009688',
},
  thumbnail: {
    borderWidth:2,
    borderColor:'#607D8B',
    borderRadius: 100,
    width: 150,
    height: 150,
    marginTop: 30,
  },
  name: {
    fontSize: 25, 
    fontWeight: 'bold', 
    marginTop: 10,
    color: '#FFF',
    },
  section1: {
    flexDirection:'column',

  },
  tabView:{
    flex:0.3,
    alignItems: "stretch",
    backgroundColor:'#FFFFFF',

  },
  body: {
    flex:0.8,
    width: width,
    backgroundColor:'#FFFFFF',

},
separator: {
  backgroundColor: 'rgba(0, 0, 0, 0.1)',
  height: StyleSheet.hairlineWidth,
  marginVertical: 3,
},

});




module.exports=Profile;