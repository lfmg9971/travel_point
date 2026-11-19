import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, RefreshControl, TouchableOpacity, Alert, Modal, Image, Platform } from 'react-native';
import { getCheckpoints, deleteCheckpoint } from '../services/api';

export default function MisViajesScreen() {
  const [checkpoints, setCheckpoints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [viajeSeleccionado, setViajeSeleccionado] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const fetchPuntos = async () => {
    try {
      const data = await getCheckpoints();
      setCheckpoints(data || []);
    } catch (error) {
      console.error("Error al cargar los viajes:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchPuntos();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchPuntos();
  };

  const ejecutarEliminacion = async (id) => {
    try {
      await deleteCheckpoint(id);
      setCheckpoints(prev => prev.filter(item => item.id !== id));
      setModalVisible(false);
      setViajeSeleccionado(null);

      if (Platform.OS === 'web') {
        window.alert("Viaje eliminado correctamente");
      } else {
        Alert.alert("Éxito", "Viaje eliminado correctamente");
      }
    } catch (error) {
      console.error("Error al eliminar:", error);
      if (Platform.OS === 'web') {
        window.alert("No se pudo conectar con el servidor para eliminar");
      } else {
        Alert.alert("Error", "No se pudo conectar con el servidor para eliminar");
      }
    }
  };

  const handleDelete = (id) => {
    if (Platform.OS === 'web') {
      const confirmado = window.confirm("¿Estás seguro de que deseas eliminar este viaje?");
      if (confirmado) {
        ejecutarEliminacion(id);
      }
    } else {
      Alert.alert(
        "Eliminar viaje",
        "¿Estás seguro de que deseas eliminar este viaje?",
        [
          { text: "Cancelar", style: "cancel" },
          { text: "Eliminar", style: "destructive", onPress: () => ejecutarEliminacion(id) }
        ]
      );
    }
  };

  const handleVerDetalle = (item) => {
    setViajeSeleccionado(item);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Mis Viajes Registrados</Text>
      
      {loading ? (
        <ActivityIndicator size="large" color="#2ecc71" />
      ) : checkpoints.length === 0 ? (
        <Text style={styles.emptyText}>No tienes viajes registrados aún.</Text>
      ) : (
        <FlatList
          data={checkpoints}
          keyExtractor={(item, index) => (item.id ? item.id.toString() : index.toString())}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.card} 
              onPress={() => handleVerDetalle(item)}
              activeOpacity={0.7}
            >
              <View style={{ flex: 1 }}>
                <Text style={styles.cardTitle}>{item.nombre}</Text>
                <Text style={styles.cardLocation}>🌍 {item.ciudad}, {item.departamento} - {item.pais}</Text>
                <Text style={styles.cardDesc}>📅 {item.fecha || 'Sin fecha'} | {item.transporte || 'Transporte no especificado'}</Text>
              </View>
              
              <TouchableOpacity 
                style={styles.deleteButton} 
                onPress={(e) => {
                  if (e && e.stopPropagation) e.stopPropagation();
                  handleDelete(item.id);
                }}
              >
                <Text style={styles.deleteButtonText}>🗑️</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          )}
        />
      )}

      {/* MODAL DE DETALLES DEL VIAJE */}
      {viajeSeleccionado && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{viajeSeleccionado.nombre}</Text>
              
              {viajeSeleccionado.foto ? (
                <Image source={{ uri: viajeSeleccionado.foto }} style={styles.modalImage} />
              ) : null}

              <View style={styles.modalInfoContainer}>
                <Text style={styles.modalText}>🌍 <Text style={styles.bold}>Ubicación:</Text> {viajeSeleccionado.ciudad}, {viajeSeleccionado.departamento}, {viajeSeleccionado.pais}</Text>
                <Text style={styles.modalText}>📅 <Text style={styles.bold}>Fecha:</Text> {viajeSeleccionado.fecha || 'No especificada'}</Text>
                <Text style={styles.modalText}>🚗 <Text style={styles.bold}>Transporte:</Text> {viajeSeleccionado.transporte || 'No especificado'}</Text>
                <Text style={styles.detailText}>
                📌 <Text style={styles.boldText}>Estado:</Text>{' '}
                {(viajeSeleccionado?.estado_viaje || viajeSeleccionado?.estado || '').toLowerCase().includes('realizado') 
                ? '🏁 Realizado' 
                : '🗺️ Planificado'}
                </Text>
                <Text style={styles.modalText}>📝 <Text style={styles.bold}>Comentarios:</Text> {viajeSeleccionado.comentarios || 'Sin observaciones'}</Text>
              </View>

              <View style={styles.modalButtonsRow}>
                <TouchableOpacity 
                  style={styles.modalDeleteButton} 
                  onPress={() => handleDelete(viajeSeleccionado.id)}
                >
                  <Text style={styles.buttonTextWhite}>Eliminar</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.modalCloseButton} 
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.buttonTextWhite}>Cerrar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f4f6f8' },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 15, color: '#2c3e50' },
  emptyText: { textAlign: 'center', color: '#7f8c8d', marginTop: 40, fontSize: 16 },
  card: { 
    backgroundColor: '#fff', 
    padding: 15, 
    borderRadius: 8, 
    marginBottom: 12, 
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#2c3e50' },
  cardLocation: { fontSize: 13, color: '#3498db', fontWeight: '600', marginVertical: 2 },
  cardDesc: { color: '#7f8c8d', fontSize: 13 },
  deleteButton: {
    backgroundColor: '#e74c3c',
    padding: 12,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center'
  },
  deleteButtonText: { fontSize: 16 },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    width: '100%',
    maxWidth: 400,
    elevation: 5
  },
  modalTitle: { fontSize: 22, fontWeight: 'bold', color: '#2c3e50', marginBottom: 15, textAlign: 'center' },
  modalImage: { width: '100%', height: 160, borderRadius: 8, marginBottom: 15, resizeMode: 'cover' },
  modalInfoContainer: { marginBottom: 20 },
  modalText: { fontSize: 15, color: '#34495e', marginBottom: 6 },
  bold: { fontWeight: 'bold' },
  modalButtonsRow: { flexDirection: 'row', justifyContent: 'space-between' },
  modalDeleteButton: { backgroundColor: '#e74c3c', padding: 12, borderRadius: 8, flex: 1, marginRight: 8, alignItems: 'center' },
  modalCloseButton: { backgroundColor: '#3498db', padding: 12, borderRadius: 8, flex: 1, marginLeft: 8, alignItems: 'center' },
  buttonTextWhite: { color: '#fff', fontWeight: 'bold', fontSize: 15 }
});