import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    Dimensions,

    ScrollView, TouchableOpacity, TextInput, ImageBackground,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Svg, { Path,Circle} from "react-native-svg";

import {Body, Header, Icon, Right, Title,Left} from 'native-base';
import server from '../../server';

const longtext = 'Nous vous conseillons d’utiliser un mot de passe sûr que vous n’utilisez nulle part ailleurs';
const longtextprofil = 'Vous pouvez à tout moment afficher ou modifier les informations de votre compte.\n';
const longtext2 = 'Bienvenue sur l\' application AlloDoctor. Tous les applications fonctionnent avec le recueil de données et l\'acquisition de connaissances, notamment aux fins de recherche et développement. La gestion de ces données dans le respect de votre vie privée nous tient particulièrement à cœur';
const longtextfb = 'Vous êtes connecté avec votre compte facebook \n Vous ne pouvez pas changer de mot passe';
const longtextfb0 = 'Vous êtes connecté avec votre compte facebook \n Vous ne pouvez pas Modifier vos coordonneés';



export default class Parametres extends Component {
    constructor(props) {
        super(props);
        this.state = {
            facebookcnx:false, //Variable affichage selon la cnx avec fb ou nn
            nom1:'',
            prenom1:'',
            adresse1:'',
            ville1:'',



            nom: '',
            prenom: '',
            openville:null,
            ville : '',
            openadress:null,
            adresse:'',
            obligatoirenom:'',
            obligatoireprenom:'',
            obligatoireadresse:'',
            obligatoireville:'',
            nombarcolor:'grey',
            prenombarcolor:'grey',
            adressecolor:'grey',
            villecolor:'grey',

            open0:true,
            open1:true,
            open2:true,


            ancienpass:'hamza',
            pass1 :'',
            pass2:'',
            pass3:'',

            obligatoirepass1:'',
            obligatoirepass2:'',
            obligatoirepass3:'',


            pass1barcolor:'grey',
            pass2barcolor:'grey',
            pass3barcolor:'grey',

            password:'',
            id:'',
            tel:'',
            response:''
        };
    }

    componentDidMount=   ()=> {
         this.Boiler().then('rr');


    };

