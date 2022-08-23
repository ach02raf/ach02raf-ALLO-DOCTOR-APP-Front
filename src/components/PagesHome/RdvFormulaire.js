import React, {Component} from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Picker,
} from 'react-native';
import {ButtonGroup} from 'react-native-elements';
import RadioForm from 'react-native-simple-radio-button';
import DatePicker from 'react-native-datepicker';
import server from '../../server';

const day = new Date();

export default class RdvFormulaire extends Component {
  constructor(props) {
    super(props);
    this.state = {
      relation: '',
      date: day,
      selectedIndex: 0,
      nom: '',
      prenom: '',
      adresse: '',
      ville: '',
      cnam: '',
      visite: 'Oui',
      sexe: 'Homme',
      type:'Rdv personnel',
      tel:'',
      time:this.props.navigation.getParam('time'),
      etat:this.props.navigation.getParam('etat'),
      jour:this.props.navigation.getParam('jour'),
      idDoc:this.props.navigation.getParam('idDoc'),
      myId:this.props.navigation.getParam('myId'),
      rvdDoc:this.props.navigation.getParam('rvdDoc'),
      myrvd:this.props.navigation.getParam('rvduser'),
      jours:this.props.navigation.getParam('jours'),
      plan:this.props.navigation.getParam('plan'),
      nomDoc:this.props.navigation.getParam('nomDoc'),
      prenomDoc:this.props.navigation.getParam('prenomDoc'),
      specialiteDoc:this.props.navigation.getParam('specialiteDoc'),
      photoDoc:this.props.navigation.getParam('photoDoc'),

      obligatoirenom: '',
      nombarcolor: 'grey',
      obligatoireprenom: '',
      prenombarcolor: 'grey',
      obligatoireville: '',
      villebarcolor: 'grey',
      obligatoireadresse: '',
      adressebarcolor: 'grey',
      obligatoirecnam: '',
      cnambarcolor: 'grey',
      obligatoiretel: '',
      telbarcolor: 'grey'
    };
    this.updateIndex = this.updateIndex.bind(this);
  }

  updateIndex=async (selectedIndex)=> {
    await this.setState({selectedIndex});
    if(this.state.selectedIndex===1)
    {
      this.setState({type: 'Rdv pour autre personne'})
    }else this.setState({type: 'Rdv personnel'});
  };



modifPlanDoc=async ()=>{

  this.state.jours.map((itam, i) => (
      itam.jour.toString() === this.state.jour ? (
          this.state.plan[i].map((item, k) => (
              item.time===this.state.time ?
                  this.state.plan[i].splice(k,1,{"etat":"red","time":item.time})
                  :null

          ))
      ):null
      )
          );
};


