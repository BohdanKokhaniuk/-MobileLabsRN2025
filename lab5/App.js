import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, Alert, Button, Modal, StyleSheet } from 'react-native';
import * as FileSystem from 'expo-file-system';

const ROOT_DIR = FileSystem.documentDirectory + 'AppData/';

export default function App() {
  const [currentPath, setCurrentPath] = useState(ROOT_DIR);
  const [contents, setContents] = useState([]);
  const [newFolderName, setNewFolderName] = useState('');
  const [newFileName, setNewFileName] = useState('');
  const [fileContent, setFileContent] = useState('');
  const [editingFile, setEditingFile] = useState(null);
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);
  const [isCreatingFile, setIsCreatingFile] = useState(false);

  useEffect(() => {
    initDir();
  }, []);

  const initDir = async () => {
    const dirInfo = await FileSystem.getInfoAsync(ROOT_DIR);
    if (!dirInfo.exists) {
      await FileSystem.makeDirectoryAsync(ROOT_DIR);
    }
    loadDir(ROOT_DIR);
  };

  const loadDir = async (path) => {
    const items = await FileSystem.readDirectoryAsync(path);
    const fullItems = await Promise.all(items.map(async (name) => {
      const info = await FileSystem.getInfoAsync(path + name);
      return { name, isDirectory: info.isDirectory, uri: path + name };
    }));
    setContents(fullItems);
    setCurrentPath(path);
  };

  const goUp = () => {
    if (currentPath === ROOT_DIR) return;
    const parts = currentPath.split('/').filter(Boolean);
    parts.pop();
    const newPath = FileSystem.documentDirectory + parts.slice(1).join('/') + '/';
    loadDir(newPath);
  };

  const createFolder = async () => {
    if (!newFolderName) return;
    await FileSystem.makeDirectoryAsync(currentPath + newFolderName + '/');
    setNewFolderName('');
    setIsCreatingFolder(false);
    loadDir(currentPath);
  };

  const createFile = async () => {
    if (!newFileName) return;
    await FileSystem.writeAsStringAsync(currentPath + newFileName + '.txt', fileContent || '');
    setNewFileName('');
    setFileContent('');
    setIsCreatingFile(false);
    loadDir(currentPath);
  };

  const openFile = async (file) => {
    const content = await FileSystem.readAsStringAsync(file.uri);
    setFileContent(content);
    setEditingFile(file);
  };

  const saveFile = async () => {
    await FileSystem.writeAsStringAsync(editingFile.uri, fileContent);
    setEditingFile(null);
    setFileContent('');
    loadDir(currentPath);
  };

  const deleteItem = (item) => {
    Alert.alert('Видалити?', item.name, [
      { text: 'Скасувати' },
      { text: 'Так', onPress: async () => {
        await FileSystem.deleteAsync(item.uri, { idempotent: true });
        loadDir(currentPath);
      }},
    ]);
  };

  return (
    <View style={styles.container}>
      <Text>Поточна директорія: {currentPath.replace(ROOT_DIR, '/')}</Text>
      <FlatList
        data={contents}
        keyExtractor={(item) => item.uri}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => item.isDirectory ? loadDir(item.uri + '/') : openFile(item)}>
            <Text>{item.isDirectory ? '📁' : '📄'} {item.name}</Text>
            <Button title="🗑" onPress={() => deleteItem(item)} />
          </TouchableOpacity>
        )}
      />
      <Button title="⬆ Вгору" onPress={goUp} />
      <Button title="📁 Створити папку" onPress={() => setIsCreatingFolder(true)} />
      <Button title="📄 Створити файл" onPress={() => setIsCreatingFile(true)} />

      <Modal visible={isCreatingFolder} transparent>
        <View style={styles.modal}>
          <TextInput placeholder="Назва папки" value={newFolderName} onChangeText={setNewFolderName} />
          <Button title="Створити" onPress={createFolder} />
        </View>
      </Modal>

      <Modal visible={isCreatingFile} transparent>
        <View style={styles.modal}>
          <TextInput placeholder="Назва файлу" value={newFileName} onChangeText={setNewFileName} />
          <TextInput placeholder="Вміст" multiline value={fileContent} onChangeText={setFileContent} />
          <Button title="Створити" onPress={createFile} />
        </View>
      </Modal>

      {editingFile && (
        <Modal visible transparent>
          <View style={styles.modal}>
            <Text>{editingFile.name}</Text>
            <TextInput multiline value={fileContent} onChangeText={setFileContent} />
            <Button title="Зберегти" onPress={saveFile} />
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  modal: { backgroundColor: '#fff', padding: 20, marginTop: 100 },
});
