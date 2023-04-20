import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { User } from '../types';
import api from '../api';
import { v4 as uuidv4 } from 'uuid';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';





function UsersScreen(){
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loadUsers = async () => {
    try {
      const response = await api.get('/users');
      const loadedUsers = response.data ?? [];
      setUsers(loadedUsers);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleAddUser = async () => {
    try {
      const response = await api.post('/users/store', { name, email, password });
      const newUser = { ...response.data, uuid: uuidv4() };
      setUsers([...users, newUser]);
      setName('');
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error(error);
    }
  };

  const renderItem = ({ item }: { item: User }) => (
    <View style={styles.userContainer}>
      <Text style={styles.userName}>{item.name}</Text>
      <Text style={styles.userEmail}>{item.email}</Text>
      <Text style={styles.userPassword}>{item.password}</Text>
    </View>
  );

  const Tab = createBottomTabNavigator();

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>Додати користувача</Text>
        <TextInput
          style={styles.input}
          placeholder="Імя"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Пароль"
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.button} onPress={handleAddUser}>
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
        data={users}
        renderItem={renderItem}
        keyExtractor={(renderItem) => renderItem.uuid}
      />
    </View>
  );
}

export default UsersScreen;


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