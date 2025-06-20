import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function GestureObject() {
  return (
    <View style={styles.inner}>
      <Text style={styles.text}>👆</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  inner: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  text: {
    fontSize: 40,
  },
});
