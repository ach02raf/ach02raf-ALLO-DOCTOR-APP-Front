import React, {Component} from 'react';
import {Image, ImageBackground, ScrollView, StyleSheet, Text, View} from 'react-native';
import {DrawerNavigatorItems} from 'react-navigation-drawer';
import AsyncStorage from '@react-native-community/async-storage';
import avatarpic from '../../assets/images/avatarpic.png' ;
import server from '../../server';
export default class SideBar extends Component{
    constructor(props) {
        super(props);
        this.state={
          nom:'',
            prenom:'',
            photo:'',
        }
    }
    componentDidMount() { this.Boiler().then(r => '74');};
     Boiler = async ()=>{
        const token = await AsyncStorage.getItem("token");
        fetch('http://'+server+'/',{
            headers:new Headers({
                Authorization:"Bearer "+token
            })
        }).then(res=>res.json())
            .then(data=>{
                    console.log(data);
                    this.setState({nom:data.nom,prenom:data.prenom,photo:data.photo})
                }
            )
    };

render(){
    return (
        <ScrollView>
    <ImageBackground source={require("../../assets/images/drawerback5.jpg")}
                     style={{width: undefined, padding: 16, paddingTop: 48}}
    >
        <Image source={{uri:this.state.photo}} style={styles.profile}/>
        <Text style={styles.name}> {this.state.nom} {this.state.prenom}</Text>

    </ImageBackground>
    <View style={styles.container}>
        <DrawerNavigatorItems {...this.props}/>
    </View>
</ScrollView>
    );
}

};

const styles = StyleSheet.create({
container:{
    flex:1,
},
    profile:{
    width:80,
        height:80,
        borderRadius: 40 ,
        borderWidth: 1 ,
        borderColor: "#111",
        alignSelf: 'center'
    },name:{
    color:"#111",
        fontSize: 20 ,
        fontWeight:"800",
        marginVertical:8,
        alignSelf: 'center'


    }

});


