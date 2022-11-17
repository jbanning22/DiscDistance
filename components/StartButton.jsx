import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Geolocation from 'react-native-geolocation-service';

const StartButton = props => {
  //   const [startingLocation, setStartLocation] = useState({});
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
    marginRight: 60,
  },
});
