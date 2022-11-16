import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import StartButton from './components/StartButton';
import EndButton from './components/EndButton';

const App = () => {
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

      <View style={{justifyContent: 'flex-end'}}>
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
