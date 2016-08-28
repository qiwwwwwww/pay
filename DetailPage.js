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
  
var IMG_URL='http://100.77.188.59:3000/files/';
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
        <View style={{borderColor: '#009688',
            borderWidth:1, marginBottom:20, marginLeft:80,marginRight:40,borderRadius: 5,
}}>
          <Text style={{color:'#009688',textAlign:'center', fontSize:15}}>GET</Text>
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
    var DPA_description;
        if(object.scopes){
          DPA_description=
            <View>
            <Text style={styles.dpaDetail}>url:{object.url}</Text>
            <Text style={styles.dpaDetail}>App Id:{object.app_id}</Text>
            <Text style={styles.dpaDetail}>Valid Time:{object.valid_time}</Text>
            <Text style={styles.dpaDetail}>Service Id:{object.service_id}</Text>
            <Text style={styles.dpaDetail}>Monetary Return:{object.monetary_return}</Text>
            <Text style={styles.dpaDetail}>scopes:</Text>
            <Text style={styles.dpaDetail}>amount:{object.scopes[0].amount}</Text>
            <Text style={styles.dpaDetail}>frequency:{object.scopes[0].frequency}</Text>
            <Text style={styles.dpaDetail}>name:{object.scopes[0].name}</Text>
            </View>
          }else{
            DPA_description=
            <View>
              <Text style={styles.dpaDetail}>DPA information is unknown.</Text>
            </View>
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
              <Text style={styles.category}>Category - {object.category}</Text>

              <OpenURLButton url={IMG_URL+object.apkid}/>
            </View>
          </View>

          <View style={styles.separator} />
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>
            {object.description}
          </Text>
          <View style={styles.separator} />

        <View style={styles.reviewView}>
          <View style={styles.button}>
            <Text style={styles.review} onPress={() => this.goComment(user)}>Write a Review</Text>
          </View>
          <View style={styles.button}>
            <Text style={styles.review} onPress={() => this.goSeeComment(user)}>View Reviews</Text>
          </View>
        </View>

        <View style={styles.separator} />
        <Text style={styles.sectionTitle}>DPA information</Text>
          {DPA_description}

       
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
    fontSize: 20,
    marginTop:20,
    marginLeft:20,
    fontWeight: 'bold',
    color:'#727272'
  },
  sectionTitle: {
    flex: 1,
    fontSize: 18,
    marginLeft:10,
    fontWeight: '500',
    color:'#727272'
  },
  reviewView:{
    flexDirection:'row',
  },
  button:{
    borderColor: '#009688',
    borderWidth:1, 
    borderRadius: 5,
    marginRight:50,
    marginLeft:20,
    padding:10
  },
  review: {
    color:'#009688',
    textAlign:'center',
    fontSize: 16,
  },
  category:{
    fontSize: 12,
    marginLeft:20,
    color:'#727272',
  },
  description:{
    fontSize: 15,
    color:'#727272',
    marginLeft:15,
    marginRight:15,
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
    margin:10,
    borderRadius: 50,
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
    marginLeft:10,
    marginRight:10,
  },
  dpaDetail: {
    marginLeft: 15,
    color:'#727272',
  },
  scrollView: {
    backgroundColor: '#FFFFFF',
    marginTop:60,
    height:300

  },
  
});

module.exports = DetailPage;