import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import StartButton from './components/StartButton';
import EndButton from './components/EndButton';
import Geolocation from 'react-native-geolocation-service';
import MapView, {Marker} from 'react-native-maps';

const App = () => {
  const [startingLocation, setStartLocation] = useState({});
  const [endingLocation, setEndLocation] = useState({});
  const [endingDist, setEndingDist] = useState(null);
  const [presentLocation, setPresentLocation] = useState(null);

  useEffect(() => {
    getPresentLocation();
  }, []);

  function reset() {
    setStartLocation({});
    setEndLocation({});
    setEndingDist(null);
  }

  const getPresentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        console.log(latitude, longitude);
        setPresentLocation({latitude, longitude});
      },
      error => {
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  function distance(lat2, lon2) {
    const lat1 = startingLocation.latitude;
    const lon1 = startingLocation.longitude;
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
        <View style={{flex: 2, justifyContent: 'center'}}></View>
        <View>
          {presentLocation !== null && (
            <MapView
              mapType="satellite"
              followsUserLocation={true}
              style={{height: '95%', width: '100%'}}
              initialRegion={{
                latitude: presentLocation.latitude,
                longitude: presentLocation.longitude,
                latitudeDelta: 0.002,
                longitudeDelta: 0.002,
              }}>
              {endingDist !== null && (
                <Text
                  style={
                    styles.distanceText
                  }>{`You threw... ${endingDist}ft`}</Text>
              )}
              <Marker
                coordinate={{
                  latitude: presentLocation.latitude,
                  longitude: presentLocation.longitude,
                }}>
                <Image
                  style={{width: 30, height: 30}}
                  source={require('./images/bluedotclearb.png')}
                />
              </Marker>
            </MapView>
          )}
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <StartButton setStart={setStartLocation} />
        <Button title="reset" onPress={reset} />
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
  buttonStyle: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 20,
  },
});
