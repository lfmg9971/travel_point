import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, RefreshControl } from 'react-native';
import { getCheckpoints } from '../services/api';

export default function HomeScreen() {
  const [checkpoints, setCheckpoints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchPuntos = async () => {
    try {
      const data = await getCheckpoints();
      setCheckpoints(data);
    } catch (error) {
      console.error(error);
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

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Mis Puntos de Control</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#3498db" />
      ) : (
        <FlatList
          data={checkpoints}
          keyExtractor={(item) => item.id.toString()}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{item.nombre}</Text>
              <Text style={styles.cardDesc}>{item.descripcion}</Text>
              <Text style={styles.cardLocation}>Lugar: {item.lugar}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f4f6f8' },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, color: '#2c3e50' },
  card: { backgroundColor: '#fff', padding: 15, borderRadius: 8, marginBottom: 12, elevation: 2 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#2c3e50' },
  cardDesc: { color: '#7f8c8d', marginVertical: 4 },
  cardLocation: { fontSize: 12, color: '#3498db', fontWeight: 'bold' }
});