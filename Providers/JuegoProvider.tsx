import { useContext, useState } from "react";
import { Plantilla } from "../Modelos/Plantilla";
import { Resultados } from "../Modelos/Resultados";
import { JuegoContext } from "../Contexto/JuegoContext";

export default function JuegoProvider({children}:Plantilla){

    const [listaResultados,setListaResultados]= useState<Resultados[]>([]);
    
    function agregarResultado(resultado:Resultados){
        setListaResultados([...listaResultados,resultado]);

    }
    const [totalJuego,setTotalJuego] = useState<number>(listaResultados.length);
    return(
        <JuegoContext.Provider value={{listaResultados,agregarResultado,totalJuego}}>
            {children}
        </JuegoContext.Provider>
    )

    
}
export function useJuego(){
        return useContext(JuegoContext);
    }