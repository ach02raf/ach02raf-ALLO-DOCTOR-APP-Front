import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';

export default class App extends Component {
  state = {
    pickedImage: require('../../assets/images/avatarpic.png'),
  };

  pickImageHandler = () => {
    ImagePicker.showImagePicker(
      {title: 'Choisir votre image', maxWidth: 800, maxHeight: 600},
      res => {
        if (res.didCancel) {
          console.log('fermé');
        } else if (res.error) {
          console.log('probleme', res.error);
        } else {
          this.setState({
            pickedImage: {uri: res.uri},
          });
        }
      },
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textStyle} />
        <View style={styles.placeholder}>
          <TouchableOpacity onPress={this.pickImageHandler}>
            <Image
              source={this.state.pickedImage}
              style={styles.previewImage}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  placeholder: {
    borderWidth: 1,
    borderColor: 'gray',
    height: 130,
    width: 130,
    borderRadius: 70,
    backgroundColor: '#d0f1f3',
  },
  button: {
    width: '80%',
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  previewImage: {
    width: '100%',
    height: '100%',
    borderRadius: 70,
  },
});
