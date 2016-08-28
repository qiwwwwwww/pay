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
var REQUEST_URL='http://100.77.188.56:3000/test6';

class Review extends Component {
   constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
         rowHasChanged: (row1, row2) => row1 !== row2,
      }),
       loaded: false,
       starCount:0, 
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

  render(){
        if(!this.state.loaded) {
        return this.renderLoadingView();
      }
    return(
      <ScrollView>
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
var date = new Date(object.created_at).getDate();
var month = new Date(object.created_at).getMonth();
var year = new Date(object.created_at).getFullYear();

  return(
    <View>
      <Text style={styles.singleListView}>{object.title}</Text>
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
          <Text style={styles.singleListView}>{object.name}</Text>
        </View>
        <View>
          <Text style={styles.singleListView}>-{date}/{month}/{year}</Text>
        </View>
      </View>
      <Text style={styles.singleListView}>{object.comment}</Text>

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
    marginTop:200,
  },
  listView: {
    marginTop:100,
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
  starRate:{
    marginLeft:10,
    marginRight:10,
  },
  
});


module.exports=Review;