import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Geolocation from 'react-native-geolocation-service';

const EndButton = props => {
  const {setEnd, calcDistance} = props;

  const getEndingLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setEnd({latitude, longitude});
        if (latitude !== undefined && longitude !== undefined) {
          calcDistance(latitude, longitude);
        }
      },
      error => {
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  return (
    <View>
      <TouchableOpacity onPress={getEndingLocation} style={styles.button2}>
        <Text style={{fontSize: 24, alignSelf: 'center'}}>End</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EndButton;

const styles = StyleSheet.create({
  button2: {
    justifyContent: 'center',
    height: 50,
    width: 90,
    border: 1,
    borderRadius: 20,
    bordercolor: 'black',
    backgroundColor: '#EE611E',
    marginLeft: 80,
  },
});
