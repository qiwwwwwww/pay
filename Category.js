
import React, {
  Component,
} from 'react';
import {
  AppRegistry,
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableHighlight,
  ScrollView
} from 'react-native';


var IP_ADDRESS = 'http://100.77.188.44:3000';    
var REQUEST_URL =IP_ADDRESS+'/category/appstore/';
var IMG_URL=IP_ADDRESS+'/files/';

class OutlinePage extends Component {
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
    var item=this.props.route.passProps.Item;

    fetch(REQUEST_URL+item.title)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.category),
          loaded: true,
        });
      })
      .done();
      
  }

render() {
  console.log(this.props.route.passProps.user);
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
    Loading App。。。
    </Text>
    </View>
    );
}

gotoDetail(object){
  var user=this.props.route.passProps.User;

if (user!==null) {
  this.props.navigator.push(
  {
    id:'DetailPage',
    title: 'DetailPage',
    passProps:{
      Object: object,
        User: user,
      }

    },

  );

}else{
  this.props.navigator.push(
  {
    id:'DetailPage',
    title: 'DetailPage',
    passProps:{
      Object: object,
        User: {
          'name':'guest'
        },
      }

    },

  );


}

}

renderObjects(object){

  return(

  <TouchableHighlight 
          underlayColor='#dddddd'
          onPress={() => this.gotoDetail(object)}
        >
    <View style={styles.container}>
      <Image
      source={{uri:IMG_URL + object.img_id}}
      style={styles.thumbnail}
      />
      <View style={styles.rightContainer}>
        
            <Text style={styles.title}>{object.title}</Text>

        <Text style={styles.year}>{object.category}</Text>
      </View>

    </View>
</TouchableHighlight>

    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  rightContainer: {
    flex: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
    color:'#727272'

  },
  year: {
    textAlign: 'center',
    color:'#727272'

  },
  thumbnail: {
    width: 81,
    height: 81,
    marginLeft:10,
    marginBottom:10,
  },
  listView: {
    paddingTop: 60,
    backgroundColor: '#FFFFFF',
    paddingBottom: 20,
  },

});
  
module.exports=OutlinePage;
