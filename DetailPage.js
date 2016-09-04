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
  ListView,
  WebView
} from 'react-native';
import StarRating from 'react-native-star-rating';
import dismissKeyboard from 'dismissKeyboard'
  
var IMG_URL='http://100.77.188.44:3000/files/';
var REQUEST_URL='http://100.77.188.44:3000/star/test6/';

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
            borderWidth:1, marginBottom:20, marginLeft:120,marginRight:40,borderRadius: 5,}}>
          <Text style={{color:'#009688',textAlign:'center', fontSize:15}}>GET</Text>
        </View>
      </TouchableOpacity>
    );
  }
});

class DetailPage extends Component{
   constructor(props) {
    super(props);
    this.state = {
       loaded: false,
       starCount:0,
       apptitle: this.props.route.passProps.Object.title,
  };
}

componentDidMount() {
    this.fetchData();
  }

  onStarRatingPress(rating) {
    this.setState({
      starCount: rating
    });
  }

   fetchData(){
    
    fetch(REQUEST_URL+this.state.apptitle)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          starCount:responseData.starCount,
          loaded: true,
        });
      })
      .done();
      
  } 
  goComment(user){
    var object = this.props.route.passProps.Object;
  
    this.props.navigator.push({

    id:'Review',
    title:'Review',
        passProps:{
          User:user,
          Object: object,

        }
  });
}

  goSeeComment(user){
    var object = this.props.route.passProps.Object;

    this.props.navigator.push({

    id:'ViewReview',
    title:'ViewReview',
        passProps:{
          User:user,
          Object: object,

        }
  });
}

	render(){
    var object = this.props.route.passProps.Object;
    var user = this.props.route.passProps.User;
    dismissKeyboard();

    var DPA_description;
        if(object.scopes){
          var valid_time= (object.valid_time)/3600000/24;
          var valid_time= valid_time.toFixed(1);

          var monetary_return= object.monetary_return>0 ? object.monetary_return : 'None';
          var frequency= (object.scopes[0].frequency)/3600000;

          DPA_description=
          <View style={{flexDirection:'column', marginTop:10, marginBottom:20}}>
            <View style={styles.dpaContainer}>
              <View style={styles.titleView}>
                <Text style={styles.subtitle}>url</Text>
              </View>

              <View style={styles.detailView}>
                <Text style={styles.urldetail}
                onPress={() => Linking.openURL(object.url)}> {object.url}
                </Text>
              </View>

            </View>

            <View style={styles.dpaContainer}>
              <View style={styles.titleView}>
                <Text style={styles.subtitle}>Valid Time</Text>
              </View>

              <View style={styles.detailView}>
                <Text style={styles.detail}> {valid_time} Day</Text>
              </View>

            </View>

            <View style={styles.dpaContainer}>
              <View style={styles.titleView}>
                <Text style={styles.subtitle}>Service Id</Text>
              </View>

              <View style={styles.detailView}>
                <Text style={styles.detail}> {object.service_id}</Text>
              </View>

            </View>

            <View style={styles.dpaContainer}>
              <View style={styles.titleView}>
                <Text style={styles.subtitle}>Monetary Return</Text>
              </View>
              <View style={styles.detailView}>
                <Text style={styles.detail}> {monetary_return}</Text>
              </View>
            </View>


            <View style={styles.dpaContainer}>
              <View style={styles.titleView}>
                <Text style={styles.subtitle}>Scopes name</Text>
              </View>

              <View style={styles.detailView}>
                <Text style={styles.detail}> {object.scopes[0].name}</Text>
              </View>

            </View>

            <View style={styles.dpaContainer}>
              <View style={styles.titleView}>
                <Text style={styles.subtitle}>Scopes amount</Text>
              </View>

              <View style={styles.detailView}>
                <Text style={styles.detail}> {object.scopes[0].amount}</Text>
              </View>

            </View>

            <View style={styles.dpaContainer}>
              <View style={styles.titleView}>
                <Text style={styles.subtitle}>Scopes frequency</Text>
              </View>

              <View style={styles.detailView}>
                <Text style={styles.detail}> {frequency} per Hour</Text>
              </View>

            </View>
          </View>
          }else{
            DPA_description=
            <View>
              <Text style={styles.dpaDetail}>DPA information is unknown.</Text>
            </View>
          }




    return (

	      <ScrollView style={styles.scrollView} >
	        <View style={styles.mainSection}>
  
            <Image
              source={{uri:IMG_URL+object.img_id}}
              style={styles.detailsImage}
            />
 
            <View style={styles.rightPane}>
              <Text style={styles.title}>{object.title}</Text>
              <Text style={styles.category}>{object.category}</Text>
              <View style={styles.starRate}>
              <StarRating
                disabled={true}
                emptyStar={'ios-star-outline'}
                fullStar={'ios-star'}
                halfStar={'ios-star-half'}
                iconSet={'Ionicons'}
                maxStars={5}
                rating={this.state.starCount}
                selectedStar={(rating) => this.onStarRatingPress(rating)}
                starSize={15}
                starColor={'#ffa31a'}
                emptyStarColor={'#ffa31a'}
              />
            </View>
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
        <Text style={styles.sectionTitle}>Information</Text>

            <View style={styles.dpaContainer}>
              <View style={styles.titleView}>
                <Text style={styles.subtitle}>Category</Text>
              </View>

              <View style={styles.detailView}>
                <Text style={styles.detail}> {object.category}</Text>
              </View>

            </View>

            <View style={styles.dpaContainer}>
              <View style={styles.titleView}>
                <Text style={styles.subtitle}>Uploaded by</Text>
              </View>

              <View style={styles.detailView}>
                <Text style={styles.detail}> {object.createdBy}</Text>
              </View>

            </View>

            <View style={styles.dpaContainer}>
              <View style={styles.titleView}>
                <Text style={styles.subtitle}>Language</Text>
              </View>

              <View style={styles.detailView}>
                <Text style={styles.detail}> English</Text>
              </View>

            </View>
        <View style={styles.separator} />

        <Text style={styles.sectionTitle}>Data Pricing Agreement</Text>
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
    color:'#000000'
  },
  sectionTitle: {
    fontSize: 16,
    marginLeft:10,
    color:'#000000'
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
    padding:5,
  },
  review: {
    color:'#009688',
    textAlign:'center',
    fontSize: 15,
  },
  category:{
    fontSize: 12,
    marginLeft:30,
    color:'#727272',
  },
  description:{
    fontSize: 13,
    color:'#727272',
    marginLeft:15,
    marginRight:15,
    marginTop:10,
    marginBottom:10,
  },
  mainSection: {
    flexDirection: 'row',
  },
  detailsImage: {
    width: 120,
    height: 120,
    margin:10,
    borderRadius: 20,
  },
  separator: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    height: StyleSheet.hairlineWidth,
    marginVertical: 10,
    marginLeft:10,
    marginRight:10,
  },
  subtitle: {
    color:'#BDBDBD',
    textAlign:'right',
    fontSize:12,
  },
  detail: {
    marginLeft: 15,
    color:'#757575',
    fontSize:12,
    textAlign:'left',
  },
  urldetail: {
    marginLeft: 15,
    color:'#757575',
    fontSize:12,
    textAlign:'left',
    textDecorationLine: 'underline'
  },
  scrollView: {
    backgroundColor: '#FFFFFF',
    marginTop:60,
    height:300
  },
  titleView:{
    flex:0.3
  },
  detailView:{
    flex:0.7
  },
  dpaContainer:{
    flex: 1, 
    flexDirection: 'row',
  },
  starRate:{
    marginLeft:20,
    marginRight:150,
  },
  
});

module.exports = DetailPage;