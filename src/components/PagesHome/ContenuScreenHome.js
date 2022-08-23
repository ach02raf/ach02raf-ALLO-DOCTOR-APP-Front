import React, {Component} from 'react';
import {
    Text,
    View,
    Dimensions,
    ImageBackground,
    TouchableOpacity,
    Platform,
    UIManager,
    LayoutAnimation,
    SafeAreaView,
    FlatList,
    Image,
    TouchableWithoutFeedback, Alert,
} from 'react-native';
import {Keyboard} from 'react-native';
import SearchBar from 'react-native-dynamic-search-bar';
import {CustomLayoutSpring} from 'react-native-animation-layout';
import GradientCard from 'react-native-gradient-card-view';
import {ScreenWidth} from '@freakycoder/react-native-helpers';
import styles from './Styles';
import Geolocation from '@react-native-community/geolocation';
import server from '../../server';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenheight = Math.round(Dimensions.get('window').height);


let staticData1 = [
    {
        _id: 1,
        nom: 'Cardiologue',
    },
    {
        _id: 2,
        nom: 'Churigien Esthetique',

    },
    {
        _id: 3,
        nom: 'Dentiste',

    },
    {
        _id: 4,
        nom: 'Dermatologue',

    },
    {
        _id: 5,
        nom: 'Gastro-entérologue',

    },
    {
        _id: 6,
        nom: 'Généraliste',

    },
    {
        _id: 7,
        nom: 'Gynécologue',

    },
    {
        _id: 8,
        nom: 'Néphrologue',

    },
    {
        _id: 9,
        nom: 'Neurologue',

    },
    {
        _id: 10,
        nom: 'Nutritionniste',

    },
    {
        _id: 11,
        nom: 'Ophtalmologue',

    },
    {
        _id: 12,
        nom: 'Oto-Rhino-Laryngologiste',

    },
    {
        _id: 13,
        nom: 'Pédiatre',

    },
    {
        _id: 14,
        nom: 'Pneumologue',

    },
    {
        _id: 15,
        nom: 'Psychiatre',

    },
    {
        _id: 16,
        nom: 'Psychothérapeute',

    },
    {
        _id: 17,
        nom: 'Radiologue',

    },
    {
        _id: 18,
        nom: 'Rhumatologue',

    },
    {
        _id: 19,
        nom: 'Sexologue',

    },
    {
        _id: 20,
        nom: 'Urologue',

    },
    {
        _id: 21,
        nom: 'Addictologue',

    },
    {
        _id: 22,
        nom: 'Algologue',

    },
    {
        _id: 23,
        nom: 'Andrologue',

    },
    {
        _id: 24,
        nom: 'Angiologue',

    },
    {
        _id: 25,
        nom: 'Biochimiste',

    },
    {
        _id: 26,
        nom: 'Biophysique',

    },
    {
        _id: 27,
        nom: 'Biologiste medical',

    },
    {
        _id: 28,
        nom: 'Cancérologue',

    },
    {
        _id: 29,
        nom: 'Chiugien cappillaire',

    },
    {
        _id: 30,
        nom: 'Churigien cardio-vasculaire',

    },
    {
        _id: 31,
        nom: 'Chirugien généraliste',

    },
    {
        _id: 32,
        nom: 'Chirugien d obésité',

    },
    {
        _id: 33,
        nom: 'Chirugien facial',

    },
    {
        _id: 34,
        nom: 'Chirugien pédiatrique',

    },
    {
        _id: 35,
        nom: 'Chirugien orthopédiste',

    },
    {
        _id: 36,
        nom: 'Chirugien plasticien',

    },
    {
        _id: 37,
        nom: 'Chirugien urologue',

    },
    {
        _id: 38,
        nom: 'Chirugien vasculaire',

    },
    {
        _id: 39,
        nom: 'Diabétologue',

    },
    {
        _id: 40,
        nom: 'Diététicien',

    },
    {
        _id: 41,
        nom: 'Endocrinologue',

    },
    {
        _id: 42,
        nom: 'Endodontiste',

    },
    {
        _id: 43,
        nom: 'Epidemiologiste',

    },
    {
        _id: 44,
        nom: 'Généticien',

    },
    {
        _id: 45,
        nom: 'Gériatre',

    },
    {
        _id: 46,
        nom: 'Hématlogue',

    },
    {
        _id: 47,
        nom: 'Hépatologue',

    },
    {
        _id: 48,
        nom: 'Kinésthérapeute',

    },
    {
        _id: 49,
        nom: 'Néonatologiste',

    },
    {
        _id: 50,
        nom: 'Neurochirugien',

    },
    {
        _id: 51,
        nom: 'Neuropsychiatre',

    },
    {
        _id: 52,
        nom: 'Oncologue',

    },
    {
        _id: 53,
        nom: 'Ostéopathe',

    },
    {
        _id: 54,
        nom: 'Parasitologiste',

    },
    {
        _id: 55,
        nom: 'Podologue',

    },
    {
        _id: 56,
        nom: 'Proctologue',

    },
    {
        _id: 57,
        nom: 'Psychanalyste',

    },
    {
        _id: 58,
        nom: 'Psychomotricien',

    },
    {
        _id: 59,
        nom: 'Réflexologue',

    },
    {
        _id: 60,
        nom: 'Sénologue',

    },
    {
        _id: 61,
        nom: 'Stomatologue',

    },
    {
        _id: 62,
        nom: 'Urodynamique',

    },


];
let staticData2 = [
    {
        _id: 1,
        nom: 'Monastir',
        subname: null,
    },
    {
        _id: 2,
        nom: 'Monastir',
        subname: 'Zéramdine',
    },

    {
        _id: 3,
        nom: 'Monastir',
        subname: 'Téboulba',
    },

    {
        _id: 4,
        nom: 'Monastir',
        subname: 'Sayada-Lamta-Bou-Hajar',
    },

    {
        _id: 5,
        nom: 'Monastir',
        subname: 'Sahline',
    },

    {
        _id: 6,
        nom: 'Monastir',
        subname: 'Ouerdanine',
    },

    {
        _id: 7,
        nom: 'Monastir',
        subname: 'Monastir',
    },

    {
        _id: 8,
        nom: 'Monastir',
        subname: 'Moknine',
    },

    {
        _id: 9,
        nom: 'Monastir',
        subname: 'Ksibet el-Médiouni',
    },

    {
        _id: 10,
        nom: 'Monastir',
        subname: 'Ksar Hellal',
    },

    {
        _id: 11,
        nom: 'Monastir',
        subname: 'Jemmal',
    },

    {
        _id: 12,
        nom: 'Monastir',
        subname: 'Beni Hassen',
    },

    {
        _id: 13,
        nom: 'Monastir',
        subname: 'Bembla',
    },

    {
        _id: 14,
        nom: 'Monastir',
        subname: 'Bekalta',
    },

    {
        _id: 15,
        nom: 'Ariana',
        subname: null,
    },
    {
        _id: 16,
        nom: 'Ariana',
        subname: 'Ariana',
    },
    {
        _id: 17,
        nom: 'Ariana',
        subname: 'Ettadhamen',
    },
    {
        _id: 18,
        nom: 'Ariana',
        subname: 'Kalâat el-Andalous',
    },
    {
        _id: 19,
        nom: 'Ariana',
        subname: 'La Soukra',
    },
    {
        _id: 20,
        nom: 'Ariana',
        subname: 'Mnihla',
    },
    {
        _id: 21,
        nom: 'Ariana',
        subname: 'Raoued',
    },
    {
        _id: 22,
        nom: 'Ariana',
        subname: 'Sidi Thabet',
    },

    {
        _id: 23,
        nom: 'Béja',
        subname: null,
    },
    {
        _id: 24,
        nom: 'Béja',
        subname: 'Béja Nord',
    },
    {
        _id: 25,
        nom: 'Béja',
        subname: 'Béja Sud',
    },
    {
        _id: 26,
        nom: 'Béja',
        subname: 'Amdoun',
    },
    {
        _id: 27,
        nom: 'Béja',
        subname: 'Goubellat',
    },
    {
        _id: 28,
        nom: 'Béja',
        subname: 'Medjez el-Bab',
    },
    {
        _id: 29,
        nom: 'Béja',
        subname: 'Nefza',
    },
    {
        _id: 30,
        nom: 'Béja',
        subname: 'Téboursouk',
    },
    {
        _id: 31,
        nom: 'Béja',
        subname: 'Testour',
    },
    {
        _id: 32,
        nom: 'Béja',
        subname: 'Thibar',
    },
    {
        _id: 33,
        nom: 'Ben Arous',
        subname: null,
    },
    {
        _id: 34,
        nom: 'Ben Arous',
        subname: 'Bou Mhel',
    },
    {
        _id: 35,
        nom: 'Ben Arous',
        subname: 'El Mourouj',
    },
    {
        _id: 36,
        nom: 'Ben Arous',
        subname: 'Ezzahra',
    },
    {
        _id: 37,
        nom: 'Ben Arous',
        subname: 'Fouchana',
    },
    {
        _id: 38,
        nom: 'Ben Arous',
        subname: 'Hammam Chott',
    },
    {
        _id: 39,
        nom: 'Ben Arous',
        subname: 'Hammam Lif',
    },
    {
        _id: 40,
        nom: 'Ben Arous',
        subname: 'Mohamedia',
    },
    {
        _id: 41,
        nom: 'Ben Arous',
        subname: 'Medina Jedida',
    },
    {
        _id: 42,
        nom: 'Ben Arous',
        subname: 'Mégrine',
    },
    {
        _id: 43,
        nom: 'Ben Arous',
        subname: 'Mornag',
    },
    {
        _id: 44,
        nom: 'Ben Arous',
        subname: 'Radés',
    },
    {
        _id: 45,
        nom: 'Bizerte',
        subname: null,
    },
    {
        _id: 46,
        nom: 'Bizerte',
        subname: 'Bizerte Nord',
    },
    {
        _id: 47,
        nom: 'Bizerte',
        subname: 'Bizerte Sud',
    },
    {
        _id: 48,
        nom: 'Bizerte',
        subname: 'El Alia',
    },
    {
        _id: 49,
        nom: 'Bizerte',
        subname: 'Ghar el melh',
    },
    {
        _id: 50,
        nom: 'Bizerte',
        subname: 'Ghezala',
    },
    {
        _id: 51,
        nom: 'Bizerte',
        subname: 'Joumine',
    },
    {
        _id: 52,
        nom: 'Bizerte',
        subname: 'Mateur',
    },
    {
        _id: 53,
        nom: 'Bizerte',
        subname: 'Menzel Bourgiba',
    },
    {
        _id: 54,
        nom: 'Bizerte',
        subname: 'Menzel Jemil',
    },
    {
        _id: 55,
        nom: 'Bizerte',
        subname: ' Ras jebel',
    },
    {
        _id: 56,
        nom: 'Bizerte',
        subname: 'Sejnane',
    },
    {
        _id: 57,
        nom: 'Bizerte',
        subname: 'Tinja',
    },
    {
        _id: 58,
        nom: 'Bizerte',
        subname: 'Utique',
    },
    {
        _id: 59,
        nom: 'Bizerte',
        subname: 'Zarzouna',
    },
    {
        _id: 60,
        nom: 'Gabès',
        subname: null,
    },
    {
        _id: 61,
        nom: 'Gabès',
        subname: 'Gabès Medina',
    },
    {
        _id: 62,
        nom: 'Gabès',
        subname: 'Gabès Ouest',
    },
    {
        _id: 63,
        nom: 'Gabès',
        subname: 'Gabès Sud',
    },
    {
        _id: 64,
        nom: 'Gabès',
        subname: 'Ghannouch',
    },
    {
        _id: 65,
        nom: 'Gabès',
        subname: 'El hamma',
    },
    {
        _id: 66,
        nom: 'Gabès',
        subname: 'Matmata',
    },
    {
        _id: 67,
        nom: 'Gabès',
        subname: 'Mareth',
    },
    {
        _id: 68,
        nom: 'Gabès',
        subname: 'Menzel el Habib',
    },
    {
        _id: 69,
        nom: 'Gabès',
        subname: 'Métouia',
    },
    {
        _id: 70,
        nom: 'Gabès',
        subname: 'Nouvelle Matmata',
    },
    {
        _id: 71,
        nom: 'Gafsa',
        subname: null,
    },
    {
        _id: 72,
        nom: 'Gafsa',
        subname: 'Gafsa Sud',
    },
    {
        _id: 73,
        nom: 'Gafsa',
        subname: 'Gafsa Nord',
    },
    {
        _id: 74,
        nom: 'Gafsa',
        subname: 'El ksar',
    },
    {
        _id: 75,
        nom: 'Gafsa',
        subname: 'El Guettar',
    },
    {
        _id: 76,
        nom: 'Gafsa',
        subname: 'Belkhir',
    },
    {
        _id: 77,
        nom: 'Gafsa',
        subname: 'Mdhilla',
    },
    {
        _id: 78,
        nom: 'Gafsa',
        subname: 'Métlaoui',
    },
    {
        _id: 79,
        nom: 'Gafsa',
        subname: 'Moularés',
    },
    {
        _id: 80,
        nom: 'Gafsa',
        subname: 'Redeyef',
    },
    {
        _id: 81,
        nom: 'Gafsa',
        subname: 'Sened',
    },
    {
        _id: 82,
        nom: 'Gafsa',
        subname: 'Sidi Aich',
    },
    {
        _id: 83,
        nom: 'Jendouba',
        subname: null,
    },
    {
        _id: 84,
        nom: 'Jendouba',
        subname: 'Jendouba Sud',
    },
    {
        _id: 85,
        nom: 'Jendouba',
        subname: 'Jendouba Nord',
    },
    {
        _id: 86,
        nom: 'Jendouba',
        subname: 'Oued Meliz',
    },
    {
        _id: 87,
        nom: 'Jendouba',
        subname: 'Tabarka',
    },
    {
        _id: 88,
        nom: 'Jendouba',
        subname: 'Ghardimou',
    },
    {
        _id: 89,
        nom: 'Jendouba',
        subname: 'Fernana',
    },
    {
        id: 90,
        nom: 'Jendouba',
        subname: 'Bousalem',
    },
    {
        _id: 91,
        nom: 'Jendouba',
        subname: 'Balta-Bou Aouane',
    },
    {
        _id: 92,
        nom: 'Jendouba',
        subname: 'Ain Drahem',
    },
    {
        _id: 93,
        nom: 'Kairouan',
        subname: null,
    },
    {
        _id: 94,
        nom: 'Kairouan',
        subname: 'Kairouan Nord',
    },
    {
        _id: 95,
        nom: 'Kairouan',
        subname: 'Kairouan Sud',
    },
    {
        _id: 96,
        nom: 'Kairouan',
        subname: 'Nassrallah',
    },
    {
        _id: 97,
        nom: 'Kairouan',
        subname: 'Ouiestalia',
    },
    {
        _id: 98,
        nom: 'Kairouan',
        subname: 'Sbikha',
    },
    {
        _id: 99,
        nom: 'Kairouan',
        subname: 'Hajeb el ayoun',
    },
    {
        _id: 1000,
        nom: 'Kairouan',
        subname: 'Haffouz',
    },
    {
        _id: 100,
        nom: 'Kairouan',
        subname: 'El alaa',
    },
    {
        _id: 101,
        nom: 'Kairouan',
        subname: 'Echrarda',
    },
    {
        _id: 102,
        nom: 'Kairouan',
        subname: 'Chebika',
    },
    {
        _id: 103,
        nom: 'Kairouan',
        subname: 'Bou Hajla',
    },
    {
        _id: 104,
        nom: 'Kasserine',
        subname: null,
    },
    {
        _id: 105,
        nom: 'Kasserine',
        subname: 'Kasserine Nord',
    },
    {
        _id: 106,
        nom: 'Kasserine',
        subname: 'Kasserine Sud',
    },
    {
        _id: 107,
        nom: 'Kasserine',
        subname: 'Majel bel Abbes',
    },
    {
        _id: 108,
        nom: 'Kasserine',
        subname: 'Sbeitla',
    },
    {
        _id: 109,
        nom: 'Kasserine',
        subname: 'Sbiba',
    },
    {
        _id: 110,
        nom: 'Kasserine',
        subname: 'Thala',
    },
    {
        _id: 111,
        nom: 'Kasserine',
        subname: 'Jadelienne',
    },
    {
        _id: 112,
        nom: 'Kasserine',
        subname: 'Hassi El Ferid',
    },
    {
        _id: 113,
        nom: 'Kasserine',
        subname: 'Haidra',
    },
    {
        _id: 114,
        nom: 'Kasserine',
        subname: 'Foussana',
    },
    {
        _id: 115,
        nom: 'Kasserine',
        subname: 'Feriana',
    },
    {
        _id: 116,
        nom: 'Kasserine',
        subname: 'Ezzouhour',
    },
    {
        _id: 117,
        nom: 'Kasserine',
        subname: 'El Ayoun',
    },
    {
        _id: 118,
        nom: 'Kébili',
        subname: null,
    },
    {
        _id: 119,
        nom: 'Kébili',
        subname: 'Kébili Nord',
    },
    {
        _id: 120,
        nom: 'Kébili',
        subname: 'Kébili Sud',
    },
    {
        _id: 121,
        nom: 'Kébili',
        subname: 'Souk Lahad',
    },
    {
        _id: 122,
        nom: 'Kébili',
        subname: 'Faouar',
    },
    {
        _id: 123,
        nom: 'Kébili',
        subname: 'Douz Nord',
    },
    {
        _id: 124,
        nom: 'Kébili',
        subname: 'Douz Sud',
    },
    {
        _id: 125,
        nom: 'Kef',
        subname: null,
    },
    {
        _id: 126,
        nom: 'Kef',
        subname: 'Kef Est',
    },
    {
        _id: 127,
        nom: 'Kef',
        subname: 'Kef Ouest',
    },
    {
        _id: 128,
        nom: 'Kef',
        subname: 'Nebeur',
    },
    {
        _id: 129,
        nom: 'Kef',
        subname: 'Sakiet Sidi Youssef',
    },
    {
        _id: 130,
        nom: 'Kef',
        subname: 'Tajerouine',
    },
    {
        _id: 131,
        nom: 'Kef',
        subname: 'Kalaat Senan',
    },
    {
        _id: 132,
        nom: 'Kef',
        subname: 'Kalaat Khsaba',
    },
    {
        _id: 133,
        nom: 'Kef',
        subname: 'Sers',
    },
    {
        _id: 134,
        nom: 'Kef',
        subname: 'El Ksour',
    },
    {
        _id: 135,
        nom: 'Kef',
        subname: 'Jérissa',
    },
    {
        _id: 136,
        nom: 'Kef',
        subname: 'Dahmani',
    },
    {
        _id: 137,
        nom: 'Mahdia',
        subname: null,
    },
    {
        _id: 138,
        nom: 'Mahdia',
        subname: 'Mahdia',
    },
    {
        _id: 139,
        nom: 'Mahdia',
        subname: 'Melloulèche',
    },
    {
        _id: 140,
        nom: 'Mahdia',
        subname: 'Ouled Chamekh',
    },
    {
        _id: 141,
        nom: 'Mahdia',
        subname: 'Sidi Alouane',
    },
    {
        _id: 142,
        nom: 'Mahdia',
        subname: 'Ksour Essef',
    },
    {
        _id: 143,
        nom: 'Mahdia',
        subname: 'Hebira',
    },
    {
        _id: 144,
        nom: 'Mahdia',
        subname: 'Essouassi',
    },
    {
        _id: 145,
        nom: 'Mahdia',
        subname: 'El jem',
    },
    {
        _id: 146,
        nom: 'Mahdia',
        subname: 'Charbane',
    },
    {
        _id: 147,
        nom: 'Mahdia',
        subname: 'Chebba',
    },
    {
        _id: 148,
        nom: 'Mahdia',
        subname: 'Bou Merdes',
    },
    {
        _id: 149,
        nom: 'Manouba',
        subname: null,
    },
    {
        _id: 150,
        nom: 'Manouba',
        subname: 'Manouba',
    },
    {
        _id: 152,
        nom: 'Manouba',
        subname: 'Oued Ellil',
    },
    {
        _id: 153,
        nom: 'Manouba',
        subname: 'Tebourba',
    },
    {
        _id: 154,
        nom: 'Manouba',
        subname: 'El batan',
    },
    {
        _id: 155,
        nom: 'Manouba',
        subname: 'Douar Hicher',
    },
    {
        _id: 156,
        nom: 'Manouba',
        subname: 'Djedeida',
    },
    {
        _id: 157,
        nom: 'Manouba',
        subname: 'Borj El Amri',
    },
    {
        _id: 158,
        nom: 'Médenine',
        subname: null,
    },
    {
        _id: 159,
        nom: 'Médenine',
        subname: 'Médenine Nord',
    },
    {
        _id: 160,
        nom: 'Médenine',
        subname: 'Médenine Sud',
    },
    {
        _id: 161,
        nom: 'Médenine',
        subname: 'Sidi Makhlouf',
    },
    {
        _id: 162,
        nom: 'Médenine',
        subname: 'Zarzis',
    },
    {
        _id: 163,
        nom: 'Médenine',
        subname: 'Djerba-Midoun',
    },
    {
        _id: 164,
        nom: 'Médenine',
        subname: 'Djerba-Houmet Skouk',
    },
    {
        _id: 165,
        nom: 'Médenine',
        subname: 'Djerba-Ajim',
    },
    {
        _id: 166,
        nom: 'Médenine',
        subname: 'Beni Khedache',
    },
    {
        _id: 167,
        nom: 'Médenine',
        subname: 'Ben Gardane',
    },

    {
        _id: 169,
        nom: 'Nabeul',
        subname: null,
    },
    {
        _id: 170,
        nom: 'Nabeul',
        subname: 'Nabeul',
    },
    {
        _id: 171,
        nom: 'Nabeul',
        subname: 'Beni Khalled',
    },
    {
        _id: 172,
        nom: 'Nabeul',
        subname: 'Beni Khiar',
    },
    {
        _id: 173,
        nom: 'Nabeul',
        subname: 'Bou Argoub',
    },
    {
        _id: 174,
        nom: 'Nabeul',
        subname: 'Dar Chaabane El Fehri',
    },
    {
        _id: 175,
        nom: 'Nabeul',
        subname: 'El Mida',
    },
    {
        _id: 176,
        nom: 'Nabeul',
        subname: 'Grombialia',
    },
    {
        _id: 177,
        nom: 'Nabeul',
        subname: 'Hammam Ghezèze',
    },
    {
        _id: 178,
        nom: 'Nabeul',
        subname: 'Hammamet',
    },
    {
        _id: 179,
        nom: 'Nabeul',
        subname: 'Kélibia',
    },
    {
        _id: 180,
        nom: 'Nabeul',
        subname: 'Korba',
    },
    {
        _id: 1000,
        nom: 'Nabeul',
        subname: 'Manzel Temime',
    },
    {
        _id: 181,
        nom: 'Nabeul',
        subname: 'MAnzel Bouzelfa',
    },
    {
        _id: 182,
        nom: 'Nabeul',
        subname: 'Soliman',
    },
    {
        _id: 183,
        nom: 'Nabeul',
        subname: 'Takelsa',
    },
    {
        _id: 184,
        nom: 'Sfax',
        subname: null,
    },
    {
        _id: 185,
        nom: 'Sfax',
        subname: 'Sfax',
    },

    {
        _id: 186,
        nom: 'Sfax',
        subname: 'Sfax Nord',
    },
    {
        _id: 187,
        nom: 'Sfax',
        subname: 'Sfax Sud',
    },
    {
        _id: 188,
        nom: 'Sfax',
        subname: 'Agareb',
    },
    {
        _id: 189,
        nom: 'Sfax',
        subname: 'Bir Ali Ben Khelifa',
    },
    {
        _id: 190,
        nom: 'Sfax',
        subname: 'El Amra',
    },
    {
        _id: 191,
        nom: 'Sfax',
        subname: 'Graiba',
    },
    {
        _id: 192,
        nom: 'Sfax',
        subname: 'Jebiniana',
    },
    {
        _id: 193,
        nom: 'Sfax',
        subname: 'Kerkennah',
    },
    {
        _id: 194,
        nom: 'Sfax',
        subname: 'Mahrès',
    },
    {
        _id: 195,
        nom: 'Sfax',
        subname: 'Sakiet Eddaier',
    },
    {
        _id: 196,
        nom: 'Sfax',
        subname: 'Sakiet Ezzit',
    },
    {
        _id: 197,
        nom: 'Sfax',
        subname: 'Thyna',
    },
    {
        _id: 198,
        nom: 'Sfax',
        subname: 'Skhira',
    },
    {
        _id: 199,
        nom: 'Sidi Bouzid',
        subname: null,
    },
    {
        _id: 200,
        nom: 'Sidi Bouzid',
        subname: 'Sidi Bouzid Ouest',
    },
    {
        _id: 201,
        nom: 'Sidi Bouzid',
        subname: 'Sidi Bouzid Est',
    },
    {
        _id: 202,
        nom: 'Sidi Bouzid',
        subname: 'Bir El Hafey',
    },
    {
        _id: 203,
        nom: 'Sidi Bouzid',
        subname: 'Cebbala Ouled Asker',
    },
    {
        _id: 204,
        nom: 'Sidi Bouzid',
        subname: 'Jilma',
    },
    {
        id: 205,
        nom: 'Sidi Bouzid',
        subname: 'Meknassy',
    },
    {
        _id: 206,
        nom: 'Sidi Bouzid',
        subname: 'Menzel Bouzaiane',
    },
    {
        _id: 207,
        nom: 'Sidi Bouzid',
        subname: 'Mezzouana',
    },
    {
        _id: 208,
        nom: 'Sidi Bouzid',
        subname: 'Oulled Haffouz',
    },
    {
        _id: 209,
        nom: 'Sidi Bouzid',
        subname: 'Regueb',
    },
    {
        _id: 210,
        nom: 'Sidi Bouzid',
        subname: 'Sidi Ali Ben Aoun',
    },
    {
        _id: 211,
        nom: 'Sidi Bouzid',
        subname: 'Souk Jedid',
    },
    {
        _id: 212,
        nom: 'Siliana',
        subname: null,
    },
    {
        _id: 213,
        nom: 'Siliana',
        subname: 'Siliana Nord',
    },
    {
        _id: 214,
        nom: 'Siliana',
        subname: 'Sialiana Sud',
    },
    {
        _id: 215,
        nom: 'Siliana',
        subname: 'Bargou',
    },
    {
        _id: 216,
        nom: 'Siliana',
        subname: 'Bou Arada',
    },
    {
        _id: 217,
        nom:'Siliana',
        subname: 'El Aroussa',
    },
    {
        _id: 218,
        nom: 'Siliana',
        subname: 'El Krib',
    },
    {
        _id: 219,
        nom: 'Siliana',
        subname: 'Gaafour',
    },
    {
        _id: 220,
        nom: 'Siliana',
        subname: 'Kesra',
    },
    {
        _id: 221,
        nom: 'Siliana',
        subname: 'Makthar',
    },
    {
        _id: 222,
        nom: 'Siliana',
        subname: 'Rouhia',
    },
    {
        _id: 223,
        nom: 'Siliana',
        subname: 'Sidi BouRouis',
    },
    {
        _id: 224,
        nom: 'Sousse',
        subname: null,
    },

    {
        _id: 225,
        nom: 'Sousse',
        subname: 'Medina',
    },
    {
        _id: 226,
        nom: 'Sousse',
        subname: 'Jawhara',
    },
    {
        _id: 227,
        nom: 'Sousse',
        subname: 'Riadh',
    },
    {
        _id: 228,
        nom: 'Sousse',
        subname: 'Sidi Abdelhamid',
    },
    {
        _id: 229,
        nom: 'Sousse',
        subname: 'Akouda',
    },
    {
        _id: 230,
        nom: 'Sousse',
        subname: 'Bouficha',
    },
    {
        _id: 231,
        nom: 'Sousse',
        subname: 'Enfida',
    },
    {
        _id: 232,
        nom: 'Sousse',
        subname: 'Hammam Sousse',
    },
    {
        _id: 233,
        nom: 'Sousse',
        subname: 'Hergla',
    },
    {
        _id: 234,
        nom: 'Sousse',
        subname: 'Kalaa Kebira',
    },
    {
        _id: 235,
        nom: 'Sousse',
        subname: 'Kalaa Seghira',
    },
    {
        _id: 236,
        nom: 'Sousse',
        subname: 'Kondar',
    },
    {
        _id: 237,
        nom: 'Sousse',
        subname: 'Msaken',
    },
    {
        _id: 238,
        nom: 'Sousse',
        subname: 'Sidi Bou Ali',
    },
    {
        _id: 239,
        nom: 'Sousse',
        subname: 'Sidi El Hani',
    },
    {
        _id: 240,
        nom: 'Tataouine',
        subname: null,
    },
    {
        _id: 241,
        nom: 'Tataouine',
        subname: 'Tataouine Nord',
    },
    {
        _id: 242,
        nom: 'Tataouine',
        subname: 'Tataouine Sud',
    },
    {
        _id: 243,
        nom: 'Tataouine',
        subname: 'Bir Lahmar',
    },
    {
        _id: 244,
        nom: 'Tataouine',
        subname: 'Dehiba',
    },
    {
        _id: 245,
        nom: 'Tataouine',
        subname: 'Ghomrassen',
    },
    {
        _id: 246,
        nom: 'Tataouine',
        subname: 'Remada',
    },
    {
        _id: 247,
        nom: 'Tataouine',
        subname: 'Smar',
    },
    {
        _id: 248,
        nom: 'Touzer',
        subname: null,
    },
    {
        _id: 249,
        nom: 'Touzer',
        subname: 'Touzer',
    },
    {
        _id: 250,
        nom: 'Touzer',
        subname: 'Degache',
    },
    {
        _id: 251,
        nom: 'Touzer',
        subname: 'Hazoua',
    },
    {
        _id: 252,
        nom: 'Touzer',
        subname: 'Nefta',
    },
    {
        _id: 253,
        nom: 'Touzer',
        subname: 'Tameghza',
    },
    {
        _id: 254,
        nom: 'Zaghouan',
        subname: null,
    },
    {
        _id: 255,
        nom: 'Zaghouan',
        subname: 'Zaghouan',
    },
    {
        _id: 256,
        nom: 'Zaghouan',
        subname: 'Bir Mcherga',
    },
    {
        _id: 257,
        nom: 'Zaghouan',
        subname: 'El Fahs',
    },
    {
        _id: 258,
        nom: 'Zaghouan',
        subname: 'Nadhour',
    },
    {
        _id: 259,
        nom: 'Zaghouan',
        subname: 'Saoauf',
    },
    {
        _id: 260,
        nom: 'Zaghouan',
        subname: 'Zriba',
    },
    {
        _id: 261,
        nom: 'Tunis',
        subname: null,
    },

    {
        _id: 262,
        nom: 'Tunis',
        subname: 'Medina',
    },
    {
        _id: 263,
        nom: 'Tunis',
        subname: 'Bab Bhar',
    },
    {
        _id: 264,
        nom: 'Tunis',
        subname: 'Bab Souika',
    },
    {
        _id: 265,
        nom: 'Tunis',
        subname: 'Cité el Khadhra',
    },
    {
        _id: 266,
        nom: 'Tunis',
        subname: 'Djebel Jelloud',
    },
    {
        _id: 267,
        nom: 'Tunis',
        subname: 'El Kabaria',
    },
    {
        _id: 268,
        nom: 'Tunis',
        subname: 'El Menzah',
    },
    {
        _id: 269,
        nom: 'Tunis',
        subname: 'El Omane',
    },
    {
        _id: 270,
        nom: 'Tunis',
        subname: 'El Omarane Supérieur',
    },
    {
        _id: 271,
        nom: 'Tunis',
        subname: 'El Ouadria',
    },
    {
        _id: 272,
        nom: 'Tunis',
        subname: 'Ettahrir',
    },
    {
        _id: 273,
        nom: 'Tunis',
        subname: 'Ezzouhour',
    },
    {
        _id: 274,
        nom: 'Tunis',
        subname: 'Hrairia',
    },
    {
        _id: 275,
        nom: 'Tunis',
        subname: 'La Goulette',
    },
    {
        _id: 276,
        nom: 'Tunis',
        subname: 'La Marsa',
    },
    {
        _id: 1000,
        nom: 'Tunis',
        subname: 'LE Bardo',
    },
    {
        _id: 277,
        nom: 'Tunis',
        subname: 'Le Kram',
    },
    {
        _id: 278,
        nom: 'Tunis',
        subname: 'Carthage',
    },
    {
        _id: 279,
        nom: 'Tunis',
        subname: 'Séjoumi',
    },
    {
        _id: 280,
        nom: 'Tunis',
        subname: 'Sidi El bachir',
    },
    {
        _id: 281,
        nom: 'Tunis',
        subname: 'Sidi Hassine',
    },
    {
        _id:282,
    nom:'Manouba',
    subname:'Mornaguia'
    }
];

