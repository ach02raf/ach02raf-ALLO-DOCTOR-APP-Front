import React, {Component} from 'react';
import {StyleSheet, View, TextInput, Text} from 'react-native';

import {Dimensions} from 'react-native';
import Usernomprenom from '../icons/Usernomprenom';
const screenWidth = Math.round(Dimensions.get('window').width);

function Input_nom(props) {
  return (
    <View style={[styles.container, props.style]}>
      <Usernomprenom style={styles.iconStyle} />
      <TextInput placeholder={'Prénom'} style={styles.inputStyle} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconStyle: {
    marginTop: 20,
    height: 20,
    width: 40,
  },
  inputStyle: {
    width: screenWidth - 100,
    height: 40,
    color: '#000',
    alignSelf: 'stretch',
    marginLeft: 1,
    marginRight: 20,
    paddingTop: 10,
    paddingRight: 5,
    paddingBottom: 10,
    borderColor: 'rgba(0,0,0,1)',
    borderBottomWidth: 2,
    fontSize: 16,
    fontFamily: 'roboto-regular',
    lineHeight: 16,
  },
});

export default Input_nom;
