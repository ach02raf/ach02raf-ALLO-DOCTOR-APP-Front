import React, {Component} from 'react';
import { Avatar } from 'react-native-elements';

import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ScrollView, ImageBackground, SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import server from '../../server';
export default class PatientProfil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nom:'',
      prenom:'',
      sexe:'',
      tel : '',
      ville:'',
      adresse:'',
      cin:'',
      pickedImage:'',
    };
  }
  componentDidMount() { this.Boiler().then( '74');}
  Boiler = async ()=>{
    const token = await AsyncStorage.getItem("token");
    fetch('http://'+server+'/',{
      headers:new Headers({
        Authorization:"Bearer "+token
      })
    }).then(res=>res.json())
        .then(data=>{
                this.setState({
                  id:data._id,
                  nom: data.nom,
                  tel:data.tel,
                  prenom:data.prenom,
                  ville: data.ville,
                  adresse:data.adresse,
                  sexe:data.sexe,
                  cin: data.cin,
                  pickedImage:data.photo,

                })


            }
        )
  };
  render() {

    return (
        <SafeAreaView style={styles.maincontainer}>

          <ImageBackground
              source={require('../../assets/images/backpatientprofil.jpg')}
              style={styles.coverr}>
            <View style={styles.containerHeader} >


              <Avatar   size={120}
                        containerStyle={{alignSelf:'center'}}
                        rounded={100}
                        source={{uri:this.state.pickedImage}}
                        showAccessory={true}
              />
            </View >

            <View style={styles.contbody} >
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container1}>
                  <Text style={styles.text}>
                    Nom :
                  </Text >
                  <Text style={styles.name}>
                    {this.state.nom}
                  </Text>
                </View>


                <View style={styles.container1}>
                  <Text style={styles.text}>
                    prénom :
                  </Text >
                  <Text style={styles.name}>
                    {this.state.prenom}
                  </Text>
                </View>



                <View style={styles.container1}>
                  <Text style={styles.text}>
                    Sexe :
                  </Text >
                  <Text style={styles.name}>
                    {this.state.sexe}
                  </Text>
                </View>


                <View style={styles.container1}>
                  <Text style={styles.text}>
                    Téléphone :
                  </Text >
                  <Text style={styles.name}>
                    {this.state.tel}
                  </Text>
                </View>



                { this.state.ville!==null ?
                    <View style={styles.container1}>
                      <Text style={styles.text}>
                        Ville :
                      </Text >
                      <Text style={styles.name}>
                        {this.state.ville}
                      </Text>
                    </View>
                    :null
                }

                { this.state.adresse!==null ?
                    <View style={styles.container1}>
                      <Text style={styles.text}>
                        Adresse :
                      </Text >
                      <Text style={styles.name}>
                        {this.state.adresse}
                      </Text>
                    </View>
                    :null
                }



              </ScrollView>
            </View>
          </ImageBackground>
        </SafeAreaView>
    );
  }
}

const screenWidth = Math.round(Dimensions.get('window').width);
const screenheight = Math.round(Dimensions.get('window').height);
const styles = StyleSheet.create({

  maincontainer:{
    flexDirection:'column',
    flex:1,
    backgroundColor:'#daeef0'
  },

  containerHeader:{
    flexDirection:'row',
    width: screenWidth,
    height: screenheight/4,
    alignItems:'center',
    justifyContent:'center',
    alignSelf:'center',

  },
  container1:{
    alignSelf:'center',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'transparent',
    width: screenWidth/1.8,
    height: screenheight/14,
    borderBottomWidth: 0.3,
    borderColor:'#4a4a4a',
    marginBottom:screenheight/25
  },
  container2:{
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#c4d6d8',
    width: 35,
    height: 35,
    alignSelf:'center',
    borderRadius:100,
    borderColor:'black',
    borderWidth:1
  },
  container3:{
    alignItems:'flex-start',
    justifyContent:'center',
    backgroundColor:'transparent',
    width: screenWidth/1.5,
    height: screenheight/8,
    flexDirection:'column',

  },
  name:{
    color:"#5b5b5b",
    fontSize: screenWidth/22 ,
    alignSelf: 'center',
    fontWeight: '500',
    marginHorizontal:screenWidth/40

  },
  text:{
    color:"#1f1f1f",
    fontSize:  screenWidth/28  ,
    alignSelf: 'center',
    fontWeight: '100',
    marginHorizontal:screenWidth/40

  },

  contbody:{
    alignItems:'center',
    justifyContent:'flex-start',
    marginVertical: screenheight/100,
    width: screenWidth,
    backgroundColor:'transparent',
    flex:1,
  },
  coverr: {
    resizeMode: 'cover',
    width: screenWidth,
    justifyContent: 'center',
    alignItems: 'center',
    height: screenheight,

  },
  param:{
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#c4d6d8',
    width: 40,
    height: 40,
    alignSelf:'flex-end',
    borderRadius:100,
    borderColor:'black',
    borderWidth:1,
    marginLeft:screenWidth/1.8
  },
  image: {
    resizeMode: 'cover',
    width: screenWidth,
    height: screenheight,
    justifyContent:'flex-start',
    alignItems:'flex-start',
    borderTopWidth:0.5,
    borderColor:'#daeef0',
  },
  imagewall: {
    resizeMode: 'cover',
    width: screenWidth,
    height: screenheight / 2.1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#949494',
  },

  profile:{
    width:screenWidth/5,
    height:screenWidth/5,
    borderRadius: screenWidth/7 ,
    borderWidth: 2 ,
    borderColor: "white",
    alignSelf: 'center',
    justifyContent:'center',
  },

  TextNiv1:{
    color:"#c8dcde",
    fontSize: screenWidth/12 ,
    alignSelf: 'center',
    fontWeight: '500',
    marginLeft: screenWidth/10,
  },


});
