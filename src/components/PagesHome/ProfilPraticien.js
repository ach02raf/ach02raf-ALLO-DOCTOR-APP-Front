import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    ScrollView, ImageBackground, TouchableOpacity, Image, SafeAreaView, Alert, Animated,
} from 'react-native';
import {Icon} from 'native-base';
import { MapView } from 'react-native-mapbox-direction';
import CalendarPicker from 'react-native-calendar-picker';
import Svg, { Path } from "react-native-svg";
import AsyncStorage from '@react-native-community/async-storage';
import photo from '../../assets/images/hamza.jpg';
import Logo from '../../assets/images/Logo2.png';
import {LineDotsLoader} from 'react-native-indicator';
import server from '../../server';
export default class ProfilPraticien extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id:this.props.navigation.getParam('id'),
            nom:this.props.navigation.getParam('nom'),
            prenom:this.props.navigation.getParam('prenom'),
            docnom:this.props.navigation.getParam('prenom')+' '+this.props.navigation.getParam('nom'),
            docspecialite: this.props.navigation.getParam('specialite'),
            docpic: this.props.navigation.getParam('photo'),
            formation : this.props.navigation.getParam('formation'),
            experience: this.props.navigation.getParam('experience'),
            specialite :this.props.navigation.getParam('specialite'),
            Assurance : this.props.navigation.getParam('assurance'),
            paiement : this.props.navigation.getParam('paiement'),
            Adresse :this.props.navigation.getParam('adresse'),
            Contact :this.props.navigation.getParam('contact'),
            favoris:false,
            jours:this.props.navigation.getParam('jours'),
            plan:this.props.navigation.getParam('plan'),
            ville:this.props.navigation.getParam('ville'),
            gov:this.props.navigation.getParam('gov'),
            latitude: this.props.navigation.getParam('latitude'),
            longitude:this.props.navigation.getParam('longitude'),
            selectedStartDate:'',
            marked: [],
            initialCoords:undefined,
            initialPosition:this.props.navigation.getParam('initialPosition'),
            lastPosition:'',
            position:'',
            mydoctor:[],
            myID:'',
            rvd:this.props.navigation.getParam('rvd'),
            myrvd:'',

            refreshing: true,
            LogoAnime: new Animated.Value(0),
            LogoText: new Animated.Value(0),
            loadingSpinner: false,
            showME: true,

        };
        this.onDateChange = this.onDateChange.bind(this);


    }

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
    ajouterFavDoctor=()=>{
        this.state.mydoctor.push({
            idDoc:this.state.id,

        });

    };
    getDoctor = async ()=>{
        const token = await AsyncStorage.getItem("token");
        fetch('http://'+server+'/getmydoctor',{
            headers:new Headers({
                Authorization:"Bearer "+token
            })
        }).then(res=>res.json())
            .then( async (data)=>{
                   await this.setState({
                        mydoctor:data,

                    });
                setTimeout(() => {
                    this.rechercherDoctor();
                    this.setState({ refreshing: false});
                }, 1000);

                }
            )
    };

    updateDoctorFav2=async ()=>{
      await  this.state.mydoctor.map((item,i)=> {
                item.idDoc === this.state.id ?  this.state.mydoctor.splice(i,1) :null
            }
        );
        fetch("http://"+server+"/updatemydoctor",{
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                "id":this.state.myID,
                "mydoctor":this.state.mydoctor,
            })
        })
            .then(res=>res.json())
            .then(()=>{
                this.getDoctor();
            })};
    updateDoctorFav=async  () => {
await this.ajouterFavDoctor();
        fetch("http://"+server+"/updatemydoctor",{
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                "id":this.state.myID,
                "mydoctor":this.state.mydoctor,
            })
        })
            .then(res=>res.json())
            .then(()=>{
            })};


    rechercherDoctor= ()=>{

        this.state.mydoctor.map((item)=> {
                item.idDoc === this.state.id ? this.setState({favoris: true}) : null
            }
        );

    };
    onDateChange(date) {
        this.setState({
            selectedStartDate: date,
        });
    }
