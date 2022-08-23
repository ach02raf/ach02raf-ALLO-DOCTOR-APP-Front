import React, {Component} from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert, Animated, SafeAreaView, RefreshControl,
} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import AsyncStorage from '@react-native-community/async-storage';
import server from '../../server';
import Logo from '../../assets/images/Logo2.png';
import {LineDotsLoader} from 'react-native-indicator';

const title = 'RDV';
const message = 'Voulez-vous annuler ce rendez-vous ? ';
const buttons = [{text: 'Cancel', type: 'cancel'}];
export default class ContenuScreenCalender extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStartDate: '',
      value: 'hahaha',
      marked: [],
      rdv: [],
      myrvd:[],
      myID:'',
      Refreshing:false,

      refreshing: true,
      LogoAnime: new Animated.Value(0),
      LogoText: new Animated.Value(0),
      loadingSpinner: false,
      showME: true,

    };
    this.onDateChange = this.onDateChange.bind(this);
  }

  onDateChange(date) {
    this.setState({
      selectedStartDate: date,
    });
  }

  componentDidMount = async()=>{
    setTimeout(async () => {
    await this.Boiler();
    this.markedtableau();
    }, 1000);
    const {LogoAnime, LogoText} = this.state;
    Animated.parallel([
      Animated.spring(LogoAnime, {
        toValue: 1,
        tension: 10,
        friction: 2,
        duration: 5000,
      }).start(),
      Animated.timing(LogoText, {
        toValue: 1,
        duration: 1400,
      }),
    ]).start(() => {
      this.setState({
        loadingSpinner: true,
      });
    });


  };




  Boiler = async ()=>{
    const token = await AsyncStorage.getItem("token");
    await fetch('http://'+server+'/parametreuser',{
      headers:new Headers({
        Authorization:"Bearer "+token
      })
    }).then(res=>res.json())
        .then(data=>{

            this.setState({
              myID:data.id,
              myrvd:data.rvd,
              refreshing: false
            })



            }
        );
  };
markedtableau=()=>{
this.state.myrvd.map((item,i)=>{
  this.state.marked.push( {date: item.jour, style: {backgroundColor: '#77a0dc'}})
})


};
  onRefresh() {
    setTimeout(async () => {
      await this.Boiler();
      this.markedtableau();
    }, 1000);
  }

  render() {
    const {selectedStartDate} = this.state;
    const startDate = selectedStartDate ? selectedStartDate.toString() : '';
    console.log(startDate.split("-")[0]);
    return (
        this.state.refreshing===false ?
        <View style={styles.maincontainer}>

          <ImageBackground
              source={require('../../assets/images/AgendaBack.png')}
              style={styles.image}>
            <CalendarPicker
                previousTitle="Précedent"
                nextTitle="Suivant"
                weekdays={['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam']}
                months={[
                  'Janvier',
                  'Fevrier',
                  'Mars',
                  'Avril',
                  'Mai',
                  'Juin',
                  'Juillet',
                  'Aout',
                  'Septembre',
                  'Octobre',
                  'Novembre',
                  'Décembere',
                ]}
                todayTextStyle={{fontWeight: 'bold', color: 'red'}}
                selectedDayColor={'#bdffec'}
                customDatesStyles={this.state.marked}
                onDateChange={this.onDateChange}
            />
          </ImageBackground>

          <ScrollView
              refreshControl={
                <RefreshControl
                    //refresh control used for the Pull to Refresh
                    refreshing={this.state.Refreshing}
                    onRefresh={this.onRefresh.bind(this)}
                />
              }>
            {this.state.myrvd.map((item, i) =>

               item.jour.split("+")[0]=== startDate.split("-")[0] ? (

                    <View style={styles.container}>
                      <View style={styles.container0}>
                        <Text key={i} style={styles.textDate}>
                          {item.time}
                        </Text>
                      </View>
                      <TouchableOpacity
                          style={{
                            alignSelf: 'flex-start',
                            justifyContent: 'flex-start',
                            backgroundColor: item.etat==="en attente" ? '#fa952c':'#29fa51',
                            alignItems: 'flex-start',
                            width: screenWidth / 1.4,
                            height: screenheight / 11,
                            flexDirection: 'row',
                            borderRadius: 5,
                          }}>
                        <View style={styles.eventinside}>
                          <Text key={i} style={styles.text}>
                            {item.prenomDoc+" "+item.nomDoc}
                          </Text>
                          <Text key={i} style={styles.text2}>
                            ({item.specialiteDoc})
                          </Text>
                        </View>
                        <Image key={i} source={{uri:item.photoDoc}} style={styles.profile} />
                      </TouchableOpacity>
                    </View>
                ) : (
                    <View style={styles.container} />
                ),
            )}
          </ScrollView>
        </View>:<View style={styles2.container}>
      <Animated.View
          style={{
            opacity: this.state.LogoAnime,
            top: this.state.LogoAnime.interpolate({
              inputRange: [0, 1],
              outputRange: [80, 0],
            }),
          }}>
        <Image source={Logo} />
      </Animated.View>
      <Animated.View
          style={{
            opacity: this.state.LogoText,
          }}>
        <Text style={styles2.logoText}>Loading</Text>
      </Animated.View>
      <LineDotsLoader color="#111" />
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
    backgroundColor: '#cee1e3',
    width: screenWidth,
    height: screenheight,
  },

  container: {
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
    flex: 1,
    flexDirection: 'row',
    marginVertical: screenheight / 200,
    width: screenWidth / 1.15,
  },
  container0: {
    alignSelf: 'flex-start',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    width: screenWidth / 9,
    height: screenheight / 11,
  },
  event: {
    alignSelf: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: '#fa952c',
    alignItems: 'flex-start',
    width: screenWidth / 1.4,
    height: screenheight / 11,
    flexDirection: 'row',
    borderRadius: 5,
  },
  eventinside: {
    alignSelf: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: 'transparent',
    alignItems: 'flex-start',
    width: screenWidth / 1.8,
    height: screenheight / 11,
    flexDirection: 'row',
    borderRadius: 10,
  },
  textDate: {
    color: '#707070',
    fontSize: screenWidth / 27,
    alignItems: 'center',
    alignSelf: 'center',
    textAlign: 'justify',
  },
  text: {
    lineHeight: screenheight / 20,
    fontSize: screenWidth / 25,
    alignSelf: 'center',
    justifyContent: 'flex-start',
    textAlign: 'left',
    color: 'black',
    marginLeft: screenWidth / 30,
  },
  text2: {
    lineHeight: screenWidth / 18,
    fontSize: screenWidth / 30,
    marginLeft: screenWidth / 40,
    marginRight: screenWidth / 20,
    alignSelf: 'center',
    textAlign: 'left',
    color: '#9d9d9d',
  },
  image: {
    resizeMode: 'cover',
    width: screenWidth / 1.2,
    height: screenheight / 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#949494',
    marginBottom: 20,
  },
  profile: {
    width: screenWidth / 9,
    height: screenWidth / 9,
    borderRadius: screenWidth / 14,
    alignSelf: 'center',
  },
});
const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#daeef0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    color: '#111',
    fontSize: 22,
    marginTop: 10,
    fontWeight: '300',
  },
});

