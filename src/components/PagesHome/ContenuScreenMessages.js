import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    ScrollView, TouchableOpacity, Animated, Image,
} from 'react-native';
import Message from './Message';
import {Icon} from 'native-base';
import update from 'react-addons-update';
import AsyncStorage from '@react-native-community/async-storage';
import {LineDotsLoader} from 'react-native-indicator';
import photo from '../../assets/images/hamza.jpg';
import {Overlay} from 'react-native-elements';
import Logo from '../../assets/images/Logo2.png';
import server from '../../server';
export default class ContenuScreenMessages extends Component {
    constructor(props) {
        super(props);
        this.state = {
          id:'',
            colorbacks:[],
            pressed:[],
            content: false,
            list:[],
            refreshing: true,
            visible:false,
            LogoAnime: new Animated.Value(0),
            LogoText: new Animated.Value(0),
            loadingSpinner: false,
            showME: true,
            showyou:'',
            notifid:-1,


        };
    }
    componentDidMount() {
        this.Boilermessage().then('rr');
        this.Boiler1message().then("zea");
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
    deleteelement= async (i)=>{
        let items0 = this.state.list;
        items0.splice(i,1);
        let items1 = this.state.colorbacks;
        items1.splice(i,1);
        let items2 = this.state.pressed;
        items2.splice(i,1);

        await this.setState({list:items0,colorbacks:items1,pressed:items2,content:false, refreshing: true});
        fetch("http://"+server+"/updatemessage",{
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                    "id":this.state.id,
                    "list":this.state.list,
                    "colorbacks":this.state.colorbacks,
                    "pressed":this.state.pressed,
                },
            )
        })
            .then(res=>res.json())
            .then((data)=>{
                console.log(data);
                console.log('delete message');
                setTimeout(() => {
                    this.setState({ refreshing: false});
                }, 2500);


            })

    };

    Boilermessage = async ()=>{
        const token = await AsyncStorage.getItem("token");
        fetch('http://'+server+'/message',{
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
                        refreshing:false

                    })
                }, 2500);

                }
            );
    };
    Boiler1message = async ()=>{
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

                }
            )
    };

    sendCredmessage =async (i) => {
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
          fetch("http://"+server+"/updatemessage",{
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                    "id":this.state.id,
                    "list":this.state.list,
                    "colorbacks":this.state.colorbacks,
                    "pressed":this.state.pressed,
                },
            )
        })
            .then(res=>res.json())
            .then((data)=>{
                console.log(data);
                console.log('update');
            })
    };


    render(){
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

                    this.state.content ?
                        <View style={styles.add2}>
                            <Icon  name="ios-trash" Size={25} style={{marginRight:screenWidth/15}} onPress={()=>{this.deleteelement(this.state.notifid).then("err")}}/>
                        </View>
                        :  <View style={styles.add}>
                            <Text style={{fontWeight:'bold',marginLeft:screenWidth/20}}>Recent(</Text>
                            <Text>{count}</Text>
                            <Text style={{fontWeight:'bold'}}>)</Text>
                            <TouchableOpacity style={styles.new} onPress={()=>{this.setState({visible:true})}}>
                                <Text style={styles.text}>Nouveau Message</Text>
                            </TouchableOpacity>
                        </View>
                }
                <Overlay
                    isVisible={this.state.visible}
                    windowBackgroundColor="rgba(0, 0, 0, 0.4)"
                    overlayBackgroundColor="#ffff"
                    width={screenWidth/1.3}
                    height={screenheight/4.5}
                    borderRadius={10}
                >
                    <View style={{backgroundColor:'transparent',justifyContent:'center', marginLeft: screenWidth/1.5}}>
                        <Icon  onPress={() => this.setState({visible: false})} name="ios-close" size={40}/>
                    </View>

                </Overlay>
                <ScrollView >
                    {
                        this.state.list.map((item, i) => (
                            <TouchableOpacity key={i} style={{backgroundColor:this.state.colorbacks[i].index}} onPress={() =>{ this.sendCredmessage(i).then("err");  }}  onLongPress={()=>{this.setState({content:true ,notifid:i})} }  >
                                <Message  key={i} MessageType={item.type} Doctorname ={item.doctornom} Time={ item.time} image={item.picdoc} />
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
        flexDirection:'column',
        flex:1,
        backgroundColor:'#daeef0'
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
    add2:{
        flexDirection:'row',
        width:screenWidth,
        height:screenheight/15,
        backgroundColor:'#e8fdff',
        alignItems:'center',
        justifyContent:'flex-end',
    },
    new:{
        flexDirection:'row',
        backgroundColor:'#daeef0',
        alignItems:'flex-start',
        marginLeft:screenWidth/3.5,
        borderColor:'#232323',

    },
    icone:{
        alignItems: 'flex-start',
        justifyContent:'center',
        alignSelf: 'center',
        flex:1,
        width:screenWidth/12,
        height:screenheight/12,
        marginLeft:30,

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
});
