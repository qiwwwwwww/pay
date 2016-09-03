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
import StarRating from 'react-native-star-rating';
import Icon from 'react-native-vector-icons/FontAwesome';

var width = Dimensions.get('window').width; //full width
var REQUEST_URL='http://100.77.188.62:3000/comment/test6/';
var C_URL;

class Review extends Component {
   constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
         rowHasChanged: (row1, row2) => row1 !== row2,
      }),
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
          dataSource: this.state.dataSource.cloneWithRows(responseData.appTitle),
          loaded: true,
        });
      })
      .done();
      
  } 

  render(){
    var rowCount =this.state.dataSource.getRowCount()
        if(!this.state.loaded) {
        return this.renderLoadingView();
      }
        if(rowCount==0 ){
          return this.renderNoCommentView();
       }   

    return(

      <ScrollView>
       <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderObjects.bind(this)}
            style={styles.listView}
            enableEmptySections={true}
            />
      </ScrollView>      
      );
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

  return(
    <View style={styles.commentContainer}>
      <Text style={styles.titleText}>{object.title}</Text>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={styles.starRate}>
          <StarRating
            disabled={true}
            disabled={false}
            emptyStar={'ios-star-outline'}
            fullStar={'ios-star'}
            iconSet={'Ionicons'}
            maxStars={5}
            rating={object.star}
            selectedStar={(rating) => this.onStarRatingPress(rating)}
            starSize={20}
          />
        </View>
        <View style={styles.name}>
          <Text style={styles.nameText}>{object.name}</Text>
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


  }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#FFFFFF',
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
  separator: {
    marginTop:10,
    marginLeft:10,
    marginRight:10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    height: StyleSheet.hairlineWidth,
    marginVertical: 10,
  },
  warning:{
    marginTop:50,
    fontSize:20,
    textAlign: 'center',
    color:'#727272',
  }
});


module.exports=Review;