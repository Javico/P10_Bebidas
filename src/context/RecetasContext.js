import React, { createContext, useState, useEffect } from 'react'
import Axios from 'axios';

export const RecetasContext = createContext();

const RecetasProvider = (props) => {

    const [busqueda, buscarRecetas] = useState({
        nombre: '',
        categoria: '' 
    })
    
    const [recetas, guardarRecetas] = useState([])

    const [consultar, guardarConsulta] = useState(false);

    const {nombre, categoria} = busqueda;

    useEffect(() => {
        if(consultar){
            const obtenerRecetas = async () =>{
                const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${nombre}&c=${categoria}`;
    
                const recetas = await Axios.get(url);

                //console.log(recetas.data.drinks);
                guardarRecetas(recetas.data.drinks);
            }

            obtenerRecetas();
        }

    }, [busqueda])

    return (
        <RecetasContext.Provider
            value={{
                recetas,
                buscarRecetas,
                guardarConsulta
            }}
        >
            {props.children}
        </RecetasContext.Provider>
    );
}

export default RecetasProvider;