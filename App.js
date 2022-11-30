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
  const [startingLocation, setStartLocation] = useState(null);
  const [endingLocation, setEndLocation] = useState(null);
  const [endingDist, setEndingDist] = useState(null);
  const [presentLocation, setPresentLocation] = useState(null);

  useEffect(() => {
    if (presentLocation === null) {
      getPresentLocation();
    }
  }, [presentLocation]);

  function reset() {
    setStartLocation(null);
    setEndLocation(null);
    setEndingDist(null);
  }

  const getPresentLocation = () => {
    return Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        console.log(
          'getCurrentPosition latitude is: ',
          latitude,
          'longitude is: ',
          longitude,
        );
        setPresentLocation({latitude, longitude});
      },
      error => {
        console.log(
          'error.code: ',
          error.code,
          'error.message: ',
          error.message,
        );
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  function distance(lat2, lon2) {
    setEndLocation({lat2, lon2});
    console.log('startingLocation in distance method is', startingLocation);
    console.log('endingLocation in distance method is', endingLocation);
    const lat1 = startingLocation.latitude;
    const lon1 = startingLocation.longitude;
    if (lat1 === lat2 && lon1 === lon2) {
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
      <View style={styles.titleView}>
        <Text style={styles.titleStyle}>Measure your throw!</Text>
        <View>
          {presentLocation !== null && (
            <MapView
              mapType="satellite"
              followsUserLocation={true}
              showsUserLocation={true}
              style={styles.mapSizing}
              initialRegion={{
                latitude: presentLocation.latitude,
                longitude: presentLocation.longitude,
                latitudeDelta: 0.002,
                longitudeDelta: 0.002,
              }}>
              {startingLocation !== null && (
                <Marker
                  coordinate={{
                    latitude: startingLocation.latitude,
                    longitude: startingLocation.longitude,
                  }}
                />
              )}
              {endingLocation !== null && (
                <Marker
                  coordinate={{
                    latitude: endingLocation.latitude,
                    longitude: endingLocation.longitude,
                  }}
                />
              )}
            </MapView>
          )}
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <StartButton setStart={setStartLocation} />
        <Button title="reset" onPress={reset} />
        <EndButton
          calcDistance={distance}
          setEnd={setEndLocation}
          startingLocation={startingLocation}
        />
      </View>
      {endingDist !== null ? (
        <Text style={styles.distanceText}>{`${endingDist}ft`}</Text>
      ) : (
        <Text style={styles.distanceText2}>Good Job</Text>
      )}
      <View style={styles.lastView}>
        <Text style={styles.textStyle1}>
          All distances are accurate within 20ft.
        </Text>
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
    backgroundColor: '#9ED4C8',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  distanceText: {
    fontSize: 24,
    alignSelf: 'center',
    fontWeight: '500',
    color: '#090909',
  },
  buttonStyle: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 20,
  },
  distanceText2: {
    fontSize: 24,
    alignSelf: 'center',
    fontWeight: '500',
    color: '#9ED4C8',
  },
  textStyle1: {
    fontSize: 10,
  },
  lastView: {
    justifyContent: 'flex-end',
    marginTop: 15,
  },
  mapSizing: {
    height: '95%',
    width: '100%',
  },
  mapStyle: {
    flex: 2,
    justifyContent: 'center',
  },
  titleStyle: {
    fontSize: 34,
    color: '#3F64D7',
    fontFamily: 'Skia',
    alignSelf: 'center',
  },
  titleView: {
    flex: 2,
    justifyContent: 'flex-start',
  },
});
