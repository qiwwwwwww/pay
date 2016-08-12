'use strict';

import React, { Component } from 'react';
import{
  StyleSheet,
  Text,
  View,
  Image,
  BackAndroid,
  ToolbarAndroid,
  Navigator,
  DrawerLayoutAndroid,
  ListView,
  TouchableHighlight,
} from 'react-native';

var _navigate;

class UsageList extends Component {
	constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2
            })
        };
        _navigate = this.props.navigate;
    }

  componentDidMount() {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(['FrontPage', 'OutlinePage', 'SearchPage', 'Profile'])
        });
    }

  _renderMenuItem(item) {
        return(
            <TouchableHighlight style={styles.menuContainer} onPress={()=> this._onItemSelect(item)}>
            <Text style={{color:'#009688'}}>{item}</Text>
            </TouchableHighlight>
        );
    }
    
    _onItemSelect(item) {
        _navigate(item);
    }

    render() {
        return (
            <ListView
                style={styles.container}
                dataSource={this.state.dataSource}
                renderRow={(item) => this._renderMenuItem(item)}
            />
        );
    }
}  


	

var styles = StyleSheet.create({
  container: {
        backgroundColor: '#FFF',
        top: 20
    },
    menuItem: {
        color: '#333',
        padding: 10,
        textAlign: 'left'
    }
});


module.exports = UsageList;

