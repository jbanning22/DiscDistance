import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';

const EndButton = props => {
  return (
    <View>
      <TouchableOpacity style={styles.button2}>
        <Text>End</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EndButton;

const styles = StyleSheet.create({
  button2: {
    border: 1,
    borderRadius: 2,
    bordercolor: 'black',
    backgroundColor: 'orange',
    paddingLeft: 15,
  },
});
