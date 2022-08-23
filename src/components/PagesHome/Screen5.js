import React, {Component} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {LoginManager} from 'react-native-fbsdk';



export default  class Screen5 extends Component {
    componentDidMount() {
       this.signOutAsync().then(r => '74');
       this.logoutWithFacebook();
    };
    signOutAsync = async () => {
        await AsyncStorage.clear();

    };
    logoutWithFacebook = () => {
        LoginManager.logOut();
    };
    render(){
        return(
            this.props.navigation.navigate('Login')
        );


    };
}