    Boiler = async ()=>{
        const token = await AsyncStorage.getItem("token");
       await fetch('http://'+server+'/',{
            headers:new Headers({
                Authorization:"Bearer "+token
            })
        }).then(res=>res.json())
            .then(data=>{
                        this.setState({
                            id:data._id,
                            nom: data.nom,
                            prenom:data.prenom,
                            ville: data.ville,
                            adresse:data.adresse,
                            password:data.password,
                            tel:data.tel,



                        })

                }
            );

        if(this.state.tel.length !== 8)
        {
            this.setState({facebookcnx:true});
        }else {
            this.setState({facebookcnx:false});
        }
    };
    update2 =async  () => {

        fetch("http://"+server+"/updatemotdepass",{
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                "id":this.state.id,
                "password":this.state.pass2,
            })
        })
            .then(res=>res.json())
            .then((data)=>{
                console.log(data);
            })};
    update1 =async  () => {
        fetch("http://"+server+"/update",{
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                "id":this.state.id,
                "nom":this.state.nom,
                "prenom":this.state.prenom,
                "adresse":this.state.adresse,
                "ville":this.state.ville,
            })

        })
            .then(res=>res.json())
            .then((data)=>{
                console.log(data);


            })};

    verify0 =async () => {

        if (this.state.nom1 === '') {
            this.setState({obligatoirenom: 'Obligatoire', nombarcolor: 'red'});
        }
        if (this.state.prenom1 === '') {
            this.setState({obligatoireprenom: 'Obligatoire', prenombarcolor: 'red'});
        }
        if (this.state.adresse1 === '') {
            this.setState({obligatoireadresse: 'Obligatoire', adressecolor: 'red'});
        }
        if (this.state.ville1 === '') {
            this.setState({obligatoireville: 'Obligatoire', villecolor: 'red'});
        }

        if (this.state.openadress===true&&this.state.openville===true &&this.state.nom1!==''&&this.state.prenom1!==''&& this.state.adresse1!==''&& this.state.ville1!=='')
        {
          await  this.setState({nom:this.state.nom1,prenom:this.state.prenom1,adresse:this.state.adresse1,ville:this.state.ville1});
            this.update1();
            this.setState({open0:!this.state.open0});
            alert('modif avec succés');
        }
        if (this.state.openadress===false&&this.state.openville===true &&this.state.nom1!==''&&this.state.prenom1!==''&& this.state.ville1!=='')
        {
          await  this.setState({nom:this.state.nom1,prenom:this.state.prenom1,ville:this.state.ville1});
            this.update1();
            this.setState({open0:!this.state.open0});
            alert('modif avec succés');
        }
        if (this.state.openadress===true&&this.state.openville===false &&this.state.nom1!==''&&this.state.prenom1!==''&& this.state.adresse1!=='')
        {
        await    this.setState({nom:this.state.nom1,prenom:this.state.prenom1,adresse:this.state.adresse1});
            this.update1();
            this.setState({open0:!this.state.open0});
            alert('modif avec succés');
        }
        if (this.state.openadress===false&&this.state.openville===false &&this.state.nom1!==''&&this.state.prenom1!=='')
        {
            await this.setState({nom:this.state.nom1,prenom:this.state.prenom1});
            this.update1();
            this.setState({open0:!this.state.open0});
            alert('modif avec succés');

        }

    };
    comparepassword =async  () => {

        fetch("http://"+server+"/comparepassword",{
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                "tel":this.state.tel,
                "password":this.state.pass1
            })
        })
            .then(res=>res.json())
            .then(async (data)=>{
                console.log(data.res);
              await  this.setState({response:data.res})

            })};


    verify = async () => {

        if (this.state.pass1 === '') {
            this.setState({obligatoirepass1: 'Obligatoire', pass1barcolor: 'red'});
        }
        if (this.state.pass2 === '') {
            this.setState({obligatoirepass2: 'Obligatoire', pass2barcolor: 'red'});
        }
        if (this.state.pass3 === '') {
            this.setState({obligatoirepass3: 'Obligatoire', pass3barcolor: 'red'});
        }
        if (this.state.pass2 !== this.state.pass3 )
        {
            this.setState({obligatoirepass3: 'à verifier',obligatoirepass2: 'à verifier', pass3barcolor: 'red',pass2barcolor: 'red'});
        }
        if (this.state.response===false||this.state.pass1==='')
        {
            this.setState({obligatoirepass1: 'à verifier',pass1barcolor:'red'});
        }


        if (this.state.response===true &&this.state.pass1!==''&&this.state.pass2!==''&&this.state.pass3!==''&&this.state.pass2===this.state.pass3)
        {
             await this.update2();

            alert('Mot passe changé avec succés');
            this.setState({open1:!this.state.open1})
        }
    };
    onedit0 = () => {
        if (!(this.state.nom1 === '')) {
            this.setState({obligatoirenom: '', nombarcolor: 'grey'});
        }
        if (!(this.state.prenom1 === '')) {
            this.setState({obligatoireprenom: '', prenombarcolor: 'grey'});
        }
        if (!(this.state.adresse1 === '')) {
            this.setState({obligatoireadresse: '', adressecolor: 'grey'});
        }
        if (!(this.state.ville1 === '')) {
            this.setState({obligatoireville: '', villecolor: 'grey'});
        }

    };
    onedit = () => {
        if (this.state.pass1 !== '') {
            this.setState({obligatoirepass1: '', pass1barcolor: 'grey'});
        }
        if (this.state.pass2 !== '') {
            this.setState({obligatoirepass2: '', pass2barcolor: 'grey'});
        }
        if (this.state.pass3 !== '') {
            this.setState({obligatoirepass3: '', pass3barcolor: 'grey'});
        }
    };
    onreset = () => {
        {
            this.setState({obligatoirepass1: '', pass1barcolor: 'grey',pass1 : ''});
        }
        {
            this.setState({obligatoirepass2: '', pass2barcolor: 'grey',pass2 : ''});
        }
        {
            this.setState({obligatoirepass3: '', pass3barcolor: 'grey',pass3 : ''});
        }
    };

        render() {

        return (

            <View style={stylesh.container}>

                <Header style={
                    stylesh.cont
                } >
                <Left><TouchableOpacity
            onPress={() => this.props.navigation.goBack()}

        >
        <Icon name="arrow-back" size={25}/>
        </TouchableOpacity>
        </Left>
        <Body>
        <Title style={stylesh.title}>Paramètres</Title>
        </Body>
        <Right />
        </Header>
                <View style={styles.maincontainer}>

                    <ScrollView >
                        { this.state.open0?
                            <TouchableOpacity onPress={async ()=>
                            {
                                await this.setState({open0:!this.state.open0,nom1:this.state.nom,prenom1:this.state.prenom,adresse1:this.state.adresse,ville1:this.state.ville});
                                this.onedit0();
                                if(this.state.ville !=='')
                                {
                                    this.setState({openville:true})
                                }else {
                                    this.setState({openville:false})
                                }
                                if(this.state.adresse !=='')
                                {
                                    this.setState({openadress:true})
                                }else {
                                    this.setState({openadress:false})
                                }
                            }

                            } style={styles.container}>
                                <View style={{ marginLeft: screenWidth / 50, backgroundColor:'transparent',height:20,width:20, marginTop:screenheight/70}}>

                                    <Svg
                                        viewBox="0 0 64 64" width={25} height={25}
                                    >
                                        <Path d="M15.82 45h8.36l1.41-7.04-5.09 2.91a1.044 1.044 0 01-1 0l-5.09-2.91zM28 21v-7.24l-9.93-2.7-6.07 2.6V21a8 8 0 0016 0zm-11-2h-2v-2h2zm8 0h-2v-2h2z" fill={'black'}/>
                                        <Path d="M10 13a1 1 0 01.61-.92l7-3a.969.969 0 01.65-.04l11 3A.985.985 0 0130 13v.59l1-1V11a7.008 7.008 0 00-7-7h-8a7.008 7.008 0 00-7 7v1.59l1 1zM34.57 50.12l-2.69-2.69a.994.994 0 01-.09-1.32l1.49-1.91-2.4-.3a1.013 1.013 0 01-.88-1v-3.8a1.013 1.013 0 01.88-1l2.4-.3-.3-.38A4.755 4.755 0 0031 37h-3.18l-1.84 9.2a1 1 0 01-.98.8H15a1 1 0 01-.98-.8L12.18 37H9a5 5 0 00-5 5v12h32v-3.88l-.11.09a.994.994 0 01-1.32-.09z" fill={'black'}/>
                                        <Path d="M20 31a10.2 10.2 0 01-2-.2V33a1.014 1.014 0 01-.4.8l-2.78 2.09L20 38.85l5.18-2.96-2.78-2.09a1.014 1.014 0 01-.4-.8v-2.2a10.2 10.2 0 01-2 .2zM56.79 53.01a1.019 1.019 0 01.83-.69l2.38-.3v-2.04l-2.38-.3a1.019 1.019 0 01-.83-.69 4.26 4.26 0 00-.28-.7.982.982 0 01.11-1.04l1.47-1.89-1.45-1.45-1.89 1.47a.98.98 0 01-1.04.11 4.26 4.26 0 00-.7-.28 1.019 1.019 0 01-.69-.83l-.3-2.38H52v.9a1.013 1.013 0 01-.88 1l-2.4.3 1.47 1.88A5.293 5.293 0 0151 46a5 5 0 11-5 5 5.293 5.293 0 01.08-.81l-1.88-1.47-.3 2.4a1.013 1.013 0 01-1 .88H42v.02l2.38.3a1.019 1.019 0 01.83.69 4.26 4.26 0 00.28.7.982.982 0 01-.11 1.04l-1.47 1.89 1.45 1.45 1.89-1.47a.982.982 0 011.04-.11 4.26 4.26 0 00.7.28 1.019 1.019 0 01.69.83l.3 2.38h2.04l.3-2.38a1.019 1.019 0 01.69-.83 4.26 4.26 0 00.7-.28.98.98 0 011.04.11l1.89 1.47 1.45-1.45-1.47-1.89a.982.982 0 01-.11-1.04 4.26 4.26 0 00.28-.7z" fill={'black'}/>
                                        <Circle cx={51} cy={51} r={3} fill={'black'}/>
                                        <Circle cx={41} cy={41} r={3} />
                                        <Path d="M42.32 47.63a.989.989 0 01.66-.82 7.758 7.758 0 00.72-.3.979.979 0 011.05.11l1.89 1.47 1.45-1.45-1.47-1.89a.979.979 0 01-.11-1.05c.11-.23.21-.47.3-.71a.984.984 0 01.82-.67l2.37-.3v-2.04l-2.37-.3a.984.984 0 01-.82-.67c-.09-.24-.19-.48-.3-.71a.979.979 0 01.11-1.05l1.47-1.89-1.45-1.45-1.89 1.47a.979.979 0 01-1.05.11c-.23-.11-.47-.21-.71-.3a1 1 0 01-.67-.82l-.3-2.37h-2.04l-.3 2.37a1 1 0 01-.67.82c-.24.09-.48.19-.71.3a.979.979 0 01-1.05-.11l-1.89-1.47-1.45 1.45 1.47 1.89a.979.979 0 01.11 1.05c-.11.23-.21.47-.3.71a.984.984 0 01-.82.67l-2.37.3v2.04l2.37.3a.984.984 0 01.82.67c.09.24.19.48.3.71a.979.979 0 01-.11 1.05l-1.47 1.89 1.45 1.45 1.89-1.47a.979.979 0 011.05-.11 7.758 7.758 0 00.72.3.989.989 0 01.66.82l.3 2.37h2.04zM36 41a5 5 0 115 5 5.006 5.006 0 01-5-5zM30 16v5h1a2 2 0 002-2v-1a2 2 0 00-2-2zM9 21h1v-5H9a2 2 0 00-2 2v1a2 2 0 002 2z" fill={'black'}/>
                                    </Svg>
                                </View>
                                <View style={styles.container2}>
                                    <Text style={styles.text01}>Modifier votre profil</Text>
                                    <Text style={styles.text00}>{longtextprofil}</Text>

                                </View>
                                <View style={styles.container3}>
                                    <Svg
                                        width="20px"
                                        height="20px"
                                        viewBox="0 0 255 255"
                                        xmlSpace="preserve"
                                        enableBackground="new 0 0 255 255"
                                    >
                                        <Path d="M0 63.75L127.5 191.25 255 63.75z" fill={'black'}/>
                                    </Svg>

                                </View>
                            </TouchableOpacity>
                            :
                            !this.state.facebookcnx?
                                <TouchableOpacity onPress={()=>this.setState({open0:!this.state.open0})} style={styles.containersecond0}>
                                    <View style={{ marginLeft: screenWidth / 50, backgroundColor:'transparent',height:20,width:20, marginTop:screenheight/70}}>
                                        <Svg
                                            viewBox="0 0 64 64" width={25} height={25}
                                        >
                                            <Path d="M15.82 45h8.36l1.41-7.04-5.09 2.91a1.044 1.044 0 01-1 0l-5.09-2.91zM28 21v-7.24l-9.93-2.7-6.07 2.6V21a8 8 0 0016 0zm-11-2h-2v-2h2zm8 0h-2v-2h2z" fill={'black'}/>
                                            <Path d="M10 13a1 1 0 01.61-.92l7-3a.969.969 0 01.65-.04l11 3A.985.985 0 0130 13v.59l1-1V11a7.008 7.008 0 00-7-7h-8a7.008 7.008 0 00-7 7v1.59l1 1zM34.57 50.12l-2.69-2.69a.994.994 0 01-.09-1.32l1.49-1.91-2.4-.3a1.013 1.013 0 01-.88-1v-3.8a1.013 1.013 0 01.88-1l2.4-.3-.3-.38A4.755 4.755 0 0031 37h-3.18l-1.84 9.2a1 1 0 01-.98.8H15a1 1 0 01-.98-.8L12.18 37H9a5 5 0 00-5 5v12h32v-3.88l-.11.09a.994.994 0 01-1.32-.09z" fill={'black'}/>
                                            <Path d="M20 31a10.2 10.2 0 01-2-.2V33a1.014 1.014 0 01-.4.8l-2.78 2.09L20 38.85l5.18-2.96-2.78-2.09a1.014 1.014 0 01-.4-.8v-2.2a10.2 10.2 0 01-2 .2zM56.79 53.01a1.019 1.019 0 01.83-.69l2.38-.3v-2.04l-2.38-.3a1.019 1.019 0 01-.83-.69 4.26 4.26 0 00-.28-.7.982.982 0 01.11-1.04l1.47-1.89-1.45-1.45-1.89 1.47a.98.98 0 01-1.04.11 4.26 4.26 0 00-.7-.28 1.019 1.019 0 01-.69-.83l-.3-2.38H52v.9a1.013 1.013 0 01-.88 1l-2.4.3 1.47 1.88A5.293 5.293 0 0151 46a5 5 0 11-5 5 5.293 5.293 0 01.08-.81l-1.88-1.47-.3 2.4a1.013 1.013 0 01-1 .88H42v.02l2.38.3a1.019 1.019 0 01.83.69 4.26 4.26 0 00.28.7.982.982 0 01-.11 1.04l-1.47 1.89 1.45 1.45 1.89-1.47a.982.982 0 011.04-.11 4.26 4.26 0 00.7.28 1.019 1.019 0 01.69.83l.3 2.38h2.04l.3-2.38a1.019 1.019 0 01.69-.83 4.26 4.26 0 00.7-.28.98.98 0 011.04.11l1.89 1.47 1.45-1.45-1.47-1.89a.982.982 0 01-.11-1.04 4.26 4.26 0 00.28-.7z" fill={'black'}/>
                                            <Circle cx={51} cy={51} r={3} fill={'black'}/>
                                            <Circle cx={41} cy={41} r={3} />
                                            <Path d="M42.32 47.63a.989.989 0 01.66-.82 7.758 7.758 0 00.72-.3.979.979 0 011.05.11l1.89 1.47 1.45-1.45-1.47-1.89a.979.979 0 01-.11-1.05c.11-.23.21-.47.3-.71a.984.984 0 01.82-.67l2.37-.3v-2.04l-2.37-.3a.984.984 0 01-.82-.67c-.09-.24-.19-.48-.3-.71a.979.979 0 01.11-1.05l1.47-1.89-1.45-1.45-1.89 1.47a.979.979 0 01-1.05.11c-.23-.11-.47-.21-.71-.3a1 1 0 01-.67-.82l-.3-2.37h-2.04l-.3 2.37a1 1 0 01-.67.82c-.24.09-.48.19-.71.3a.979.979 0 01-1.05-.11l-1.89-1.47-1.45 1.45 1.47 1.89a.979.979 0 01.11 1.05c-.11.23-.21.47-.3.71a.984.984 0 01-.82.67l-2.37.3v2.04l2.37.3a.984.984 0 01.82.67c.09.24.19.48.3.71a.979.979 0 01-.11 1.05l-1.47 1.89 1.45 1.45 1.89-1.47a.979.979 0 011.05-.11 7.758 7.758 0 00.72.3.989.989 0 01.66.82l.3 2.37h2.04zM36 41a5 5 0 115 5 5.006 5.006 0 01-5-5zM30 16v5h1a2 2 0 002-2v-1a2 2 0 00-2-2zM9 21h1v-5H9a2 2 0 00-2 2v1a2 2 0 002 2z" fill={'black'}/>
                                        </Svg>
                                    </View>
                                    <View style={styles.container2}>
                                        <Text style={styles.text01}>Modifier votre profil{'\n'}</Text>
                                        <Text style={styles.text00}>{longtextprofil}</Text>

                                        <TextInput
                                            defaultValue={this.state.nom}
                                            onEndEditing={() => this.onedit0()}
                                            onChangeText={(value)=>this.setState({nom1:value})}
                                            placeholder={'Nom'}
                                            style={{     width: screenWidth / 1.5,
                                                height: 50,
                                                color: '#000',
                                                marginTop: screenheight / 30,
                                                alignSelf: 'flex-start',
                                                alignItems: 'flex-start',
                                                justifyContent: 'flex-start',
                                                borderColor:this.state.nombarcolor,
                                                borderWidth: 1,
                                                fontSize: 16,
                                                fontFamily: 'roboto-regular',
                                                lineHeight: 16,
                                                textAlign: 'auto',}}
                                        />
                                        <Text
                                            style={{
                                                color: 'red',
                                                alignSelf: 'flex-end',
                                                width: screenWidth / 4,
                                                fontSize: 12,
                                            }}>
                                            {this.state.obligatoirenom}
                                        </Text>

                                        <TextInput
                                            defaultValue={this.state.prenom}
                                            onEndEditing={() => this.onedit0()}
                                            onChangeText={(value)=>this.setState({prenom1:value})}
                                            placeholder={'Prénom'}
                                            style={{
                                                width: screenWidth / 1.5,
                                                height: 50,
                                                color: '#000',
                                                marginTop: screenheight / 30,
                                                alignSelf: 'flex-start',
                                                alignItems: 'flex-start',
                                                justifyContent: 'flex-start',
                                                borderColor:this.state.prenombarcolor,
                                                borderWidth: 1,
                                                fontSize: 16,
                                                fontFamily: 'roboto-regular',
                                                lineHeight: 16,
                                                textAlign: 'auto',}}
                                        />
                                        <Text
                                            style={{
                                                color: 'red',
                                                alignSelf: 'flex-end',
                                                width: screenWidth / 4,
                                                fontSize: 12,
                                            }}>
                                            {this.state.obligatoireprenom}
                                        </Text>


                                        {this.state.openville===true?
                                            <View style={{ marginTop: screenheight / 30, width: screenWidth / 1.5,
                                                height: 50,flexDirection:'row',alignItems:'center',justifyContent:'flex-start' ,borderColor:this.state.villecolor, borderWidth: 1,}}>
                                                <TextInput
                                                    defaultValue={this.state.ville}
                                                    onEndEditing={() => this.onedit0()}
                                                    onChangeText={(value)=>this.setState({ville1:value})}
                                                    placeholder={'Ville'}
                                                    style={{
                                                        color: '#000',
                                                        alignSelf: 'flex-start',
                                                        alignItems: 'flex-start',
                                                        justifyContent: 'flex-start',
                                                        fontSize: 16,
                                                        fontFamily: 'roboto-regular',
                                                        lineHeight: 16,
                                                        textAlign: 'auto',
                                                        width: screenWidth / 1.7}}
                                                />
                                                <TouchableOpacity onPress={()=>this.setState({openville:false})}>
                                                    <Svg height={15} viewBox="0 0 512.001 512.001" width={15} >
                                                        <Path d="M512.001 84.853L427.148 0 256.001 171.147 84.853 0 0 84.853 171.148 256 0 427.148l84.853 84.853 171.148-171.147 171.147 171.147 84.853-84.853L340.853 256z " fill={'black'}/>
                                                    </Svg>
                                                </TouchableOpacity>
                                            </View>
                                            :
                                            <TouchableOpacity
                                                style={styles.touchableadd} onPress={()=>this.setState({openville:true})}>
                                                <Svg height={25} viewBox="-50 0 600.556 515.556" width={25}  >
                                                    <Path d="M257.778 0C115.641 0 0 115.641 0 257.778s115.641 257.778 257.778 257.778 257.778-115.641 257.778-257.778S399.914 0 257.778 0zm128.889 290H290v96.667h-64.444V290h-96.667v-64.444h96.667v-96.667H290v96.667h96.667z" fill={'black'}/>
                                                </Svg>
                                                <Text style={{ fontSize: 16,
                                                    fontFamily: 'roboto-regular',
                                                    lineHeight: 16,marginLeft:screenWidth/30}}>Ajouter votre ville</Text>
                                            </TouchableOpacity>
                                        }
                                        {this.state.openadress===true?
                                            <View style={{ marginTop: screenheight / 30, width: screenWidth / 1.5,
                                                height: 50,flexDirection:'row',alignItems:'center',justifyContent:'flex-start' ,borderColor:this.state.adressecolor, borderWidth: 1,}}>
                                                <TextInput
                                                    defaultValue={this.state.adresse}
                                                    onChangeText={(value)=>this.setState({adresse1:value})}   placeholder={'Adresse'}
                                                    style={{
                                                        color: '#000',
                                                        alignSelf: 'flex-start',
                                                        alignItems: 'flex-start',
                                                        justifyContent: 'flex-start',
                                                        fontSize: 16,
                                                        fontFamily: 'roboto-regular',
                                                        lineHeight: 16,
                                                        textAlign: 'auto',
                                                        width: screenWidth / 1.7}}
                                                />
                                                <TouchableOpacity onPress={()=>this.setState({openadress:false})}>
                                                    <Svg height={15} viewBox="0 0 512.001 512.001" width={15} >
                                                        <Path d="M512.001 84.853L427.148 0 256.001 171.147 84.853 0 0 84.853 171.148 256 0 427.148l84.853 84.853 171.148-171.147 171.147 171.147 84.853-84.853L340.853 256z " fill={'black'}/>
                                                    </Svg>
                                                </TouchableOpacity>
                                            </View>
                                            :
                                            <TouchableOpacity
                                                style={styles.touchableadd} onPress={()=>this.setState({openadress:true})}>
                                                <Svg height={25} viewBox="-50 0 600.556 515.556" width={25}  >
                                                    <Path d="M257.778 0C115.641 0 0 115.641 0 257.778s115.641 257.778 257.778 257.778 257.778-115.641 257.778-257.778S399.914 0 257.778 0zm128.889 290H290v96.667h-64.444V290h-96.667v-64.444h96.667v-96.667H290v96.667h96.667z" fill={'black'}/>
                                                </Svg>
                                                <Text style={{ fontSize: 16,
                                                    fontFamily: 'roboto-regular',
                                                    lineHeight: 16,marginLeft:screenWidth/30}}>Ajouter votre adresse</Text>
                                            </TouchableOpacity>
                                        }

                                        <View style={styles.containerbuttons}>
                                            <TouchableOpacity  onPress={async () =>{
                                                await this.verify0();



                                            } } style={styles.buttoncont0}>
                                                <Text style={styles.text} >Enregistrer</Text>
                                            </TouchableOpacity>

                                        </View>
                                    </View>
                                    <View style={styles.container3}>
                                        <Svg
                                            width="25px"
                                            height="25px"
                                            viewBox="0 0 255 255"
                                            xmlSpace="preserve"
                                            enableBackground="new 0 0 255 255"
                                        >
                                            <Path d="M106.667 53.333L0 160 213.333 160z" fill={'black'} />
                                        </Svg>

                                    </View>

                                </TouchableOpacity>
                                :

                                <TouchableOpacity onPress={()=>this.setState({open0:!this.state.open0})} style={styles.containerthird}>

                                    <View style={{ marginLeft: screenWidth / 50, backgroundColor:'transparent',height:20,width:20, marginTop:screenheight/70}}>
                                        <Svg
                                            viewBox="0 0 64 64" width={25} height={25}
                                        >
                                            <Path d="M15.82 45h8.36l1.41-7.04-5.09 2.91a1.044 1.044 0 01-1 0l-5.09-2.91zM28 21v-7.24l-9.93-2.7-6.07 2.6V21a8 8 0 0016 0zm-11-2h-2v-2h2zm8 0h-2v-2h2z" fill={'black'}/>
                                            <Path d="M10 13a1 1 0 01.61-.92l7-3a.969.969 0 01.65-.04l11 3A.985.985 0 0130 13v.59l1-1V11a7.008 7.008 0 00-7-7h-8a7.008 7.008 0 00-7 7v1.59l1 1zM34.57 50.12l-2.69-2.69a.994.994 0 01-.09-1.32l1.49-1.91-2.4-.3a1.013 1.013 0 01-.88-1v-3.8a1.013 1.013 0 01.88-1l2.4-.3-.3-.38A4.755 4.755 0 0031 37h-3.18l-1.84 9.2a1 1 0 01-.98.8H15a1 1 0 01-.98-.8L12.18 37H9a5 5 0 00-5 5v12h32v-3.88l-.11.09a.994.994 0 01-1.32-.09z" fill={'black'}/>
                                            <Path d="M20 31a10.2 10.2 0 01-2-.2V33a1.014 1.014 0 01-.4.8l-2.78 2.09L20 38.85l5.18-2.96-2.78-2.09a1.014 1.014 0 01-.4-.8v-2.2a10.2 10.2 0 01-2 .2zM56.79 53.01a1.019 1.019 0 01.83-.69l2.38-.3v-2.04l-2.38-.3a1.019 1.019 0 01-.83-.69 4.26 4.26 0 00-.28-.7.982.982 0 01.11-1.04l1.47-1.89-1.45-1.45-1.89 1.47a.98.98 0 01-1.04.11 4.26 4.26 0 00-.7-.28 1.019 1.019 0 01-.69-.83l-.3-2.38H52v.9a1.013 1.013 0 01-.88 1l-2.4.3 1.47 1.88A5.293 5.293 0 0151 46a5 5 0 11-5 5 5.293 5.293 0 01.08-.81l-1.88-1.47-.3 2.4a1.013 1.013 0 01-1 .88H42v.02l2.38.3a1.019 1.019 0 01.83.69 4.26 4.26 0 00.28.7.982.982 0 01-.11 1.04l-1.47 1.89 1.45 1.45 1.89-1.47a.982.982 0 011.04-.11 4.26 4.26 0 00.7.28 1.019 1.019 0 01.69.83l.3 2.38h2.04l.3-2.38a1.019 1.019 0 01.69-.83 4.26 4.26 0 00.7-.28.98.98 0 011.04.11l1.89 1.47 1.45-1.45-1.47-1.89a.982.982 0 01-.11-1.04 4.26 4.26 0 00.28-.7z" fill={'black'}/>
                                            <Circle cx={51} cy={51} r={3} fill={'black'}/>
                                            <Circle cx={41} cy={41} r={3} />
                                            <Path d="M42.32 47.63a.989.989 0 01.66-.82 7.758 7.758 0 00.72-.3.979.979 0 011.05.11l1.89 1.47 1.45-1.45-1.47-1.89a.979.979 0 01-.11-1.05c.11-.23.21-.47.3-.71a.984.984 0 01.82-.67l2.37-.3v-2.04l-2.37-.3a.984.984 0 01-.82-.67c-.09-.24-.19-.48-.3-.71a.979.979 0 01.11-1.05l1.47-1.89-1.45-1.45-1.89 1.47a.979.979 0 01-1.05.11c-.23-.11-.47-.21-.71-.3a1 1 0 01-.67-.82l-.3-2.37h-2.04l-.3 2.37a1 1 0 01-.67.82c-.24.09-.48.19-.71.3a.979.979 0 01-1.05-.11l-1.89-1.47-1.45 1.45 1.47 1.89a.979.979 0 01.11 1.05c-.11.23-.21.47-.3.71a.984.984 0 01-.82.67l-2.37.3v2.04l2.37.3a.984.984 0 01.82.67c.09.24.19.48.3.71a.979.979 0 01-.11 1.05l-1.47 1.89 1.45 1.45 1.89-1.47a.979.979 0 011.05-.11 7.758 7.758 0 00.72.3.989.989 0 01.66.82l.3 2.37h2.04zM36 41a5 5 0 115 5 5.006 5.006 0 01-5-5zM30 16v5h1a2 2 0 002-2v-1a2 2 0 00-2-2zM9 21h1v-5H9a2 2 0 00-2 2v1a2 2 0 002 2z" fill={'black'}/>
                                        </Svg>
                                    </View>
                                    <View style={styles.container2}>
                                        <Text style={styles.text01}>Changer le mot de passe {'\n'}</Text>

                                        <ImageBackground
                                            source={require('../../assets/images/fb.png')}
                                            style={{height:screenWidth/3,width:screenWidth/3,marginBottom:30,marginTop:10,marginLeft:screenWidth/4.5}}/>
                                        <Text style={styles.text00center}>{longtextfb0}</Text>

                                    </View>

                                    <View style={styles.container3}>
                                        <Svg
                                            width="25px"
                                            height="25px"
                                            viewBox="0 0 255 255"
                                            xmlSpace="preserve"
                                            enableBackground="new 0 0 255 255"
                                        >
                                            <Path d="M106.667 53.333L0 160 213.333 160z" fill={'black'} />
                                        </Svg>

                                    </View>

                                </TouchableOpacity>
                        }


                        { this.state.open1?
                            <TouchableOpacity onPress={()=>this.setState({open1:!this.state.open1})} style={styles.container}>
                                <View style={{ marginLeft: screenWidth / 50, backgroundColor:'transparent',height:20,width:20, marginTop:screenheight/70}}>

                                    <Svg
                                        x="0px"
                                        y="0px"
                                        viewBox="0 0 512.002 512.002"
                                        xmlSpace="preserve"
                                        enableBackground="new 0 0 512.002 512.002"
                                    >
                                        <Circle cx={364} cy={140.062} r={32} fill={'black'} />
                                        <Path d="M506.478 165.937c-10.68-27.194-30.264-66.431-62.915-98.927-32.535-32.384-71.356-51.408-98.194-61.666-29.464-11.261-62.945-4.163-85.295 18.082l-78.538 78.17c-23.281 23.171-29.991 58.825-16.698 88.72a369.522 369.522 0 0013.395 27.103L5.858 389.793A20 20 0 000 403.936v88c0 11.046 8.954 20 20 20h88c11.046 0 20-8.954 20-20v-36l36-.001c11.046 0 20-8.954 20-20v-35.999h36c11.046 0 20-8.954 20-20s-8.954-20-20-20h-56c-11.046 0-20 8.954-20 20v35.999l-36 .001c-11.046 0-20 8.954-20 20v36H40V412.22l177.355-177.354a20 20 0 002.958-24.517c-6.931-11.424-13.298-23.632-18.923-36.285-6.599-14.841-3.237-32.57 8.366-44.119l78.537-78.169c11.213-11.159 28.011-14.718 42.798-9.068 23.222 8.876 56.69 25.214 84.256 52.652 27.735 27.604 44.62 61.567 53.9 85.197a39.716 39.716 0 01-8.965 42.687l-79.486 79.114c-11.575 11.519-28.851 14.887-44.016 8.58-12.507-5.202-24.62-11.382-36-18.367-9.413-5.778-21.729-2.83-27.507 6.584-5.778 9.414-2.831 21.73 6.583 27.508 13.152 8.072 27.136 15.207 41.562 21.207 30.142 12.539 64.525 5.8 87.595-17.161l79.486-79.113c22.545-22.439 29.602-56.062 17.979-85.659z" fill={'black'}/>
                                    </Svg>
                                </View>
                                <View style={styles.container2}>
                                    <Text style={styles.text01}>Changer le mot de passe</Text>
                                    <Text style={styles.text00}>{longtext}</Text>

                                </View>
                                <View style={styles.container3}>
                                    <Svg
                                        width="20px"
                                        height="20px"
                                        viewBox="0 0 255 255"
                                        xmlSpace="preserve"
                                        enableBackground="new 0 0 255 255"
                                    >
                                        <Path d="M0 63.75L127.5 191.25 255 63.75z" fill={'black'}/>
                                    </Svg>

                                </View>
                            </TouchableOpacity>
                            :
                            !this.state.facebookcnx?
                                <TouchableOpacity onPress={()=>this.setState({open1:!this.state.open1})} style={styles.containersecond}>
                                    <View style={{ marginLeft: screenWidth / 50, backgroundColor:'transparent',height:20,width:20, marginTop:screenheight/70}}>
                                        <Svg
                                            x="0px"
                                            y="0px"
                                            viewBox="0 0 512.002 512.002"
                                            xmlSpace="preserve"
                                            enableBackground="new 0 0 512.002 512.002"
                                        >
                                            <Circle cx={364} cy={140.062} r={32} fill={'black'} />
                                            <Path d="M506.478 165.937c-10.68-27.194-30.264-66.431-62.915-98.927-32.535-32.384-71.356-51.408-98.194-61.666-29.464-11.261-62.945-4.163-85.295 18.082l-78.538 78.17c-23.281 23.171-29.991 58.825-16.698 88.72a369.522 369.522 0 0013.395 27.103L5.858 389.793A20 20 0 000 403.936v88c0 11.046 8.954 20 20 20h88c11.046 0 20-8.954 20-20v-36l36-.001c11.046 0 20-8.954 20-20v-35.999h36c11.046 0 20-8.954 20-20s-8.954-20-20-20h-56c-11.046 0-20 8.954-20 20v35.999l-36 .001c-11.046 0-20 8.954-20 20v36H40V412.22l177.355-177.354a20 20 0 002.958-24.517c-6.931-11.424-13.298-23.632-18.923-36.285-6.599-14.841-3.237-32.57 8.366-44.119l78.537-78.169c11.213-11.159 28.011-14.718 42.798-9.068 23.222 8.876 56.69 25.214 84.256 52.652 27.735 27.604 44.62 61.567 53.9 85.197a39.716 39.716 0 01-8.965 42.687l-79.486 79.114c-11.575 11.519-28.851 14.887-44.016 8.58-12.507-5.202-24.62-11.382-36-18.367-9.413-5.778-21.729-2.83-27.507 6.584-5.778 9.414-2.831 21.73 6.583 27.508 13.152 8.072 27.136 15.207 41.562 21.207 30.142 12.539 64.525 5.8 87.595-17.161l79.486-79.113c22.545-22.439 29.602-56.062 17.979-85.659z" fill={'black'}/>
                                        </Svg>
                                    </View>
                                    <View style={styles.container2}>
                                        <Text style={styles.text01}>Changer le mot de passe {'\n'}</Text>
                                        <Text style={styles.text00}>{longtext}</Text>

                                        <TextInput secureTextEntry={true}
                                                   defaultValue={this.state.pass1}
                                                   onEndEditing={() => this.onedit()}
                                                   onChangeText={async (value)=>{

                                                       await  this.setState({pass1:value});
                                                       this.comparepassword();


                                                   }}
                                                   placeholder={'Mot de passe actuel'}
                                                   style={{     width: screenWidth / 1.5,
                                                       height: 50,
                                                       color: '#000',
                                                       marginTop: screenheight / 30,
                                                       alignSelf: 'flex-start',
                                                       alignItems: 'flex-start',
                                                       justifyContent: 'flex-start',
                                                       borderColor:this.state.pass1barcolor,
                                                       borderWidth: 1,
                                                       fontSize: 16,
                                                       fontFamily: 'roboto-regular',
                                                       lineHeight: 16,
                                                       textAlign: 'auto',}}
                                        />
                                        <Text
                                            style={{
                                                color: 'red',
                                                alignSelf: 'flex-end',
                                                width: screenWidth / 4,
                                                fontSize: 12,
                                            }}>
                                            {this.state.obligatoirepass1}
                                        </Text>
                                        <TextInput secureTextEntry={true}
                                                   defaultValue={this.state.pass2}
                                                   onEndEditing={() => this.onedit()}
                                                   onChangeText={(value)=>this.setState({pass2:value})}      placeholder={'Nouveau mot de passe'}
                                                   style={{    width: screenWidth / 1.5,
                                                       height: 50,
                                                       color: '#000',
                                                       marginTop: screenheight / 30,
                                                       alignSelf: 'flex-start',
                                                       alignItems: 'flex-start',
                                                       justifyContent: 'flex-start',
                                                       borderColor:this.state.pass2barcolor,
                                                       borderWidth: 1,
                                                       fontSize: 16,
                                                       fontFamily: 'roboto-regular',
                                                       lineHeight: 16,
                                                       textAlign: 'auto',}}
                                        />
                                        <Text
                                            style={{
                                                color: 'red',
                                                alignSelf: 'flex-end',
                                                width: screenWidth / 4,
                                                fontSize: 12,
                                            }}>
                                            {this.state.obligatoirepass2}
                                        </Text>

                                        <TextInput secureTextEntry={true}
                                                   defaultValue={this.state.pass3}
                                                   onEndEditing={() => this.onedit()}
                                                   onChangeText={(value)=>{
                                                       this.setState({pass3:value})


                                                   }}   placeholder={'Confirmer nouveau mot de passe'}
                                                   style={{    width: screenWidth / 1.5,
                                                       height: 50,
                                                       color: '#000',
                                                       marginTop: screenheight / 30,
                                                       alignSelf: 'flex-start',
                                                       alignItems: 'flex-start',
                                                       justifyContent: 'flex-start',
                                                       borderColor:this.state.pass3barcolor,
                                                       borderWidth: 1,
                                                       fontSize: 16,
                                                       fontFamily: 'roboto-regular',
                                                       lineHeight: 16,
                                                       textAlign: 'auto',}}
                                        />
                                        <Text
                                            style={{
                                                color: 'red',
                                                alignSelf: 'flex-end',
                                                width: screenWidth / 4,
                                                fontSize: 12,
                                            }}>
                                            {this.state.obligatoirepass3}
                                        </Text>
                                        <View style={styles.containerbuttons}>
                                            <TouchableOpacity  onPress={ () =>{

                                                this.verify()

                                            } } style={styles.buttoncont}>
                                                <Text style={styles.text} >Enregistrer</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity  onPress={() => this.onreset()} style={styles.buttoncont}>
                                                <Text style={styles.text}>Réinitialiser</Text>
                                            </TouchableOpacity>


                                        </View>
                                        <TouchableOpacity onPress={()=>

                                            this.props.navigation.navigate("Oblier")
                                        }>
                                            <Text style={styles.motdepasseoublie}>
                                                Mot de passe oublié ?
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.container3}>
                                        <Svg
                                            width="25px"
                                            height="25px"
                                            viewBox="0 0 255 255"
                                            xmlSpace="preserve"
                                            enableBackground="new 0 0 255 255"
                                        >
                                            <Path d="M106.667 53.333L0 160 213.333 160z" fill={'black'} />
                                        </Svg>

                                    </View>

                                </TouchableOpacity>
                                :

                                <TouchableOpacity onPress={()=>this.setState({open1:!this.state.open1})} style={styles.containerthird}>

                                    <View style={{ marginLeft: screenWidth / 50, backgroundColor:'transparent',height:20,width:20, marginTop:screenheight/70}}>
                                        <Svg
                                            x="0px"
                                            y="0px"
                                            viewBox="0 0 512.002 512.002"
                                            xmlSpace="preserve"
                                            enableBackground="new 0 0 512.002 512.002"
                                        >
                                            <Circle cx={364} cy={140.062} r={32} fill={'black'} />
                                            <Path d="M506.478 165.937c-10.68-27.194-30.264-66.431-62.915-98.927-32.535-32.384-71.356-51.408-98.194-61.666-29.464-11.261-62.945-4.163-85.295 18.082l-78.538 78.17c-23.281 23.171-29.991 58.825-16.698 88.72a369.522 369.522 0 0013.395 27.103L5.858 389.793A20 20 0 000 403.936v88c0 11.046 8.954 20 20 20h88c11.046 0 20-8.954 20-20v-36l36-.001c11.046 0 20-8.954 20-20v-35.999h36c11.046 0 20-8.954 20-20s-8.954-20-20-20h-56c-11.046 0-20 8.954-20 20v35.999l-36 .001c-11.046 0-20 8.954-20 20v36H40V412.22l177.355-177.354a20 20 0 002.958-24.517c-6.931-11.424-13.298-23.632-18.923-36.285-6.599-14.841-3.237-32.57 8.366-44.119l78.537-78.169c11.213-11.159 28.011-14.718 42.798-9.068 23.222 8.876 56.69 25.214 84.256 52.652 27.735 27.604 44.62 61.567 53.9 85.197a39.716 39.716 0 01-8.965 42.687l-79.486 79.114c-11.575 11.519-28.851 14.887-44.016 8.58-12.507-5.202-24.62-11.382-36-18.367-9.413-5.778-21.729-2.83-27.507 6.584-5.778 9.414-2.831 21.73 6.583 27.508 13.152 8.072 27.136 15.207 41.562 21.207 30.142 12.539 64.525 5.8 87.595-17.161l79.486-79.113c22.545-22.439 29.602-56.062 17.979-85.659z" fill={'black'}/>
                                        </Svg>
                                    </View>
                                    <View style={styles.container2}>
                                        <Text style={styles.text01}>Changer le mot de passe {'\n'}</Text>

                                        <ImageBackground
                                            source={require('../../assets/images/fb.png')}
                                            style={{height:screenWidth/3,width:screenWidth/3,marginBottom:30,marginTop:10,marginLeft:screenWidth/4.5}}/>
                                        <Text style={styles.text00center}>{longtextfb}</Text>

                                    </View>

                                    <View style={styles.container3}>
                                        <Svg
                                            width="25px"
                                            height="25px"
                                            viewBox="0 0 255 255"
                                            xmlSpace="preserve"
                                            enableBackground="new 0 0 255 255"
                                        >
                                            <Path d="M106.667 53.333L0 160 213.333 160z" fill={'black'} />
                                        </Svg>

                                    </View>

                                </TouchableOpacity>
                        }


                        {this.state.open2 ?
                            <TouchableOpacity onPress={() => this.setState({open2: !this.state.open2})}
                                              style={styles.container}>
                                <View style={{
                                    marginLeft: screenWidth / 50,
                                    backgroundColor: 'transparent',
                                    height: 20,
                                    width: 20,
                                    marginTop: screenheight / 70
                                }}>

                                    <Svg   width="90px"
                                           height="90px"
                                           viewBox="0 0 255 255"
                                           xmlSpace="preserve"
                                           enableBackground="new 0 0 255 255">
                                        <Path d="M18 29c-2.757 0-5 2.243-5 5 0 1.579.753 3.062 2 3.996V44h6v-6.004A5.006 5.006 0 0023 34c0-2.757-2.243-5-5-5zm1.501 7.593l-.501.289V42h-2v-5.118l-.501-.289A2.997 2.997 0 0115 34c0-1.654 1.346-3 3-3s3 1.346 3 3a2.997 2.997 0 01-1.499 2.593z" fill={"black"} />
                                        <Path d="M27.236 41.764A16.794 16.794 0 0029 34.292v-7.14l-1.903-.316A19.6 19.6 0 0118.6 23.2l-.6-.45-.6.45a19.6 19.6 0 01-8.496 3.636L7 27.152v7.14c0 2.58.61 5.164 1.764 7.472a16.826 16.826 0 007.472 7.473l1.764.881 1.764-.882a16.814 16.814 0 007.472-7.472zM18 47.882l-.87-.435a14.81 14.81 0 01-6.578-6.578A14.79 14.79 0 019 34.292v-5.444l.232-.039A21.604 21.604 0 0018 25.234a21.604 21.604 0 008.768 3.575l.232.039v5.444c0 2.271-.537 4.546-1.553 6.577a14.81 14.81 0 01-6.578 6.578z" fill={"black"}/>
                                        <Path d="M63 1H25v6h-6v11.5l-1-.75L15 20a15.589 15.589 0 01-6.753 2.891L3 23.763v10.529c0 2.943.699 5.653 2.267 8.789a20.854 20.854 0 009.262 9.262l1.314.657H6c-2.757 0-5 2.243-5 5s2.243 5 5 5h20.236l4.001-2H57v-6h6zM27 3h34v28c0-2.607-1.673-4.824-4-5.65V7H27zm28 38h-4c-2.206 0-4-1.794-4-4h2.184A2.996 2.996 0 0052 39h2a2.996 2.996 0 002.816-2H59c0 2.206-1.794 4-4 4zm4-10h-2.184A2.996 2.996 0 0054 29h-2a2.996 2.996 0 00-2.816 2H47c0-2.206 1.794-4 4-4h4c2.206 0 4 1.794 4 4zm-4.287 5.698A.995.995 0 0154 37h-2a.995.995 0 01-.713-.302C52.296 36.215 53 35.192 53 34s-.704-2.215-1.713-2.698A.995.995 0 0152 31h2c.279 0 .531.116.713.302C53.704 31.785 53 32.808 53 34s.704 2.214 1.713 2.698zM42 35a1.001 1.001 0 010-2h8a1.001 1.001 0 010 2zm-9-.708V33h3a1.001 1.001 0 010 2h-3zm4.287-2.99A.995.995 0 0138 31h2c.279 0 .531.116.713.302C39.704 31.785 39 32.808 39 34s.704 2.214 1.713 2.698A.995.995 0 0140 37h-2a.995.995 0 01-.713-.302C38.296 36.215 39 35.192 39 34s-.704-2.215-1.713-2.698zM42.816 31A2.996 2.996 0 0040 29h-2a2.996 2.996 0 00-2.816 2H33c0-2.206 1.794-4 4-4h4c2.206 0 4 1.794 4 4zm-7.632 6A2.996 2.996 0 0038 39h2a2.996 2.996 0 002.816-2H45c0 2.206-1.794 4-4 4h-4c-2.206 0-4-1.794-4-4zM56 35a1.001 1.001 0 010-2h5v2zM21 9h34v16h-4a5.998 5.998 0 00-5 2.69A5.996 5.996 0 0041 25h-4a5.97 5.97 0 00-4 1.54v-2.778l-5.246-.872A15.574 15.574 0 0121 20zM7.056 42.187C5.615 39.305 5 36.944 5 34.292v-8.834l3.576-.595a17.579 17.579 0 007.625-3.264l1.8-1.35 1.8 1.35a17.572 17.572 0 007.626 3.264l3.573.595v8.834c0 2.84-.584 5.274-1.895 7.895a18.827 18.827 0 01-8.366 8.366l-2.659 1.329-2.658-1.328a18.84 18.84 0 01-8.366-8.367zM11 61H9v-6h2zm2-2h11v2H13zm11-2H13v-2h11zM3 58c0-1.654 1.346-3 3-3h1v6H6c-1.654 0-3-1.346-3-3zm23 2.882v-5.764l4.658 2.329a.616.616 0 010 1.106zM55 59H32.778A2.6 2.6 0 0033 58c0-.998-.555-1.895-1.447-2.342L26.236 53h-5.918l1.317-.658A20.842 20.842 0 0032.03 40.358 6 6 0 0037 43h4a5.998 5.998 0 005-2.69A5.996 5.996 0 0051 43h4zm6-6h-4V42.65c2.327-.826 4-3.043 4-5.65z" fill={"black"}/>
                                        <Path d="M35 57h18V45H35zm16-2.414L43.414 47h2.172L51 52.414zM48.586 55h-2.172l-8-8h2.172zm-5 0h-2.172L37 50.586v-2.172zM37 53.414L38.586 55H37zm14-3.828L48.414 47H51zM23 13h14v2H23zM39 13h14v2H39zM23 17h14v2H23zM39 17h14v2H39zM39 21h2v2h-2zM43 21h2v2h-2zM47 21h2v2h-2zM51 21h2v2h-2z" fill={"black"} />
                                    </Svg>
                                </View>
                                <View style={styles.container2}>
                                    <Text style={styles.text01}>Politique de Confidentialité</Text>
                                    <Text style={styles.text00}>Bienvenue sur l' application AlloDoctor</Text>

                                </View>
                                <View style={styles.container3}>
                                    <Svg
                                        width="20px"
                                        height="20px"
                                        viewBox="0 0 255 255"
                                        xmlSpace="preserve"
                                        enableBackground="new 0 0 255 255"
                                    >
                                        <Path d="M0 63.75L127.5 191.25 255 63.75z" fill={'black'}/>
                                    </Svg>

                                </View>
                            </TouchableOpacity> :
                            <TouchableOpacity onPress={()=>this.setState({open2:!this.state.open2})} style={styles.containersecond2}>
                                <View style={{ marginLeft: screenWidth / 50, backgroundColor:'transparent',height:20,width:20, marginTop:screenheight/70}}>
                                    <Svg   width="90px"
                                           height="90px"
                                           viewBox="0 0 255 255"
                                           xmlSpace="preserve"
                                           enableBackground="new 0 0 255 255">
                                        <Path d="M18 29c-2.757 0-5 2.243-5 5 0 1.579.753 3.062 2 3.996V44h6v-6.004A5.006 5.006 0 0023 34c0-2.757-2.243-5-5-5zm1.501 7.593l-.501.289V42h-2v-5.118l-.501-.289A2.997 2.997 0 0115 34c0-1.654 1.346-3 3-3s3 1.346 3 3a2.997 2.997 0 01-1.499 2.593z" fill={"black"} />
                                        <Path d="M27.236 41.764A16.794 16.794 0 0029 34.292v-7.14l-1.903-.316A19.6 19.6 0 0118.6 23.2l-.6-.45-.6.45a19.6 19.6 0 01-8.496 3.636L7 27.152v7.14c0 2.58.61 5.164 1.764 7.472a16.826 16.826 0 007.472 7.473l1.764.881 1.764-.882a16.814 16.814 0 007.472-7.472zM18 47.882l-.87-.435a14.81 14.81 0 01-6.578-6.578A14.79 14.79 0 019 34.292v-5.444l.232-.039A21.604 21.604 0 0018 25.234a21.604 21.604 0 008.768 3.575l.232.039v5.444c0 2.271-.537 4.546-1.553 6.577a14.81 14.81 0 01-6.578 6.578z" fill={"black"}/>
                                        <Path d="M63 1H25v6h-6v11.5l-1-.75L15 20a15.589 15.589 0 01-6.753 2.891L3 23.763v10.529c0 2.943.699 5.653 2.267 8.789a20.854 20.854 0 009.262 9.262l1.314.657H6c-2.757 0-5 2.243-5 5s2.243 5 5 5h20.236l4.001-2H57v-6h6zM27 3h34v28c0-2.607-1.673-4.824-4-5.65V7H27zm28 38h-4c-2.206 0-4-1.794-4-4h2.184A2.996 2.996 0 0052 39h2a2.996 2.996 0 002.816-2H59c0 2.206-1.794 4-4 4zm4-10h-2.184A2.996 2.996 0 0054 29h-2a2.996 2.996 0 00-2.816 2H47c0-2.206 1.794-4 4-4h4c2.206 0 4 1.794 4 4zm-4.287 5.698A.995.995 0 0154 37h-2a.995.995 0 01-.713-.302C52.296 36.215 53 35.192 53 34s-.704-2.215-1.713-2.698A.995.995 0 0152 31h2c.279 0 .531.116.713.302C53.704 31.785 53 32.808 53 34s.704 2.214 1.713 2.698zM42 35a1.001 1.001 0 010-2h8a1.001 1.001 0 010 2zm-9-.708V33h3a1.001 1.001 0 010 2h-3zm4.287-2.99A.995.995 0 0138 31h2c.279 0 .531.116.713.302C39.704 31.785 39 32.808 39 34s.704 2.214 1.713 2.698A.995.995 0 0140 37h-2a.995.995 0 01-.713-.302C38.296 36.215 39 35.192 39 34s-.704-2.215-1.713-2.698zM42.816 31A2.996 2.996 0 0040 29h-2a2.996 2.996 0 00-2.816 2H33c0-2.206 1.794-4 4-4h4c2.206 0 4 1.794 4 4zm-7.632 6A2.996 2.996 0 0038 39h2a2.996 2.996 0 002.816-2H45c0 2.206-1.794 4-4 4h-4c-2.206 0-4-1.794-4-4zM56 35a1.001 1.001 0 010-2h5v2zM21 9h34v16h-4a5.998 5.998 0 00-5 2.69A5.996 5.996 0 0041 25h-4a5.97 5.97 0 00-4 1.54v-2.778l-5.246-.872A15.574 15.574 0 0121 20zM7.056 42.187C5.615 39.305 5 36.944 5 34.292v-8.834l3.576-.595a17.579 17.579 0 007.625-3.264l1.8-1.35 1.8 1.35a17.572 17.572 0 007.626 3.264l3.573.595v8.834c0 2.84-.584 5.274-1.895 7.895a18.827 18.827 0 01-8.366 8.366l-2.659 1.329-2.658-1.328a18.84 18.84 0 01-8.366-8.367zM11 61H9v-6h2zm2-2h11v2H13zm11-2H13v-2h11zM3 58c0-1.654 1.346-3 3-3h1v6H6c-1.654 0-3-1.346-3-3zm23 2.882v-5.764l4.658 2.329a.616.616 0 010 1.106zM55 59H32.778A2.6 2.6 0 0033 58c0-.998-.555-1.895-1.447-2.342L26.236 53h-5.918l1.317-.658A20.842 20.842 0 0032.03 40.358 6 6 0 0037 43h4a5.998 5.998 0 005-2.69A5.996 5.996 0 0051 43h4zm6-6h-4V42.65c2.327-.826 4-3.043 4-5.65z" fill={"black"}/>
                                        <Path d="M35 57h18V45H35zm16-2.414L43.414 47h2.172L51 52.414zM48.586 55h-2.172l-8-8h2.172zm-5 0h-2.172L37 50.586v-2.172zM37 53.414L38.586 55H37zm14-3.828L48.414 47H51zM23 13h14v2H23zM39 13h14v2H39zM23 17h14v2H23zM39 17h14v2H39zM39 21h2v2h-2zM43 21h2v2h-2zM47 21h2v2h-2zM51 21h2v2h-2z" fill={"black"} />
                                    </Svg>
                                </View>
                                <View style={styles.container2}>
                                    <Text style={styles.text01}>Politique de Confidentialité</Text>
                                    <Text style={styles.text02}>{longtext2}</Text>

                                </View>
                                <View style={styles.container3}>
                                    <Svg
                                        width="25px"
                                        height="25px"
                                        viewBox="0 0 255 255"
                                        xmlSpace="preserve"
                                        enableBackground="new 0 0 255 255"
                                    >
                                        <Path d="M106.667 53.333L0 160 213.333 160z" fill={'black'} />
                                    </Svg>

                                </View>
                            </TouchableOpacity>
                        }
                    </ScrollView>
                </View>

        </View>
        );
    }
}

