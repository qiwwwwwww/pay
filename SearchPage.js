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

var IP_ADDRESS = 'http://100.77.188.66:3000';  
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
    searchString: 'YouTube',
    isLoading: false,
    message: ''

    };
  }

  _handleResponse(filename) {
    this.setState({ isLoading: false });
    if (filename.length >= 1) {
      this.props.navigator.push({
      id: 'SearchResults',
      title: 'SearchResults',
      passProps:{Filename: filename},
    });

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
        <Text style={styles.description}>
          Search by exact app name.
        </Text>
        <View style={styles.flowRight}>
          <TextInput
            style={styles.searchInput}
            value={this.state.searchString}
            onChange={this.onSearchTextChanged.bind(this)}
            placeholder='Search via name'/>
          <TouchableHighlight style={styles.button}
              underlayColor='#99d9f4'
              onPress={this.onSearchPressed.bind(this)}
              >
            <Text style={styles.buttonText}>Go</Text>
          </TouchableHighlight>
        </View>

        <Image source={require('./img/app.png')} style={styles.image}/>
          {spinner}
        <Text style={styles.description}>{this.state.message}</Text>

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
  container: {
    flex:1,
    padding:20,
    alignItems: 'center',
    backgroundColor:'#FFFFFF'
  },
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',

  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  searchInput: {
    height: 50,
    flex: 3,
    fontSize: 18,
    color:'#727272'
  },
  image: {
    width: 217,
    height: 138
  }
});

module.exports = SearchPage;
