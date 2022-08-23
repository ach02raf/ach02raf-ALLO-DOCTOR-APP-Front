import React, {Component} from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import {Dimensions} from 'react-native';
import Cin from '../icons/cin';
const screenWidth = Math.round(Dimensions.get('window').width);

function Input_cin(props) {
  return (
    <View style={[styles.container, props.style]}>
      <Cin style={styles.iconStyle} />
      <TextInput placeholder={'CIN'} style={styles.inputStyle} />
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
    height: 20,
    width: 40,
    marginTop: 25,
    marginLeft: 0,
  },
  inputStyle: {
    width: screenWidth - 100,
    height: 40,
    color: '#000',
    alignSelf: 'stretch',
    marginLeft: 1,
    marginRight: 20,
    paddingTop: 0,
    paddingRight: 5,
    paddingBottom: 8,
    borderColor: 'rgba(0,0,0,1)',
    borderBottomWidth: 2,
    fontSize: 16,
    fontFamily: 'roboto-regular',
    lineHeight: 16,
  },
});

export default Input_cin;
