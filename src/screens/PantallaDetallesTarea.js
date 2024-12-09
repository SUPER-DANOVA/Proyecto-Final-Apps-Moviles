import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const PantallaDetallesTarea = ({ navigation, route, deleteTask, updateTask }) => {
  const { task } = route.params;

  const handleCompleteTask = () => {
    updateTask({ ...task, status: 'completed' });
    navigation.goBack();
  };

  const handleIncompleteTask = () => {
    updateTask({ ...task, status: 'pending' });
    navigation.goBack();
  };

  const handleDeleteTask = () => {
    deleteTask(task.id);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>{task.title}</Text>
        <Text style={styles.description}>{task.description}</Text>
        <Text style={styles.type}>Tipo: {task.type}</Text>
        <Text style={styles.status}>
          Estado: {task.status === 'pending' ? 'Pendiente' : 'Completada'}
        </Text>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteTask}>
          <Text style={styles.buttonText}>Eliminar Tarea</Text>
        </TouchableOpacity>
        {task.status === 'pending' && (
          <TouchableOpacity style={styles.completeButton} onPress={handleCompleteTask}>
            <Text style={styles.buttonText}>Tarea Completada</Text>
          </TouchableOpacity>
        )} 
        
        {task.status === 'completed' && (
            <TouchableOpacity style={styles.completeButton} onPress={handleIncompleteTask}>
              <Text style={styles.buttonText}>Tarea Pendiente</Text>
            </TouchableOpacity>
          )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  scrollContent: {
    paddingBottom: 16, // Espaciado adicional para que el contenido no choque con los botones
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
  },
  type: {
    fontSize: 16,
    marginBottom: 16,
    fontStyle: 'italic',
  },
  status: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  completeButton: {
    backgroundColor: '#81c784',
    padding: 12,
    borderRadius: 8,
    width: '48%',
  },
  deleteButton: {
    backgroundColor: '#e57373',
    padding: 12,
    borderRadius: 8,
    width: '48%',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PantallaDetallesTarea;
