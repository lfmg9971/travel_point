import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, Platform, Image, ActivityIndicator } from 'react-native';
import { createCheckpoint } from '../services/api';

export default function NuevoViajeScreen({ navigation }) {
  const [nombre, setNombre] = useState('');
  const [tipoViaje, setTipoViaje] = useState('Realizado'); // 'Realizado' o 'Planificado'
  const [ciudad, setCiudad] = useState('');
  const [departamento, setDepartamento] = useState('');
  const [pais, setPais] = useState('');
  const [transporte, setTransporte] = useState('Moto');
  const [fecha, setFecha] = useState('');
  const [fotoUri, setFotoUri] = useState('');
  const [comentarios, setComentarios] = useState('');
  const [loading, setLoading] = useState(false);

  // Transportes limpios sin emojis para evitar problemas de codificación de caracteres (????)
  const transportesDisponibles = ['Caminando', 'Bicicleta', 'Moto', 'Carro', 'Avión'];

  const handleSelectPhoto = () => {
    if (Platform.OS === 'web') {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
          const imageUri = URL.createObjectURL(file);
          setFotoUri(imageUri);
        }
      };
      input.click();
    } else {
      Alert.alert('Subir Foto', 'Selecciona una foto desde el dispositivo.');
    }
  };

  const handleGuardarViaje = async () => {
    if (!nombre || !ciudad || !departamento || !pais || !fecha) {
      if (Platform.OS === 'web') {
        window.alert('Por favor completa los campos obligatorios (*)');
      } else {
        Alert.alert('Error', 'Por favor completa los campos obligatorios (*)');
      }
      return;
    }

    setLoading(true);

    const estadoFormateado = tipoViaje.toLowerCase().trim();

    const nuevoCheckpoint = {
      nombre: nombre,
      ciudad: ciudad,
      departamento: departamento,
      pais: pais,
      transporte: transporte,
      fecha: fecha,
      estado_viaje: estadoFormateado, // <--- Aquí se envía limpio
      foto: fotoUri,
      comentarios: comentarios
    };

    try {
      const respuesta = await createCheckpoint(nuevoCheckpoint);
      console.log("Respuesta al guardar:", respuesta);

      if (respuesta && (respuesta.estado === 'success' || respuesta.mensaje)) {
        if (Platform.OS === 'web') {
          window.alert("¡Éxito! Tu viaje ha sido registrado correctamente.");
        } else {
          Alert.alert('¡Éxito!', 'Tu viaje ha sido registrado correctamente.');
        }
        navigation.navigate('MisViajes');
      } else {
        throw new Error(respuesta.error || "No se pudo guardar en la base de datos");
      }
    } catch (error) {
      console.error("Error al guardar:", error);
      if (Platform.OS === 'web') {
        window.alert("Error al guardar el viaje en el servidor.");
      } else {
        Alert.alert('Error', 'No se pudo guardar el viaje en el servidor.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Registrar Nuevo Viaje</Text>

      {/* Tipo de Viaje */}
      <Text style={styles.label}>¿Qué tipo de viaje es?</Text>
      <View style={styles.row}>
        <TouchableOpacity 
          style={[styles.typeButton, tipoViaje === 'Realizado' && styles.activeTypeRealizado]} 
          onPress={() => setTipoViaje('Realizado')}
        >
          <Text style={[styles.typeButtonText, tipoViaje === 'Realizado' && styles.activeText]}>🏁 Realizado</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.typeButton, tipoViaje === 'Planificado' && styles.activeTypeFuturo]} 
          onPress={() => setTipoViaje('Planificado')}
        >
          <Text style={[styles.typeButtonText, tipoViaje === 'Planificado' && styles.activeText]}>🗺️ Planificado</Text>
        </TouchableOpacity>
      </View>

      {/* Nombre del Viaje */}
      <Text style={styles.label}>Nombre del punto o viaje *</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Ej. Guatavita" 
        value={nombre} 
        onChangeText={setNombre} 
      />

      {/* Ciudad y Departamento */}
      <View style={styles.rowInputs}>
        <View style={{ flex: 1, marginRight: 10 }}>
          <Text style={styles.label}>Ciudad *</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Ej. Guatavita" 
            value={ciudad} 
            onChangeText={setCiudad} 
          />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.label}>Departamento *</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Ej. Cundinamarca" 
            value={departamento} 
            onChangeText={setDepartamento} 
          />
        </View>
      </View>

      {/* País */}
      <Text style={styles.label}>País *</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Ej. Colombia" 
        value={pais} 
        onChangeText={setPais} 
      />

      {/* Medio de Transporte */}
      <Text style={styles.label}>Medio de transporte</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.transportContainer}>
        {transportesDisponibles.map((t) => (
          <TouchableOpacity 
            key={t} 
            style={[styles.transportChip, transporte === t && styles.activeTransportChip]}
            onPress={() => setTransporte(t)}
          >
            <Text style={[styles.transportText, transporte === t && styles.activeTransportText]}>{t}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Fecha */}
      <Text style={styles.label}>Fecha del viaje *</Text>
      {Platform.OS === 'web' ? (
        <input 
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          style={{
            backgroundColor: '#fff',
            padding: 12,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: '#ddd',
            fontSize: 16,
            width: '100%',
            marginBottom: 10,
            fontFamily: 'inherit'
          }}
        />
      ) : (
        <TextInput 
          style={styles.input} 
          placeholder="AAAA-MM-DD" 
          value={fecha} 
          onChangeText={setFecha} 
        />
      )}

      {/* Subir Foto */}
      <Text style={styles.label}>Foto del viaje</Text>
      <TouchableOpacity style={styles.uploadButton} onPress={handleSelectPhoto}>
        <Text style={styles.uploadButtonText}>📁 Seleccionar archivo de foto</Text>
      </TouchableOpacity>

      {fotoUri ? (
        <View style={styles.previewContainer}>
          <Image source={{ uri: fotoUri }} style={styles.previewImage} />
          <Text style={styles.previewText}>Foto cargada correctamente</Text>
        </View>
      ) : null}

      {/* Comentarios u observaciones */}
      <Text style={styles.label}>Comentarios u observaciones</Text>
      <TextInput 
        style={[styles.input, { height: 80, textAlignVertical: 'top' }]} 
        placeholder="Escribe detalles o notas de tu viaje..." 
        multiline
        value={comentarios} 
        onChangeText={setComentarios} 
      />

      {/* Botón Guardar */}
      <TouchableOpacity style={styles.saveButton} onPress={handleGuardarViaje} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.saveButtonText}>Guardar Viaje</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#f5f5f5', flexGrow: 1 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#2c3e50' },
  label: { fontSize: 14, fontWeight: '600', color: '#34495e', marginBottom: 5, marginTop: 10 },
  input: { backgroundColor: '#fff', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#ddd', fontSize: 16 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  rowInputs: { flexDirection: 'row', justifyContent: 'space-between' },
  typeButton: { flex: 1, padding: 12, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, alignItems: 'center', marginHorizontal: 5, backgroundColor: '#fff' },
  activeTypeRealizado: { backgroundColor: '#2ecc71', borderColor: '#2ecc71' },
  activeTypeFuturo: { backgroundColor: '#3498db', borderColor: '#3498db' },
  typeButtonText: { fontWeight: 'bold', color: '#7f8c8d' },
  activeText: { color: '#fff' },
  transportContainer: { flexDirection: 'row', marginBottom: 10 },
  transportChip: { paddingVertical: 8, paddingHorizontal: 15, backgroundColor: '#fff', borderWidth: 1, borderColor: '#ddd', borderRadius: 20, marginRight: 8 },
  activeTransportChip: { backgroundColor: '#3498db', borderColor: '#3498db' },
  transportText: { color: '#34495e', fontSize: 14 },
  activeTransportText: { color: '#fff', fontWeight: 'bold' },
  uploadButton: { backgroundColor: '#ecf0f1', padding: 14, borderRadius: 8, borderWidth: 1, borderColor: '#bdc3c7', alignItems: 'center', borderStyle: 'dashed' },
  uploadButtonText: { color: '#2c3e50', fontWeight: '600', fontSize: 15 },
  previewContainer: { alignItems: 'center', marginTop: 10 },
  previewImage: { width: 120, height: 120, borderRadius: 8, marginBottom: 5, resizeMode: 'cover' },
  previewText: { fontSize: 12, color: '#27ae60', fontWeight: 'bold' },
  saveButton: { backgroundColor: '#2c3e50', padding: 16, borderRadius: 10, alignItems: 'center', marginTop: 25, elevation: 3 },
  saveButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});