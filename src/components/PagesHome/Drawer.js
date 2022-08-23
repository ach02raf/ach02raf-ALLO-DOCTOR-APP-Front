import React from 'react';
import {createAppContainer,createSwitchNavigator} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import { Dimensions} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';


import SignUpV2 from '../PremierPages/SignUpV2';
import Loading from '../PremierPages/Loading';
import PageOneV1 from '../PremierPages/PageOneV1';
import MotPasse from '../PremierPages/MotPasse';

import Screen from './Screen';
import Screen2 from './Screen2';
import Screen4 from './Screen4';
import Screen5 from './Screen5';


import SideBar from './SideBar';
import User from '../icons/User';
import Homme from '../icons/Home';
import Settingg from '../icons/Setting';
import Help from '../icons/Help';
import SignUpp from '../icons/SignUp';

import Parametre from'../PagesHome/Parametres';


const Loadingg=({navigation})=><Loading navigation={navigation}/>;
const Inscription=({navigation})=><PageOneV1 navigation={navigation}/>;
const Inscription1=({navigation})=><SignUpV2 navigation={navigation}/>;
const motpassOblier=({navigation})=><MotPasse navigation={navigation} name="motpassOblier"/>;

const Accueil=({navigation})=><Screen navigation={navigation} name="Accueil"/>;


const Profil=({navigation})=><Screen2 navigation={navigation} name="Profil"/>;
const Paramètres=({navigation})=><Parametre navigation={navigation} name="Paramètres"/>;
const Apropos=({navigation})=><Screen4 navigation={navigation} name="Apropos"/>;
const Deconnection=({navigation})=><Screen5 navigation={navigation} name="Deconnection"/>;


const DrawerNavigator=createDrawerNavigator({

    Home:{

        screen:Accueil,
        navigationOptions:{
            title:"Accueil",
            drawerIcon:({tintColor}) =><Homme size={5} color={tintColor}/>
        }
    },
    Profile:{

        screen:Profil,
        navigationOptions:{
            title:"Profil",
            drawerIcon:({tintColor}) =><User size={5} color={tintColor}/>
        }
    },
    Setting:{

        screen:Paramètres,
        navigationOptions:{
            title:"Paramètres",
            drawerIcon:({tintColor}) =><Settingg size={5} color={tintColor}/>
        }
    },
        Apropos:{
            screen:Apropos,
            navigationOptions:{
                title:"A propos",
                drawerIcon:({tintColor}) =><Help size={5} color={tintColor}/>
            }
        },Deconnection:{
            screen:Deconnection,
            navigationOptions:{
                title:"Se déconnecter ",
                drawerIcon:({tintColor}) =><SignUpp size={5} color={tintColor}/>
            }
        },
},
    {

        contentComponent: props =><SideBar{...props}/> ,
        drawerWidth: Dimensions.get("window").width*0.85,
        contentOptions:{
            activeBackgroundColor:"#d2edf0",

        }
    });
const First0=createStackNavigator({
    Login:{
        screen:Loadingg,

    },
    Inscription:{
        screen:Inscription,
    },
    Inscription1:{
        screen:Inscription1,
    },motpassOblier:{
        screen:motpassOblier,
    },

},{headerMode:'none'});

const First = createSwitchNavigator({
    Login:{
        screen:First0,

    },Oblier:{
        screen:motpassOblier,
    },
    DrawerNavigator:{
        screen:DrawerNavigator,
    }
},{headerMode:'none'},{initialRouteName: 'Login'});


const Drawer = createAppContainer(First);
export default Drawer;
