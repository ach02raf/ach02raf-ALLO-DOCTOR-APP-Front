import React, { Component } from "react";
import { StyleSheet, View, TextInput } from "react-native";

import {Dimensions } from "react-native";
import Password from '../icons/password';
const screenWidth = Math.round(Dimensions.get('window').width);

function Input_passwordconfirm(props) {
    return (
        <View style={[styles.container, props.style]}>
            <Password style={styles.iconStyle}/>
            <TextInput secureTextEntry placeholder={'Confirmer mot de passe'} style={styles.inputStyle} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "transparent",
        flexDirection: "row",
        alignItems: "center"
    },
    iconStyle: {
        height: 20,
        width: 40,
        marginTop: 20,


    },
    inputStyle: {
        width: screenWidth - 100 ,
        height: 40,
        color: "#000",
        alignSelf: "stretch",
        marginLeft: 1,
        marginRight : 20 ,
        paddingTop: 10,
        paddingRight: 5,
        paddingBottom: 8,
        borderColor: "rgba(0,0,0,1)",
        borderBottomWidth: 2,
        fontSize: 16,
        fontFamily: "roboto-regular",
        lineHeight: 16
    }
});

export default Input_passwordconfirm;
