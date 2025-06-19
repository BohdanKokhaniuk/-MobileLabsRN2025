import React from 'react';
import { View, Image, FlatList, StyleSheet, Text } from 'react-native';

const images = new Array(12).fill(null).map((_, i) => ({
  id: `${i}`,
  src: { uri: 'https://via.placeholder.com/100' },
}));

export default function GalleryScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        numColumns={3}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Image source={item.src} style={styles.image} />
        )}
      />
      <Text style={styles.footer}>Коханюк Богдан Богданович, ІПЗ-23-4</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 5, flex: 1 },
  image: {
    width: '30%',
    height: 100,
    margin: '1.66%',
    backgroundColor: '#ccc',
    borderRadius: 8,
  },
  footer: { textAlign: 'center', marginTop: 5, fontSize: 12, color: '#555' },
});