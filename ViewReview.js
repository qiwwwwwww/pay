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
var REQUEST_URL='http://100.77.188.23:3000/test5';

class Review extends Component {
   constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
         rowHasChanged: (row1, row2) => row1 !== row2,
      }),
       loaded: false, 
  };
}
componentDidMount() {
    this.fetchData();
  }

  fetchData(){
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.objects),
          loaded: true,
        });
      })
      .done();
      
  } 

  render(){
        if(!this.state.loaded) {
        return this.renderLoadingView();
      }
    return(
       <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderObjects.bind(this)}
            style={styles.listView}
            />
      );
  }

   renderLoadingView() {
  return(
    <View style={styles.container}>
    <Text style={styles.title}>
    Loading comment。。。
    </Text>
    </View>
    );
}

renderObjects(object){

  return(

    <Text style={styles.singleListView}>{object.comment}</Text>

        
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
  listView: {
    marginTop:100,
  },
  singleListView:{
    textAlign: 'center',
    fontSize: 15,
    color:'#727272',
  },
  
});


module.exports=Review;