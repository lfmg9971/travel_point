import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Platform } from 'react-native';
import { loginUser } from '../services/api';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      if (Platform.OS === 'web') {
        window.alert('Por favor ingresa usuario y contraseña');
      } else {
        Alert.alert('Error', 'Por favor ingresa usuario y contraseña');
      }
      return;
    }

    try {
      const response = await loginUser(email, password);
      console.log("Respuesta del servidor:", response);

      // Validamos si la respuesta contiene estado: 'success'
      if (response && (response.estado === 'success' || response.mensaje)) {
        // Guardamos la sesión en el navegador para evitar que se pierda al actualizar
        if (Platform.OS === 'web') {
          localStorage.setItem('usuarioLogueado', JSON.stringify(response));
        }

        navigation.replace('Home');
      } else {
        const mensajeError = response?.mensaje || response?.error || 'Credenciales incorrectas';
        if (Platform.OS === 'web') {
          window.alert(mensajeError);
        } else {
          Alert.alert('Error de acceso', mensajeError);
        }
      }
    } catch (error) {
      console.log("Error detallado:", error);
      if (Platform.OS === 'web') {
        window.alert('No se pudo conectar con el servidor.');
      } else {
        Alert.alert('Error de conexión', 'No se pudo conectar con el servidor.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>

      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Ingresar</Text>
      </TouchableOpacity>

      {/* BOTÓN PARA NAVEGAR AL REGISTRO */}
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.registerText}>¿No tienes cuenta? Regístrate aquí</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#f5f5f5' },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#2c3e50' },
  input: { backgroundColor: '#fff', padding: 12, borderRadius: 8, marginBottom: 15, borderWidth: 1, borderColor: '#ddd' },
  button: { backgroundColor: '#3498db', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  registerText: { color: '#3498db', textAlign: 'center', marginTop: 20, fontWeight: '600' },
});