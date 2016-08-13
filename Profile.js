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

      return (
          <Text style={{backgroundColor:'black'}}>如今编程成为了一个越来越重要的「技能」：作为设计师，懂一些编程可能会帮你更好地理解自己的工作内容；作为创业者，技术创始人的身份则会让你的很多工作显得更容易。而作为刚想入门的新手，面对眼前海量的信息，或许根本不知道从哪里开始；入门轻松度过初级材料的学习后，发现学习越来越困难，陡峭的学习曲线又让你望而却步；你知道如何在页面上打印输出一些文本行，但是你不知道何时该进行一个真正的有用的项目；你不清楚自己还有哪些不知道的东西，你甚至搞不清下一步该学什么。</Text>

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