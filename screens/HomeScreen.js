import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';

const data = new Array(10).fill(null).map((_, i) => ({
  id: `${i}`,
  title: 'Заголовок новини',
  date: 'Дата новини',
  summary: 'Короткий текст новини',
}));

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Новини</Text>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: 'https://via.placeholder.com/50' }} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.date}>{item.date}</Text>
              <Text style={styles.summary}>{item.summary}</Text>
            </View>
          </View>
        )}
      />
      <Text style={styles.footer}>Коханюк Богдан Богданович, ІПЗ-23-4</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 10, flex: 1 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, alignSelf: 'center' },
  card: { flexDirection: 'row', marginBottom: 10, backgroundColor: '#eee', padding: 10, borderRadius: 8 },
  image: { width: 50, height: 50, marginRight: 10 },
  textContainer: { flex: 1 },
  title: { fontWeight: 'bold' },
  date: { fontSize: 12, color: '#666' },
  summary: { fontSize: 14 },
  footer: { textAlign: 'center', marginTop: 10, fontSize: 12, color: '#555' },
});
