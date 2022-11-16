import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';

const EndButton = props => {
  return (
    <View>
      <TouchableOpacity style={styles.button2}>
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
