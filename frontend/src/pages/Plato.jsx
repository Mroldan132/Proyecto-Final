import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import {
    listaPlato,
    platoInsert,
    platoUpdate,
    platoDelete,
} from "../api/plato";
import { listaCategoria } from "../api/categoria"; // Asegúrate de importar listaCategoria

export const Plato = () => {
    const [platos, setPlatos] = useState([]);
    const [categorias, setCategorias] = useState([]);

    // Cargar platos
    const fetchPlatos = async () => {
        const response = await listaPlato();
        setPlatos(response);
    };

    // Cargar categorías
    const fetchCategorias = async () => {
        const response = await listaCategoria();
        setCategorias(response);
    };

    useEffect(() => {
        fetchPlatos();
        fetchCategorias(); // Cargar categorías cuando se cargue el componente
    }, []);

    // Crear o actualizar plato
    const handleSave = async (idToEdit, formData) => {
        try {
            if (idToEdit) {
                await platoUpdate(idToEdit, formData);
                Swal.fire("Actualizado", "El plato se ha actualizado correctamente.", "success");
            } else {
                await platoInsert(formData);
                Swal.fire("Guardado", "El nuevo plato se ha guardado correctamente.", "success");
            }
            fetchPlatos();
        } catch (error) {
            Swal.fire("Error", "Hubo un error al guardar el plato.", "error");
        }
    };

    // Eliminar plato
    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "¿Estás seguro?",
            text: "¡No podrás revertir esta acción!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
        });

        if (result.isConfirmed) {
            try {
                await platoDelete(id);
                Swal.fire("Eliminado", "El plato ha sido eliminado correctamente.", "success");
                fetchPlatos();
            } catch (error) {
                Swal.fire("Error", "Hubo un error al eliminar el plato.", "error");
            }
        }
    };

    // Editar un plato
    const handleEdit = (plato) => {
        openModal(plato);
    };

    // Abrir el modal
    const openModal = (plato = null) => {
        let formDataTemp = { nombre: "", descripcion: "", precio: "", categoria: "" };
        let idToEdit = null;
        if (plato) {
            formDataTemp = { nombre: plato.nombre, descripcion: plato.descripcion, precio: plato.precio, categoria: plato.categoria }; // Asumiendo que categoria es un objeto con _id
            idToEdit = plato._id;
        }

        Swal.fire({
            title: plato ? "Editar Plato" : "Nuevo Plato",
            html: `
                <input id="nombre" class="swal2-input" placeholder="Nombre" value="${formDataTemp.nombre}" />
                <input id="descripcion" class="swal2-input" placeholder="Descripción" value="${formDataTemp.descripcion}" />
                <input id="precio" class="swal2-input" placeholder="Precio" value="${formDataTemp.precio}" />
                <select id="categoria" class="swal2-select">
                    <option value="">Seleccionar categoría</option>
                    ${categorias.map(categoria => `
                        <option value="${categoria._id}" ${categoria._id === formDataTemp.categoria ? 'selected' : ''}>
                            ${categoria.nombre}
                        </option>
                    `).join('')}
                </select>
            `,
            focusConfirm: false,
            preConfirm: () => {
                const nombre = document.getElementById("nombre").value;
                const descripcion = document.getElementById("descripcion").value;
                const precio = document.getElementById("precio").value;
                const categoria = document.getElementById("categoria").value;
                return { nombre, descripcion, precio, categoria, idToEdit };
            },
        }).then((result) => {
            if (result.isConfirmed) {
                const { idToEdit, nombre, descripcion, precio, categoria } = result.value;
                handleSave(idToEdit, { nombre, descripcion, precio, categoria });
            }
        });
    };

    return (
        <div className="container mt-4">
            <h2>Gestión de Platos</h2>

            <button className="btn btn-primary mb-3" onClick={() => openModal()}>
                Nuevo Plato
            </button>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Precio</th>
                        <th>Categoría</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {platos.map((plato, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{plato.nombre}</td>
                            <td>{plato.descripcion}</td>
                            <td>{plato.precio}</td>
                            <td>{(categorias.find(c => c._id === plato.categoria)?.nombre) || 'Sin categoría'}</td>
                            <td>
                                <button
                                    className="btn btn-warning btn-sm me-2"
                                    onClick={() => handleEdit(plato)}
                                >
                                    Editar
                                </button>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDelete(plato._id)}
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
