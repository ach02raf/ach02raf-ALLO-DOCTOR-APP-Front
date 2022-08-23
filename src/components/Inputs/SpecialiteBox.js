import React, {Component} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {Dropdown} from 'react-native-material-dropdown';

class SpecialiteBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          value: 'Dentiste',
          label: 'Dentiste',
        },
        {
          value: 'Chirugien',
          label: 'Chirugien',
        },
        {
          value: 'Cardiologue',
          label: 'Cardiologue',
        },
        {
          value: 'Dermatologue',
          label: 'Dermatologue',
        },
        {
          value: 'Neurologue',
          label: 'Neurologue',
        },
      ],
      value: '',
    };
  }

  componentDidMount() {
    const value = this.state.data[0].value;
    this.setState({
      value,
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <Dropdown
          fontSize={screenWidth / 15}
          label="Spécialité"
          animationDuration={0}
          value={this.state.label}
          data={this.state.data}
          dropdownPosition={-5}
          itemCount={3}
          pickerStyle={{borderBottomColor: 'transparent', borderWidth: 0}}
          dropdownOffset={{top: 0, left: screenWidth / 100}}
          containerStyle={styles.dropdown}
          onChangeText={value => {
            this.setState({
              value,
            });
          }}
          labelFontSize={0}
        />
      </View>
    );
  }
}

const screenWidth = Math.round(Dimensions.get('window').width);
const screenheight = Math.round(Dimensions.get('window').height);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width: screenWidth / 1.5,
    height: 60,
    marginTop: screenheight / 2.7,
    marginBottom: screenheight / 2.7,
    borderRadius: 10,
  },
  dropdown: {
    width: '80%',
  },
});

export default SpecialiteBox;