  updateDoctorRVD= async () => {
    await this.modifPlanDoc();
    await  console.log(this.state.rvdDoc);
    if(this.state.type==='Rdv pour autre personne')
    {
      await this.state.rvdDoc.push({
        idUser:this.state.myId,
        jour:this.state.jour,
        etat:'en attente',
        time:this.state.time,
        type:this.state.type,
        relation:this.state.relation,
        nom:this.state.nom,
        prenom:this.state.prenom,
        adresse:this.state.adresse,
        sexe:this.state.sexe,
        ville:this.state.ville,
        visite:this.state.visite,
        cnam:this.state.cnam,
        tel:this.state.tel,

      });
    }else {
      await this.state.rvdDoc.push({
        idUser:this.state.myId,
        jour:this.state.jour,
        etat:'en attente',
        time:this.state.time,
        type:this.state.type,
        relation:null,
        nom:this.state.nom,
        prenom:this.state.prenom,
        adresse:this.state.adresse,
        sexe:this.state.sexe,
        ville:this.state.ville,
        visite:this.state.visite,
        cnam:this.state.cnam,
        tel:this.state.tel,

      });
    }
    await  console.log(this.state.rvdDoc);
    fetch("http://"+server+"/updatervddoctor",{
      method:"POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        "id":this.state.idDoc,
        "jours":this.state.jours,
        "plan":this.state.plan,

      })
    })
        .then(res=>res.json())
        .then((data)=>{
          console.log(data);
        });

    fetch("http://"+server+"/updatervddoctor2",{
      method:"POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        "id":this.state.idDoc,
        "rvd":this.state.rvdDoc,

      })
    })
        .then(res=>res.json())
        .then((data)=>{
          console.log(data);
        });
  };

  updateUserRVD= async () => {
   if(this.state.type==='Rdv pour autre personne')
    {
      await this.state.myrvd.push({
        idDoc:this.state.idDoc,
        jour:this.state.jour,
        etat:'en attente',
        time:this.state.time,
        type:this.state.type,
        relation:this.state.relation,
        nom:this.state.nom,
        prenom:this.state.prenom,
        adresse:this.state.adresse,
        sexe:this.state.sexe,
        ville:this.state.ville,
        visite:this.state.visite,
        cnam:this.state.cnam,
        tel:this.state.tel,
        nomDoc:this.state.nomDoc,
        prenomDoc:this.state.prenomDoc,
        specialiteDoc:this.state.specialiteDoc,
        photoDoc:this.state.photoDoc,


      });

    }else {
      await this.state.myrvd.push({
        idDoc:this.state.idDoc,
        jour:this.state.jour,
        etat:'en attente',
        time:this.state.time,
        type:this.state.type,
        relation:null,
        nom:this.state.nom,
        prenom:this.state.prenom,
        adresse:this.state.adresse,
        sexe:this.state.sexe,
        ville:this.state.ville,
        visite:this.state.visite,
        cnam:this.state.cnam,
        tel:this.state.tel,
        nomDoc:this.state.nomDoc,
        prenomDoc:this.state.prenomDoc,
        specialiteDoc:this.state.specialiteDoc,
        photoDoc:this.state.photoDoc,

      });

    }

    fetch("http://"+server+"/updatervduser",{
      method:"POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        "id":this.state.myId,
        "rvd":this.state.myrvd,
      })
    })
        .then(res=>res.json())
        .then((data)=>{
          console.log(data);
        })};


  onedit = () => {
    if ((this.state.nom !== '')) {
      this.setState({obligatoirenom: '', nombarcolor: 'grey'});
    }
    if ((this.state.prenom !== '')) {
      this.setState({obligatoireprenom: '', prenombarcolor: 'grey'});
    }
    if ((this.state.ville !== '')) {
      this.setState({obligatoireville: '', villebarcolor: 'grey'});
    }
    if ((this.state.adresse !== '')) {
      this.setState({obligatoireadresse: '', adressebarcolor: 'grey'});
    }
    if ((this.state.cnam !== '')) {
      this.setState({obligatoirecnam: '', cnambarcolor: 'grey'});
      if ((this.state.tel !== '')||(this.state.tel.length===8)) {
        this.setState({obligatoiretel: '', telbarcolor: 'grey'});


      }
    }
  };
  verify = () => {
    if ((this.state.nom === '')) {
      this.setState({obligatoirenom: 'Obligatoire', nombarcolor: 'red'});
    }
    if ((this.state.prenom === '')) {
      this.setState({obligatoireprenom: 'Obligatoire', prenombarcolor: 'red'});
    }
    if ((this.state.ville === '')) {
      this.setState({obligatoireville: 'Obligatoire', villebarcolor: 'red'});
    }
    if ((this.state.adresse === '')) {
      this.setState({obligatoireadresse: 'Obligatoire', adressebarcolor: 'red'});
    }
    if ((this.state.cnam === '')) {
      this.setState({obligatoirecnam: 'Obligatoire', cnambarcolor: 'red'});

      if ((this.state.tel === '')||(this.state.tel.length!==8)) {
        this.setState({obligatoiretel: 'verifier numuro !', telbarcolor: 'red'});
      }
    }
    if (this.state.ville !== '' && this.state.adresse !== '' && this.state.prenom !== '' && this.state.nom !== '' && this.state.tel !== '' && this.state.cnam!=='' &&this.state.tel.length===8)
    {
      this.updateDoctorRVD().then('ererere');
      this.updateUserRVD().then("erererer");
      this.props.navigation.navigate("TabNavigator");
    }
  };

  render() {

    const buttons = ['Rdv personnel', 'Rdv pour autre personne'];
    const {selectedIndex} = this.state;


    return (
      <View style={styles.maincontainer}>
        <View style={styles.container}>
          <ButtonGroup
            onPress={this.updateIndex}
            selectedIndex={selectedIndex}
            buttons={buttons}
            textStyle={{fontSize: screenWidth / 30}}
            containerStyle={{
              height: screenheight / 15,
              backgroundColor: '#c7dcf0',
              width: screenWidth / 1.1,
            }}
          />
        </View>
        {this.state.selectedIndex === 0 ? (
          <ScrollView>
            <View style={styles.containerformulaire}>
              <TextInput
                  placeholder={'Nom'}
                  style={styles.inputStyle}
                  onChangeText={TextInputValue =>
                  this.setState({nom: TextInputValue})}
                  onEndEditing={() => this.onedit()}
              />
              <TextInput
                  placeholder={'Prénom'}
                  style={styles.inputStyle}
                  onChangeText={TextInputValue =>
                  this.setState({prenom: TextInputValue})}
                  onEndEditing={() => this.onedit()}
              />
              <TextInput
                  placeholder={'Telephone'}
                  style={styles.inputStyle}
                  onChangeText={TextInputValue =>
                  this.setState({tel: TextInputValue})}
                  onEndEditing={() => this.onedit()}
              />
              <TextInput
                  placeholder={'Adresse'}
                  style={styles.inputStyle}
                  onChangeText={TextInputValue =>
                  this.setState({adresse: TextInputValue})}
                  onEndEditing={() => this.onedit()}
              />
              <TextInput
                  placeholder={'Ville'}
                  style={styles.inputStyle}
                  onChangeText={TextInputValue =>
                  this.setState({ville: TextInputValue})}
                  onEndEditing={() => this.onedit()}
              />
              <TextInput
                  placeholder={'N° CNAM'}
                  style={styles.inputStyle}
                  onChangeText={TextInputValue =>
                  this.setState({cnam: TextInputValue})}
                  onEndEditing={() => this.onedit()}
              />

              <View style={styles.myradio0}>
                <Text style={{color: '#767676', marginRight: 5}}>
                  Date de naissance</Text>
                <DatePicker
                  style={{
                    width: screenWidth / 2,
                    alignSelf: 'flex-end',
                    fontSize: 50,
                  }}
                  date={this.state.date}
                  mode="date"
                  placeholder="choisir une date"
                  format="DD-MM-YYYY"
                  minDate="01-01-1850"
                  maxDate={day}
                  confirmBtnText="Confirmer"
                  cancelBtnText="Fermer"
                  androidMode="spinner"
                  onDateChange={date => {
                    this.setState({date: date});
                  }}
                />
              </View>
              <View style={styles.myradio}>
                <View style={{width: screenWidth / 3}}>
                  <Text style={{color: '#767676'}}>Sexe</Text>
                </View>
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
                    fontSize: screenWidth / 30,
                    color: 'grey',
                    marginRight: screenWidth / 20,
                  }}
                  onPress={value => {
                    this.setState({sexe: value});
                  }}
                />
              </View>
            </View>
            <View style={styles.containerformulaire2}>
              <View style={styles.myradio2}>
                <View style={{width: screenWidth / 3}}>
                  <Text style={{color: '#767676'}}>Premiere visite </Text>
                </View>
                <RadioForm
                  radio_props={[
                    {label: 'Oui', value: 'Oui'},
                    {label: 'Non', value: 'Non'},
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
                  style={{alignSelf: 'flex-start', marginTop: 8}}
                  labelStyle={{
                    fontSize: screenWidth / 30,
                    color: 'grey',
                    marginRight: screenWidth / 8,
                  }}
                  buttonWrapStyle={{marginLeft: 100}}
                  onPress={value => {
                    this.setState({visite: value});
                  }}
                />
              </View>
              <TouchableOpacity style={styles.mybutton} onPress={()=>this.verify()}>
                <Text style={{fontSize: screenWidth / 20, color: 'white'}}>
                  Confirmer
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        ) : (
          <ScrollView>
            <View style={styles.containerformulaire}>
              <TextInput
                  placeholder={'Nom'}
                  style={styles.inputStyle}
                  onChangeText={TextInputValue =>
                      this.setState({nom: TextInputValue})}
                  onEndEditing={() => this.onedit()}
              />
              <TextInput
                  placeholder={'Prénom'}
                  style={styles.inputStyle}
                  onChangeText={TextInputValue =>
                      this.setState({prenom: TextInputValue})}
                  onEndEditing={() => this.onedit()}
              />
              <TextInput
                  placeholder={'Telephone'}
                  style={styles.inputStyle}
                  onChangeText={TextInputValue =>
                      this.setState({tel: TextInputValue})}
                  onEndEditing={() => this.onedit()}
              />
              <TextInput
                  placeholder={'Adresse'}
                  style={styles.inputStyle}
                  onChangeText={TextInputValue =>
                      this.setState({adresse: TextInputValue})}
                  onEndEditing={() => this.onedit()}
              />
              <TextInput
                  placeholder={'Ville'}
                  style={styles.inputStyle}
                  onChangeText={TextInputValue =>
                      this.setState({ville: TextInputValue})}
                  onEndEditing={() => this.onedit()}
              />
              <TextInput
                  placeholder={'N° CNAM'}
                  style={styles.inputStyle}
                  onChangeText={TextInputValue =>
                      this.setState({cnam: TextInputValue})}
                  onEndEditing={() => this.onedit()}
              />
              <View style={styles.inputStylerelation}>
                <Picker
                  mode={'dialog'}
                  style={{
                    fontSize: 10,
                    color: 'grey',
                    height: screenheight / 18,
                  }}
                  selectedValue={this.state.relation}
                  onValueChange={(user, itemPosition) => {
                    if (itemPosition !== 0) {
                      this.setState({relation: user});
                    }
                  }}>
                  <Picker.Item
                    color={'#929292'}
                    label="Relation avec le patient"
                    value="Relation avec le patient"
                  />
                  <Picker.Item label="Père" value="Père" />
                  <Picker.Item label="Mère" value="Mère" />
                  <Picker.Item label="Frère" value="Frère" />
                  <Picker.Item label="Soeur" value="Soeur" />
                  <Picker.Item label="Fils" value="Fils" />
                  <Picker.Item label="Grand-père" value="Grand-père" />
                  <Picker.Item label="Grand-mère" value="Grand-mère" />
                  <Picker.Item label="Oncle" value="Oncle" />
                  <Picker.Item label="Tente" value="Tente" />
                  <Picker.Item label="Neveu" value="Neveu" />
                  <Picker.Item label="Ami(e)" value="Ami(e)" />
                </Picker>
                <Text style={styles.text}>{this.state.user}</Text>
              </View>
              <View style={styles.myradio0}>
                <Text style={{color: '#767676', marginRight: 5}}>
                  Date de naissance
                </Text>
                <DatePicker
                  style={{
                    width: screenWidth / 2,
                    alignSelf: 'flex-end',
                    fontSize: 50,
                  }}
                  date={this.state.date}
                  mode="date"
                  placeholder="choisir une date"
                  format="DD-MM-YYYY"
                  minDate="01-01-1850"
                  maxDate={day}
                  confirmBtnText="Confirmer"
                  cancelBtnText="Fermer"
                  androidMode="spinner"
                  onDateChange={date => {
                    this.setState({date: date});
                  }}
                />
              </View>
              <View style={styles.myradio}>
                <View style={{width: screenWidth / 3}}>
                  <Text style={{color: '#767676'}}>Sexe</Text>
                </View>
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
                    fontSize: screenWidth / 30,
                    color: 'grey',
                    marginRight: screenWidth / 20,
                  }}
                  onPress={value => {
                    this.setState({sexe: value});
                  }}
                />
              </View>
            </View>
            <View style={styles.containerformulaire2}>
              <View style={styles.myradio2}>
                <View style={{width: screenWidth / 3}}>
                  <Text style={{color: '#767676'}}>Premiere visite </Text>
                </View>
                <RadioForm
                  radio_props={[
                    {label: 'Oui', value: 'Oui'},
                    {label: 'Non', value: 'Non'},
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
                  style={{alignSelf: 'flex-start', marginTop: 8}}
                  labelStyle={{
                    fontSize: screenWidth / 30,
                    color: 'grey',
                    marginRight: screenWidth / 8,
                  }}
                  buttonWrapStyle={{marginLeft: 100}}
                  onPress={value => {
                    this.setState({visite: value});
                  }}
                />
              </View>
              <TouchableOpacity style={styles.mybutton} onPress={()=>this.verify()}>
                <Text style={{fontSize: screenWidth / 20, color: 'white'}}>
                  Confirmer
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        )}
      </View>
    );
  }
}

