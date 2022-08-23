import React from 'react';

import {View, Text, Dimensions, StyleSheet, Platform, ScrollView} from 'react-native';
import Menu, {MenuItem, MenuDivider} from 'react-native-material-menu';
import Munus from '../icons/Munus'

const screenWidth = Math.round(Dimensions.get('window').width);
const screenheight = Math.round(Dimensions.get('window').height);
class MyMenu2 extends React.PureComponent {
    _menu = null;

    setMenuRef = ref => {
        this._menu = ref;
    };

    hideMenu = () => {
        this._menu.hide();
    };

    showMenu = () => {
        this._menu.show();
    };

    render() {
        return (
            <View style={{flex: 1, alignSelf: 'flex-start'  ,width:screenWidth/15,height:screenheight/20, marginLeft: screenWidth/2.4 ,marginTop:10}}>
                <Menu
                    style={{alignSelf: 'flex-start',height:150,width:screenWidth/2.2}}
                    ref={this.setMenuRef}
                    button={
                        <Munus  onPress={this.showMenu}>
                        </Munus>
                    }>

                    <MenuItem onPress={this.hideMenu}>Envoyer message</MenuItem>
                    <MenuItem onPress={this.hideMenu}>Consulter les rendez-vous</MenuItem>
                    <MenuItem onPress={this.hideMenu}>Supprimer de mes docteurs</MenuItem>

                </Menu>
            </View>
        );
    }
}

export default MyMenu2;
