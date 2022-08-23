import React, {Component} from 'react';
import {View, StyleSheet, Dimensions, TextInput} from 'react-native';

class QuiBox extends Component {

    render() {
        return (
            <View style={styles.container}>
                <TextInput placeholder={'Qui ?'} style={styles.MyText}/>
            </View>
        );
    }
}

const screenWidth = Math.round(Dimensions.get('window').width);
const screenheight = Math.round(Dimensions.get('window').height);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        width: screenWidth / 1.5,
        height: 60,
        marginTop: screenheight / 2.7,
        marginBottom: screenheight / 2.7,
        borderRadius: 10,
    },
    MyText: {
        width: '80%',
        alignItems: 'flex-start' ,
        fontSize: screenWidth/15
    },
});

export default QuiBox;
