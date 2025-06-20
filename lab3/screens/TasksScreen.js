import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import TaskItem from '../components/TaskItem';

export default function TasksScreen({ route }) {
  const { progress } = route.params;

  const tasks = [
    { id: '1', title: 'Зробити 10 кліків', done: progress.taps >= 10 },
    { id: '2', title: 'Зробити подвійний клік 5 разів', done: progress.doubleTaps >= 5 },
    { id: '3', title: 'Утримувати об\'єкт 3 секунди', done: progress.longPress },
    { id: '4', title: 'Перетягнути об\'єкт', done: progress.pan },
    { id: '5', title: 'Зробити свайп вправо', done: progress.flingRight },
    { id: '6', title: 'Зробити свайп вліво', done: progress.flingLeft },
    { id: '7', title: 'Змінити розмір об\'єкта', done: progress.pinch },
    { id: '8', title: 'Отримати 100 очок', done: progress.reached100 },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Завдання</Text>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TaskItem task={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
