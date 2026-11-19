import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Platform, ActivityIndicator } from 'react-native';
import { registerUser } from '../services/api';

export default function RegisterScreen({ navigation }) {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!nombre || !email || !password) {
      if (Platform.OS === 'web') {
        window.alert('Por favor completa todos los campos');
      } else {
        Alert.alert('Error', 'Por favor completa todos los campos');
      }
      return;
    }

    setLoading(true);

    try {
      // CORRECCIÓN: Se envían los 3 parámetros sueltos como los recibe registrarUser en api.js
      const res = await registerUser(nombre, email, password);
      console.log("Respuesta de registro:", res);
      
      if (res && (res.mensaje || res.estado === 'success')) {
        const mensajeExito = res.mensaje || '¡Cuenta creada correctamente!';
        if (Platform.OS === 'web') {
          window.alert(mensajeExito);
        } else {
          Alert.alert('¡Éxito!', mensajeExito);
        }
        navigation.navigate('Login');
      } else {
        const mensajeError = res.error || 'No se pudo crear la cuenta';
        if (Platform.OS === 'web') {
          window.alert(mensajeError);
        } else {
          Alert.alert('Error', mensajeError);
        }
      }
    } catch (error) {
      console.error("Error en registro:", error);
      if (Platform.OS === 'web') {
        window.alert('No se pudo conectar con el servidor');
      } else {
        Alert.alert('Error', 'No se pudo conectar con el servidor');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear Cuenta</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre completo"
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Registrarse</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.linkText}>¿Ya tienes cuenta? Inicia sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#f5f5f5' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#333' },
  input: { backgroundColor: '#fff', padding: 12, borderRadius: 8, marginBottom: 12, borderWidth: 1, borderColor: '#ddd' },
  button: { backgroundColor: '#3498db', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  linkText: { color: '#3498db', textAlign: 'center', marginTop: 15, fontWeight: '600' },
});