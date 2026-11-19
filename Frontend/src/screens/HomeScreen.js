import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeTitle}>Travel Point</Text>
      <Text style={styles.subtitle}>Selecciona una opción para continuar</Text>

      {/* Botón: Nuevo Viaje */}
      <TouchableOpacity 
        style={styles.primaryButton} 
        onPress={() => navigation.navigate('NuevoViaje')}
      >
        <Text style={styles.buttonText}>+ Nuevo viaje</Text>
      </TouchableOpacity>

      {/* Botón: Mis Viajes */}
      <TouchableOpacity 
        style={styles.secondaryButton} 
        onPress={() => navigation.navigate('MisViajes')}
      >
        <Text style={styles.buttonText}>🗺️ Mis viajes</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 20, 
    backgroundColor: '#f5f5f5' 
  },
  welcomeTitle: { 
    fontSize: 32, 
    fontWeight: 'bold', 
    marginBottom: 8, 
    color: '#2c3e50',
    textAlign: 'center'
  },
  subtitle: { 
    fontSize: 16, 
    color: '#7f8c8d', 
    marginBottom: 40,
    textAlign: 'center'
  },
  primaryButton: { 
    backgroundColor: '#3498db', 
    paddingVertical: 16, 
    borderRadius: 10, 
    width: '85%', 
    alignItems: 'center', 
    marginBottom: 20,
    elevation: 3
  },
  secondaryButton: { 
    backgroundColor: '#2ecc71', 
    paddingVertical: 16, 
    borderRadius: 10, 
    width: '85%', 
    alignItems: 'center',
    elevation: 3
  },
  buttonText: { 
    color: '#fff', 
    fontWeight: 'bold', 
    fontSize: 18 
  }
});