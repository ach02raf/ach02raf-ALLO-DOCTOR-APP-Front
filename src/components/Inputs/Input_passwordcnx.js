import React, { Component } from 'react';
import { AppRegistry, View, Image, TouchableOpacity, TextInput, StyleSheet } from 'react-native';


export default class Input_passwordcnx extends Component {

    constructor() {
        super();

        this.state = { hidePassword: true }
    }

    setPasswordVisibility = () => {
        this.setState({ hidePassword: !this.state.hidePassword });
    };


    render() {
        return (
            <View style={styles_passwordcnx.container}>
                <View style={styles_passwordcnx.textBoxContainer}>
                    <TextInput placeholder={'Mot de passe'} secureTextEntry={this.state.hidePassword} style={styles_passwordcnx.textBox} />
                    <TouchableOpacity style={styles_passwordcnx.touachableButton} onPress={this.setPasswordVisibility}>
                        <Image source={(this.state.hidePassword) ? require('../../assets/images/hide.png') : require('../../assets/images/eye.png')} style={styles_passwordcnx.buttonImage} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles_passwordcnx = StyleSheet.create(
    {
        container: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",

        },
        headerText: {
            fontSize: 25,
            textAlign: "center",
            color: 'black',
            fontWeight: "bold"
        },
        textBoxContainer: {
            position: 'relative',
            alignSelf: 'center',
            justifyContent: 'center',

        },
        textBox: {
            color: 'gray',
            paddingTop: 0,
            paddingRight: 5,
            paddingBottom: 8,
            borderColor: 'rgba(0,0,0,1)',
            borderBottomWidth: 2,
            fontSize: 16,
            textAlign: 'center',
            fontFamily: 'roboto-regular',
            lineHeight: 16,
            width: 250,
            height:40
        },
        touachableButton: {
            position: 'absolute',
            right: 0,
            height: 30,
            width: 30,
        },
        buttonImage: {
            resizeMode: 'cover',
            height: '100%',
            width: '100%',
        }

    });
