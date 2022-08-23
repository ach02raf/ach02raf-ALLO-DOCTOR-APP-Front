import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  StatusBar,
  Dimensions,
  ImageBackground, TouchableOpacity, TextInput,
} from 'react-native';
import Carousel, {ParallaxImage} from 'react-native-snap-carousel';
import * as Animatable from 'react-native-animatable';
import Logo3 from '../../assets/images/Logo3.png';
import Background from '../../assets/images/newback2.png';
import Facebook from '../icons/Facebook';
import AsyncStorage from '@react-native-community/async-storage';
import {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager,
} from 'react-native-fbsdk';
import photo from '../../assets/images/hamza.jpg';
import server from '../../server';
export default class PageOneV1 extends Component  {
  constructor(props) {
    super(props);
    this.state = {
     tel:'',
      password:'',
      inputname:'',
      typing_email: false,
      typing_password: false,
      hidePassword: true,
      entries: [
        {
          thumbnail: '',
        },
        {
          thumbnail: '',
        },
      ],
      userInfo: {
        first_name:'',
        last_name:'',
        id:'',
        picture:'',

      },
    };
  }


  sendCred2 =async  (password,nom,prenom,sexe,adresse,cin,ville,tel,photo1) => {

    fetch('http://'+server+'/inscri',{
      method:"POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        "password":password,
        "nom":nom,
        "prenom":prenom,
        "sexe":sexe,
        "adresse":adresse,
        "cin":cin,
        "ville":ville,
        "tel":tel,
        "photo":photo1,
        "notification":{
          contunue:"Marquer tous comme lu",
          "colorbacks":[
            {index:'#b1d5dc'},{index:'#b1d5dc'},{index:'#b1d5dc'},{index:'#b1d5dc'},{index:'#b1d5dc'},{index:'#b1d5dc'},{index:'#b1d5dc'},{index:'#b1d5dc'},{index:'#b1d5dc'},{index:'#b1d5dc'}
          ],
          "pressed":[{index:'0'},{index:'0'},{index:'0'},{index:'0'},{index:'0'},{index:'0'},{index:'0'},{index:'0'},{index:'0'},{index:'0'}],
          "list":[
            {
              type:"a validé rdv ",
              doctornom: "Beizig Hamza",
              time: "1",
              picdoc: photo,

            },
            { type:"a validé votre rdv ",
              doctornom: "Beizig Hamza",
              time: "2",
              picdoc: photo,

            },
            { type:"a validé votre rdv ",
              doctornom: "Beizig Hamza",
              time: "3",
              picdoc: photo,

            },
            { type:"a validé votre rdv ",
              doctornom: "Beizig Hamza",
              time: "4",
              picdoc: photo,

            },
            { type:"a validé votre rdv ",
              doctornom: "Beizig Hamza",
              time: "5",
              picdoc: photo,

            },
            { type:"a validé votre rdv ",
              doctornom: "Beizig Hamza",
              time: "6",
              picdoc: photo,

            },
            { type:"a validé votre rdv ",
              doctornom: "Beizig Hamza",
              time: "7",
              picdoc: photo,

            },
            { type:"a validé votre rdv ",
              doctornom: "d",
              time: "8",
              picdoc: photo,

            },
            { type:"a validé votre rdv ",
              doctornom: "Beizig Hamza",
              time: "9",
              picdoc: photo,

            },
            { type:"a validé votre rdv ",
              doctornom: "Beizig Hamza",
              time: "10",
              picdoc: photo,

            },

          ],
        },
        "message":{

          "colorbacks":[{index:'#b1d5dc'},{index:'#b1d5dc'},{index:'#b1d5dc'},{index:'#b1d5dc'},{index:'#b1d5dc'},{index:'#b1d5dc'},{index:'#b1d5dc'},{index:'#b1d5dc'},{index:'#b1d5dc'},{index:'#b1d5dc'},{index:'#b1d5dc'}],
          "pressed":[{index:'0'},{index:'0'},{index:'0'},{index:'0'},{index:'0'},{index:'0'},{index:'0'},{index:'0'},{index:'0'},{index:'0'},{index:'0'}],
          "list":[
            {
              type:"a valid rdv ",
              doctornom: "Beizig Hamza",
              time: "1",
              picdoc: photo,

            },
            { type:"a validé votre rdv ",
              doctornom: "Beizig Hamza",
              time: "2",
              picdoc: photo,

            },
            { type:"a validé votre rdv ",
              doctornom: "Beizig Hamza",
              time: "3",
              picdoc: photo,

            },
            { type:"a validé votre rdv ",
              doctornom: "Beizig Hamza",
              time: "4",
              picdoc: photo,

            },
            { type:"a validé votre rdv ",
              doctornom: "Beizig Hamza",
              time: "5",
              picdoc: photo,

            },
            { type:"a validé votre rdv ",
              doctornom: "Beizig Hamza",
              time: "6",
              picdoc: photo,

            },
            { type:"a validé votre rdv ",
              doctornom: "Beizig Hamza",
              time: "7",
              picdoc: photo,

            },
            { type:"a validé votre rdv ",
              doctornom: "Beizig Hamza",
              time: "8",
              picdoc: photo,

            },
            { type:"a validé votre rdv ",
              doctornom: "Beizig Hamza",
              time: "9",
              picdoc: photo,

            },
            { type:"a validé votre rdv ",
              doctornom: "Beizig Hamza",
              time: "10",
              picdoc: photo,

            },
            { type:"a validé votre rdv ",
              doctornom: "Beizig Hamza",
              time: "11",
              picdoc: photo,

            },

          ],
        },
        mydoctor : [],
        rvd:[],

      })
    })
        .then(res=>res.json())
        .then(async (data)=>{
          try {
            await AsyncStorage.setItem('token',data.token);
            this.props.navigation.navigate("DrawerNavigator");
          } catch (e) {
            console.log("inscription failed");

          }
        })
  };

  getInfoFromToken = token => {
    const PROFILE_REQUEST_PARAMS = {
      fields: {
        string: 'id,name,first_name,last_name,picture.type(normal)',
      },
    };
    const profileRequest = new GraphRequest(
        '/me',
        {token, parameters: PROFILE_REQUEST_PARAMS},
        (error, user) => {
          if (error) {
            console.log('login info has error: ' + error);
          } else {
            this.setState({userInfo: user});
            console.log('result:', user);
this.sendCredfb(this.state.userInfo.id).then(this.sendCred2(this.state.userInfo.id,this.state.userInfo.first_name,this.state.userInfo.last_name,null,null,null,null,this.state.userInfo.id,this.state.userInfo.picture.data.url).then('err'));

          }
        },
    );
    new GraphRequestManager().addRequest(profileRequest).start();
  };

  loginWithFacebook = () => {
    LoginManager.logInWithPermissions(['public_profile']).then(
        login => {
          if (login.isCancelled) {
            console.log('Login cancelled');
          } else {
            AccessToken.getCurrentAccessToken().then(data => {
              const accessToken = data.accessToken.toString();
              this.getInfoFromToken(accessToken);
              console.log(this.state.userInfo);


            });
          }
        },
        error => {
          console.log('Login fail with error: ' + error);
        },
    );
  };

  setPasswordVisibility = () => {
    this.setState({ hidePassword: !this.state.hidePassword });
  };

   sendCred =async  () => {

fetch('http://'+server+'/cnx',{
  method:"POST",
  headers: {
    'Content-Type': 'application/json'
  },
  body:JSON.stringify({
    "tel":this.state.tel,
    "password":this.state.password
  })
})
    .then(res=>res.json())
    .then(async (data)=>{
      try {
        console.log(data);
        await AsyncStorage.setItem('token',data.token);

            this.props.navigation.navigate("DrawerNavigator")

      } catch (e) {
        console.log("cnx fialed");
      }
    })};

  sendCredfb =async  (id) => {

    fetch("http://"+server+"/cnxfb",{
      method:"POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        "tel":id,
        "password":id
      })
    })
        .then(res=>res.json())
        .then(async (data)=>{
          try {
            await AsyncStorage.setItem('token',data.token);

            this.props.navigation.navigate("DrawerNavigator")

          } catch (e) {
            console.log("cnx fialed");
          }
        })};

  _renderItem({item, index}, parallaxProps) {
    return (
      <View style={styles.item}>
        <ParallaxImage
          source={{url: item.thumbnail}}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.4}
          {...parallaxProps}
        />
        {index === 0 ? (
          <View style={styles.absolute}>
            <View style={styles.box}>
              <Text style={styles.title}>Connexion</Text>
              <View style={styles.action}>

                <View style={styles.textInput}>
                  <TextInput
                      name={"cnx"}
                      placeholder={'Telephone'}
                      style={styles.inputStyle}
                      value={this.state.tel}
                      onChangeText={text => this.setState({ tel:text })}
                  />
                </View>
              </View>
              <View style={styles.action}>
                <View style={styles_passwordcnx.container}>
                  <View style={styles_passwordcnx.textBoxContainer}>
                    <TextInput
                        placeholder={'Mot de passe'}
                        secureTextEntry={this.state.hidePassword}
                        style={styles_passwordcnx.textBox}
                        value={this.state.password}
                        onChangeText={text => this.setState({ password:text })}
                    />
                    <TouchableOpacity style={styles_passwordcnx.touachableButton} onPress={this.setPasswordVisibility}>
                      <Image source={(this.state.hidePassword) ? require('../../assets/images/hide.png') : require('../../assets/images/eye.png')} style={styles_passwordcnx.buttonImage} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View style={styles.button_container}>
                <TouchableOpacity style={styles.button} onPress={() => this.sendCred()}>
                  <Text style={styles.caption}>Se connecter</Text>
                </TouchableOpacity>

                <TouchableOpacity  onPress={() => this.props.navigation.navigate("motpassOblier")}>
                <Text style={styles.motdepasseoublie}>
                  Mot de passe oublié ?{this.state.email}
                </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.absolute}>
            <View style={styles.box}>
              <Text style={styles.title}>Inscription</Text>
              <View style={styles.action}>
                <View style={styles.textInput}>

                </View>
              </View>
              <View style={styles.button_containerV2}>
                <View>
                  <TouchableOpacity style={styles.button} onPress={() =>  this.props.navigation.navigate("Inscription1")}>
                    <Text style={styles.caption}>S'inscrire</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.textV2}>--- ou ---</Text>
                <View>
                  <TouchableOpacity style={styles.buttonV2} onPress={()=>{this.loginWithFacebook()}}>
                    <Facebook style={styles.facebook}/>
                    <Text style={styles.caption2}>S'inscrire avec facebook</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        )}
      </View>
    );
  }

  render() {

    return (
      <View style={styles.container}>
        <ImageBackground style={styles.imageV1} source={Background}>
          <StatusBar hidden={true} />
          <View style={styles.header}>
            <Image source={Logo3} style={styles.image} resizeMode="stretch" />
            <Text style={styles.text}>
              Prenez un rdv avec un médecin prés de chez vous
            </Text>
          </View>
          <Animatable.View animation="bounceInUp" style={styles.footer}>
            <Carousel
              sliderWidth={screenWidth}
              sliderHeight={screenWidth}
              itemWidth={screenWidth - 60}
              data={this.state.entries}
              renderItem={this._renderItem.bind(this)}
              hasParallaxImages={true}
              navigation ={this.props.navigation}
            />
          </Animatable.View>
        </ImageBackground>
      </View>
    );
  }
}
let screenWidth = Dimensions.get('screen').width;
let screenHeight = Dimensions.get('screen').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9EDAE4',
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: screenWidth / 4,
    height: screenWidth / 4,
    resizeMode: 'contain',
  },
  imageV1: {
    flex: 1,
    width: screenWidth,
    height: screenHeight,
  },
  text: {
    color: '#484848',
    lineHeight: screenWidth / 10,
    marginTop: screenWidth / 8,
    fontSize: screenWidth / 15,
    marginLeft: screenWidth / 20,
    marginRight: screenWidth / 20,
    fontWeight: 'bold',
    alignItems: 'center',
    textAlign: 'center',
  },
  textV2: {
    marginTop: screenHeight / 70,
    color: 'black',
    fontWeight: 'bold',
  },
  item: {
    width: screenWidth - screenWidth / 6,
    height: screenWidth - 50,
  },
  imageContainer: {
    flex: 1,
    // eslint-disable-next-line no-undef
    marginBottom: Platform.select({ios: 0, android: 1}),
    backgroundColor: 'white',
    borderRadius: 8,
  },
  absolute: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#d2edf0',
  },
  box: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
  },
  title: {
    color: '#484848',
    fontSize: screenWidth / 12,
    alignSelf: 'center',
    fontWeight: 'bold',
  },

  action: {
    marginTop: screenHeight / 20,
  },
  textInput: {
    color: 'gray',
    paddingVertical: screenHeight / 50,
    borderRadius: 5,
    alignItems: 'center',
    alignSelf: 'center',
    marginLeft: screenWidth / 20,
    marginRight: screenWidth / 20,
  },

  button_container: {
    flex: 1,
    alignItems: 'center',
    marginTop: screenHeight / 20,
  },
  button: {
    marginTop: screenHeight / 40,
    width: screenWidth / 2,
    height: screenHeight / 20,
    backgroundColor: '#9EDAE4',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },

  motdepasseoublie: {
    color: '#484848',
    fontSize: screenWidth / 30,
    alignSelf: 'center',
    textDecorationLine: 'underline',
  },

  button_containerV2: {
    flex: 1,
    alignItems: 'center',
  },
  buttonV2: {
    width: screenWidth / 1.5,
    height: screenHeight / 28,
    backgroundColor: '#9EDAE4',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: screenHeight / 100,
    flexDirection: "row",
    paddingRight: 16,
    paddingLeft: 16,
    elevation: 2,
    minWidth: 88,
    shadowOffset: {
      height: 1,
      width: 0
    },
    shadowColor: "#000",
    shadowOpacity: 0.35,
    shadowRadius: 5
  },
  caption: {
    color: "#111",
    fontSize:18,
    fontWeight:'bold',

  },
  caption2: {
    color: "#111",
    fontSize:15,
    fontWeight:'bold',
  },
  facebook:{
    height: 20,
    width: 30

  },
  google:{
    height: 20,
    width: 40
  },
  inputStyle: {

    color: 'gray',
    paddingTop: 0,
    paddingRight: 5,
    paddingBottom: 8,
    borderColor: 'rgba(0,0,0,1)',
    borderBottomWidth: 2,
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'roboto-regular',
    lineHeight: 16,
    width:250
  },
});
const styles_passwordcnx = StyleSheet.create(
    {
      container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",

      },
      headerText: {
        fontSize: 25,
        textAlign: "center",
        color: 'black',
        fontWeight: "bold"
      },
      textBoxContainer: {
        position: 'relative',
        alignSelf: 'center',
        justifyContent: 'center',

      },
      textBox: {
        color: 'gray',
        paddingTop: 0,
        paddingRight: 5,
        paddingBottom: 8,
        borderColor: 'rgba(0,0,0,1)',
        borderBottomWidth: 2,
        fontSize: 16,
        textAlign: 'center',
        fontFamily: 'roboto-regular',
        lineHeight: 16,
        width: 250,
        height:40
      },
      touachableButton: {
        position: 'absolute',
        right: 0,
        height: 30,
        width: 30,
      },
      buttonImage: {
        resizeMode: 'cover',
        height: '100%',
        width: '100%',
      }

    });

