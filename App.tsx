import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import JuegoProvider from './Providers/JuegoProvider';
import CartaComponente from './Componentes/CartaComponente';
import HistorialComponent from './Componentes/HistorialComponent';

export default function App() {
  return (

    <JuegoProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scroll}>
          <CartaComponente></CartaComponente>
          <HistorialComponent></HistorialComponent>
        </ScrollView>
      </SafeAreaView>
    </JuegoProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scroll: {
    padding: 16,
  },
});

