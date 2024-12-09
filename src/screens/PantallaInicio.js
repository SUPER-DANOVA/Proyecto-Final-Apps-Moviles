import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const PantallaInicio = ({ navigation, tasks }) => {
  const [activeTab, setActiveTab] = useState('pending'); // Estado para controlar la pestaña activa

  // Filtrar tareas según la pestaña activa
  const filteredTasks = tasks.filter((task) =>
    activeTab === 'pending' ? task.status === 'pending' : task.status === 'completed'
  );

  const renderTask = ({ item }) => {
    // Limitar la descripción a un máximo de 100 caracteres
    const truncatedDescription = item.description.length > 100 
      ? `${item.description.substring(0, 100)}...` 
      : item.description;

    return (
      <TouchableOpacity
        style={styles.taskItem}
        onPress={() => navigation.navigate('Detalles de la Tarea', { task: item })}
      >
        <Text style={styles.taskTitle}>{item.title}</Text>
        <Text style={styles.taskDescription}>{truncatedDescription}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Tabs for Pending and Completed */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'pending' && styles.activeTab]}
          onPress={() => setActiveTab('pending')}
        >
          <Text style={[styles.tabText, activeTab === 'pending' && styles.activeTabText]}>
            Pendientes
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'completed' && styles.activeTab]}
          onPress={() => setActiveTab('completed')}
        >
          <Text style={[styles.tabText, activeTab === 'completed' && styles.activeTabText]}>
            Terminadas
          </Text>
        </TouchableOpacity>
      </View>

      {/* Task List */}
      {filteredTasks.length === 0 ? (
        <Text style={styles.noTasksText}>
          No hay tareas {activeTab === 'pending' ? 'pendientes\n Pulse el boton añadir para crear una tarea' : 'completadas'}.
        </Text>
      ) : (
        <FlatList
          data={filteredTasks}
          renderItem={renderTask}
          keyExtractor={(item) => item.id.toString()}
        />
      )}

      {/* Floating Add Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('Agregar Tarea')}
      >
        <MaterialIcons name="add" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  tab: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#6200ee',
    width: '48%',
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#B2F2BB', // Fondo para la pestaña activa
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6200ee',
  },
  activeTabText: {
    color: '#000', // Color del texto de la pestaña activa
  },
  noTasksText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 32,
  },
  taskItem: {
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#B2F2BB',
  },
  taskTitle: {
    fontSize: 16,
  },
  addButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#6200ee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  taskDescription: {
    fontSize: 14,
    color: '#999',
  }
});

export default PantallaInicio;
