import React, {Component} from 'react';
import {StyleSheet,View,TouchableOpacity} from 'react-native';
import {Body, Header, Icon, Right, Title,Left} from 'native-base';
import Tabbar from '../Tab_barV2/Tabbar';
export default  class Screen extends Component {

    render(){
      return(

          <View style={styles.container}>
              <Header style={
                  styles.cont
              } >
                <Left><TouchableOpacity
                      onPress={this.props.navigation.openDrawer}
                  >
                      <Icon style={styles.col} name="ios-menu"/>
                  </TouchableOpacity>
                </Left>
                  <Body>
                      <Title style={styles.title}>Allo doctor</Title>
                  </Body>
                  <Right />
              </Header>
              <Tabbar/>
          </View>

      );


    };
}
const styles =StyleSheet.create({


   container:{
       flex:1,

   } ,
    text:{
       color:"#161924",
        fontSize: 20,
        fontWeight:"500",
    },cont:{
        backgroundColor: "#9EDAE4",
    },title: {
        color: '#9a9a9a',
        fontWeight: 'bold',
    },
    col:{
        color: '#9a9a9a',
    },


});
