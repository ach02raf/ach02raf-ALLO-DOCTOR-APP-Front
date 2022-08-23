import React from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Text,
  TextInput,
} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import Usernomprenom from '../icons/Usernomprenom';
import Password from '../icons/password';
import {CheckBox} from 'react-native-elements';
import {ProgressSteps, ProgressStep} from 'react-native-progress-steps';
import RadioForm from 'react-native-simple-radio-button';
import {Avatar} from 'react-native-elements';
import Vile from '../icons/vile';
import Adress from '../icons/adress';
import Cin from '../icons/cin';
import photo from '../../assets/images/hamza.jpg';
import AsyncStorage from '@react-native-community/async-storage';
import avatarpic from '../../assets/images/avatarpic.png' ;
import ImagePicker from 'react-native-image-picker';
import server from '../../server';
const telephonetext =
    'Pour vérifier votre compte, entrez votre numéro de téléphone dans le chapms ci-dessus et cliquez sur le bouton envoyer\n\n' +
    'Un message de vérification sera envoyé au numéro que vous avez entré';
const veriftext =
    'Un message de vérification a été envoyé à votre numéro de téléphone\n\n' +
    'Veuillez coller le code que vous avez réçu dans le champs ci-dessus';

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      obligatoirechecked: 'grey',

      passer: true,
      passer2: true,
      passer3: true,

      nom: '',
      nombarcolor: 'grey',
      obligatoirenom: '',

      prenom: '',
      prenombarcolor: 'grey',
      obligatoireprenom: '',

      pass1: '',
      pass1barcolor: 'grey',
      obligatoirepass1: '',

      pass2: '',
      pass2barcolor: 'grey',
      obligatoirepass2: '',

      tel: '',
      telbarcolor: 'grey',
      obligatoiretel: '',

      code: null,
      codeV:null,
      codebarcolor: 'grey',
      obligatoirecode: '',
      Ville:'',
      Adresse:'',
      Cin:'',
      sexe:"Homme",
      pickedImage:avatarpic,
    };
  }
  sendCred =async  () => {
    fetch("http://"+server+"/inscri",{
      method:"POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        "tel":this.state.tel,
        "password":this.state.pass1,
        "nom":this.state.nom,
        "prenom":this.state.prenom,
        "sexe":this.state.sexe,
        "adresse":this.state.Adresse,
        "cin":this.state.Cin,
        "ville":this.state.Ville,
        "photo":this.state.pickedImage.uri,
        "notification":{
          contunue:"Marquer tous comme lu",
          "colorbacks":[
            {index:'#b1d5dc'}, ],
          "pressed":[{index:'0'},],
          "list":[
            {
              type:"Bienvenue sur votre compte  ",
              doctornom: "Admin ",
              picdoc: "https://drive.google.com/uc?export=download&id=1ArsSEWXpe64OrWDUP4xBSVXzjIa-bNHO",

            },
          ],
        },
        "message":{

          "colorbacks":[{index:'#b1d5dc'},{index:'#b1d5dc'},{index:'#b1d5dc'},{index:'#b1d5dc'},{index:'#b1d5dc'},{index:'#b1d5dc'},{index:'#b1d5dc'},{index:'#b1d5dc'},{index:'#b1d5dc'},{index:'#b1d5dc'},{index:'#b1d5dc'}],
          "pressed":[{index:'0'},{index:'0'},{index:'0'},{index:'0'},{index:'0'},{index:'0'},{index:'0'},{index:'0'},{index:'0'},{index:'0'},{index:'0'}],
          "list":[
            {
              type:"a validé votre rdv ",
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
        mydoctor: [],
        rvd:[],

      })
    })
        .then(res=>res.json())
        .then(async (data)=>{
          try {
            await AsyncStorage.setItem('token',data.token);
            this.props.navigation.navigate("DrawerNavigator");
          } catch (e) {
            console.log(e);



          }
        })
  };
  onedit = () => {
    if ((this.state.nom !=='')) {
      this.setState({obligatoirenom: '', nombarcolor: 'grey'});
    }
    if ((this.state.prenom !== '')) {
      this.setState({obligatoireprenom: '', prenombarcolor: 'grey'});
    }
    if ((this.state.pass1 !== '')) {
      this.setState({obligatoirepass1: '', pass1barcolor: 'grey'});
    }
    if ((this.state.pass2 !== '')) {
      this.setState({obligatoirepass2: '', pass2barcolor: 'grey'});
    }
    if ((this.state.checked === true)) {
      this.setState({obligatoirechecked: 'grey'});


    }


  };
  onedit2 = () => {
    if ((this.state.tel !== '')) {
      this.setState({obligatoiretel: '', telbarcolor: 'grey'});
    }
  };
  onedit3 = () => {
    if ((this.state.code !== '')) {
      this.setState({obligatoirecode: '', codebarcolor: 'grey'});
    }
  };

  verify = () => {
    if (this.state.nom === '' ) {
      this.setState({obligatoirenom: 'Obligatoire', nombarcolor: 'red'});
    }
    if (this.state.prenom === '') {
      this.setState({obligatoireprenom: 'Obligatoire', prenombarcolor: 'red'});
    }
    if (this.state.pass1 === '') {
      this.setState({obligatoirepass1: 'Obligatoire', pass1barcolor: 'red'});
    }
    if (this.state.pass2 === '') {
      this.setState({obligatoirepass2: 'Obligatoire', pass2barcolor: 'red'});
    }
    if (this.state.checked === false) {
      this.setState({obligatoirechecked: 'red'});
    }
    if(this.state.pass1 !== this.state.pass2){
      this.setState({obligatoirepass1: 'mot de passe incorrect', pass1barcolor: 'red'});
      this.setState({obligatoirepass2: 'mot de passe incorrect', pass2barcolor: 'red'});
    }
    if (
        !(this.state.pass2 === '') &&
        !(this.state.pass1 === '') &&
        !(this.state.prenom === '') &&
        !(this.state.nom === '') &&
        this.state.checked === true
        &&(this.state.pass1===this.state.pass2)) {
      this.setState({passer: false});
    }
  };

  verify2 = () => {
    if (this.state.tel === '') {
      this.setState({obligatoiretel: 'Obligatoire', telbarcolor: 'red'});
    }
    if (this.state.tel !== '') {
      if(this.state.tel.length !== 8 )
      {
        this.setState({obligatoiretel: 'verifier votre numero', telbarcolor: 'red'});
      }




    }

    if (!(this.state.tel === '')) {
      if (this.state.tel.length===8){
        this.verifnum().then('7412');
        this.setState({passer2: false});

      }

    }
  };

  verify3 = () => {
    if (this.state.codeV === '') {
      this.setState({obligatoirecode: 'Obligatoire', codebarcolor: 'red'});
    }
    if (!(this.state.codeV === this.state.code)) {
      this.setState({obligatoirecode: 'code invalide ', codebarcolor: 'red'});
    }
    if (this.state.code=== this.state.codeV) {
      this.setState({passer3: false});
    }
  };
  pickImageHandler = () => {
    ImagePicker.showImagePicker(
        {title: 'Choisir votre image', maxWidth: 800, maxHeight: 600},
        res => {
          if (res.didCancel) {
            console.log('fermé');
          } else if (res.error) {
            console.log('probleme', res.error);
          } else {
            this.setState({
              pickedImage: {uri: res.uri},
            });
          }
        },
    );
  };
  verifnum = async ()=>{
    fetch('http://'+server+'/verification').then(res=>res.json())
        .then(data=>{
              console.log(data);

                this.setState({
                 code:data.code,
                })


            }
        )
  };

  render() {
    return (
        <View style={styles.container}>
          <View style={{flex: 1, backgroundColor: '#9EDAE4'}}>
            <ImageBackground
                source={require('../../assets/images/wallpaperinscri.png')}
                resizeMode="cover"
                style={styles.image}>
              <ProgressSteps
                  labelColor={'#707070'}
                  disabledStepIconColor={'#989898'}
                  completedLabelColor={'#296E85'}
                  activeLabelColor={'#296E85'}
                  completedStepIconColor={'#296E85'}
                  completedProgressBarColor={'#296E85'}
                  borderWidth={3}
                  activeStepIconBorderColor={'#296E85'}>
                <ProgressStep
                    onNext={() => this.verify()}
                    errors={this.state.passer}
                    nextBtnTextStyle={{color: '#383838'}}
                    nextBtnStyle={styles.ButtonContainer}
                    nextBtnText={'Suivant'}
                    label="Inscription">
                  <View
                      style={{
                        backgroundColor: '#e0f1ff',
                        alignItems: 'flex-start',
                      }}>
                    <View>
                      <ImageBackground
                          source={require('../../assets/images/Logo3.png')}
                          resizeMode="contain"
                          style={styles.imagelogo0}
                      />
                    </View>
                    <View>
                      <View style={styles.input}>
                        <View style={{flexDirection: 'column'}}>
                          <View style={styles.container2}>
                            <Usernomprenom style={styles.iconStyle} />
                            <TextInput
                                placeholder={'Nom'}
                                onChangeText={TextInputValue =>
                                    this.setState({nom: TextInputValue})
                                }
                                onEndEditing={() => this.onedit()}
                                style={{
                                  width: screenWidth - 100,
                                  height: 40,
                                  color: '#000',
                                  alignSelf: 'stretch',
                                  marginRight: 20,
                                  paddingRight: 5,
                                  paddingBottom: 8,
                                  borderColor: this.state.nombarcolor,
                                  borderBottomWidth: 1,
                                  fontSize: 16,
                                  fontFamily: 'roboto-regular',
                                  lineHeight: 16,
                                }}
                            />
                          </View>
                          <Text
                              style={{
                                color: 'red',
                                alignSelf: 'flex-end',
                                width: screenWidth / 7,
                                marginRight: screenWidth / 8,
                                fontSize: 12,
                              }}>
                            {this.state.obligatoirenom}
                          </Text>
                        </View>
                      </View>

                      <View style={styles.input}>
                        <View style={styles.container2}>
                          <Usernomprenom style={styles.iconStyle} />
                          <TextInput
                              placeholder={'Prénom'}
                              onChangeText={TextInputValue =>
                                  this.setState({prenom: TextInputValue})
                              }
                              onEndEditing={() => this.onedit()}
                              style={{
                                width: screenWidth - 100,
                                height: 40,
                                color: '#000',
                                alignSelf: 'stretch',
                                marginRight: 20,
                                paddingRight: 5,
                                paddingBottom: 8,
                                borderColor: this.state.prenombarcolor,
                                borderBottomWidth: 1,
                                fontSize: 16,
                                fontFamily: 'roboto-regular',
                                lineHeight: 16,
                              }}
                          />
                        </View>
                        <Text
                            style={{
                              color: 'red',
                              alignSelf: 'flex-end',
                              width: screenWidth / 7,
                              marginRight: screenWidth / 8,
                              fontSize: 12,
                            }}>
                          {this.state.obligatoireprenom}
                        </Text>
                      </View>

                      <View style={styles.input}>
                        <View style={styles.container2}>
                          <Password style={styles.iconStyle} />
                          <TextInput
                              secureTextEntry
                              placeholder={'Mot de passe'}
                              onEndEditing={() => this.onedit()}
                              onChangeText={TextInputValue =>
                                  this.setState({pass1: TextInputValue})
                              }
                              style={{
                                width: screenWidth - 100,
                                height: 40,
                                color: '#000',
                                alignSelf: 'stretch',
                                marginRight: 20,
                                paddingRight: 5,
                                paddingBottom: 8,
                                borderColor: this.state.pass1barcolor,
                                borderBottomWidth: 1,
                                fontSize: 16,
                                fontFamily: 'roboto-regular',
                                lineHeight: 16,
                              }}
                          />
                        </View>
                        <Text
                            style={{
                              color: 'red',
                              alignSelf: 'flex-end',
                              width: screenWidth / 7,
                              marginRight: screenWidth / 8,
                              fontSize: 12,
                            }}>
                          {this.state.obligatoirepass1}
                        </Text>
                      </View>

                      <View style={styles.input}>
                        <View style={styles.container2}>
                          <Password style={styles.iconStyle} />
                          <TextInput
                              secureTextEntry
                              placeholder={'Confirmer mot de passe'}
                              onChangeText={TextInputValue =>
                                  this.setState({pass2: TextInputValue})
                              }
                              onEndEditing={() => this.onedit()}
                              style={{
                                width: screenWidth - 100,
                                height: 40,
                                color: '#000',
                                alignSelf: 'stretch',
                                marginRight: 20,
                                paddingRight: 5,
                                paddingBottom: 8,
                                borderColor: this.state.pass2barcolor,
                                borderBottomWidth: 1,
                                fontSize: 16,
                                fontFamily: 'roboto-regular',
                                lineHeight: 16,
                              }}
                          />
                        </View>
                        <Text
                            style={{
                              color: 'red',
                              alignSelf: 'flex-end',
                              width: screenWidth / 7,
                              marginRight: screenWidth / 8,
                              fontSize: 12,
                            }}>
                          {this.state.obligatoirepass2}
                        </Text>
                      </View>
                      <View style={styles.sexe}>
                        <Svg height={25} viewBox="30 0 512 512" width={25}>
                          <Path
                              d="M120 358.484V421H75c-8.291 0-15 6.709-15 15s6.709 15 15 15h45v46c0 8.291 6.709 15 15 15s15-6.709 15-15v-46h45c8.291 0 15-6.709 15-15s-6.709-15-15-15h-45v-62.456c10.203-1.309 20.167-3.38 29.614-6.716-8.61-7.167-16.421-15.233-23.423-23.983A104.977 104.977 0 01135 330c-57.891 0-105-47.109-105-105s47.109-105 105-105c59.828 0 105 51.031 105 105 0 17.375-4.649 33.532-12.155 47.983 6.557 7.798 14.575 14.198 23.76 18.814C262.985 272.016 270 249.413 270 225c0-69.576-57.22-135-135-135C60.557 90 0 150.557 0 225c0 69.307 52.685 125.911 120 133.484z"
                              fill={'#909090'}
                          />
                          <Path
                              d="M497 0h-90c-8.291 0-15 6.709-15 15s6.709 15 15 15h53.789l-91.993 89.993C345.699 101.517 316.813 90 285 90c-15.712 0-30.577 3.215-44.614 8.172 8.61 7.167 16.421 15.233 23.423 23.983A104.977 104.977 0 01285 120c57.891 0 105 47.109 105 105s-47.109 105-105 105c-59.423 0-105-50.471-105-105 0-17.375 4.649-33.532 12.155-47.983-6.557-7.798-14.575-14.198-23.76-18.814C157.015 177.984 150 200.587 150 225c0 70.254 58.757 135 135 135 74.443 0 135-60.557 135-135 0-31.813-11.517-60.699-29.993-83.796L482 51.211V105c0 8.291 6.709 15 15 15s15-6.709 15-15V15c0-8.207-6.727-15-15-15z"
                              fill={'#959595'}
                          />
                        </Svg>
                        <Text style={styles.sexetext}>Sexe</Text>
                        <RadioForm
                            radio_props={[
                              {label: 'Homme', value: 'Homme'},
                              {label: 'Femme', value: 'Femme'},
                            ]}
                            initial={0}
                            formHorizontal={true}
                            labelHorizontal={true}
                            buttonColor={'#2196f3'}
                            borderWidth={1}
                            buttonInnerColor={'#e74c3c'}
                            buttonSize={screenWidth / 40}
                            buttonOuterSize={screenWidth / 20}
                            animation={true}
                            style={{alignSelf: 'center', marginTop: 8}}
                            labelStyle={{
                              fontSize: screenWidth / 28,
                              color: 'grey',
                              marginRight: screenWidth / 20,
                            }}
                            onPress={value =>(
                              this.setState({sexe:value})
                            ) }
                        />
                      </View>
                      <CheckBox
                          onIconPress={() => this.setState({checked:!this.state.checked,obligatoirechecked:'grey'})}
                          textStyle={{color: this.state.obligatoirechecked}}
                          title="j ai lu et j accepte les termes et conditions de cette application"
                          checked={this.state.checked}
                          containerStyle={{
                            backgroundColor: 'transparent',
                            height:screenheight/15,
                            width: screenWidth / 1.2,
                            marginLeft: screenWidth / 17,
                          }}
                      />

                    </View>
                  </View>
                </ProgressStep>

                <ProgressStep
                    onNext={() => this.verify2()}
                    errors={this.state.passer2}
                    nextBtnTextStyle={{color: '#383838'}}
                    nextBtnStyle={styles.ButtonContainer}
                    nextBtnText={'Envoyer'}
                    previousBtnText={' '}
                    label="Téléphone"
                    previousBtnDisabled={true}>
                  <View
                      style={{
                        backgroundColor: '#e0f1ff',
                        alignItems: 'flex-start',
                      }}>
                    <View>
                      <ImageBackground
                          source={require('../../assets/images/Logo3.png')}
                          resizeMode="contain"
                          style={styles.imagelogo}
                      />
                    </View>
                    <View style={{alignItems: 'center'}}>
                      <View style={styles.inputtel}>
                        <TextInput
                            placeholder={'Téléphone'}
                            onEndEditing={() => this.onedit2()}
                            onChangeText={TextInputValue =>
                                this.setState({tel: TextInputValue})
                            }
                            style={{
                              width: screenWidth / 1.5,
                              height: 40,
                              color: '#000',
                              marginTop: screenheight / 15,
                              alignSelf: 'center',
                              alignItems: 'center',
                              justifyContent: 'center',
                              borderColor: this.state.telbarcolor,
                              borderWidth: 1,
                              fontSize: 16,
                              fontFamily: 'roboto-regular',
                              lineHeight: 16,
                              textAlign: 'center',
                            }}
                        />
                        <Text
                            style={{
                              color: 'red',
                              alignSelf: 'flex-end',
                              width: screenWidth / 5,
                              marginRight: screenWidth / 8,
                              fontSize: 12,
                            }}>
                          {this.state.obligatoiretel}
                        </Text>
                      </View>

                      <View style={styles.labeltelephone}>
                        <Text style={styles.textphone}>{telephonetext}</Text>
                      </View>
                    </View>
                  </View>
                </ProgressStep>

                <ProgressStep
                    onNext={() => this.verify3()}
                    errors={this.state.passer3}
                    nextBtnTextStyle={{color: '#383838'}}
                    nextBtnStyle={styles.ButtonContainer}
                    nextBtnText={'Valider'}
                    previousBtnText={' '}
                    previousBtnDisabled={true}
                    label="Verification">
                  <View
                      style={{
                        backgroundColor: '#e0f1ff',
                        alignItems: 'flex-start',
                      }}>
                    <View>
                      <ImageBackground
                          source={require('../../assets/images/Logo3.png')}
                          resizeMode="contain"
                          style={styles.imagelogo}
                      />
                    </View>
                    <View style={{alignItems: 'center'}}>
                      <View style={styles.inputtel}>
                        <TextInput
                            placeholder={'Code de verification'}
                            onEndEditing={() => this.onedit3()}
                            onChangeText={TextInputValue =>
                                this.setState({codeV: TextInputValue})
                            }
                            style={{
                              width: screenWidth / 1.5,
                              height: 40,
                              color: '#000',
                              marginTop: screenheight / 15,
                              alignSelf: 'center',
                              alignItems: 'center',
                              justifyContent: 'center',
                              borderColor: this.state.codebarcolor,
                              borderWidth: 1,
                              fontSize: 16,
                              fontFamily: 'roboto-regular',
                              lineHeight: 16,
                              textAlign: 'center',
                            }}
                        />
                        <Text
                            style={{
                              color: 'red',
                              alignSelf: 'flex-end',
                              width: screenWidth / 5,
                              marginRight: screenWidth / 8,
                              fontSize: 12,
                            }}>
                          {this.state.obligatoirecode}
                        </Text>
                      </View>
                      <View style={styles.labeltelephone}>
                        <Text style={styles.textphone}>{veriftext}</Text>
                      </View>
                    </View>
                  </View>
                </ProgressStep>

                <ProgressStep
                    ///Lenna besh t7ot navigation ll page home --!!!!!!--    onSubmit={() => this.props.navigation.navigate("DrawerNavigator")}
                    nextBtnTextStyle={{color: '#383838'}}
                    nextBtnStyle={styles.ButtonContainer}
                    finishBtnText={'Terminer'}
                    label="Finalisation"
                    onSubmit={() => this.sendCred()}
                    previousBtnText={' '}
                    previousBtnDisabled={true}
                >
                  <View
                      style={{
                        backgroundColor: '#e0f1ff',
                        alignItems: 'flex-start',
                      }}>
                  <View style={{alignItems: 'center'}}>
                    <Text style={styles.textfinish}>Compléter votre profil</Text>
                    <Avatar
                        rounded
                        size="xlarge"
                        source={this.state.pickedImage}
                        onEditPress={ this.pickImageHandler}
                        showEditButton
                        containerStyle={{justifyContent:'center',alignSelf:'center'}}
                        overlayContainerStyle={{backgroundColor: 'transparent'}}
                    />

                    <View style={styles.input}>
                      <View style={styles.container2}>
                        <Vile style={styles.iconStyle} />
                        <TextInput
                            placeholder={'Ville'}
                            style={styles.inputStyle}
                            onChangeText={TextInputValue =>
                                this.setState({Ville: TextInputValue})}
                        />
                      </View>
                    </View>

                    <View style={styles.input}>
                      <View style={styles.container2}>
                        <Adress style={styles.iconStyle} />
                        <TextInput
                            placeholder={'Adresse'}
                            style={styles.inputStyle}
                            onChangeText={TextInputValue =>
                                this.setState({Adresse: TextInputValue})}
                        />
                      </View>
                    </View>

                    <View style={styles.input}>
                      <View style={styles.container2}>
                        <Cin style={styles.iconStyle} />
                        <TextInput
                            placeholder={'Cin'}
                            style={styles.inputStyle}
                            onChangeText={TextInputValue =>
                                this.setState({Cin: TextInputValue})}

                        />
                      </View>
                    </View>
                  </View>
                  </View>
                </ProgressStep>
              </ProgressSteps>
            </ImageBackground>
          </View>
        </View>


    );
  }
}
const screenWidth = Math.round(Dimensions.get('window').width);
const screenheight = Math.round(Dimensions.get('window').height);
const styles = StyleSheet.create({
  input: {
    width: screenWidth,
    height: screenheight / 18,
    margin: screenheight / 60,
    padding: 8,
    color: 'white',
    borderRadius: 14,
    fontSize: 10,
    fontWeight: '500',
  },
  inputtel: {
    width: screenWidth,
    height: screenheight / 18,
    color: 'white',
    borderRadius: 14,
    fontSize: 10,
    justifyContent: 'center',
  },
  sexe: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    width: screenWidth / 1.2,
    height: screenheight / 15,
    marginTop: screenheight / 50,
    marginHorizontal: screenWidth / 12,
  },
  sexetext: {
    justifyContent: 'flex-start',
    width: screenWidth / 5,
    marginRight: screenWidth / 30,
    marginLeft: screenWidth / 35,
    fontSize: screenWidth / 25,
    fontFamily: 'roboto-regular',
    color: '#6d6d6d',
  },
  messagebuttoncont: {
    width: screenWidth / 1.1,
    height: screenheight / 12,
    marginVertical: screenheight / 40,
    marginHorizontal: screenWidth / 18,
    backgroundColor: 'transparent',
    borderRadius: 14,
    fontSize: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  messagebutton: {
    width: screenWidth / 1.9,
    height: screenheight / 15,
    backgroundColor: 'transparent',
    borderRadius: 5,
    fontSize: 10,
    alignSelf: 'flex-end',
    flexDirection: 'row',
    marginLeft: screenWidth / 30,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputmessage: {
    width: screenWidth / 5,
    height: screenheight / 15,
    backgroundColor: 'transparent',
    borderBottomLeftRadius: 5,
    fontSize: 15,
    alignSelf: 'center',
    marginLeft: screenWidth / 40,
    borderBottomWidth: 1,
    fontFamily: 'roboto-regular',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  labeltelephone: {
    marginTop: screenheight / 13,
    width: screenWidth / 1.3,
    height: screenheight / 3,
  },
  textphone: {
    color: '#292929',
    fontSize: screenWidth / 20,
    textAlign: 'center',
    alignSelf: 'center',
    backgroundColor: 'transparent',
    lineHeight: screenheight / 25,
  },
  container2: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },

  ButtonContainer: {
    height: screenheight / 15,
    width: screenWidth / 2,
    backgroundColor: '#9EDAE4',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: screenWidth / 10,
  },
  imagelogo0: {
    resizeMode: 'cover',
    width: screenWidth,
    height: screenWidth / 5.5,
    backgroundColor: 'transparent',
    marginTop: screenheight / 50,
  },
  imagelogo: {
    resizeMode: 'cover',
    width: screenWidth,
    height: screenWidth / 5,
    backgroundColor: 'transparent',
    marginTop: screenheight / 25,
    marginBottom: screenheight / 40,
  },
  image: {
    resizeMode: 'cover',
    width: screenWidth,
    height: screenheight,
    flex: 1,
    alignSelf: 'flex-start',
  },
  mypicker: {
    marginTop: screenheight / 4,
    marginBottom: screenheight / 4,
    width: screenWidth,
    height: screenheight / 15,
  },

  caption: {
    color: '#111',
    fontSize: 18,
    fontWeight: 'bold',
  },
  iconStyle: {
    height: 20,
    width: 40,
  },
  inputStyle: {
    width: screenWidth - 100,
    height: 40,
    color: '#000',
    alignSelf: 'stretch',
    marginRight: 20,
    paddingRight: 5,
    paddingBottom: 8,
    borderColor: 'grey',
    borderBottomWidth: 1,
    fontSize: 16,
    fontFamily: 'roboto-regular',
    lineHeight: 16,
  },
  inputStyletel: {
    width: screenWidth / 1.5,
    height: 40,
    color: '#000',
    marginTop: screenheight / 15,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'rgb(17,17,17)',
    borderWidth: 1,
    fontSize: 16,
    fontFamily: 'roboto-regular',
    lineHeight: 16,
    textAlign: 'center',
  },
  textfinish: {
    color: '#484848',
    fontSize: screenWidth / 15,
    alignSelf: 'center',
    fontWeight: 'bold',
    fontFamily: 'roboto-regular',
    marginTop: screenheight / 20,
    marginBottom: screenheight / 35,
  },
});
