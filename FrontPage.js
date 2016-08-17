'use strict';
import React,{Component} from'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  ViewPagerAndroid,
  ToastAndroid,
  Image,
  Dimensions,
  TouchableOpacity,
  View
} from 'react-native';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full width
var qu_height=height*0.4;

var ViewPager = require('react-native-viewpager');

var source = [
  {title:'game',icon:require('./img/1.png')},
  {title:'lifestyle',icon:require('./img/2.png')},
  {title:'social',icon:require('./img/3.png')},  
  {title:'Health & Fitness',icon:require('./img/19.png')}
];


const BANNER_IMGS = [  
    require('./img/front01.png'),
    require('./img/front02.jpg'),  
    require('./img/front03.jpg'),    
    require('./img/front04.jpg')  
];  

var PagerItem = React.createClass({
  render(){
    return(
      <View style = {{height:80,width:(width/5)}}>
        <TouchableOpacity activeOpacity={0.8} onPress={()=>this.itemOnClick()}>
          <Image source={this.props.item.icon} style = {styles.imageStyle} />
          <Text style={styles.textStyle}>{this.props.item.title}</Text>
        </TouchableOpacity>

      </View>
    );
  },

  itemOnClick(){
    this.props.onItemClick();
  }
});

class FrontPage extends Component {

  constructor(props) {  
      super(props);  

      var dataSource = new ViewPager.DataSource({  
          pageHasChanged: (p1, p2) => p1 !== p2,  
      });  

      this.state = {  
          dataSource: dataSource.cloneWithPages(BANNER_IMGS)  
      }  
    }  
  
  renderPagerItem(item,index){
    return <PagerItem key={index} item={item} onItemClick={() => this.onItemClick(item)}/>;
  }

  onItemClick(item){
    var user=this.props.route.passProps.user;

    this.toastMessage(item.title);
       this.props.navigator.push({

        id:'Category',
        title:'Category',
         passProps:{
          User: user,
          Item:item,
      }
        
  });
  }


  _renderPage(data, pageID) {  
      return (  
          <Image  
              source={data}  
              style={styles.promotionStyle}/>  
      );  
  }  

  render() {
    return(
      <View>
       <ViewPager  
          style={{height:200}}  
          dataSource={this.state.dataSource}  
          renderPage={this._renderPage}  
          isLoop={true}  
          autoPlay={true}/>  

        <Text style={styles.sectionTitle}>Categories</Text>

        <ViewPagerAndroid style = {{alignItems:'center',height:160}} initialPage={0}>
          {
            this.getAllPager()
          }
        </ViewPagerAndroid>
          <View style={styles.separator} />

      </View>
    );
  }

  //返回ViewPager的所有View
  getAllPager(){
    var viewArray = [];
    var data1 = [],data2 = [],data = [];
    var page = 0;
    var result = Math.floor(source.length / 10);
    var rest = source.length % 10;
    if (result > 0) {
      page = rest > 0 ? result + 1 : result;
    }else{
      page = rest > 0 ? 1 : 0;
    }
    var num = page;
    for (var i = 0; i < page; i++) {
      data = num > 1 ? source.slice(i * 10,(i + 1) * 10) : source.slice(i * 10,source.length);
      viewArray.push(this.getPagerView(i,data));
      num--;
    }
    return viewArray;
  }

  //返回ViewPager的页面
  getPagerView(i,data){
    return(
      <View key={i}>
        {
          this.getRowView(data)
        }
      </View>
    );
  }

  //返回ViewPager一页View对象
  getRowView(array){
    if (array.length > 0) {
      return(
        <View style={{flexDirection:'row',flexWrap:'wrap'}}>
          {
            array.map((item,i) => this.renderPagerItem(item,i))
          }
        </View>
      );
    }
  }

  toastMessage(msg){
    ToastAndroid.show(msg,ToastAndroid.SHORT);
  }
}

var styles = StyleSheet.create({
  //消费类型部分
  imageStyle:{
    marginTop:20,
    alignSelf:'center',
    width:45,
    borderRadius:22.5,
    height:45
  },
  textStyle:{
   marginTop:10,
   alignSelf:'center',
   fontSize:14,
   color:'#555555',
   textAlign:'center'
  },
  promotionStyle: {
    height: qu_height,
    marginTop:30,
    width:width,
  },
  sectionTitle: {
    fontSize: 15,
    marginBottom: 8,
    textAlign: 'left',
    marginLeft:10,
    color:'#727272',
    fontWeight:'bold'
  },
  separator: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    height: StyleSheet.hairlineWidth,
    marginVertical: 10,
    marginLeft:10
  },
});

  
module.exports=FrontPage;