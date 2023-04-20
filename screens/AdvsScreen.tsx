import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { Adv } from '../types';
import api from '../api';
import { v4 as uuidv4 } from 'uuid';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';





function AdvsScreen(){
  const [advs, setAdvs] = useState<Adv[]>([]);
  const [product, setProduct] = useState('');
  const [audience, setAudience] = useState('');
  const [budget, setBudget] = useState('');
  const [duration_minutes, setDurationMinutes] = useState('');

  const loadAdvs = async () => {
    try {
      const response = await api.get('/advertising');
      const loadedAdvs = response.data ?? [];
      setAdvs(loadedAdvs);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadAdvs();
  }, []);

  const handleAddAdv = async () => {
    try {
      const response = await api.post('/advertising/store', { product, audience, budget, duration_minutes });
      const newAdv = { ...response.data, uuid: uuidv4() };
      setAdvs([...advs, newAdv]);
      setProduct('');
      setAudience('');
      setBudget('');
      setDurationMinutes('');
    } catch (error) {
      console.error(error);
    }
  };

  const renderItem = ({ item }: { item: Adv }) => (
    <View style={styles.userContainer}>
      <Text style={styles.userName}>{item.product}</Text>
      <Text style={styles.userEmail}>{item.audience}</Text>
      <Text style={styles.userEmail}>{item.budget}</Text>
      <Text style={styles.userPassword}>{item.duration_minutes}</Text>
    </View>
  );

  const Tab = createBottomTabNavigator();

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>Додати рекламу</Text>
        <TextInput
          style={styles.input}
          placeholder="Продукт"
          value={product}
          onChangeText={setProduct}
        />
        <TextInput
          style={styles.input}
          placeholder="Аудиторія"
          value={audience}
          onChangeText={setAudience}
        />
        <TextInput
          style={styles.input}
          placeholder="Бюджет"
          value={budget}
          onChangeText={setBudget}
        />
        <TextInput
          style={styles.input}
          placeholder="Тривалість"
          value={duration_minutes}
          onChangeText={setDurationMinutes}
        />
        <TouchableOpacity style={styles.button} onPress={handleAddAdv}>
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
        data={advs}
        renderItem={renderItem}
        keyExtractor={(renderItem) => renderItem.uuid}
      />
    </View>
  );
}

export default AdvsScreen;


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