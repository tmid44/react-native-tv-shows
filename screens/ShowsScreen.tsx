import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { Show } from '../types';
import api from '../api';
import { v4 as uuidv4 } from 'uuid';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';





function ShowsScreen(){
  const [shows, setShows] = useState<Show[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [duration_minutes, setDurationMinutes] = useState('');

  const loadShows = async () => {
    try {
      const response = await api.get('/shows');
      const loadedShows = response.data ?? [];
      setShows(loadedShows);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadShows();
  }, []);

  const handleAddShow = async () => {
    try {
      const response = await api.post('/shows/store', { title, description, duration_minutes });
      const newShow = { ...response.data, uuid: uuidv4() };
      setShows([...shows, newShow]);
      setTitle('');
      setDescription('');
      setDurationMinutes('');
    } catch (error) {
      console.error(error);
    }
  };

  const renderItem = ({ item }: { item: Show }) => (
    <View style={styles.userContainer}>
      <Text style={styles.userName}>{item.title}</Text>
      <Text style={styles.userEmail}>{item.description}</Text>
      <Text style={styles.userPassword}>{item.duration_minutes}</Text>
    </View>
  );

  const Tab = createBottomTabNavigator();

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>Додати передачі</Text>
        <TextInput
          style={styles.input}
          placeholder="Назва"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={styles.input}
          placeholder="Опис"
          value={description}
          onChangeText={setDescription}
        />
        <TextInput
          style={styles.input}
          placeholder="Тривалість"
          value={duration_minutes}
          onChangeText={setDurationMinutes}
        />
        <TouchableOpacity style={styles.button} onPress={handleAddShow}>
          <Text style={styles.buttonText}>Додати</Text>
        </TouchableOpacity>
      </View>
      {/* <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        style={{ marginTop: 20 }}
      /> */}
      <FlatList
        data={shows}
        renderItem={renderItem}
        keyExtractor={(renderItem) => renderItem.uuid}
      />
    </View>
  );
}

export default ShowsScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
  },
  title: {
    fontSize: 24,
  },
  details: {
    marginVertical: 8,
  },
  detailsText: {
    fontSize: 16,
  },
    formContainer: {
    backgroundColor: '#f5f5f5',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    width: '80%',
  },
  formTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#4287f5',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  userContainer: {
    backgroundColor: '#f5f5f5',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    width: '80%',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    color: '#555',
  },
  userPassword: {
    fontSize: 16,
    color: '#555',
  },
});