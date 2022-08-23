import React, {Component} from 'react';
import {StyleSheet,View,TouchableOpacity} from 'react-native';
import {Body, Header, Icon, Right, Title,Left} from 'native-base';
import Parametres from './Parametres';
export default  class Screen3 extends Component {

    render(){
        const Paramètres=({navigation})=><Parametres navigation={navigation} name="Paramètres"/>;
        return(

            <View style={stylesh.container}>

                <Header style={
                    stylesh.cont
                } >
                    <Left><TouchableOpacity
                        onPress={() => this.props.navigation.goBack()}

                    >
                        <Icon name="arrow-back" size={25}/>
                    </TouchableOpacity>
                    </Left>
                    <Body>
                        <Title style={stylesh.title}>Paramètres</Title>
                    </Body>
                    <Right />
                </Header>
               <Paramètres/>

            </View>



        );


    };
}
const stylesh =StyleSheet.create({


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
