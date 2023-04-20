
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import api from './api';
import { User } from './types';
import { v4 as uuidv4 } from 'uuid';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';



const Stack = createStackNavigator();


function ShowsScreen({ navigation }) {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    const fetchShows = async () => {
      const response = await api.get('/shows');
      setShows(response.data);
    };

    fetchShows();
  }, []);

  const renderItem = ({ item }) => (
    <View style = {styles.userContainer}>
      <Text>{item.title}</Text>
      <Text>{item.description}</Text>
      <Text>{item.duration_minutes}</Text>
    </View>
  );

  return (
    <View>
      <FlatList
        data={shows}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

export function AdvertisingScreen() {
  return (
    <View>
      <Text>Реклама</Text>
    </View>
  );
}

export function TimetableScreen() {
  return (
    <View>
      <Text>Розклад</Text>
    </View>
  );
}

// export default function UsersScreen() {
  export function UsersScreen(){
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
       <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Shows" component={ShowsScreen} />
          <Tab.Screen name="Advertising" component={AdvertisingScreen} />
          <Tab.Screen name="Timetable" component={TimetableScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Shows" component={ShowsScreen} />
        {/* <Stack.Screen name="Users" component={UsersScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

//export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
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
