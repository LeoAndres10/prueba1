import React, { useEffect, useState } from 'react';
import { Juego } from '../Modelos/Juego';
import { useJuego } from '../Providers/JuegoProvider'
export default function CartaComponente(){

const letras = ['A', 'B', 'C', 'D'];

const cartasVolteadas = (): Juego[] => {
  const valores = [...letras, ...letras];
  const volteadas = valores.sort(() => Math.random() - 0.5);
  return volteadas.map((value, index) => ({
    id: index,
    value,
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

  const CartaLevantada = () => {
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
          setMessage('No son iguales. Fin del juego.');
          addGameResult({ id: totalGames + 1, result: 'Perdió', date: new Date().toLocaleString() });
          setTimeout(() => setGameStarted(false), 1000);
        }
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [firstCard, secondCard]);
}
}

