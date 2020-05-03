import React, { createContext, useState, useEffect } from 'react'
import Axios from 'axios';

export const ModalContext = createContext();

const ModalProvider = (props) => {

    // state dle provider
    const [idreceta, guardarIdReceta] = useState(null);
    const [informacion,guardarReceta] = useState({});

    // una vez que tenemos una receta, llamar a la api
    useEffect(() => {
        const obtenerReceta = async () =>{
            if(!idreceta) return;

            const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idreceta}`;

            const resulta = await Axios.get(url);

            //console.log(resulta.data.drinks[0]);
            guardarReceta(resulta.data.drinks[0]);
        }
        obtenerReceta();
    }, [idreceta])

    return (
        <ModalContext.Provider
            value={{
                informacion,
                guardarIdReceta,
                guardarReceta
            }}
        >
            {props.children}
        </ModalContext.Provider>
    );
}

export default ModalProvider;