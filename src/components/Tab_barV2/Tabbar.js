import React from 'react';
import {
    View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {createAppContainer} from 'react-navigation';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import ContenuScreenHome from '../PagesHome/ContenuScreenHome';
import ContenuScreenNotifications from '../PagesHome/ContenuScreenNotifications';
import ContenuScreenMesDocteurs from '../PagesHome/ContenuScreenMesDocteurs';
import ContenuScreenMessages from '../PagesHome/ContenuScreenMessages';
import ContenuScreenCalender from '../PagesHome/ContenuScreenCalender';
import {createStackNavigator} from 'react-navigation-stack';
import ProfilPraticien from '../PagesHome/ProfilPraticien';
import Recherche from '../PagesHome/Recherche'
import RdvFormulaire from '../PagesHome/RdvFormulaire';
import Calendresultat from '../PagesHome/calendresultat';


const ProfilPraticien1=({navigation})=><ProfilPraticien navigation={navigation}/>;
const ContenuScreenNotifications1=({navigation})=><ContenuScreenNotifications navigation={navigation} />;
const ContenuScreenMesDocteurs1=({navigation})=><ContenuScreenMesDocteurs navigation={navigation} />;
const ContenuScreenMessages1=({navigation})=><ContenuScreenMessages navigation={navigation} />;
const ContenuScreenCalender1=({navigation})=><ContenuScreenCalender navigation={navigation} />;
const ContenuScreenHome1=({navigation})=><ContenuScreenHome navigation={navigation} />;
const Recherche1=({navigation})=><Recherche navigation={navigation}/>;
const RdvFormulaire1=({navigation})=><RdvFormulaire navigation={navigation}/>;
const Calendresultat1=({navigation})=><Calendresultat navigation={navigation}/>;


const TabNavigator = createMaterialBottomTabNavigator(
    {
        Accueil: {
            screen: ContenuScreenHome1,
            navigationOptions: {
                tabBarIcon: ({tintColor}) => (
                    <View>
                        <Icon style={[{color: tintColor}]} size={25} name={'ios-home'} />
                    </View>
                ),
            },
        },
        MesDocteurs: {
            screen: ContenuScreenMesDocteurs1,
            navigationOptions: {
                tabBarIcon: ({tintColor}) => (
                    <View>
                        <Icon style={[{color: tintColor}]} size={25} name={'ios-medkit'} />
                    </View>
                ),
            },
        },
        Calendrier: {
            screen: ContenuScreenCalender1,
            navigationOptions: {
                tabBarIcon: ({tintColor}) => (
                    <View>
                        <Icon
                            style={[{color: tintColor}]}
                            size={25}
                            name={'ios-calendar'}
                        />
                    </View>
                ),
                activeColor: '#ffffff',
                inactiveColor: '#9a9a9a',
                barStyle: {backgroundColor: '#9EDAE4'},
            },
        },
        Messages: {
            screen: ContenuScreenMessages1,
            navigationOptions: {
                tabBarIcon: ({tintColor}) => (
                    <View>
                        <Icon
                            style={[{color: tintColor}]}
                            size={25}
                            name={'ios-chatbubbles'}
                        />
                    </View>
                ),
                activeColor: '#ffffff',
                inactiveColor: '#9a9a9a',
                barStyle: {backgroundColor: '#9EDAE4'},
            },
        },
        Notifications: {
            screen: ContenuScreenNotifications1,
            navigationOptions: {
                tabBarIcon: ({tintColor}) => (
                    <View>
                        <Icon
                            style={[{color: tintColor}]}
                            size={25}
                            name={'ios-notifications'}
                        />
                    </View>
                ),
                activeColor: '#ffffff',
                inactiveColor: '#9a9a9a',
                barStyle: {backgroundColor: '#9EDAE4'},
            },
        },
    },
    {
        initialRouteName: 'Accueil',
        activeColor: '#ffffff',
        inactiveColor: '#9a9a9a',
        barStyle: {backgroundColor: '#9EDAE4'},
    },
);
const First=createStackNavigator({
    TabNavigator:{
        screen:TabNavigator,

    },
    ProfilPraticien:{
        screen:ProfilPraticien1,
    },
    Recherche:{
    screen:Recherche1,
}, RdvFormulaire:{
        screen:RdvFormulaire1,
    },Calendresultat:{
        screen:Calendresultat1,
    },

},{headerMode:'none'});

export default createAppContainer(First);
