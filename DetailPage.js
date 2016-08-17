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
  
var IMG_URL='http://100.77.188.23:3000/files/';
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
  


  goComment(user){
    this.props.navigator.push({

    id:'Review',
    title:'Review',
        passProps:{
          User:user,
        }
  });
}

  goSeeComment(user){
    this.props.navigator.push({

    id:'ViewReview',
    title:'ViewReview',
        passProps:{
          User:user,
        }
  });
}

	render(){
    var object = this.props.route.passProps.Object;
    var user = this.props.route.passProps.User;


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
          <Text style={styles.title}>Description</Text>
          <Text style={styles.description}>
            {object.description}
          </Text>
          <View style={styles.separator} />
        <Text style={styles.description}>{user.name}</Text>
        <Text style={styles.title} onPress={() => this.goComment(user)}>Write a Review</Text>
        <Text style={styles.title} onPress={() => this.goSeeComment(user)}>View Reviews</Text>
        
        <Text style={styles.title}>DPA information</Text>
        <Text style={styles.description}>Some wikis have an "edit" button or link directly on the page being viewed, if the user has permission to edit the page. This leads to an editing page where participants structure and format wiki pages with a simplified markup language, sometimes known as wikitext. For example, starting lines of text with asterisks creates a bulleted list). The style and syntax of wikitexts can vary greatly among wiki implementations,[example needed] some of which also allow HTML tags. Wikis favour plain-text editing, with fewer and simpler conventions than HTML, for indicating style and structure. Although limiting access to HTML and Cascading Style Sheets (CSS) of wikis limits user ability to alter the structure and formatting of wiki content, there are some benefits. Limited access to CSS promotes consistency in the look and feel, and having JavaScript disabled prevents a user from implementing code that may limit other users' access.</Text>

        <View style={styles.separator} />
        <Text style={styles.title}>DPA information</Text>

       
	      </ScrollView>
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
    marginTop:60,
    height:300

  },
  
});

module.exports = DetailPage;