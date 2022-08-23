import React, {Component} from 'react';
import {
    Text,
    View,
    ScrollView, TouchableOpacity, Dimensions, StyleSheet, Animated, Image, RefreshControl,
} from 'react-native';
import Notification from './Notification';
import update from 'react-addons-update';
import AsyncStorage from '@react-native-community/async-storage';
import {Icon} from "native-base";
import { LineDotsLoader} from 'react-native-indicator';
import Logo from '../../assets/images/Logo2.png';
import photo from '../../assets/images/hamza.jpg';
import server from '../../server';
export default class ContenuScreenNotifications extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id:'',
            colorbacks:[],
            pressed:[],
            list:[],
            content: false,
            contunue:"",
            refreshing: true,
            notifid:-1,
            LogoAnime: new Animated.Value(0),
            LogoText: new Animated.Value(0),
            loadingSpinner: false,
            showME: true,
            showyou:'',
            Refreshing:false
        };
    };
    onRefresh() {
        setTimeout(async () => {
            this.Boiler().then( '74');
        }, 1000);
    }
    componentDidMount() {
        this.Boiler().then( '74');
        this.Boiler1().then('147');
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
        fetch('http://'+server+'/notification',{
            headers:new Headers({
                Authorization:"Bearer "+token
            })
        }).then(res=>res.json())
            .then(data=>{
                    console.log(data);
                setTimeout(() => {
                    this.setState({
                        colorbacks:data.colorbacks,
                        pressed:data.pressed,
                        list:data.list,
                        contunue:data.contunue,
                        refreshing:false


                    })
                }, 1500);

                }
            );
    };
    Boiler1 = async ()=>{
        const token = await AsyncStorage.getItem("token");
        fetch('http://'+server+'/iduser',{
            headers:new Headers({
                Authorization:"Bearer "+token
            })
        }).then(res=>res.json())
            .then(data=>{
                    this.setState({
                        id:data.id,

                    });
                    console.log(this.state.id);
                console.log("id get");
                }
            )
    };


    deleteelement= async (i)=>{
        console.log(i);
        const items = this.state.list;
        items.splice(i,1);
        const items1 = this.state.colorbacks;
        items1.splice(i,1);
        const items2 = this.state.pressed;
        items2.splice(i,1);

        await this.setState({list:items,colorbacks:items1,pressed:items2,content:false, refreshing: true});
        fetch("http://"+server+"/updatenotifacation",{
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                    "id":this.state.id,
                    "list":this.state.list,
                    "colorbacks":this.state.colorbacks,
                    "pressed":this.state.pressed,
                    "contunue":this.state.contunue,
                },
            )
        })
            .then(res=>res.json())
            .then((data)=>{
                console.log(data);
                console.log('delete');
                setTimeout(() => {
                    this.setState({ refreshing: false});
                }, 2500);


            })

    };


    sendCred =async  (i) => {
       await this.setState(update(this.state, {
            colorbacks: {
                [i]: {
                    $set: {index:'transparent'}
                },

            },
            pressed: {
                [i]: {
                    $set: {index:"1"}
                },

            }
        }));
        fetch("http://"+server+"/updatenotifacation",{
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                "id":this.state.id,
                "list":this.state.list,
                "colorbacks":this.state.colorbacks,
                "pressed":this.state.pressed,
                "contunue":this.state.contunue,
                },
            )
        })
            .then(res=>res.json())
            .then((data)=>{
                console.log(data);
                console.log('update');


            });
        this.props.navigation.navigate("Calendrier");
    };

    touslu = async () => {


        if(this.state.contunue ==="Marquer tous comme lu"){

       for(let k = 0; k <this.state.list.length; ++k)
        { this.state.colorbacks[k].index='transparent';
            this.state.pressed[k].index="1";
           await this.setState(update(this.state, {

                colorbacks: {
                        [k]: {
                            $set: {index:'transparent'}
                        },

                    },
                    pressed: {
                        [k]: {
                            $set: {index:"1"}
                        },

                    }
            }));

        }
      await this.setState({contunue:"Marquer tous comme non lu"});
        fetch("http://"+server+"/updatenotifacation",{
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                    "id":this.state.id,
                    "list":this.state.list,
                    "colorbacks":this.state.colorbacks,
                    "pressed":this.state.pressed,
                    "contunue":this.state.contunue
                },
            )
        })
            .then(res=>res.json())
            .then((data)=>{
                console.log(data);
                console.log('update 1');
            })}
        else{
            if(this.state.contunue ==="Marquer tous comme non lu"){
                let ka;
                for( ka = 0; ka < this.state.list.length; ++ka)
                { this.state.colorbacks[ka].index='#b1d5dc';
                    this.state.pressed[ka].index="0";
                    await this.setState(update(this.state, {

                        colorbacks: {
                            [ka]: {
                                $set: {index:'#b1d5dc'}
                            },

                        },
                        pressed: {
                            [ka]: {
                                $set: {index:"0"}
                            },

                        }
                    }));

                }
                await this.setState({contunue:"Marquer tous comme lu"});
                fetch("http://"+server+"/updatenotifacation",{
                    method:"POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body:JSON.stringify({
                            "id":this.state.id,
                            "list":this.state.list,
                            "colorbacks":this.state.colorbacks,
                            "pressed":this.state.pressed,
                            "contunue":this.state.contunue
                        },
                    )
                })
                    .then(res=>res.json())
                    .then((data)=>{
                        console.log(data);
                        console.log('update 2');
                    })}
            else {console.log("err");}

        }
    };

    render() {
        let i;
        let counttabs = 0;

        for(i = 0; i <  this.state.pressed.length; ++i)
        {
            if( this.state.pressed[i].index ==="1" )
                counttabs++;
        }

        let count = this.state.list.length - counttabs;

        return (
            this.state.refreshing===false ?
            <View style={styles.maincontainer}>
                {
                    this.state.content ===true?
                        <View style={styles.add2}>
                            <Icon  name="ios-trash" Size={25} style={{marginRight:screenWidth/15}} onPress={()=>{this.deleteelement(this.state.notifid).then("err")}}/>
                        </View>
                        :
                        <View style={styles.add}>
                            <Text style={{fontWeight:'bold',marginLeft:screenWidth/20}}>Recent(</Text>
                            <Text>{count}</Text>
                            <Text style={{fontWeight:'bold'}}>)</Text>
                            { this.state.list.length===0?
                                null
                                :
                                <TouchableOpacity style={styles.new}>
                                    <Text onPress={() => {
                                        this.touslu().then("FFF");
                                    }} style={styles.text}>{this.state.contunue}</Text>
                                </TouchableOpacity>
                            }
                        </View>
                }

                <ScrollView

                    refreshControl={
                        <RefreshControl
                            //refresh control used for the Pull to Refresh
                            refreshing={this.state.Refreshing}
                            onRefresh={this.onRefresh.bind(this)}
                        />
                    }>

                        {
                            this.state.list.length===0?
                                <Text>boite vide</Text>
                                    :
                        this.state.list.map((item, i) => (
                            <TouchableOpacity key={i} style={{backgroundColor:this.state.colorbacks[i].index}} onPress={() =>{ this.sendCred(i).then("err");} }  onLongPress={()=>{this.setState({content:true ,notifid:i})} } >
                                <Notification key={i} NotificationType={item.type} Doctorname ={item.doctornom}  image={item.picdoc}  />
                            </TouchableOpacity>

                        ))
                    }
                </ScrollView>
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
    },maincontainer2:{
        flex:1,
        backgroundColor:'#daeef0'
    },
    add2:{
        flexDirection:'row',
        width:screenWidth,
        height:screenheight/15,
        backgroundColor:'#e8fdff',
        alignItems:'center',
        justifyContent:'flex-end',
    },
    add:{
        flexDirection:'row',
        width:screenWidth,
        height:screenheight/18,
        backgroundColor:'#daeef0',
        alignItems:'center',
        justifyContent:'flex-start',
        borderColor:'#232323',
    },
    image: {
        flex:1,
        resizeMode: 'cover',
        width: screenWidth,
        height: screenheight-110,
        justifyContent:'flex-start',
        alignItems:'flex-start'
    },
    text: {
        color: '#4f4f4f',
        width:screenWidth/1.5,
        lineHeight: screenheight / 40,
        fontSize: screenWidth / 30,
        alignItems: 'center',
        justifyContent:'center',
        textAlign: 'center',
        alignSelf: 'center',

    },
    new:{
        flexDirection:'row',
        backgroundColor:'#daeef0',
        alignItems:'flex-start',
        marginLeft:screenWidth/4,
        borderColor:'#232323',

    },
});
