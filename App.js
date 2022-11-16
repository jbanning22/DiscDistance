import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect} from 'react';
import StartButton from './components/StartButton';
import EndButton from './components/EndButton';
import Geolocation from 'react-native-geolocation-service';

const App = () => {
  useEffect(() => {
    if (Platform.OS === 'ios') {
      Geolocation.requestAuthorization('always');
    }
  }, []);

  return (
    <SafeAreaView style={styles.box1}>
      <View style={{flex: 2, justifyContent: 'flex-start'}}>
        <Text style={{fontSize: 40, color: '#1ECEEE'}}>
          Measure your throw!
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <StartButton />
        <EndButton />
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
});
