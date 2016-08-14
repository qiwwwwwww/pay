'use strict';

import React, {
  Component,
} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Linking,
  ListView
} from 'react-native';
  
var IMG_URL='http://100.77.188.66:3000/files/';
var REQUEST_URL='http://100.77.188.66:3000/test5';
var OpenURLButton = React.createClass({

  propTypes: {
    url: React.PropTypes.string,
  },

  handleClick: function() {
    Linking.canOpenURL(this.props.url).then(supported => {
      if (supported) {
        Linking.openURL(this.props.url);
      } else {
        console.log('Don\'t know how to open URI: ' + this.props.url);
      }
    });
  },

  render: function() {
    return (
      <TouchableOpacity
        onPress={this.handleClick}>
        <View>
            <Image source={require('./img/downloadButton.png')} 
        style={styles.buttonImage}/>
        </View>
      </TouchableOpacity>
    );
  }
});

class DetailPage extends Component{
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

  goComment(user){
    this.props.navigator.push({

    id:'Review',
    title:'Review',
        passProps:{
          User:user,
        }
  });
}

	render(){
    var object = this.props.route.passProps.Object;
    var user = this.props.route.passProps.User;
    if(!this.state.loaded) {
        return this.renderLoadingView();
      }

    return (
	      <ScrollView style={styles.scrollView}>
	        <View style={styles.mainSection}>
	          <Image
	            source={{uri:IMG_URL+object.img_id}}
	            style={styles.detailsImage}
	          />
	          <View style={styles.rightPane}>
	          	<Text style={styles.title}>{object.title}</Text>
				      <Text style={styles.category}>{object.category}</Text>

              <OpenURLButton url={IMG_URL+object.apkid}/>
            </View>
	        </View>

	        <View style={styles.separator} />
	        <Text style={styles.description}>
	          {object.description}
	        </Text>
          <View style={styles.separator} />

        <Text style={styles.description}>{user.name}</Text>
        <Text style={styles.title} onPress={() => this.goComment(user)}>Write a Review</Text>
        <View style={styles.separator} />

        <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderObjects.bind(this)}
            style={styles.listView}
            />
	      </ScrollView>
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

    <Text style={styles.description}>{object.comment}</Text>

        
    );
  }

}

var styles = StyleSheet.create({
  rightPane: {
    justifyContent: 'space-between',
    flex: 1,
  },
  title: {
    flex: 1,
    fontSize: 16,
    marginTop:15,
    fontWeight: '500',
    color:'#727272'
  },
  category:{
    flex: 1,
    fontSize: 15,
    marginLeft:20,
    marginTop:15,
    color:'#727272',

  },
  description:{
    textAlign: 'center',
    fontSize: 15,
    color:'#727272',
  },
  rating: {
    marginTop: 10,
  },
  ratingTitle: {
    fontSize: 14,
  },
  ratingValue: {
    fontSize: 28,
    fontWeight: '500',
  },
  mpaaWrapper: {
    alignSelf: 'flex-start',
    borderColor: 'black',
    borderWidth: 1,
    paddingHorizontal: 3,
    marginVertical: 5,
  },
  mpaaText: {
    fontFamily: 'Palatino',
    fontSize: 13,
    fontWeight: '500',
  },
  mainSection: {
    flexDirection: 'row',
  },
  detailsImage: {
    width: 160,
    height: 160,
    marginRight: 10,
  },
  buttonImage: {
    width: 80,
    height: 20,
    backgroundColor: '#eaeaea',
    marginLeft: 10,
  },
  separator: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    height: StyleSheet.hairlineWidth,
    marginVertical: 10,
  },
  castTitle: {
    fontWeight: '500',
    marginBottom: 3,
    color:'#727272',

  },
  castActor: {
    marginLeft: 2,
    color:'#727272',

  },
  scrollView: {
    backgroundColor: '#FFFFFF',
    height: 300,
    marginTop:60,
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
});

module.exports = DetailPage;