import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    ScrollView, TouchableOpacity, Image, ImageBackground, Animated,
} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import Svg, {Path} from 'react-native-svg';
import Logo from '../../assets/images/Logo2.png';
import {LineDotsLoader} from 'react-native-indicator';
import AsyncStorage from '@react-native-community/async-storage';
import update from 'react-addons-update';
import server from '../../server';

export default class Recherche extends Component {
    constructor(props) {
        super(props);
        this.state = {
            one:this.props.navigation.getParam('text0'),
            two:this.props.navigation.getParam('text1'),
            three:this.props.navigation.getParam('text2'),
            marked: [],
            pressed:[],
            list1:this.props.navigation.getParam('doctortab'),
            list:[],
            selectedStartDate:'',
            initialPosition: this.props.navigation.getParam('initialPosition'),
            distance:[],
            refreshing: true,
            LogoAnime: new Animated.Value(0),
            LogoText: new Animated.Value(0),
            loadingSpinner: false,
            showME: true,
            mydoctor:[],
            myID:'',
            myrvd:[],


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
    componentDidMount = async () => {
     await  this.filterList();
     this.getDoctor().then('errrrr');
     this.Boiler();


      this.cald();
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
    getDoctor = async ()=>{
        const token = await AsyncStorage.getItem("token");
        fetch('http://'+server+'/getmydoctor',{
            headers:new Headers({
                Authorization:"Bearer "+token
            })
        }).then(res=>res.json())
            .then(  (data)=>{
                    this.setState({
                        mydoctor:data,

                    });



                }
            )
    };

    onDateChange(date) {
        this.setState({
            selectedStartDate: date,
        });
    }
    markedDate(i){

        this.state.list[i].timeplan.jours.map((item) => (

            this.state.marked.push({date: item.jour, style: {backgroundColor: '#77a0dc'}})));

    }




    cald (){
        this.state.list.map( (item,i)=>(

            this.calculerDistacne(item.longtitude, item.latitude,i)
        ));
        setTimeout(() => {
            this.setState({ refreshing: false});
        }, 2500);

    }

    calculerDistacne=  (long,lat,i) =>{


        fetch("https://api.mapbox.com/directions/v5/mapbox/driving/"+9.865629+","+37.270627+";"+long+","+lat+"?access_token=pk.eyJ1IjoiYWNoMDJyYWYiLCJhIjoiY2tjYzIxeHdhMDBodzJ0cGc2ZnVoM3NxaiJ9.dB8rfF3tMFAggWvYgYjybQ",{
            method:"GET",
            headers: {
                'Content-Type': 'application/json'
            },

        })
            .then(res=>res.json())
            .then(  (data)=>{
              let datat= data.routes[0].distance/1000;
                setTimeout(() => {
                     this.state.distance.splice(i, 0, Math.trunc(datat));
                }, 10);
            });
    };

    filterList = () => {

        let newData;
        let a,b,c,d,f,r;
       if( this.state.one!==''&&this.state.two !==''&&this.state.three !== '' )

            {

        newData = this.state.list1.filter(item => {

                 a = this.state.one;
                 b = item.specialite;


                return a.indexOf(b)  > -1 ;
                });



        let newData1;
        newData1 = newData.filter(item => {
            f= this.state.two;
            r=item.gov;
            return f.indexOf(r)  > -1 ;
        });
        let newData2;
        newData2=newData1.filter(item => {
            c= this.state.three;
            d=item.ville;
            return c.indexOf(d)  > -1 ;
        });
        this.setState({list:newData2});



    }

        if( this.state.one!==''&&this.state.two !==''&&this.state.three === '' )

        {
            let newDataa = this.state.list1.filter(item => {

                a = this.state.one;
                b = item.specialite;


                return a.indexOf(b)  > -1 ;
            });



            let newData1;
            newData1 = newDataa.filter(item => {
                f= this.state.two;
                r=item.gov;
                return f.indexOf(r)  > -1 ;
            });

            this.setState({list:newData1});



        }
        if( this.state.one!==''&&this.state.two ===''&&this.state.three === '' )
        {
            newData = this.state.list1.filter(item => {

                a = this.state.one;
                b = item.specialite;


                return a.indexOf(b)  > -1 ;
            });


            this.setState({list:newData});



        }

        if( this.state.one===''&&this.state.two !==''&&this.state.three !== '' )
        {


            let newData1;
            newData1 = this.state.list1.filter(item => {
                f= this.state.two;
                r=item.gov;
                return f.indexOf(r)  > -1 ;
            });
            let newData2;
            newData2=newData1.filter(item => {
                c= this.state.three;
                d=item.ville;
                return c.indexOf(d)  > -1 ;
            });
            this.setState({list:newData2});



        }
        if( this.state.one===''&&this.state.two !==''&&this.state.three === '' )
        {
            let newData1;
            newData1 = this.state.list1.filter(item => {
                f= this.state.two;
                r=item.gov;
                return f.indexOf(r)  > -1 ;
            });

            this.setState({list:newData1});




        }

    };

                    render () {
        const {selectedStartDate} = this.state;
        const startDate = selectedStartDate ? selectedStartDate.toString() : '';
        for (let i = 0; i < this.state.list.length; i++)
        {
            this.state.pressed.push(false);
        }
        return (
            this.state.refreshing===false ?
            <View style={styles.maincontainer}>

                <View style={styles.recherchetitle}>
                    <Text style={styles.text00}>Je cherche un </Text>
                    {
                        this.state.one !== ''?
                            <Text style={styles.text01}>{(this.state.one).length > 9?
                                (this.state.one).substring(0, 9) + '...'
                                :this.state.one}</Text>
                            :
                            <Text style={styles.text01}>Medecin</Text>
                    }




                    {
                        this.state.two !==''  ?

                            <Text style={styles.text00}> à </Text>:null
                    }

                    {
                        this.state.three !=='' ?
                                    <Text style={styles.text01}>
                                        {(this.state.two+','+this.state.three).length > 14?
                                            (this.state.two+','+this.state.three).substring(0, 14) + '...'
                                            :this.state.two+','+this.state.three}</Text>
                                :
                                    <Text style={styles.text01}> {(this.state.two).length > 14?
                                        (this.state.two).substring(0, 14) + '...'
                                        :this.state.two}</Text>

                    }



                </View>
                <ScrollView >
                    {this.state.list.map((item, i) => (

                        this.state.pressed[i]===false ?

                            <TouchableOpacity key={i} style={styles.container} onPress={async () =>{
                                await this.setState({selectedStartDate: null,marked:[]});

                                this.markedDate(i);
                               for (let i = 0; i < this.state.list.length; i++)
                                {
                                    await    this.setState(update(this.state, {

                                        pressed: {
                                            [i]: {
                                                $set: false
                                            },

                                        }
                                    }))
                                }

                                    this.setState(update(this.state, {

                                        pressed: {
                                            [i]: {
                                                $set: true
                                            },

                                        }
                                    }))


                               }}

                            >
                                <Image source={{uri:item.photo}} style={styles.mypic}/>
                                <View style={styles.container2}>
                                    <Text style={styles.doctorname}>{item.nom+' '+item.prenom}</Text>
                                    <Text style={styles.text}>{item.specialite}</Text>
                                    <Text style={styles.text}>{item.ville+' '+item.gov}</Text>

                                </View>

                                <View style={styles.container3}>

                                        <Text style={styles.timestyle} >{this.state.distance[i]}Km</Text>


                                    <View style={{marginTop:screenheight/100,marginLeft:screenWidth/25}}>
                                        <Svg
                                            width="20px"
                                            height="20px"
                                            viewBox="0 0 255 255"
                                            xmlSpace="preserve"
                                            enableBackground="new 0 0 255 255"
                                        >
                                            <Path d="M0 63.75L127.5 191.25 255 63.75z" fill={'black'}/>
                                        </Svg>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity style={styles.opened}  onPress={() =>
                            {
                                this.setState(update(this.state, {

                                    pressed: {
                                        [i]: {
                                            $set: false
                                        }

                                    }
                                }));
                            }}
                            >
                                <View style={styles.containeropened}>
                                    <Image source={{uri:item.photo}} style={styles.mypic}/>
                                    <View style={styles.container2}>
                                        <Text style={styles.doctorname}>{item.nom+' '+item.prenom}</Text>
                                        <Text style={styles.text}>{item.specialite}</Text>
                                        <Text style={styles.text}>{item.ville+' '+item.gov}</Text>

                                    </View>
                                    <View style={styles.container3}>
                                        <View style={{marginLeft:screenWidth/20}}>
                                            <Svg
                                                width="25px"
                                                height="25px"
                                                viewBox="0 0 255 255"
                                                xmlSpace="preserve"
                                                enableBackground="new 0 0 255 255"
                                            >
                                                <Path d="M106.667 53.333L0 160 213.333 160z" fill={'black'} />
                                            </Svg>
                                        </View>
                                        <Text style={styles.timestyle2}>{this.state.distance[i]}Km</Text>
                                        <TouchableOpacity style={styles.voir} >
                                            <Text style={{fontSize:screenheight / 50,marginVertical:screenheight/200,marginHorizontal:screenWidth/100}} onPress={()=>{this.props.navigation.navigate("ProfilPraticien",{
                                                id:item._id,
                                                jours:item.timeplan.jours,
                                                plan:item.timeplan.plan,
                                                contact:item.contact,
                                                assurance:item.assurance,
                                                paiement:item.paiement,
                                                nom:item.nom,
                                                prenom:item.prenom,
                                                adresse:item.adresse,
                                                photo:item.photo,
                                                formation:item.formation,
                                                specialite:item.specialite,
                                                ville:item.ville,
                                                gov:item.gov,
                                                experience:item.experience,
                                                longitude:item.longtitude,
                                                latitude:item.latitude,
                                                initialPosition:this.state.initialPosition,
                                                mydoctor:this.state.mydoctor,
                                                rvd:item.rdvdoc,
                                            })}}>Voir profil</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={styles.container1}>
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
                                            height={screenWidth/1.1}
                                        />
                                    </ImageBackground>
                                </View >

                                <View   style={styles.containerrdvs} >
                                    <ScrollView  style={{ flex: 1 }}
                                                 contentContainerStyle={{flexGrow:1}}
                                                 nestedScrollEnabled = {true}>
                                        {
                                            item.timeplan.jours.map((itzm, k) => (
                                                itzm.jour.split("+")[0]=== startDate.split("-")[0] ? (

                                                    item.timeplan.plan[k].map((itam, e) => (

                                                        <TouchableOpacity key={e} style={styles.timing} onPress={()=>{itam.etat==='green' ? this.props.navigation.navigate("RdvFormulaire",{

                                                            jour:itzm.jour,
                                                            etat:itam.etat,
                                                            time:itam.time,
                                                            myId:this.state.myID,
                                                            idDoc:item._id,
                                                            rvdDoc:item.rdvdoc,
                                                            rvduser:this.state.myrvd,
                                                            plan:item.timeplan.plan,
                                                            jours:item.timeplan.jours,
                                                            nomDoc:item.nom,
                                                            prenomDoc:item.prenom,
                                                            specialiteDoc:item.specialite,
                                                            photoDoc:item.photo,
                                                        }):null}}>
                                                            <Text key={e} style={styles.Texttime}>{itam.time}</Text>
                                                            <Svg
                                                                viewBox="-350 -700 1800 1800"
                                                                xmlSpace="preserve"
                                                                enableBackground="new 0 0 512 512"
                                                            >
                                                                <Path d="M256 0C115.39 0 0 115.39 0 256s115.39 256 256 256 256-115.39 256-256S396.61 0 256 0z" fill={itam.etat} />
                                                            </Svg>
                                                        </TouchableOpacity>
                                                    ))):null

                                            ))
                                        }
                                    </ScrollView>

                                </View>
                            </TouchableOpacity>

                    ))}
                </ScrollView>
            </View>: <View style={styles2.container}>
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
const styles = StyleSheet.create({

    maincontainer:{
        flexDirection:'column',
        flex:1,
        backgroundColor:'#daeef0'
    },
    container: {
        width: screenWidth-10,
        alignSelf:'center',
        height: screenheight / 7,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        borderWidth: 0.8,
        borderColor: '#989898',
        marginVertical:4,
        marginHorizontal:3,
        backgroundColor:'#d5eaec',
        shadowColor: '#296E85',
        shadowOffset: { width: 5, height:5},
        shadowOpacity: 2,
        shadowRadius: 5,
        elevation: 10,
    },
    containeropened: {
        width: screenWidth-10,
        alignSelf:'center',
        height: screenheight / 7,
        flexDirection: 'row',
        justifyContent: 'flex-start',

    },
    opened: {
        width: screenWidth-10,
        alignSelf:'center',
        height: screenheight / 1.2,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        borderWidth: 0.8,
        borderColor: '#989898',
        marginVertical:4,
        marginHorizontal:3,
        backgroundColor:'#d5eaec',
        shadowColor: '#296E85',
        shadowOffset: { width: 5, height:5},
        shadowOpacity: 2,
        shadowRadius: 5,
        elevation: 10,
    },
    recherchetitle: {
        width: screenWidth,
        height: screenheight / 8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center',
        borderWidth: 0.8,
        borderColor: '#296E85',
        marginVertical:5,
        backgroundColor:"#c8dcde",
        shadowColor: '#296E85',
        shadowOffset: { width: 5, height:5},
        shadowOpacity: 2,
        shadowRadius: 5,
        elevation: 10,
    },
    text00: {
        fontSize: screenWidth / 25,
        color: '#343434',

    },
    text01: {
        fontSize: screenWidth / 22,
        color: '#296E85',
        fontWeight:'bold'
    },
    container2: {
        flexDirection: 'column',
        marginTop: screenheight / 35,
        marginLeft: screenWidth / 20,
        width: screenWidth / 2.3,
    },
    container3: {
        flexDirection: 'column',
        marginTop: screenheight / 35,
        marginLeft: screenWidth / 10,
        marginRight: screenWidth / 15,
        width: screenWidth/4,

    },
    mypic: {
        width: screenWidth / 8,
        height: screenheight / 12,
        borderRadius: 40,
        borderColor: '#111',
        alignSelf: 'flex-start',
        marginTop: screenheight / 30,
        marginLeft: screenWidth / 20,
    },
    doctorname: {
        fontSize: screenheight / 40,
        color: '#232323',
        alignSelf: 'flex-start',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    text: {
        fontSize: screenheight / 60,
        color: '#4a4a4a',
        alignSelf: 'flex-start',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginTop: screenheight / 100,
    },
    timestyle: {
        fontSize: screenheight / 50,
        color: '#4a4a4a',
        alignSelf: 'flex-start',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginLeft:screenWidth/100,
        marginTop: screenheight / 200,

    },
    timestyle2: {
        fontSize: screenheight / 50,
        color: '#4a4a4a',
        alignSelf: 'flex-start',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginLeft:screenWidth/35,
    },
    voir: {
        fontSize: screenheight / 50,
        alignSelf: 'flex-start',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        borderColor: '#296E85',
        borderWidth:0.5,
        marginTop:screenheight/100,

    },
    container1:{
        flexDirection:'column',
        alignItems:'flex-start',
        justifyContent:'flex-start',
        marginVertical: screenheight/80,
    },
    TextNiv1:{
        color:"#77a0dc",
        fontSize: screenheight/30 ,
        alignSelf: 'flex-start',
        fontWeight: 'bold',
        marginLeft: screenWidth/10,
    },
    imagewall: {
        resizeMode: 'cover',
        width: screenWidth,
        height: screenheight / 2.5,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#949494',
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
    Texttime:{
        color:"#4f4f4f",
        fontSize: screenheight/45 ,
        alignSelf: 'center',
        fontWeight: 'bold',
        justifyContent:'center',
        marginLeft: screenWidth/8,
        marginVertical:8,
    },
});
