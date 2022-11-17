import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import StartButton from './components/StartButton';
import EndButton from './components/EndButton';
import Geolocation from 'react-native-geolocation-service';

const App = () => {
  const [startingLocation, setStartLocation] = useState({});
  const [endingLocation, setEndLocation] = useState({});
  const [endingDist, setEndingDist] = useState(null);

  function distance(lat2, lon2) {
    const lat1 = startingLocation.latitude;
    const lon1 = startingLocation.longitude;
    console.log('lon1', lon1);
    console.log('lat2', lat2);
    console.log('lon2', lon2);
    if (lat1 === endingLocation.latitude && lon1 === endingLocation.longitude) {
      setEndingDist(0);
    } else {
      let radlat1 = (Math.PI * lat1) / 180;
      let radlat2 = (Math.PI * lat2) / 180;
      let theta = lon1 - lon2;
      let radtheta = (Math.PI * theta) / 180;
      let dist =
        Math.sin(radlat1) * Math.sin(radlat2) +
        Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = (dist * 180) / Math.PI;
      dist = dist * 60 * 1.1515;
      dist = Math.round(dist * 5280);
      setEndingDist(dist);
    }
  }

  useEffect(() => {
    if (Platform.OS === 'ios') {
      Geolocation.requestAuthorization('always');
    }
  }, []);

  return (
    <SafeAreaView style={styles.box1}>
      <View style={{flex: 2, justifyContent: 'flex-start'}}>
        <Text style={{fontSize: 40, color: '#EEBA1E'}}>
          Measure your throw!
        </Text>
        <View style={{flex: 2, justifyContent: 'center'}}>
          {endingDist !== null && (
            <Text
              style={
                styles.distanceText
              }>{`You threw... ${endingDist}ft`}</Text>
          )}
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <StartButton setStart={setStartLocation} />
        <EndButton calcDistance={distance} setEnd={setEndLocation} />
      </View>
      <View style={{justifyContent: 'flex-end', marginTop: 15}}>
        <Text>All distances are accurate within 20ft.</Text>
      </View>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  box1: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  distanceText: {
    fontSize: 24,
    alignSelf: 'center',
    fontWeight: '500',
    color: '#1E94EE',
  },
});
