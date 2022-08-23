import React, {Component} from 'react';
import {View, Text, StyleSheet, Animated, Image} from 'react-native';
import Logo from '../../assets/images/Logo2.png';
import {LineDotsLoader} from 'react-native-indicator';
import AsyncStorage from '@react-native-community/async-storage';
class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {
      LogoAnime: new Animated.Value(0),
      LogoText: new Animated.Value(0),
      loadingSpinner: false,
      showME: true,
      showyou:'',
    };
  }
  componentDidMount() {
    const {LogoAnime, LogoText} = this.state;
    Animated.parallel([
      Animated.spring(LogoAnime, {
        toValue: 1,
        tension: 10,
        friction: 2,
        duration: 1000,
      }).start(),
      Animated.timing(LogoText, {
        toValue: 1,
        duration: 1400,
      }),
    ]).start(() => {
      this.setState({
        loadingSpinner: true,
      });
    });
    setTimeout(() => {
      this.setState({
        showME: false,
      });
    }, 2500);
    this.detectLogin().then(r =>('77'));
  }
  detectLogin= async ()=>{
    const token = await AsyncStorage.getItem('token');
       if(token){

         this.setState({showyou:'t'});
    }else{
         this.setState({showyou:'f'});
    }
  };

  render() {

    return this.state.showME ? (
      <View style={styles.container}>
        <Animated.View
          style={{
            opacity: this.state.LogoAnime,
            top: this.state.LogoAnime.interpolate({
              inputRange: [0, 1],
              outputRange: [80, 0],
            }),
          }}>
          <Image source={Logo} />
        </Animated.View>
        <Animated.View
          style={{
            opacity: this.state.LogoText,
          }}>
          <Text style={styles.logoText}>Loading</Text>
        </Animated.View>
        <LineDotsLoader color="#111" />
      </View>
    ) :
     this.state.showyou ==='t' ?
         this.props.navigation.navigate("DrawerNavigator")
    :
         this.props.navigation.navigate("Inscription")

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9EDAE4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    color: '#111',
    fontSize: 22,
    marginTop: 10,
    fontWeight: '300',
  },
});
export default Loading;
