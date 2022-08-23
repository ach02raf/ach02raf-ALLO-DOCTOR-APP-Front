import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity, Image, Animated, Alert, RefreshControl, ScrollView,
} from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import { Overlay } from 'react-native-elements';
import { Icon} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import {LineDotsLoader} from 'react-native-indicator';
import Logo from '../../assets/images/Logo2.png';
import Geolocation from '@react-native-community/geolocation';
import server from '../../server';




export default class ContenuScreenMesDocteurs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index:0,
            isVisible:false,
            mydoctor :[],
            mydoctor00 :[],
            refreshing: true,
            LogoAnime: new Animated.Value(0),
            LogoText: new Animated.Value(0),
            loadingSpinner: false,
            showME: true,
            showyou:'',
            myID:'',
            initialPosition:'',
            Refreshing:false,
            myrvd:[],
        };
        this.Boiler=this.Boiler.bind(this);
    }

    componentDidMount() {
        this.Boiler().then('errrr');
        setTimeout(() => {
        this.Boilerdoctor().then('rr');
        }, 1000);
        Geolocation.getCurrentPosition(
            async position => {
                await this.setState({initialPosition:position});

            },
            error => Alert.alert('Error', JSON.stringify(error)),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
        );
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
    Boilerdoctor = async ()=>{
        await this.setState({mydoctor:[]});
        const token = await AsyncStorage.getItem("token");
        await fetch('http://'+server+'/doctor',{
            headers:new Headers({
                Authorization:"Bearer "+token
            })
        }).then(res=>res.json())
            .then(data=>{

                    this.setState({
                        mydoctor00:data.mydoctor,
                    });
                }
            );
        console.log(this.state.mydoctor00);
      if(this.state.mydoctor00.length===0)
      {
          this.setState({
              refreshing:false

          });
      }else {


          setTimeout(() => {
              this.state.mydoctor00.map( (item,i)=>{
                  fetch("http://"+server+"/findonedoctor",{
                      method:"POST",
                      headers: {
                          'Content-Type': 'application/json'
                      },
                      body:JSON.stringify({
                          "id":item.idDoc,

                      })

                  })
                      .then(res=>res.json())
                      .then(  (data)=>{


                          this.state.mydoctor.push(data);

                          this.setState({
                              refreshing:false

                          });

                      })



              });

          }, 1000);
      }


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
                        myrvd:data.rvd
                    })

                }
            );
    };

    onRefresh() {
       this.Boilerdoctor().then('errrrrrrr');
       this.setState({index:0})
    }
    render() {

        return (
            this.state.refreshing===false ?
            <View style={styles.maincontainer}

            >
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            //refresh control used for the Pull to Refresh
                            refreshing={this.state.Refreshing}
                            onRefresh={this.onRefresh.bind(this)}
                        />
                    }>
                <View style={styles.thecontainer0}>
                    <Text style={styles.text}>Mes docteurs</Text>
                </View>

                {this.state.mydoctor.length===0?
                  null
                    :(
                    <Overlay
                        isVisible={this.state.isVisible}
                        windowBackgroundColor="rgba(0, 0, 0, 0.4)"
                        overlayBackgroundColor="#E9E9E9"
                        width={screenWidth/1.3}
                        height={screenheight/2.4}
                        borderRadius={10}
                    >

                        <View style={styles.thecontainerinsidehead}>
                                <View style={styles.thecontainerinside0}>
                                    {this.state.mydoctor[this.state.index].photo ===undefined ?
                                        null
                                        :<Image source={{uri:this.state.mydoctor[this.state.index].photo}} style={styles.profile1}/>
                                    }

                                    <Text style={styles.Mytextname1}> {(this.state.mydoctor[this.state.index].prenom+" "+this.state.mydoctor[this.state.index].nom).length > 9?
                                        (this.state.mydoctor[this.state.index].prenom+" "+this.state.mydoctor[this.state.index].nom).substring(0, 9) + '...'
                                        :this.state.mydoctor[this.state.index].prenom+" "+this.state.mydoctor[this.state.index].nom}</Text>
                                    <Text style={styles.Mytextspecialite1}>{this.state.mydoctor[this.state.index].specialite}</Text>
                                </View>

                            <View style={{backgroundColor:'transparent',justifyContent:'center', marginLeft: screenWidth/8}}>
                                <Icon  onPress={() => this.setState({isVisible: false})} name="ios-close" size={40}/>
                            </View>
                        </View>
                        <View style={styles.thecontainerinside1}>
                            <TouchableOpacity style={styles.thecontainerinsidebutton} onPress={ () =>{
                                this.Boilerdoctor().then('errr');
                                this.setState({index:0});
                                this.setState({isVisible: false});
                                this.props.navigation.navigate("ProfilPraticien",{
                                    id:this.state.mydoctor[this.state.index]._id,
                                    jours:this.state.mydoctor[this.state.index].timeplan.jours,
                                    plan:this.state.mydoctor[this.state.index].timeplan.plan,
                                    contact:this.state.mydoctor[this.state.index].contact,
                                    assurance:this.state.mydoctor[this.state.index].assurance,
                                    paiement:this.state.mydoctor[this.state.index].paiement,
                                    nom:this.state.mydoctor[this.state.index].nom,
                                    prenom:this.state.mydoctor[this.state.index].prenom,
                                    adresse:this.state.mydoctor[this.state.index].adresse,
                                    photo:this.state.mydoctor[this.state.index].photo,
                                    formation:this.state.mydoctor[this.state.index].formation,
                                    specialite:this.state.mydoctor[this.state.index].specialite,
                                    ville:this.state.mydoctor[this.state.index].ville,
                                    gov:this.state.mydoctor[this.state.index].gov,
                                    experience:this.state.mydoctor[this.state.index].experience,
                                    longitude:this.state.mydoctor[this.state.index].longtitude,
                                    latitude:this.state.mydoctor[this.state.index].latitude,
                                    initialPosition:this.state.initialPosition,
                                    mydoctor:this.state.mydoctor,
                                    rvd:this.state.mydoctor[this.state.index].rdvdoc,
                            });
                            }}>
                                <Icon   name="ios-person" size={35}/>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.thecontainerinsidebutton} onPress={async ()=>{
                                await this.Boiler().then('errrr');
                                this.props.navigation.navigate("Calendresultat",{
                                    idDoct:this.state.mydoctor[this.state.index]._id,
                                    nomDoc:this.state.mydoctor[this.state.index].prenom+" "+this.state.mydoctor[this.state.index].nom,
                                    myrvd:this.state.myrvd,
                                });
                                this.setState({isVisible: false});
                            }}>
                                <Icon   name="ios-calendar" size={35}/>
                            </TouchableOpacity>


                            <TouchableOpacity style={styles.thecontainerinsidebutton} >
                                <Icon  onPress={() => this.setState({isVisible: false})} name="ios-chatbubbles" size={35}/>
                            </TouchableOpacity>



                        </View>
                    </Overlay>
)

                }
                {this.state.mydoctor.length===0?
                    null
                    :

                <FlatGrid
                    itemDimension={screenWidth/3}
                    items={this.state.mydoctor}
                    style={styles.gridView}

                    renderItem={({ item, index }) => (
                        <View style={[styles.itemContainer]}>


                            <TouchableOpacity key={index} onPress={() => this.setState({isVisible: true,index:index})} style={styles.thecontainer2}>
                                  <View style={styles.thecontainer3}>
                                      {item.photo ===undefined ?
                                          null
                                          :<Image source={{uri:item.photo}} style={styles.profile}/>
                                      }

                                        <Text style={styles.Mytextname}>{}{(item.prenom+" "+item.nom).length > 9?
                                            (item.prenom+" "+item.nom).substring(0, 9) + '...'
                                            :item.prenom+" "+item.nom}</Text>
                                        <Text style={styles.Mytextspecialite}>{item.specialite}</Text>
                                    </View>

                            </TouchableOpacity>
                        </View>
                    )}
                />       }
                    </ScrollView >
               </View>

                :
                <View style={styles2.container}>
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
const screenWidth = Math.round(Dimensions.get('window').width);
const screenheight = Math.round(Dimensions.get('window').height);
const styles = StyleSheet.create({

    maincontainer:{
        flex: 1,
        alignItems: 'flex-start',
        backgroundColor: '#d2edf0',
        flexDirection:'column',

    },
    itemContainer: {
        borderRadius: 20,
        borderBottomWidth: 0.3,
    },
    gridView: {
        marginTop: 10,
        marginBottom:10,
        flex: 1,
    },
    thecontainer0: {
        width: screenWidth,
        height: screenheight / 10,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginBottom:screenheight/40,

    },
    thecontainer1: {
        width: screenWidth,
        height: screenheight / 4,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        margin:screenheight/200,
        borderBottomWidth:0.5,
        borderColor:'#4a4a4a',


    },
    thecontainer2: {
        width: screenWidth/2,
        height: screenheight / 4.5,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderLeftWidth:0.5,
        borderRightWidth:0.5,
        borderColor:'#4a4a4a',
        marginTop:10


    },
    thecontainerinsidehead: {
        width: screenWidth/1.4,
        height: screenheight / 4,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center',


    },
    thecontainer3: {
        marginTop:screenheight / 50,
        width: screenWidth/2.7,
        height: screenheight / 4.5,
        backgroundColor: 'transparent',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',


    },
    thecontainerinside0: {
        marginTop:screenheight / 50,
        width: screenWidth/2.7,
        height: screenheight / 4.5,
        backgroundColor: 'transparent',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf:'center',
        marginLeft: screenWidth/6


    },
    thecontainerinside1: {
        width: screenWidth/1.5,
        height: screenheight /12,
        alignSelf:'center',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:screenheight/50,



    },
    thecontainerinsidebutton: {
        width: screenWidth/10,
        height: screenheight /20,
        backgroundColor: '#d9d9d9',
        marginTop:screenheight/100,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf:'center',
        borderColor:"#808080",
        borderWidth:0.5,
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset: { width: 5, height: 5},
        shadowOpacity: 0.8,
        shadowRadius: 5,
        elevation: 10,
        marginHorizontal:screenWidth/30


    },
    profile:{
        width:screenWidth/5,
        height:screenheight/9,
        borderRadius: 40 ,
        borderColor: "#111",
        alignSelf: 'center',
        justifyContent:'flex-start',
        marginBottom: screenheight/30
    },
    profile1:{
        width:screenWidth/5,
        height:screenheight/9,
        borderRadius: 40 ,
        borderColor: "#111",
        alignSelf: 'center',
        justifyContent:'flex-start',
        marginBottom: screenheight/30
    },
    Mytextspecialite:{
        color: '#3b3b3b',
        fontSize: screenWidth/30,
        fontFamily: "roboto-regular",
        alignSelf: 'center',

    },
    Mytextname:{
        color: '#282828',
        fontSize: screenWidth/22,
        fontFamily: "roboto-regular",
        alignSelf: 'center',
        fontWeight: 'bold',

    },
    Mytextspecialite1:{
        color: '#3b3b3b',
        fontSize: screenWidth/25,
        fontFamily: "roboto-regular",
        alignSelf: 'center',

    },
    Mytextname1:{
        color: '#282828',
        fontSize: screenWidth/18,
        fontFamily: "roboto-regular",
        alignSelf: 'center',
        fontWeight: 'bold',

    },
    text: {
        color: '#707070',
        lineHeight: screenWidth / 10,
        marginTop: screenWidth / 17,
        fontSize: screenWidth / 12,
        marginLeft: screenWidth / 20,
        marginRight: screenWidth / 20,
        fontWeight: 'bold',
        alignItems: 'center',
        textAlign: 'center',
    },
    image: {
        resizeMode: 'cover',
        width: screenWidth,
        height: screenheight,
        justifyContent:'center',
        alignItems:'center',
    },
    iconStyle: {
        height: screenheight / 20,
        width: screenWidth / 20,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginTop:screenheight / 50,
    },
});

