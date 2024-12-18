import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import {
    listaCategoria,
    categoriaInsert,
    categoriaUpdate,
    categoriaDelete,
} from "../api/categoria";

export const Categoria = () => {
    const [categorias, setCategorias] = useState([]);

    // Cargar categorías
    const fetchCategorias = async () => {
        try {
            const response = await listaCategoria();
            setCategorias(response);
        } catch (error) {
            Swal.fire("Error", "Hubo un error al cargar las categorías.", "error");
        }
    };

    useEffect(() => {
        fetchCategorias();
    }, []);

    // Crear o actualizar categoría
    const handleSave = async (idToEdit,formData) => {
        try {
            if (idToEdit) {
                await categoriaUpdate(idToEdit, formData);
                Swal.fire("Actualizado", "La categoría se ha actualizado correctamente.", "success");
            } else {
                await categoriaInsert(formData);
                Swal.fire("Guardado", "La nueva categoría se ha guardado correctamente.", "success");
            }
            fetchCategorias();
        } catch (error) {
            Swal.fire("Error", "Hubo un error al guardar la categoría.", "error");
        }
    };

    // Eliminar categoría
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
                await categoriaDelete(id);
                Swal.fire("Eliminado", "La categoría ha sido eliminada correctamente.", "success");
                fetchCategorias();
            } catch (error) {
                Swal.fire("Error", "Hubo un error al eliminar la categoría.", "error");
            }
        }
    };

    // Editar una categoría
    const handleEdit = (categoria) => {
        openModal(categoria);
    };

    // Abrir el modal
    const openModal = (categoria = null) => {
        let formDataTemp = { nombre: "", descripcion: "" };
        let idToEdit = null;
        if (categoria) {
            formDataTemp = { nombre: categoria.nombre, descripcion: categoria.descripcion };
            idToEdit = categoria._id;
        }

        Swal.fire({
            title: categoria ? "Editar Categoría" : "Nueva Categoría",
            html: `
                <input id="nombre" class="swal2-input" placeholder="Nombre" value="${formDataTemp.nombre}" />
                <input id="descripcion" class="swal2-input" placeholder="Descripción" value="${formDataTemp.descripcion}" />
            `,
            focusConfirm: false,
            preConfirm: () => {
                const nombre = document.getElementById("nombre").value;
                const descripcion = document.getElementById("descripcion").value;
                return { nombre, descripcion ,idToEdit} ;
            },
        }).then((result) => {
            if (result.isConfirmed) {
                const { idToEdit, nombre, descripcion } = result.value; 
                handleSave(idToEdit, { nombre, descripcion });
            }
        });
    };

    return (
        <div className="container mt-4">
            <h2>Gestión de Categorías</h2>

            <button className="btn btn-primary mb-3" onClick={() => openModal()}>
                Nueva Categoría
            </button>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {categorias.map((categoria,index) => (
                        <tr key={index}>
                            <td>{index + 1 }</td>
                            <td>{categoria.nombre}</td>
                            <td>{categoria.descripcion}</td>
                            <td>
                                <button
                                    className="btn btn-warning btn-sm me-2"
                                    onClick={() => handleEdit(categoria)}
                                >
                                    Editar
                                </button>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDelete(categoria._id)}
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
