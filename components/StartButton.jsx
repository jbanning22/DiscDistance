import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Geolocation from 'react-native-geolocation-service';

const StartButton = props => {
  const {setStart} = props;

  const getStartingLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        console.log(latitude, longitude);
        setStart({latitude, longitude});
      },
      error => {
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  return (
    <View>
      <TouchableOpacity onPress={getStartingLocation} style={styles.button1}>
        <Text style={styles.buttonText}>Start</Text>
      </TouchableOpacity>
    </View>
  );
};

export default StartButton;

const styles = StyleSheet.create({
  button1: {
    justifyContent: 'center',
    height: 40,
    width: 80,
    borderRadius: 10,
    backgroundColor: '#55D53E',
    marginRight: 40,
  },
  buttonText: {
    fontSize: 24,
    alignSelf: 'center',
    color: 'white',
  },
});
