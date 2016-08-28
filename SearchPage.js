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
  ActivityIndicator
} = ReactNative;

var IP_ADDRESS = 'http://100.77.188.56:3000';  
var REQUEST_URL = IP_ADDRESS+'/appstore';
var IMG_URL=IP_ADDRESS+'/files/';
var FILENAME_URL = IP_ADDRESS+'/filename/appstore/';


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
        message: 'Something bad happened ' + error
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
      <View style={styles.container}>
        <Text style={styles.description}>
          Search for apps to download!
        </Text>
        {spinner}
        <Text style={styles.errorMessage}>{this.state.message}</Text>
        <Text style={styles.tipMessage}>
          Search by keywords.
        </Text>
        <View style={{flexDirection: 'row'}}>
        <View style={styles.flowRight}>
          <TextInput
            style={styles.searchInput}
            value={this.state.searchString}
            onChange={this.onSearchTextChanged.bind(this)}
            placeholder='Search via name'/>
        </View>

          <TouchableHighlight style={styles.button}
              onPress={this.onSearchPressed.bind(this)}
              >
            <Text style={styles.buttonText}>Go</Text>
          </TouchableHighlight>
        </View>
        <Image source={require('./img/app.png')} style={styles.image}/>


      </View>
    );
  }
}

var styles = StyleSheet.create({
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565',
    marginTop: 65,
  },
  errorMessage: {
    marginBottom: 10,
    fontSize: 15,
    textAlign: 'center',
    color: 'red',
    marginTop: 50,
  },
  tipMessage: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565',
    marginTop: 30,
  },
  container: {
    flex:1,
    padding:20,
    alignItems: 'center',
    backgroundColor:'#FFFFFF'
  },
  flowRight: {
    borderColor: 'grey',
    borderWidth: 1,
    marginLeft:30,
    marginRight:10,
    flex:4,
  },
  buttonText: {
    color:'#FFFFFF',
    textAlign: 'center',
  },
  button: {
      marginTop:10,
      backgroundColor: '#757575',
      padding: 10,
      borderRadius: 20,
      flex:1,
  },
  searchInput: {
    backgroundColor: '#B2DFDB',
    textAlign: 'justify',
  },
  image: {
    marginTop:10,
    width: 217,
    height: 138
  }
});

module.exports = SearchPage;
