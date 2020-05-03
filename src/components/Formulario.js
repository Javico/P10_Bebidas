import React, { useContext, useState } from 'react'
import { CategoriasContext } from '../context/CategoriasContext';
import { RecetasContext } from '../context/RecetasContext';

const Formulario = () => {

    const [busqueda, guardarBusqueda] = useState({
        nombre: '',
        categoria: ''
    })

    const { categorias } = useContext(CategoriasContext);
    const { buscarRecetas, guardarConsulta } = useContext(RecetasContext);

    // funcion para leer contenidos
    const obtenerDatosReceta = e => {
        guardarBusqueda({
            ...busqueda,
            [e.target.name] : e.target.value
        })
    }

    return (
        <form className="col-12" onSubmit={e =>{ 
                e.preventDefault();
                buscarRecetas(busqueda);
                guardarConsulta(true);
            }}
        >
            <fieldset className="text-center">
                <legend>Busca bebida por Categoría o Ingrediente</legend>
            </fieldset>

            <div className="row mt-4">
                <div className="col-md-4">
                    <input 
                        name="nombre" 
                        className="form-control" 
                        type="text" 
                        placeholder="Buscar por ingrediente" 
                        onChange={obtenerDatosReceta}
                    />
                </div>
                <div className="col-md-4">
                    <select name="categoria" className="form-control" onChange={obtenerDatosReceta} >
                        <option value="">-- Selecciona categoria --</option>
                        {categorias.map(categoria =>(
                            <option key={categoria.strCategory} value={categoria.strCategory}>{categoria.strCategory}</option>
                        ))}
                    </select>
                </div>
                <div className="col-md-4">
                    <input type="submit" className="btn btn-block btn-primary" value="Buscar bebidas" />
                </div>
            </div>
        </form>
    );
}

export default Formulario;