export default class ContenuScreenHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            seed: 1,
            query: '',
            isLoading: true,
            refreshing: false,
            dataBackup: null,
            dataSource: null,
            visible: false,
            nbr: 0,
            staticData:[],
            text0:'',
            text1:'',
            text2:'',
            nbrr:null,
            nbrrr:null,
            initialPosition:'',

        };
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental &&
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }
    componentDidMount() {
        Geolocation.getCurrentPosition(
            async position => {
                await this.setState({initialPosition:position});

            },
            error => Alert.alert('Error', JSON.stringify(error)),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
        );

        fetch("http://"+server+"/finddoctor",{
            method:"GET",
            headers: {
                'Content-Type': 'application/json'
            },

        })
            .then(res=>res.json())
            .then( async (data)=>{
                await this.setState({staticData:data});


            })


    }

    filterList = (text,nbr) => {
        let newData;
        if(nbr===3)
        {
            newData = this.state.dataBackup.filter(item => {
                let itemData2=null;
                const itemData = item.nom.toLowerCase();
                item.subname !==null ?
                    itemData2 = item.subname.toLowerCase():null;
                if(itemData2===null)
                {
                    const textData = text.toLowerCase();
                    return itemData.indexOf(textData) > -1;
                }
                else
                {
                    const itemdata3=itemData+','+itemData2;
                    const textData = text.toLowerCase();
                    return itemdata3.indexOf(textData) > -1;
                }

            });
        } else {
            if (nbr === 1)
            {

                newData = this.state.dataBackup.filter(item => {

                    let itemData = item.nom.toLowerCase();
                    let  itemData2 = item.prenom.toLowerCase();
                        const itemdata3=itemData+' '+itemData2;
                        const textData = text.toLowerCase();
                        return itemdata3.indexOf(textData) > -1;


                });

            }
            else {
                newData = this.state.dataBackup.filter(item => {
                        const itemData = item.nom.toLowerCase();
                        const textData = text.toLowerCase();
                        return itemData.indexOf(textData) > -1;
                    }
                );
            }
        }
        LayoutAnimation.configureNext(CustomLayoutSpring(null, null, 'scaleXY'));
        this.setState({
            query: text,
            dataSource: newData,
        });
    };

    renderRightComponent = item => (
        <View style={styles.chartStyle}>
            <Image source={{uri:item.photo}} style={styles.chartStyle} />
        </View>
    );

    renderItem(item, nbr) {
        return nbr === 1 ? (
            <TouchableOpacity onPress={()=>{this.props.navigation.navigate("ProfilPraticien",{
                id:item._id,
                jours:item.timeplan.jours,
                plan:item.timeplan.plan,
                contact:item.contact,
                assurance:item.assurance,
                paiement:item.paiement,
                nom:item.nom,
                prenom:item.prenom,
                adresse:item.adresse,
                photo:item.photo,
                formation:item.formation,
                specialite:item.specialite,
                ville:item.ville,
                gov:item.gov,
                experience:item.experience,
                longitude:item.longtitude,
                latitude:item.latitude,
                initialPosition:this.state.initialPosition,
                rvd:item.rdvdoc,

            });}}>
                <View>
                    <GradientCard
                        titleStyle={{fontSize: screenWidth / 23, width: screenWidth / 3.4}}
                        key={item._id}
                        title = {(item.nom+item.prenom).length > 9?
                            (item.prenom+' '+item.nom).substring(0, 9) + '...'
                        :item.prenom+' '+item.nom}
                        subtitle={item.specialite}
                        style={styles.cardStyle}
                        width={ScreenWidth / 1.25}
                        height={screenheight / 12}
                        shadowStyle={styles.cardShadowStyle}
                        rightComponent={this.renderRightComponent(item)}
                        gradientColors={['white', 'white']}
                        borderRadius={5}
                    />

                </View>
            </TouchableOpacity>
        ) : nbr === 2 ? (
            <TouchableOpacity onPress={()=>{this.setState({text0:item.nom,nbrr:2,nbr:0})}}>
                <View>
                    <GradientCard
                        titleStyle={{
                            fontSize: screenWidth / 25,
                            marginTop: screenheight / 50,
                        }}
                        title={item.nom}
                        style={styles.cardStyle}
                        width={ScreenWidth / 1.25}
                        height={screenheight / 15}
                        shadowStyle={styles.cardShadowStyle}
                        gradientColors={['white', 'white']}
                        borderRadius={5}
                    />
                </View>
            </TouchableOpacity>
        ) : nbr === 3 ? (
            <TouchableOpacity onPress={()=>{item.subname !==null ? this.setState({text1:item.nom,text2:item.subname,nbrrr:3,nbr:0}):this.setState({text1:item.nom,text2:'',nbrrr:3,nbr:0})}}>
                <View>
                    <GradientCard
                        titleStyle={{
                            fontSize: screenWidth / 25,
                            marginTop: screenheight / 50,
                        }}

                        title={item.nom+ ( item.subname !==null ? ','+item.subname:'')}
                        style={styles.cardStyle}
                        width={ScreenWidth / 1.25}
                        height={screenheight / 15}
                        shadowStyle={styles.cardShadowStyle}
                        gradientColors={['white', 'white']}
                        borderRadius={5}
                    />
                </View>
            </TouchableOpacity>
        ) : null;
    }

    loadMore = () => {
        this.setState({
            page: this.state.page + 1,
        });
    };

    Search_barf(nbr, nom) {
        let z = null;
        let nbt;

        this.state.nbr !== 0 ? (nbt = screenWidth / 1.2) : 200;
        return (
            <SafeAreaView style={styles.safeAreaViewStyle}>
                <View
                    style={this.state.nbr === 0 ? styles.container : styles.container3}>
                    <SearchBar
                        width={nbt}
                        fontSize={25}
                        autoFocus={false}
                        fontColor="#c6c6c6"
                        iconColor="transparent"
                        shadowColor="#282828"
                        cancelIconColor="#c6c6c6"
                        placeholder={nom}
                        textInputValue={this.state.text0==='' ? null:  this.state.nbrr===nbr ?this.state.text0:this.state.text1===''? null :this.state.nbrrr===nbr ?this.state.text2 !=='' ?this.state.text1+','+this.state.text2:this.state.text1:null}
                        onChangeText={async text => {
                            nbr === 1 ? (z = this.state.staticData) :
                                nbr === 2 ? (z = staticData1) :
                                    nbr === 3 ? (z = staticData2)
                                    : null;
                            nbr === 2
                                ? ( this.setState({text0:text}))
                                : nbr === 3
                                ? ( this.setState({text1:text}))
                                : null;

                            await this.setState({
                                visible: true,
                                nbr: nbr,
                                dataSource: z,
                                dataBackup: z,

                            });
                            this.filterList(text,nbr);
                        }}
                        onPressCancel={() => {
                            this.filterList("");
                            this.setState({visible: false, nbr: 0});
                        }}
                    />

                    {this.state.visible === true ? (
                        <FlatList
                            overScrollMode={'always'}
                            scrollEnabled={true}
                            style={styles.flatListStyle}
                            data={this.state.dataSource}
                            onEndReached={this.loadMore}
                            renderItem={({item}) => this.renderItem(item, nbr)}
                        />
                    ) : null}
                </View>
            </SafeAreaView>
        );
    }
    render() {

        return (
            <TouchableWithoutFeedback
                onPress={() => {
                    this.setState({visible: false, nbr: 0});
                    {
                        Keyboard.dismiss(this);
                    }
                }}
                style={styles.maincontainer}>
                <ImageBackground
                    source={require('../../assets/images/newback3.png')}
                    style={styles.image}>
                    {this.state.nbr === 0 ? (
                        <View style={styles.thecontainer0}>
                            <Text style={styles.text}>
                                Trouvez un médecin et prenez un rendez-vous en ligne
                            </Text>
                        </View>
                    ) : null}

                    <View style={styles.inputs}>
                        {this.state.nbr === 0 || this.state.nbr === 1 ? (
                            <View style={this.state.nbr === 0 ? styles.thecontainer : styles.thecontainernew}>
                                {this.Search_barf(1, 'Qui ?')}
                            </View>
                        ) : null}

                        {this.state.nbr === 0 || this.state.nbr === 2 ? (
                            <View style={this.state.nbr === 0 ? styles.thecontainer : styles.thecontainernew}>
                                {this.Search_barf(2, 'Spécialité ?')}
                            </View>
                        ) : null}
                        {this.state.nbr === 0 || this.state.nbr === 3 ? (
                            <View style={this.state.nbr === 0 ? styles.thecontainer : styles.thecontainernew}>
                                {this.Search_barf(3, 'Ou ?')}
                            </View>
                        ) : null}
                    </View>

                    {this.state.nbr === 0 ? (
                        <View style={styles.thecontainer2}>
                            <TouchableOpacity style={styles.recherchebutton}

                                              onPress={()=>{

                                    this.state.text0 ==='' &&this.state.text1 ==='' ?

                                        Alert.alert('Error', JSON.stringify("Error"))

                                        :
                                        this.props.navigation.navigate("Recherche",{
                                            text0:this.state.text0,
                                            text1:this.state.text1,
                                            text2:this.state.text2,
                                            doctortab:this.state.staticData,
                                            initialPosition:this.state.initialPosition


                                        })}}


                            >
                                <Text style={styles.Mytext}>Rechercher</Text>
                            </TouchableOpacity>
                        </View>
                    ) : null}
                </ImageBackground>
            </TouchableWithoutFeedback>
        );
    }
}
