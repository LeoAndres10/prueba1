import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useJuego } from '../Providers/JuegoProvider';

export default function HistorialComponent() {
  const { totalJuego,listaResultados } = useJuego();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historial de Partidas</Text>
        <Text>Total de Partidas: {totalJuego}</Text>
      {listaResultados.length === 0 ? (
        
    <Text style={styles.noGames}>No hay partidas registradas.</Text>

     
      ) : (
        <FlatList
          data={listaResultados}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.text}>
                Partida #{item.id} - {item.resultado === 'Ha ganado' ? 'Ganó ' : 'Perdió '}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  noGames: {
    fontStyle: 'italic',
    color: '#888',
  },
  item: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  text: {
    fontSize: 16,
  },
});