markedDate(){

    this.state.jours.map((item) => (

                    this.state.marked.push({date: item.jour, style: {backgroundColor: '#77a0dc'}})));

}
    componentDidMount = async()=>{
        this.markedDate();
        this.Boiler();
         this.getDoctor();
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
    moveCamera = () => {
        this.mapRef.moveCamera();
    };

    render() {
        const {selectedStartDate} = this.state;
        const startDate = selectedStartDate ? selectedStartDate.toString() : '';


        return (
            this.state.refreshing===false ?
            <SafeAreaView style={styles.maincontainer}>

                <ImageBackground
                    source={require('../../assets/images/BackProfilPraticien.jpg')}
                    style={styles.image}>
                    <View style={styles.containerHeader}>
                        <Icon style = {styles.icone} name="arrow-back" size={30} onPress={()=>{ this.props.navigation.goBack()}}/>
                        <Image source={{uri:this.state.docpic}} style={styles.profile}/>
                    </View>
                    <Text style={styles.name}>{this.state.docnom}</Text>
                    <Text style={styles.text}>{this.state.docspecialite}</Text>

                    <View style={styles.thecontainerinside1}>

                        <TouchableOpacity style={styles.thecontainerinsidebutton} onPress={()=>{this.props.navigation.navigate("Calendresultat",{
                            idDoct:this.state.id,
                            nomDoc:this.state.prenom+" "+this.state.nom,
                            myrvd:this.state.myrvd,
                        })}}>
                            <Icon style={[{color: "#2d2d2d"}]} name="ios-calendar" size={35}/>
                        </TouchableOpacity>


                        <TouchableOpacity style={styles.thecontainerinsidebutton} >
                            <Icon style={[{color: "#2d2d2d"}]} name="ios-chatbubbles" size={35}/>
                        </TouchableOpacity>

                        {   this.state.favoris?
                            <TouchableOpacity
                                onPress={()=>
                                {
                                    this.updateDoctorFav2().then("errrr");
                                    this.setState({favoris:false});
                                }

                            } style={styles.thecontainerinsidebutton} >
                                <Icon style={[{color: "#2d2d2d"}]} name="ios-star" size={35}/>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity
                                onPress={async ()=>{
                               this.setState({favoris:true});
                               this.updateDoctorFav();
                            } }

                                style={styles.thecontainerinsidebutton} >
                                <Icon style={[{color: "#2d2d2d"}]} name="ios-star-outline" size={35}/>
                            </TouchableOpacity>

                        }
                    </View>
                </ImageBackground>
                <ScrollView>
                    <View style={styles.container1}>
                        <Text style={styles.TextNiv1}>Présentation</Text>
                        <Text style={styles.TextNiv2}>Formation</Text>
                        <Text style={styles.TextNiv3}>{this.state.formation}</Text>
                        <Text style={styles.TextNiv2}>Expérience</Text>
                        <Text style={styles.TextNiv3}>{this.state.experience}</Text>
                        <Text style={styles.TextNiv2}>Spécialité</Text>
                        <Text style={styles.TextNiv3}>{this.state.specialite}</Text>
                    </View>
                    <View style={styles.container1}>
                        <Text style={styles.TextNiv1}>Prise en charge et paiement</Text>
                        <Text style={styles.TextNiv2}>Assurance maladie</Text>

                        {
                            this.state.Assurance.map((item)=>( <Text style={styles.TextNiv3}>{item}</Text>))
                        }



                        <Text style={styles.TextNiv2}>Moyens de paiement</Text>
                        {
                            this.state.paiement.map((item)=>( <Text style={styles.TextNiv3}>{item}</Text>))
                        }



                    </View>
                    <View style={styles.container1}>
                        <Text style={styles.TextNiv1}>Où me trouver ?</Text>
                        <Text style={styles.TextNiv2}>Adresse</Text>
                        <Text style={styles.TextNiv3 }>{this.state.Adresse+' '+this.state.ville+' '+this.state.gov}</Text>
                        <Text style={styles.TextNiv2}>Contact</Text>
                        <Text style={styles.TextNiv3}>email :</Text>
                        {
                            this.state.Contact.email.map((item)=>( <Text style={styles.TextNiv3}>{item.email}</Text>))
                        }
                        <Text style={styles.TextNiv3}>portable :</Text>
                        {
                            this.state.Contact.portable.map((item)=>( <Text style={styles.TextNiv3}>{item.numeroP}</Text>

                            ))
                        }
                        <Text style={styles.TextNiv3}>fax :</Text>
                        {
                            this.state.Contact.fax.map((item)=>( <Text style={styles.TextNiv3}>{item.numeroFax}</Text>

                            ))
                        }
                        <Text style={styles.TextNiv3}>fixe :</Text>
                        {
                            this.state.Contact.fixe.map((item)=>( <Text style={styles.TextNiv3}>{item.numeroF}</Text>

                            ))
                        }
                    </View >
                    <View style={styles.container1}>
                        <Text style={styles.TextNiv1}>Calendrier</Text>
                        <ImageBackground
                            source={require('../../assets/images/AgendaBack.png')}
                            style={styles.imagewall}>
                            <CalendarPicker
                                previousTitle=" "
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
                                todayTextStyle={{fontWeight: 'bold',color:'red'}}
                                selectedDayColor={'#bdffec'}
                                customDatesStyles={this.state.marked}
                                onDateChange={this.onDateChange}
                                height={screenWidth/1.08}

                            />
                        </ImageBackground>
                    </View >
                    <View   style={styles.containerrdvs} >


                        <ScrollView  style={{ flex: 1 }}
                                     contentContainerStyle={{flexGrow:1}}
                                     nestedScrollEnabled = {true}>
                            {
                                this.state.jours.map((itam, i) => (
                                    itam.jour.split("+")[0]=== startDate.split("-")[0] ? (

                                    this.state.plan[i].map((item, i) => (

                                        <TouchableOpacity key={i} style={styles.timing} onPress={()=>{item.etat==='green' ? this.props.navigation.navigate("RdvFormulaire",{
                                            jour:itam.jour,
                                            etat:item.etat,
                                            time:item.time,
                                            myId:this.state.myID,
                                            idDoc:this.state.id,
                                            rvdDoc:this.state.rvd,
                                            rvduser:this.state.myrvd,
                                            plan:this.state.plan,
                                            jours:this.state.jours,
                                            nomDoc:this.state.nom,
                                            prenomDoc:this.state.prenom,
                                            specialiteDoc:this.state.specialite,
                                            photoDoc:this.state.docpic,
                                        }):null}}>
                                            <Text key={i} style={styles.Texttime}>{item.time}</Text>
                                            <Svg
                                                viewBox="-350 -700 1800 1800"
                                                xmlSpace="preserve"
                                                enableBackground="new 0 0 512 512"
                                            >
                                                <Path d="M256 0C115.39 0 0 115.39 0 256s115.39 256 256 256 256-115.39 256-256S396.61 0 256 0z" fill={item.etat} />
                                            </Svg>
                                        </TouchableOpacity>
                                    ))):null

                                ))
                            }

                        </ScrollView>

                    </View>


                    <View style={styles.container1}>
                        <Text style={styles.TextCalender}>Cabinet</Text>
                        {
                            this.state.initialPosition.coords.latitude !==undefined ?

                            <MapView
                                mapBoxApiKey={"pk.eyJ1IjoiYWNoMDJyYWYiLCJhIjoiY2tjYzIxeHdhMDBodzJ0cGc2ZnVoM3NxaiJ9.dB8rfF3tMFAggWvYgYjybQ"}
                                navigationMode="Course" // Or "Global"Course
                                ref={instance => this.mapRef = instance}
                                startingPoint={{
                                    latitude:this.state.initialPosition.coords.latitude,
                                    longitude: this.state.initialPosition.coords.longitude
                                }}

                                endingPoint={{
                                    latitude: this.state.latitude,
                                    longitude: this.state.longitude,
                                }}
                                style={styles.map}
                                onDirectionChange={(ref)=>ref}
                                color={'red'}/>:null
                        }
                    </View>
                </ScrollView>
            </SafeAreaView>: <View style={styles2.container}>
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

    maincontainer:{
        flexDirection:'column',
        flex:1,
        backgroundColor:'#daeef0'
    },
    containerHeader:{
        flexDirection:'row',
        width: screenWidth,
        height: screenheight/8,
        alignItems:'center',
        justifyContent:'flex-start',
    },
    container1:{
        flexDirection:'column',
        alignItems:'flex-start',
        justifyContent:'flex-start',
        marginVertical: screenheight/80,
    },
    timing:{
        flex:1,
        alignSelf: 'flex-start',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: screenWidth / 1.1,
        height: screenheight / 18,
        flexDirection: 'row',
        borderRadius: 5,
        marginVertical:5,
        borderWidth:0.5,
        borderColor:'#4a4a4a',
    },
    containerrdvs:{
        flexDirection:'column',
        alignItems:'flex-start',
        justifyContent:'flex-start',
        marginHorizontal:screenWidth/20,
        marginVertical: screenheight/200,
        width: screenWidth/1.1,
        height: screenheight/4,
        flex:1,

    },

    image: {
        resizeMode: 'cover',
        width: screenWidth,
        height: screenheight/3,
        justifyContent:'center',
        alignItems:'center',
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
    icone: {
        justifyContent:'flex-start',
        alignSelf:'flex-start',
        marginTop:screenheight/100,
        marginRight:screenWidth/3.5,
        marginLeft:screenWidth/14,
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
    name:{
        color:"white",
        fontSize: screenWidth/15 ,
        marginVertical:5,
        alignSelf: 'center',
        fontWeight: '100'
    },
    text:{
        color:"#444444",
        fontSize:  screenWidth/25  ,
        alignSelf: 'center',
        fontWeight: '100'
    },
    TextNiv1:{
        color:"#77a0dc",
        fontSize: screenheight/30 ,
        alignSelf: 'flex-start',
        fontWeight: 'bold',
        marginLeft: screenWidth/10,
    },
    TextCalender:{
        color:"#b5c3f6",
        fontSize: screenheight/35 ,
        alignSelf: 'flex-start',
        fontWeight: 'bold',
        marginLeft: screenWidth/20,
    },
    Texttime:{
        color:"#4f4f4f",
        fontSize: screenheight/45 ,
        alignSelf: 'center',
        fontWeight: 'bold',
        justifyContent:'center',
        marginLeft: screenWidth/8,
        marginVertical:8,
    },
    Textstatut:{
        color:"#679acd",
        fontSize: screenheight/55 ,
        alignSelf: 'flex-start',
        marginLeft: screenWidth/20,
    },
    myicone:{
        fontSize: screenheight/20 ,
        justifyContent: 'flex-end',
        alignSelf:'center',
        marginLeft: screenWidth/5,

    },
    TextNiv2:{
        color:"#4f4f4f",
        fontSize: screenheight/45 ,
        alignSelf: 'flex-start',
        fontWeight: 'bold',
        marginLeft: screenWidth/8,
        marginVertical:8,
    },
    TextNiv3:{
        color:"#4f4f4f",
        fontSize: screenheight/55 ,
        alignSelf: 'flex-start',
        marginLeft: screenWidth/7,
        marginVertical:5,
        marginRight: screenWidth/10,
    },
    map: {
        width:screenWidth/1.1,
        height : screenheight/2.7,
        alignSelf:'center',
    },
    thecontainerinside1: {
        width: screenWidth/1.8,
        height: screenheight /18,
        alignSelf:'center',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:screenheight/100,
    },
    thecontainerinsidebutton: {
        width: screenWidth/12,
        height: screenheight /22,
        backgroundColor: '#c9e1e3',
        opacity:0.9,
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
        marginHorizontal:screenWidth/20
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
