import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    Dimensions,

    ScrollView, ImageBackground,
} from 'react-native';

class Apropos extends Component {

    render() {
        return (
            <View style={styles.maincontainer}>
                <ImageBackground
                    source={require('../../assets/images/newback2.png')}
                    style={styles.image}>
                    <ScrollView>

                        <Text style={styles.titre}>AlloDoctor</Text>
                        <Text style={styles.text}>Une application qui consiste à offrir aux patients une solution simplissime pour la prise de rendez-vous en ligne {"\n"}On vous propose un service gratuit pour rechercher des praticiens disponibles par spécialité, localisation ou bien leurs identités et de prendre vos rendez-vous avec votre médecin en ligne 24h/24 et 7j/7{"\n"}Notre objectif est d'améliorer l'accès aux soins en Tunisie en mettant à votre disposition des outils simples pour gérer votre santé et celle de vos proches</Text>

                    </ScrollView>
                </ImageBackground>
            </View>
        );
    }
}

const screenWidth = Math.round(Dimensions.get('window').width);
const screenheight = Math.round(Dimensions.get('window').height);
const styles = StyleSheet.create({
    maincontainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#d2edf0',

    },
    text:{
        color: '#4f4f4f',
        lineHeight: screenWidth / 10,
        marginTop: screenWidth / 8,
        fontSize: screenWidth / 20,
        marginLeft: screenWidth / 20,
        marginRight: screenWidth / 20,
        alignItems: 'center',
        textAlign: 'center',
    },
    titre: {
        color: '#707070',
        lineHeight: screenWidth / 10,
        marginTop: screenWidth / 8,
        fontSize: screenWidth / 15,
        marginLeft: screenWidth / 20,
        marginRight: screenWidth / 20,
        fontWeight: 'bold',
        alignItems: 'center',
        textAlign: 'center',
    },
    image: {
        resizeMode: 'cover',
        width: screenWidth,
        height: screenheight,
        flex: 1,
        alignSelf: 'center',
    },

});

export default Apropos;
