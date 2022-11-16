import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';

const StartButton = props => {
  return (
    <View>
      <TouchableOpacity style={styles.button}>
        <Text>Start</Text>
      </TouchableOpacity>
    </View>
  );
};

export default StartButton;

const styles = StyleSheet.create({
  button1: {
    border: 1,
    borderRadius: 2,
    bordercolor: 'black',
    backgroundColor: 'green',
    paddingRight: 15,
  },
});