const screenWidth = Math.round(Dimensions.get('window').width);
const screenheight = Math.round(Dimensions.get('window').height);
const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#dff7f5',
    width: screenWidth,
    height: screenheight,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: 'transparent',
    width: screenWidth,
    height: screenheight / 9,
  },
  myradio: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    width: screenWidth ,
    height: screenheight / 15,
    marginVertical: 5,
  },
  myradio0: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    width: screenWidth,
    marginVertical: 5,
  },
  myradio2: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    width: screenWidth,
    height: screenheight / 20,
    marginVertical: 5,
  },
  containertitre: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#4b8dff',
    width: screenWidth,
    height: screenheight / 9,
  },
  containerformulaire: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    width: screenWidth,
    backgroundColor: 'transparent',
    marginHorizontal: screenWidth / 11,
  },
  containerformulaire2: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    width: screenWidth,
    backgroundColor: 'transparent',
    marginHorizontal: screenWidth / 11,
  },
  inputStyle: {
    width: screenWidth / 1.22,
    height: screenheight / 18,
    color: '#000',
    alignSelf: 'stretch',
    marginLeft: 1,
    marginRight: 20,
    paddingTop: 0,
    paddingRight: 5,
    paddingBottom: 8,
    borderColor: 'rgb(115,115,115)',
    borderWidth: 0.7,
    fontSize: screenWidth / 30,
    fontFamily: 'roboto-regular',
    lineHeight: 16,
    marginVertical: screenheight / 50,
  },
  inputStylerelation: {
    width: screenWidth / 1.22,
    height: screenheight / 16,
    color: '#000',
    alignSelf: 'flex-start',
    marginLeft: 1,
    marginRight: 20,
    paddingTop: 0,
    paddingRight: 5,
    paddingBottom: 8,
    borderColor: 'rgb(115,115,115)',
    borderWidth: 0.7,
    fontSize: screenWidth / 30,
    fontFamily: 'roboto-regular',
    marginVertical: screenheight / 40,
  },
  mybutton: {
    width: screenWidth / 2,
    height: screenheight / 18,
    marginBottom: screenheight / 40,
    marginTop: screenheight / 40,
    backgroundColor: '#4b8dff',
    borderRadius: 5,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    marginRight: screenWidth / 6,
  },
});
