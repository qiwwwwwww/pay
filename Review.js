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

class Review extends Component {
  constructor(props) {
    super(props);
    this.state={
      comment: 'hello',
    }
  }  

  _onPressButtonPOST() {

        fetch("http://100.77.188.66:3000/test5", {
          method: "POST", 
          body: JSON.stringify({
            name: this.props.route.passProps.User.name,
            email:this.props.route.passProps.User.email,
            comment: this.state.comment,
          }),
          headers:{
            'Content-Type': 'application/json', 
          }
        })
        .then((response) => response.json())
        .then((responseData) => {
            Alert.alert(
                "POST Response",
                "Response Body -> " + JSON.stringify(responseData.body)
            )
        })
        .done();
    }

  render(){
        var user = this.props.route.passProps.User;

      return (
        <View style={styles.container}>
          <TextInput
                  style={{height: 200, borderColor: 'gray', borderWidth: 1, color:'#727272'}}
                  onChangeText={(comment) => this.setState({comment})}
                  value={this.state.comment}
                />
                <TouchableHighlight onPress={this._onPressButtonPOST.bind(this)} style={styles.button}>
                  <Text style={{color:'#727272'}}>POST</Text>
                </TouchableHighlight>
                <Text style={{color:'#727272'}}>{user.name}</Text>
 
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
    marginTop:200,
  },
  
});


module.exports=Review;