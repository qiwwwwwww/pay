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
import StarRating from 'react-native-star-rating';
var REQUEST_URL='http://100.77.188.44:3000/mycomment/test6/';

var width = Dimensions.get('window').width; //full width

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
         rowHasChanged: (row1, row2) => row1 !== row2,
      }),
       loaded: false,
       starCount:0,
       user: this.props.route.passProps.user,
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
    
    fetch(REQUEST_URL+this.state.user.name)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.comment),
          loaded: true,
        });
      })
      .done();
      
  } 

  renderLoadingView() {
  return(
    <View style={styles.container}>
    <Text style={styles.warning}>
    Loading comment...
    </Text>
    </View>
    );
  }

   renderNoCommentView() {
  return(
    <View style={styles.container}>
    <Text style={styles.warning}>
        There is no comment yet.
    </Text>
    </View>
    );
}

renderObjects(object){
var date = new Date(object.created_at).getDate();
var month = new Date(object.created_at).getMonth();
var year = new Date(object.created_at).getFullYear();
console.log('i am '+this.state.user);
  return(
    <View style={styles.commentContainer}>
      <Text style={styles.titleText}>{object.title}</Text>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={styles.starRate}>
          <StarRating
            disabled={true}
            emptyStar={'ios-star-outline'}
            fullStar={'ios-star'}
            iconSet={'Ionicons'}
            maxStars={5}
            rating={object.star}
            selectedStar={(rating) => this.onStarRatingPress(rating)}
            starSize={20}
            starColor={'#ffa31a'}
            emptyStarColor={'#ffa31a'}
          />
        </View>
        <View>
          <Text style={styles.singleListView}>-{date}/{month}/{year}</Text>
        </View>
      </View>
      <Text style={styles.comment}>{object.comment}</Text>
      <View style={styles.separator} />

    </View>
        
    );

  }


  render(){
    var rowCount =this.state.dataSource.getRowCount()
        if(!this.state.loaded) {
        return this.renderLoadingView();
      }
        if(rowCount==0 ){
          return this.renderNoCommentView();
       }   
      var User=this.state.user;
      var self_photo;
      if (User.photo !== null)
      {
          self_photo=
              <Image source={{uri: User.photo}}
                style={styles.thumbnail}/>;
      } else{
          self_photo=<Image source={require('./img/default.png')} 
                      style={styles.thumbnail}/> ;

      }
      return (
         <View style={styles.container}>
        
        <View style={styles.header} >
        {self_photo}
        <Text style={styles.name}>{User.name}</Text>
        </View>
        
        <View style={styles.tabView}>
        <TabLayoutAndroid style={{height:60}} backgroundColor="#009688" indicatorTabColor="#727272"
          indicatorTabHeight={2} scrollable={false} center={false}>

          <TabAndroid text="user" textSize={16} textColor="white" selectedTextColor="#727272"
                icon="user" iconPosition="top">
          <View style={styles.body}>
          <View style={styles.section1}>
          <Text style={styles.section_name}> ABOUT </Text>
           <View style={styles.separator} />
          <Text style={styles.section_content_one}> Name</Text>
          <Text style={styles.section_content_two}>{User.name}</Text>
          <View style={styles.separator} />
          <Text style={styles.section_content_one}> Email</Text>
          <Text style={styles.section_content_two}>{User.email}</Text>
          <View style={styles.separator} />
          </View>
          </View>
          </TabAndroid>

          <TabAndroid text="Recent" textSize={16} textColor="white" selectedTextColor="#727272"
                icon="fen" iconPosition="top">
           <ScrollView>     
            <Text style={{color:'#727272'}}>Hello, I'm the last tab: nothing to show</Text>
            <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderObjects.bind(this)}
            style={styles.listView}
            enableEmptySections={true}
            />
          </ScrollView>  
          </TabAndroid>

        </TabLayoutAndroid>
        </View>

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
  },
  header: {
    alignItems: 'center',
    flex:0.2,
    width: width,
    backgroundColor:'#009688',
},
  thumbnail: {
    borderWidth:2,
    borderColor:'#607D8B',
    borderRadius: 100,
    width: 120,
    height: 120,
    marginTop: 70,
  },
  name: {
    fontSize: 25, 
    fontWeight: 'bold', 
    marginTop: 10,
    color: '#FFF',
    },
  section1: {
    flexDirection:'column',

  },
  section_name:{
    fontSize: 25, 
    fontWeight: 'bold',
    marginLeft: 10, 
    color:'#727272'
  },
  section_content_one:{
    fontSize: 15, 
    fontWeight: 'bold',
    marginLeft: 10,
    color:'#727272'
  },
  section_content_two:{
    fontSize: 20, 
    marginLeft: 10,
    color:'#727272'
  },
  tabView:{
    flex:0.3,
    alignItems: "stretch",
    backgroundColor:'#FFFFFF',

  },
  body: {
    flex:0.8,
    width: width,
    backgroundColor:'#FFFFFF',

},
separator: {
  backgroundColor: 'rgba(0, 0, 0, 0.1)',
  height: StyleSheet.hairlineWidth,
  marginVertical: 3,
},
 commentContainer: {
    marginLeft:20,
    marginRight:20,
  },
  listView: {
    marginTop:80,
  },
  nameText:{
    textAlign: 'center',
    fontSize: 15,
    color:'#727272',
    fontWeight:'bold',
  },
  titleText:{
    textAlign: 'left',
    fontSize: 25,
    color:'#727272',

  },
  singleListView:{
    textAlign: 'center',
    fontSize: 15,
    color:'#727272',
  },
  name:{
    marginLeft:10,
    marginRight:10,
  },
  comment:{
    textAlign: 'left',
    fontSize: 15,
    color:'#727272',
  },
  starRate:{
    marginLeft:10,
    marginRight:10,
  },
  warning:{
    marginTop:50,
    fontSize:20,
    textAlign: 'center',
    color:'#727272',
  }
});


module.exports=Profile;