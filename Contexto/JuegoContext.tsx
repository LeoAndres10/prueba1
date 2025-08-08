import { createContext } from "react";
import { Resultados } from "../Modelos/Resultados";
export const JuegoContext= createContext({
    listaResultados:[] as Resultados[],
    agregarResultado:(resultado:Resultados)=>{},
    totalJuego: 0 as number
})