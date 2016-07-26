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
  
var REQUEST_URL ='http://129.31.204.220:3000/appstore';
var IMG_URL='http:// 129.31.204.220:3000/files/';
var FILENAME_URL ='http://129.31.204.220:3000/filename/appstore/';


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
      name: 'page2',
      title: 'results',
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
    var query = urlForQueryAndPage('place_name', this.state.searchString);
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
          Search for houses to buy!
        </Text>
        <Text style={styles.description}>
          Search by place-name, postcode or search near your location.
        </Text>
        <View style={styles.flowRight}>
          <TextInput
            style={styles.searchInput}
            value={this.state.searchString}
            onChange={this.onSearchTextChanged.bind(this)}
            placeholder='Search via name or postcode'/>
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
    color: '#656565'
  },
  container: {
    padding: 30,
    marginTop: 65,
    alignItems: 'center'
  },
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch'
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
    height: 36,
    padding: 4,
    marginRight: 5,
    flex: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48BBEC',
    borderRadius: 8,
    color: '#48BBEC'
  },
  image: {
    width: 217,
    height: 138
  }
});

module.exports = SearchPage;
