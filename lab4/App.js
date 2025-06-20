import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  Alert,
  StyleSheet,
  Platform,
  Animated,
  TouchableOpacity,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const timers = useRef({});

  const [notificationVisible, setNotificationVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(-100)).current;

  const [lastRefreshedTask, setLastRefreshedTask] = useState(null);

  const addTask = () => {
    if (!title.trim()) {
      Alert.alert('Помилка', 'Назва задачі обов’язкова');
      return;
    }
    const id = Date.now().toString();
    const newTask = { id, title, desc, date };
    setTasks(prev => [...prev, newTask]);

    const delay = date.getTime() - Date.now();
    if (delay > 0) {
      timers.current[id] = setTimeout(() => {
        Alert.alert('Нагадування', `Час для задачі: ${title}`);
      }, delay);
    }

    setTitle('');
    setDesc('');
    setDate(new Date());
    setShowPicker(false);
  };

  const deleteTask = (id) => {
    if (timers.current[id]) {
      clearTimeout(timers.current[id]);
      delete timers.current[id];
    }
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const showCustomNotification = () => {
    setNotificationVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      Animated.timing(slideAnim, {
        toValue: -100,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setNotificationVisible(false));
    }, 4000);
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      if (tasks.length > 0) {
        setLastRefreshedTask(tasks[tasks.length - 1]);
      } else {
        setLastRefreshedTask(null);
      }
      showCustomNotification();
    }, 1500);
  };

  const renderTask = ({ item }) => {
    const formattedDate = item.date.toLocaleString('uk-UA', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    return (
      <View style={styles.taskCard}>
        <Text style={styles.taskTitle}>{item.title}</Text>
        <Text>{item.desc}</Text>
        <Text style={styles.taskDate}>{formattedDate}</Text>
        <Button title="Видалити" color="#d9534f" onPress={() => deleteTask(item.id)} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {notificationVisible && (
        <Animated.View style={[styles.notification, { transform: [{ translateY: slideAnim }] }]}>
          <Text style={styles.notificationTitle}>onesignallab now</Text>
          <Text style={styles.notificationSub}>Житомирська політехніка</Text>
          {lastRefreshedTask ? (
            <>
              <Text style={styles.notificationDesc}>{lastRefreshedTask.title}</Text>
              <Text style={styles.notificationDesc}>{lastRefreshedTask.desc}</Text>
            </>
          ) : (
            <Text style={styles.notificationDesc}>Немає задач</Text>
          )}
          <View style={styles.notificationButtons}>
            <TouchableOpacity onPress={() => alert('Manage pressed')} style={styles.notificationButton}>
              <Text style={styles.notificationButtonText}>Manage</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => alert('Clear all pressed')} style={styles.notificationButton}>
              <Text style={styles.notificationButtonText}>Clear all</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}

      <Text style={styles.header}>To-Do Reminder</Text>

      <TextInput
        style={styles.input}
        placeholder="Назва задачі"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={styles.input}
        placeholder="Опис задачі"
        value={desc}
        onChangeText={setDesc}
      />

      <Button title="Обрати дату та час" onPress={() => setShowPicker(true)} />

      {showPicker && (
        <DateTimePicker
          value={date}
          mode="datetime"
          display={Platform.OS === 'ios' ? 'inline' : 'default'}
          onChange={(event, selectedDate) => {
            setShowPicker(false);
            if (selectedDate) {
              setDate(selectedDate);
            }
          }}
        />
      )}

      <Button title="Додати нагадування" onPress={addTask} color="green" />

      <FlatList
        style={{ flex: 1, marginTop: 20 }}
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={renderTask}
        refreshing={refreshing}
        onRefresh={onRefresh}
        ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20 }}>Немає задач</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    marginBottom: 10,
  },
  taskCard: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  taskTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  taskDate: {
    marginTop: 5,
    color: '#555',
  },
  notification: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#2196F3',
    padding: 15,
    zIndex: 1000,
    elevation: 1000,
  },
  notificationTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  notificationSub: {
    color: 'white',
    fontSize: 14,
  },
  notificationDesc: {
    color: 'white',
    fontSize: 14,
  },
  notificationButtons: {
    flexDirection: 'row',
    marginTop: 10,
  },
  notificationButton: {
    marginRight: 15,
  },
  notificationButtonText: {
    color: '#BBDEFB',
    fontWeight: 'bold',
  },
});
