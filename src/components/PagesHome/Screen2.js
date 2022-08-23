import React, {Component} from 'react';
import {StyleSheet,View,TouchableOpacity} from 'react-native';
import {Body, Header, Icon, Right, Title,Left} from 'native-base';

import Myprofil from '../PremierPages/Myprofil';
export default  class Screen2 extends Component {

    render(){
        return(

            <View style={styles.container}>

                <Header style={
                    styles.cont
                } >
                    <Left><TouchableOpacity
                        onPress={() => this.props.navigation.goBack()}

                    >
                        <Icon name="arrow-back" size={25}/>
                    </TouchableOpacity>
                    </Left>
                    <Body>
                        <Title style={styles.title}>Profil</Title>
                    </Body>
                    <Right />
                </Header>
        <Myprofil/>
            </View>



        );


    };
}
const styles =StyleSheet.create({


    container:{
        flex:1,
        backgroundColor: '#d2edf0',

    } ,
    text:{
        color:"#161924",
        fontSize: 20,
        fontWeight:"500",
    },cont:{
        backgroundColor: "#296E85",
    },title: {
        color: '#9a9a9a',
        fontWeight: 'bold',
    },
    col:{
        color: '#9a9a9a',
    },


});
