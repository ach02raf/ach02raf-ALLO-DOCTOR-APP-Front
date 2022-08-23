import React, {Component} from 'react';
import {StyleSheet, View, TouchableOpacity, Animated, Text, SafeAreaView, Image, Dimensions} from 'react-native';
import {Body, Header, Icon, Right, Title,Left} from 'native-base';
import Logo from '../../assets/images/Logo2.png';
import {LineDotsLoader} from 'react-native-indicator';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenheight = Math.round(Dimensions.get('window').height);
export default  class Calendresultat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idDoct:this.props.navigation.getParam('idDoct'),
            nomDoc:this.props.navigation.getParam('nomDoc'),
            myrvd:this.props.navigation.getParam('myrvd'),
            rvd:[],

            refreshing: true,
            LogoAnime: new Animated.Value(0),
            LogoText: new Animated.Value(0),
            loadingSpinner: false,
            showME: true,
        };

    }
    componentDidMount = async ()=>{
        await this.chargerRVD();
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
        })};



    chargerRVD=async ()=>{
        await this.state.myrvd.map((item,i)=>{
            item.idDoc===this.state.idDoct ?
                this.state.rvd.push({"jour":item.jour,"etat":item.etat,"time":item.time}):null

        });
        setTimeout(() => {
            this.setState({refreshing:false})
        }, 1000);
    };

    render(){
let jp;
        return(
            this.state.refreshing===false ?
                <View style={styles.container}>


                    <Title style={styles.title}>Mes rendez-vous avec "{
                        this.state.nomDoc
                    }"</Title>
                    {
                        this.state.rvd.map((item,i)=>(
                            <TouchableOpacity
                                style={{
                                    alignSelf: 'center',
                                    justifyContent: 'flex-start',
                                    backgroundColor: item.etat==="en attente" ? '#fa952c':'#29fa51',
                                    alignItems: 'flex-start',
                                    width: screenWidth / 1.2,
                                    height: screenheight / 11,
                                    flexDirection: 'row',
                                    borderRadius: 5,
                                    marginTop:20
                                }}>
                                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',textAlign:'center',marginLeft:80,marginTop:25}}>
                                    {

                                        item.jour.split(' ').map((item,i)=>(i<4 ? <Text style={styles.text}>{item}{" "}</Text>:null))
                                    }
                                    {
                                        <Text key={i} style={styles.text2}>
                                            ({item.time})
                                        </Text>
                                    }

                                </View>
                            </TouchableOpacity>
                        ))
                    }
                </View>
                : <View style={styles2.container}>
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


    };
}
const styles =StyleSheet.create({


    container:{
        flex:1,
        backgroundColor: '#d2edf0',
    } ,
    text2:{
        color:"#161924",
        fontSize: 18,
        fontWeight:"500",
        textAlign:'center'

    },
    text:{
        color:"#161924",
        fontSize: 22,
        fontWeight:"500",
        textAlign:'center',

    },cont:{
        backgroundColor: "#296E85",
    },title: {
        color: '#353535',
        fontWeight: 'bold',
        fontSize: 20,
        textAlign:'center',
        marginTop: 20

    },
    col:{
        color: '#9a9a9a',
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
