import React, { Component } from 'react';
var ReactNative = require('react-native');
var {
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableHighlight,
  TextInput,
  ActivityIndicator,
  TouchableWithoutFeedback
} = ReactNative;

var IP_ADDRESS = 'http://100.77.188.44:3000';  
var REQUEST_URL = IP_ADDRESS+'/appstore';
var IMG_URL=IP_ADDRESS+'/files/';
var FILENAME_URL = IP_ADDRESS+'/filename/appstore/';
const dismissKeyboard = require('dismissKeyboard')


function urlForQueryAndPage(key, value) {

  return FILENAME_URL + value;
};

class SearchPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
    searchString: '',
    isLoading: false,
    message: ''

    };
  }

  _handleResponse(filename) {
    this.setState({ isLoading: false });
    if (filename.length >= 1) {
    var user=this.props.route.passProps.user;
    if (user!==null) {
      this.props.navigator.push({
      id: 'SearchResults',
      title: 'SearchResults',
      passProps:{
        Filename: filename,
        User: user,
        },
    });
    }else{
      this.props.navigator.push({
      id: 'SearchResults',
      title: 'SearchResults',
      passProps:{
        Filename: filename,
        User: {
          'name':'guest',
        },
        },
      });
    }
    } else {
      this.setState({ message: 'App name not recognized; please try again.'});
    }
  }

  _executeQuery(query) {
    this.setState({ isLoading: true, message: '' });
    fetch(query)
    .then(response => response.json())
    .then(json => this._handleResponse(json.filename))
    .catch(error =>{
       this.setState({
        isLoading: false,
        message: 'Can not search for empty string. '
     });
       });
  }

 onSearchPressed() {
    var query = urlForQueryAndPage('app_name', this.state.searchString);
    this._executeQuery(query);
  }

  onSearchTextChanged(event) {
    this.setState({ searchString: event.nativeEvent.text });
  }
 

  render() {
    var spinner;
    if(this.state.isLoading)
      spinner=
      <ActivityIndicator
        size="large"/>;
    else
      spinner=<View/>;

    return (
      <TouchableWithoutFeedback onPress={()=> dismissKeyboard()}>
        <Image source={require('./img/poly.jpg')} style={styles.container}>
            <View style={styles.textView}>
              <Text style={styles.topMessage}>
                  Search favorite apps to download!
                </Text>
                  {spinner}
                <Text style={styles.errorMessage}>{this.state.message}</Text>

                <View style={{flex: 1, flexDirection: 'row'}}>
                  <View style={styles.searchView}>
                    <TextInput
                      style={styles.searchInput}
                      value={this.state.searchString}
                      onChange={this.onSearchTextChanged.bind(this)}
                      placeholder='Search via name'/>
                  </View>
                  <View style={styles.imageView}>
                    <TouchableWithoutFeedback style={styles.button}
                        onPress={this.onSearchPressed.bind(this)}>
                      
                      <Image source={require('./img/search.png')}
                            style={{width: 45, height: 45, marginLeft:10,marginTop:5}} />

                    </TouchableWithoutFeedback>
                  </View>
                </View>
          </View>  
        </Image>


       </TouchableWithoutFeedback> 

    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection:'row',
    backgroundColor:'transparent',
  },
  textView:{
    marginTop:100,
  },
  searchView:{
    marginLeft:40,
    flex:3,
    borderRadius: 20,

  },
  imageView:{
    flex:1,
  },
  topMessage: {
    marginBottom: 20,
    marginLeft:30,
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
    fontWeight:'bold'
  },
  errorMessage: {
    marginBottom: 10,
    fontSize: 15,
    textAlign: 'center',
    color: 'white',
    marginTop: 50,
  },
  button: {
      marginTop:10,
      borderRadius: 20,
  },
  searchInput: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',

  },
});

module.exports = SearchPage;
