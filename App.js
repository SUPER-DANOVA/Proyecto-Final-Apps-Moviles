import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PantallaInicio from './src/screens/PantallaInicio';
import PantallaAgregarTarea from './src/screens/PantallaAgregarTarea';
import PantallaDetallesTarea from './src/screens/PantallaDetallesTarea';

const Stack = createNativeStackNavigator();

export default function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const loadTasks = async () => {
      const savedTasks = await AsyncStorage.getItem('tasks');
      if (savedTasks) {
        setTasks(JSON.parse(savedTasks));
      }
    };
    loadTasks();
  }, []);

  const saveTasks = async (newTasks) => {
    setTasks(newTasks);
    await AsyncStorage.setItem('tasks', JSON.stringify(newTasks));
  };

  const addTask = (task) => saveTasks([...tasks, task]);

  const updateTask = (updatedTask) => {
    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    saveTasks(updatedTasks);
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    saveTasks(updatedTasks);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Tareas App"
          options={{
            headerTitleAlign: 'center',
            headerStyle: { backgroundColor: '#6200ee' },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontSize: 24,
              fontWeight: 'bold',
            },
          }}
        >
          {(props) => <PantallaInicio {...props} tasks={tasks} />}
        </Stack.Screen>
        <Stack.Screen
          name="Agregar Tarea"
          options={{
            headerTitleAlign: 'center',
            headerStyle: { backgroundColor: '#6200ee' },
            headerTintColor: '#fff',
          }}
        >
          {(props) => <PantallaAgregarTarea {...props} addTask={addTask} />}
        </Stack.Screen>
        <Stack.Screen
          name="Detalles de la Tarea"
          options={{
            headerTitleAlign: 'center',
            headerStyle: { backgroundColor: '#6200ee' },
            headerTintColor: '#fff',
          }}
        >
          {(props) => (
            <PantallaDetallesTarea
              {...props}
              updateTask={updateTask}
              deleteTask={deleteTask}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}