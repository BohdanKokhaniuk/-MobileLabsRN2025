import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function TaskItem({ task }) {
  return (
    <View style={[styles.item, task.done && styles.done]}>
      <Text style={styles.text}>{task.title}</Text>
      <Text style={styles.status}>{task.done ? '✅' : '⬜'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 10,
  },
  done: {
    backgroundColor: '#d4edda',
    borderColor: '#28a745',
  },
  text: {
    fontSize: 16,
  },
  status: {
    fontSize: 18,
  },
});
