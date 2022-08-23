import React, {Component} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {Dropdown} from 'react-native-material-dropdown';

class OuBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          value: 'Monastir',
          label: 'Monastir',
        },
        {
          value: 'Tunis',
          label: 'Tunis',
        },
        {
          value: 'Sousse',
          label: 'Sousse',
        },
        {
          value: 'Beja',
          label: 'Beja',
        },
        {
          value: 'Kef',
          label: 'Kef',
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
          label="Où  ?"
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
      height:60,
      flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width: screenWidth / 1.5,
    marginTop: screenheight / 2.7,
    marginBottom: screenheight / 2.7,
    borderRadius: 10,
  },
  dropdown: {
    width: '80%',
  },
});

export default OuBox;
