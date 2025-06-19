import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Профіль</Text>
      <Text>Коханюк Богдан Богданович</Text>
      <Text>ІПЗ-23-4</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: 'center', justifyContent: 'center', flex: 1 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
});
