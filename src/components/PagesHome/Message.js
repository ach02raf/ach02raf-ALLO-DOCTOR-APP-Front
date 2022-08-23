import {
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import React, {Component} from 'react';
export default class Message extends Component {
    constructor(props, MessageType, Doctorname, Time, image) {
        super(props, MessageType, Doctorname, Time, image);
        this.state = {
            text1: this.props.MessageType,
            doctornom: this.props.Doctorname,
            time: this.props.Time,
            uriImage: this.props.image,
            colorback: '#b1d5dc',
        };
    }

    render() {
        return (
            <View style={styles.container}>

                    <Image source={this.state.uriImage} style={styles.mypic} />
                    <View style={styles.container2}>
                        <Text style={styles.doctorname}>{this.state.doctornom}</Text>
                        <Text style={styles.text}>
                            {this.state.text1.length > screenWidth / 20
                                ? this.state.text1.substring(0, screenWidth / 15) + '...'
                                : this.state.text1}
                        </Text>
                    </View>
                    <View style={styles.container3}>
                        <Text style={styles.timestyle}>{this.state.time}</Text>
                    </View>
            </View>
        );
    }
}

const screenWidth = Math.round(Dimensions.get('window').width);
const screenheight = Math.round(Dimensions.get('window').height);
const styles = StyleSheet.create({
    container: {
        width: screenWidth,
        height: screenheight / 8,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        borderBottomWidth: 1,
        borderColor: '#296E85',
        borderBottomLeftRadius: 100,
    },
    menuContent: {
        color: '#000',
        position: 'relative',
        padding: 2,
        fontSize: 10,
        flexDirection: 'column',
        width: 200,
        backgroundColor: 'red',
        height: 80,
        left: 100,
    },
    container2: {
        flexDirection: 'column',
        marginTop: screenheight / 35,
        marginLeft: screenWidth / 20,
        width: screenWidth / 2.2,
    },
    container3: {
        flexDirection: 'column',
        marginTop: screenheight / 35,
        marginLeft: screenWidth / 7,
        marginRight: screenWidth / 20,
        width: 250,
    },
    mypic: {
        width: screenWidth / 8,
        height: screenheight / 14,
        borderRadius: 40,
        borderColor: '#111',
        alignSelf: 'flex-start',
        marginTop: screenheight / 35,
        marginLeft: screenWidth / 20,
    },
    doctorname: {
        fontSize: screenheight / 40,
        color: '#232323',
        alignSelf: 'flex-start',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    text: {
        fontSize: screenheight / 60,
        color: '#4a4a4a',
        alignSelf: 'flex-start',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginTop: screenheight / 100,
    },
    timestyle: {
        fontSize: screenheight / 42,
        color: '#4a4a4a',
        alignSelf: 'flex-start',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    iconStyle: {
        height: screenheight / 40,
        width: screenWidth / 20,
        marginTop: screenheight / 50,
        marginLeft: screenWidth / 20,
    },
});
