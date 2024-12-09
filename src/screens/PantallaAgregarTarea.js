import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const PantallaAgregarTarea = ({ navigation, addTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');

  const handleAddTask = () => {
    if (!title || !description || !type) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    addTask({
      id: Date.now(),
      title,
      description,
      type,
      status: 'pending', // por defecto, todas las tareas inician como pendientes
    });

    navigation.goBack(); // Regresa a la pantalla principal
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Título</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Escribe el título"
      />

    <Text style={styles.label}>Descripción:</Text>
      <TextInput
        style={styles.textarea}
        value={description}
        onChangeText={setDescription}
        placeholder="Ingrese una descripción"
        multiline={true}
        numberOfLines={7}
      />

      <Text style={styles.label}>Tipo de tarea:</Text>
        <View style={styles.pickerContainer}>
            <Picker
            selectedValue={type}
            onValueChange={(itemValue) => setType(itemValue)}
            style={styles.picker}
            >
            <Picker.Item label="Trabajo" value="Trabajo" />
            <Picker.Item label="Casa" value="Casa" />
            <Picker.Item label="Negocios" value="Negocios" />
            <Picker.Item label="Otro" value="Otro" />
            </Picker>
        </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
          <Text style={styles.buttonText}>Agregar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    backgroundColor: '#e57373',
    padding: 12,
    borderRadius: 8,
    width: '48%',
  },
  addButton: {
    backgroundColor: '#81c784',
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
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 16,
    overflow: 'hidden', // Para evitar que los bordes del Picker sobresalgan
  },
  picker: {
    height: 50,
  },
  textarea: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
    fontSize: 16,
    textAlignVertical: 'top', // Asegura que el texto comience desde la parte superior
    height: 200, // Ajusta la altura del área de texto
  }
});

export default PantallaAgregarTarea;