const screenWidth = Math.round(Dimensions.get('window').width);
const screenheight = Math.round(Dimensions.get('window').height);
const stylesh =StyleSheet.create({


    container:{
        flex:1,
        backgroundColor: '#d2edf0',
    } ,
    text:{
        color:"#161924",
        fontSize: 20,
        fontWeight:"500",
    },cont:{
        backgroundColor: "#296E85",
    },title: {
        color: '#9a9a9a',
        fontWeight: 'bold',
    },
    col:{
        color: '#9a9a9a',
    },


});

const styles = StyleSheet.create({

    maincontainer:{
        flexDirection:'column',
        flex:1,
        backgroundColor:'#daeef0'
    },
    container: {
        width: screenWidth-10,
        alignSelf:'center',
        height: screenheight / 9,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        borderWidth: 0.8,
        borderColor: '#989898',
        marginVertical:screenheight/50,
        backgroundColor:'#c8dcde',
        shadowColor: '#296E85',
        shadowOffset: { width: 5, height:5},
        shadowOpacity: 2,
        shadowRadius: 5,
        elevation: 10,
    },
    containersecond0: {
        width: screenWidth-10,
        alignSelf:'center',
        height: screenheight / 1.3,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        borderWidth: 0.8,
        borderColor: '#989898',
        marginVertical:screenheight/50,
        backgroundColor:'#c8dcde',
        shadowColor: '#296E85',
        shadowOffset: { width: 5, height:5},
        shadowOpacity: 2,
        shadowRadius: 5,
        elevation: 10,
    },
    touchableadd:{
        backgroundColor:'#bbced0',
        width: screenWidth / 1.5,
        height: 50,
        color: '#000',
        marginTop: screenheight / 30,
        alignSelf: 'flex-start',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderColor:'grey',
        borderWidth: 0.3,
        flexDirection:'row',
    },

    containersecond: {
        width: screenWidth-10,
        alignSelf:'center',
        height: screenheight / 1.4,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        borderWidth: 0.8,
        borderColor: '#989898',
        marginVertical:screenheight/50,
        backgroundColor:'#c8dcde',
        shadowColor: '#296E85',
        shadowOffset: { width: 5, height:5},
        shadowOpacity: 2,
        shadowRadius: 5,
        elevation: 10,
    },
    containerthird: {
        width: screenWidth-10,
        alignSelf:'center',
        height: screenheight / 2,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        borderWidth: 0.8,
        borderColor: '#989898',
        marginVertical:screenheight/50,
        backgroundColor:'#c8dcde',
        shadowColor: '#296E85',
        shadowOffset: { width: 5, height:5},
        shadowOpacity: 2,
        shadowRadius: 5,
        elevation: 10,
    },
    containersecond2: {
        width: screenWidth-10,
        alignSelf:'center',
        height: screenheight / 3,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        borderWidth: 0.8,
        borderColor: '#989898',
        marginVertical:screenheight/50,
        backgroundColor:'#c8dcde',
        shadowColor: '#296E85',
        shadowOffset: { width: 5, height:5},
        shadowOpacity: 2,
        shadowRadius: 5,
        elevation: 10,
    },
    text00: {
        fontSize: screenWidth / 35,
        color: '#4c4c4c',

    },
    text00center: {
        fontSize: screenWidth / 25,
        color: '#4c4c4c',
        textAlign: 'center',
        marginLeft:screenWidth/20
    },
    text01: {
        fontSize: screenWidth / 23,
        color: '#2f2f2f',
        fontWeight:'bold'
    },
    text02: {
        fontSize: screenWidth / 25,
        color: '#4c4c4c',
        marginTop:screenheight/80,

    },

    container2: {
        flexDirection: 'column',
        marginTop: screenheight / 100,
        marginLeft: screenWidth / 50,
        width: screenWidth / 1.4,
    },
    container3: {
        flexDirection: 'column',
        marginTop: screenheight / 100,
        marginLeft: screenWidth / 10,
        marginRight: screenWidth / 15,
        width: 30,
        height: 30,

    },

    containerbuttons: {
        flexDirection: 'row',
        marginTop: screenheight / 30,
        width: screenWidth / 1.4,
        height: screenheight/10,
    },

    text: {
        fontSize: screenWidth / 25,
        color: '#4a4a4a',
        alignSelf: 'center',
        textAlign:'center',
    },

    timestyle: {
        fontSize: screenheight / 50,
        color: '#4a4a4a',
        alignSelf: 'flex-start',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    buttoncont: {
        width: screenWidth / 3,
        height: screenheight / 15,
        backgroundColor: '#8fc8d2',
        borderRadius: 14,
        fontSize: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: screenWidth/15
    },
    buttoncont0: {
        width: screenWidth / 2.2,
        height: screenheight / 15,
        backgroundColor: '#8fc8d2',
        borderRadius: 14,
        fontSize: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft:screenWidth/10
    },
    motdepasseoublie: {
        color: '#484848',
        fontSize: screenWidth / 30,
        alignSelf: 'center',
        textDecorationLine: 'underline',
    },

});
