
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
  TouchableHighlight
} from 'react-native';

  var IMG_URL='http://100.77.188.44:3000/files/';

class SearchResults extends Component {
  constructor(props) {
    super(props);
    var dataSource = new ListView.DataSource(
      {rowHasChanged: (r1, r2) => r1.guid !== r2.guid});
    this.state = {
      dataSource: dataSource.cloneWithRows(this.props.route.passProps.Filename)
    };
  }
 
gotoDetail(rowData){
  var user=this.props.route.passProps.User;

if (user!==null) {
  this.props.navigator.push(
  {
    id: 'DetailPage',
    title: 'DetailPage',
    passProps:{
      Object: rowData,
      User: user,
    },
  }

  );

}else{
  this.props.navigator.push({
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


  renderRow(rowData, sectionID, rowID) {
    return (
      <TouchableHighlight 
              underlayColor='#dddddd'
              onPress={() => this.gotoDetail(rowData)}
            >
        <View style={styles.container}>
          <Image
          source={{uri:IMG_URL + rowData.img_id}}
          style={styles.thumbnail}
          />
          <View style={styles.rightContainer}>
            
                <Text style={styles.title}>{rowData.title}</Text>

            <Text style={styles.year}>{rowData.category}</Text>
          </View>

        </View>
    </TouchableHighlight>


    );
  }
 
  render() {
    return (
      <View style={styles.container}>
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow.bind(this)}/>
      </View>
    );
  }
 
}


var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    marginTop:30,
  },
  rightContainer: {
    flex: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
    color:'#727272',

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
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
    paddingBottom: 20,

  },
});
module.exports = SearchResults;
  
