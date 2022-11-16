import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';

const StartButton = props => {
  return (
    <View>
      <TouchableOpacity style={styles.button1}>
        <Text style={{fontSize: 24, alignSelf: 'center'}}>Start</Text>
      </TouchableOpacity>
    </View>
  );
};

export default StartButton;

const styles = StyleSheet.create({
  button1: {
    justifyContent: 'center',
    height: 50,
    width: 90,
    border: 5,
    borderRadius: 20,
    bordercolor: 'black',
    backgroundColor: '#31EE1E',
    marginRight: 80,
  },
});
