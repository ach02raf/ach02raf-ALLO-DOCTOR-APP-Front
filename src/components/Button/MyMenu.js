import React from 'react';

import {View, } from 'react-native';
import Menu, {MenuItem} from 'react-native-material-menu';
import Munus from '../icons/Munus'
class MyMenu extends React.PureComponent {
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
        <View style={{flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start' ,marginLeft:20 , marginTop:5}}>
          <Menu
              ref={this.setMenuRef}
              button={
                <Munus onPress={this.showMenu}>
                </Munus>
              }>
            <MenuItem onPress={this.hideMenu}>Supprimer la notification</MenuItem>
            <MenuItem onPress={this.hideMenu}>Masquer les notifications de cette personne</MenuItem>
          </Menu>
        </View>
    );
  }
}

export default MyMenu;
