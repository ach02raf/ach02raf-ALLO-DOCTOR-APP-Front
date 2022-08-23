import {Dimensions, Platform} from 'react-native';
import {ScreenWidth} from '@freakycoder/react-native-helpers';
import React from 'react';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenheight = Math.round(Dimensions.get('window').height);
export default {
    safeAreaViewStyle: {
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems:'center'
    },
    flatListStyle: {
        marginTop: 5,
        width: ScreenWidth / 1.2,
    },
    cardShadowStyle: {
        ...Platform.select({
            ios: {
                shadowRadius: 3,
                shadowOpacity: 0.4,
                shadowColor: '#000',
                shadowOffset: {
                    width: 3,
                    height: 3,
                },
            },
            android: {
                elevation: 3,
            },
        }),
    },
    cardStyle: {
        marginVertical: 2,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width:100,
    },
    container: {
        ...Platform.select({
            android: {
                marginTop: 50,
            },
        }),
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: 'transparent',
    },
    container3: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: 'transparent',
    },
    welcome: {
        margin: 10,
        fontSize: 20,
        textAlign: 'center',
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    chartStyle: {
        height: 30,
        width: 30,
        backgroundColor: 'transparent',
        borderRadius: 40,

    },
    maincontainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#d2edf0',
        flexDirection: 'row',

    },
    thecontainer0: {
        width: screenWidth,
        height: screenheight / 8,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: screenheight / 100,
    },
    thecontainer: {
        width: screenWidth / 1.5,
        height: screenheight / 9,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        margin: screenheight / 100,
    },
    thecontainernew: {
        backgroundColor: 'transparent',
        height: screenheight/1.7,
        justifyContent: 'flex-start',
        alignItems:'flex-start',
        marginBottom:screenheight/3.5
    },
    thecontainer3: {
        width: screenWidth / 1.2,
        height: screenheight / 5,
        backgroundColor: '',
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        margin: screenheight / 100,
    },
    inputs: {
        width: screenWidth / 1.2,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        backgroundColor: 'transparent', //
    },
    thecontainer2: {
        width: screenWidth / 1.3,
        height: screenheight / 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:screenheight/10
    },
    Mytext: {
        color: 'white',
        fontSize: screenWidth / 12,
        fontFamily: 'roboto-regular',
    },
    text: {
        color: '#707070',
        lineHeight: screenWidth / 10,
        fontSize: screenWidth / 17,
        marginLeft: screenWidth / 20,
        marginRight: screenWidth / 20,
        fontWeight: 'bold',
        alignItems: 'center',
        textAlign: 'center',
    },
    image: {
        resizeMode: 'cover',
        width: screenWidth,
        height: screenheight/1.1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    recherchebutton: {
        flex: 1,
        width: screenWidth,
        height: screenheight / 11,
        backgroundColor: '#FCC142',
        alignItems: 'center',
        justifyContent: 'center',
    },
};
