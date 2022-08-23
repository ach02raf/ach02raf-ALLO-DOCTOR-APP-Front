import React from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Text,
  TextInput,
} from 'react-native';
import {ProgressSteps, ProgressStep} from 'react-native-progress-steps';
import server from '../../server';


const telephonetext =
  'Pour récupérer votre mot de passe , entrez votre numéro de téléphone dans le chapms ci-dessus et cliquez sur le bouton envoyer\n\n' +
  'Un message de vérification sera envoyé à votre numéro';
const veriftext =
  'Un message de vérification a été envoyé à votre numéro de téléphone\n\n' +
  'Veuillez coller le code que vous avez réçu dans le champs ci-dessus pour pouvoir récuperer votre compte';
const changepass = 'Veuillez saisir un nouveau mot de passe pour votre compte';
export default class Motpasse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      passer : true,
      passer2: true,
      passer3: true,

      pass1: '',
      pass1barcolor: 'grey',
      obligatoirepass1: '',

      pass2: '',
      pass2barcolor: 'grey',
      obligatoirepass2: '',

      tel: '',
      telbarcolor: 'grey',
      obligatoiretel: '',
      codeV:null,
      code: null,
      codebarcolor: 'grey',
      obligatoirecode: '',
      telV:null,
      nom:null,
      prenom:null,
      id:null,
      passwordN:null,
    };
  }

  onedit = () => {
    if ((this.state.pass1 !== '')) {
      this.setState({obligatoirepass1: '', pass1barcolor: 'grey'});
    }
    if ((this.state.pass2 !== '')) {
      this.setState({obligatoirepass2: '', pass2barcolor: 'grey'});
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

  verify =async () => {
    if (this.state.pass1 === '') {
      this.setState({obligatoirepass1: 'Obligatoire', pass1barcolor: 'red'});
    }
    if (this.state.pass2 === '') {
      this.setState({obligatoirepass2: 'Obligatoire', pass2barcolor: 'red'});
    }
    if (!(this.state.pass2 === '') && !(this.state.pass1 === '')) {
      if(this.state.pass1===this.state.pass2)
      {
        await this.setState({passer: false,passwordN:this.state.pass1});
        this.update().then('errrr');
        this.props.navigation.navigate("Inscription");
      }
    }
  };


  verify2 = async () => {

    if (this.state.tel === '') {
      this.setState({obligatoiretel: 'Obligatoire', telbarcolor: 'red'});
    }
    if ((this.state.tel !== '')) {
      if(this.state.tel.length !==8)
      {
        this.setState({obligatoiretel: 'le numerro contient 8 chiffre !  ', telbarcolor: 'red'});
      }else{
        if(this.state.telV===this.state.tel)
        {
          await this.verifnum().then('err');
          this.setState({passer2: false});
        }
        else{
          this.setState({obligatoiretel: 'nuumero n existe pas ', telbarcolor: 'red'});
        }


      }

    }
  };

  verify3 =  () => {

    if (this.state.codeV === '') {
      this.setState({obligatoirecode: 'Obligatoire', codebarcolor: 'red'});
    }
    if ((this.state.codeV !== '')) {
      if(this.state.codeV !== this.state.code)
      {
        this.setState({obligatoirecode: 'verifier votre code ! ', codebarcolor: 'red'});
      }
      else
      {
        this.setState({passer3: false});
      }

    }
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
  sendCred =async  () => {

    fetch('http://'+server+'/motpassoblier',{
      method:"POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        "tel":this.state.tel,
      })
    })
        .then(res=>res.json())
        .then(async (data)=>{
          try{
         await this.setState({telV:data.tel,nom:data.nom,prenom:data.prenom,id:data.id});

          }
           catch (e) {
            console.log("cnx fialed");
          }
        })};
  update =async  () => {

    fetch('http://'+server+'/updatemotdepass',{
      method:"POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        "id":this.state.id,
        "password":this.state.passwordN,
      })
    })
        .then(res=>res.json())
        .then((data)=>{
          console.log(data);
          console.log('update');
        })};

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
                onNext={async () => { await this.sendCred().then('tt'); this.verify2().then('erer')}}
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
                          width: screenWidth/5,
                          marginRight: screenWidth/8,
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
                          width: screenWidth/5,
                          marginRight: screenWidth/8,
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
                  onSubmit={() => this.verify()}
                  errors={this.state.passer}
                  nextBtnTextStyle={{color: '#383838'}}
                nextBtnStyle={styles.ButtonContainer}
                finishBtnText={'Terminer'}
                previousBtnText={' '}
                previousBtnDisabled={true}
                label="Finalisation">
                <View style={{alignItems: 'center'}}>
                  <Text style={styles.textfinish}>Bienvenue{'\n'}</Text>
                  <Text style={styles.textfinish2}>{this.state.nom+' '+this.state.prenom +'\n'}</Text>
                  <Text style={styles.textphone}>{changepass}{'\n'}</Text>
                  <View style={{alignItems: 'center'}}>

                    <View style={styles.inputpass}>
                      <TextInput
                          secureTextEntry
                        placeholder={'Nouveau mot de passe'}
                        onEndEditing={() => this.onedit()}
                        onChangeText={TextInputValue =>
                          this.setState({pass1: TextInputValue})
                        }
                        style={{
                          width: screenWidth / 1.5,
                          height: 50,
                          color: '#000',
                          marginTop: screenheight / 15,
                          alignSelf: 'center',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderColor: this.state.pass1barcolor,
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
                          width: screenWidth/5,
                          marginRight: screenWidth/8,
                          fontSize: 12,
                          height:screenheight/20
                        }}>
                        {this.state.obligatoirepass1}
                      </Text>
                    </View>

                    <View style={styles.inputpass}>
                      <TextInput
                          secureTextEntry
                          placeholder={'Confirmer nouveau mot de passe'}
                          onEndEditing={() => this.onedit()}
                          onChangeText={TextInputValue =>
                              this.setState({pass2: TextInputValue})
                          }
                          style={{
                            width: screenWidth / 1.5,
                            height: 50,
                            color: '#000',
                            marginTop: screenheight / 15,
                            alignSelf: 'center',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderColor: this.state.pass2barcolor,
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
                            width: screenWidth/5,
                            marginRight: screenWidth/8,
                            fontSize: 12,
                            height:screenheight/20
                          }}>
                        {this.state.obligatoirepass2}
                      </Text>
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
  inputpass: {
    width: screenWidth,
    color: 'white',
    borderRadius: 14,
    fontSize: 10,
    justifyContent: 'center',
    alignItems:'center',
    backgroundColor: 'transparent',
    height: screenheight / 7,

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
    fontSize: screenWidth / 18,
    alignSelf: 'center',
    fontWeight: 'bold',
    fontFamily: 'roboto-regular',
    marginTop: screenheight / 20,
    textAlign: 'center',
  },
  textfinish2: {
    color: '#7c7c7c',
    fontSize: screenWidth / 15,
    alignSelf: 'center',
    fontWeight: '500',
    fontFamily: 'roboto-regular',
    textAlign: 'center',
  },
});
