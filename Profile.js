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
  Dimensions,
  TextInput,
  TouchableHighlight,
  Alert
} from 'react-native';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import {TabLayoutAndroid, TabAndroid} from "react-native-android-kit";

var width = Dimensions.get('window').width; //full width

class Profile extends Component {
    



  render(){
      var User=this.props.route.passProps.user;
      var self_photo;
      if (User.photo !== null)
      {
          self_photo=
              <Image source={{uri: User.photo}}
                style={styles.thumbnail}/>;
      } else{
          self_photo=<Image source={require('./img/default.jpg')} 
                      style={styles.thumbnail}/> ;

      }
      return (
         <View style={styles.container}>
        
        <View style={styles.header} >
        {self_photo}
        <Text style={styles.name}>{User.name}</Text>
        </View>
        
        <View style={styles.tabView}>
        <TabLayoutAndroid style={{height:60}} backgroundColor="#009688" indicatorTabColor="#727272"
          indicatorTabHeight={2} scrollable={false} center={false}>

          <TabAndroid text="user" textSize={16} textColor="white" selectedTextColor="#727272"
                icon="user" iconPosition="top">
          <View style={styles.body}>
          <View style={styles.section1}>
          <Text style={styles.section_name}> ABOUT </Text>
           <View style={styles.separator} />
          <Text style={styles.section_content_one}> Name</Text>
          <Text style={styles.section_content_two}>{User.name}</Text>
          <View style={styles.separator} />
          <Text style={styles.section_content_one}> Email</Text>
          <Text style={styles.section_content_two}>{User.email}</Text>
          <View style={styles.separator} />

          <TouchableOpacity onPress={() => {this._signOut(); }}>
          <Text style={{fontSize: 20, fontWeight: 'bold', marginLeft: 10, color:'#727272'}}> Log Out </Text>
          </TouchableOpacity>
          </View>
          </View>
          </TabAndroid>

          <TabAndroid text="Favorite" textSize={16} textColor="white" selectedTextColor="#727272"
                icon="heart" iconPosition="top">
            <ScrollView>
            <Text>FloatingButtonAndroid Examples</Text>

            </ScrollView>
          </TabAndroid>

          <TabAndroid text="Recent" textSize={16} textColor="white" selectedTextColor="#727272"
                icon="fen" iconPosition="top">
            <Text style={{color:'#727272'}}>Hello, I'm the last tab: nothing to show</Text>
          </TabAndroid>

        </TabLayoutAndroid>
        </View>

        </View>

      );
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
    width: 120,
    height: 120,
    marginTop: 70,
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
  section_name:{
    fontSize: 25, 
    fontWeight: 'bold',
    marginLeft: 10, 
    color:'#727272'
  },
  section_content_one:{
    fontSize: 15, 
    fontWeight: 'bold',
    marginLeft: 10,
    color:'#727272'
  },
  section_content_two:{
    fontSize: 20, 
    marginLeft: 10,
    color:'#727272'
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
button: {
      backgroundColor: '#eeeeee',
      padding: 10,
      marginRight: 5,
      marginLeft: 5,
  },

});


module.exports=Profile;