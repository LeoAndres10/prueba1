import React, { useEffect, useState } from 'react';
import { Juego } from '../Modelos/Juego';
import { useJuego } from '../Providers/JuegoProvider'
import { View,Text, TouchableOpacity, StyleSheet } from 'react-native';
export default function CartaComponente(){

const letras = ['A', 'B', 'C', 'D'];

const cartasVolteadas = (): Juego[] => {
  const valores = [...letras, ...letras];
  const volteadas = valores.sort(() => Math.random() - 0.5);
  return volteadas.map((valor, index) => ({
    id: index,
    valor:valor,
    volteada: false,
    encontrada:false
  }));
};


  const [juego, setJuego] = useState<Juego[]>([]);
  const [primerCarta, setPrimerCarta] = useState<Juego| null>(null);
  const [segundaCarta, setSegundaCarta] = useState<Juego | null>(null);
  const [juegoComenzado, setJuegoComenzado] = useState(false);
  const [alerta, setAlerta] = useState('');
  const { agregarResultado, totalJuego } = useJuego();

  const CartaComenzar = () => {
    setJuego(cartasVolteadas());
    setJuegoComenzado(true);
    setPrimerCarta(null);
    setSegundaCarta(null);
    setAlerta('');
  };

  const CartaClick = (carta:Juego) => {
    if (carta.volteada || carta.encontrada || segundaCarta) return;

    const actualizarCarta = juego.map(c =>
      c.id === carta.id ? { ...c, volteada: true } : c
    );
    setJuego(actualizarCarta);

    if (primerCarta) {
      setPrimerCarta(carta);
    } else if (!segundaCarta) {
      setSegundaCarta(carta);
    }
  };

  useEffect(() => {
    if (primerCarta && segundaCarta) {
      const timeout = setTimeout(() => {
        const isMatch = primerCarta.valor === segundaCarta.valor;
        const updated = juego.map(c => {
          if (c.id === primerCarta.id || c.id === segundaCarta.id) {
            return {
              ...c,
              volteada: isMatch,
              encontrada: isMatch,
            };
          }
          return c;
        });
        setJuego(updated);
        setPrimerCarta(null);
        setSegundaCarta(null);

        if (isMatch) {
          const allMatched = updated.every(c => c.encontrada);
          if (allMatched) {
            setAlerta('¡Ganaste El  Juego!');
            agregarResultado({ id: totalJuego + 1, resultado: 'Ha ganado', fecha: new Date().toLocaleString() });
          }
        } else {
          setAlerta('No son iguales. Fin del juego.');
          agregarResultado({ id: totalJuego + 1, resultado: 'Ha perdido', fecha: new Date().toLocaleString() });
          setTimeout(() => setJuegoComenzado(false), 1000);
        }
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [primerCarta, segundaCarta]);
  
  return (
  <View style={styles.container}>
    <Text style={styles.title}>Juego de Memoria</Text>

    {!juegoComenzado ? (
      <TouchableOpacity style={styles.startButton} onPress={CartaComenzar}>
        <Text style={styles.startButtonText}>Presiona para iniciar</Text>
      </TouchableOpacity>
    ) : (
      <View style={styles.grid}>
        {juego.map((carta) => (
          <TouchableOpacity
            key={carta.id}
            style={[
              styles.card,
              (carta.volteada || carta.encontrada) && styles.cardFlipped,
            ]}
            onPress={() => CartaClick(carta)}
            disabled={carta.volteada || carta.encontrada || !!segundaCarta}
          >
            <Text style={styles.cardText}>
              {(carta.volteada || carta.encontrada) ? carta.valor : ''}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    )}

 {alerta ? <Text style={styles.message}>{alerta}</Text> : null}
  </View>
);
}

  const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  startButton: {
    backgroundColor: '#3b82f6',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
    marginTop: 20,
  },
  card: {
    width: 70,
    height: 70,
    backgroundColor: '#444',
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
  cardFlipped: {
    backgroundColor: '#e0e0e0',
  },
  cardText: {
    fontSize: 24,
    color: '#000',
  },
  message: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#d32f2f',
  },
});




