import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { listaOrden, ordenInsert, ordenUpdate, ordenDelete } from "../api/orden";
import { listaPlato } from "../api/plato";  // Importa la función listaPlato

export const Orden = () => {
    const [ordenes, setOrdenes] = useState([]);
    const [platos, setPlatos] = useState([]);  // Estado para los platos

    // Cargar órdenes
    const fetchOrdenes = async () => {
        const response = await listaOrden();
        setOrdenes(response);
    };

    // Cargar platos
    const fetchPlatos = async () => {
        const response = await listaPlato();
        setPlatos(response);
    };

    useEffect(() => {
        fetchOrdenes();
        fetchPlatos();  // Llama a la función para cargar los platos
    }, []);

    // Crear o actualizar orden
    const handleSave = async (idToEdit, formData) => {
        try {
            if (idToEdit) {
                await ordenUpdate(idToEdit, formData);
                Swal.fire("Actualizado", "La orden se ha actualizado correctamente.", "success");
            } else {
                await ordenInsert(formData);
                Swal.fire("Guardado", "La nueva orden se ha guardado correctamente.", "success");
            }
            fetchOrdenes();
        } catch (error) {
            Swal.fire("Error", "Hubo un error al guardar la orden.", "error");
        }
    };

    // Eliminar orden
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
                await ordenDelete(id);
                Swal.fire("Eliminado", "La orden ha sido eliminada correctamente.", "success");
                fetchOrdenes();
            } catch (error) {
                Swal.fire("Error", "Hubo un error al eliminar la orden.", "error");
            }
        }
    };

    // Editar una orden
    const handleEdit = (orden) => {
        openModal(orden);
    };

    // Abrir el modal
    const openModal = (orden = null) => {
        let formDataTemp = { mesa: "", nroDeOrden: "", platillos: "", cantidades: "", estado: "" };
        let idToEdit = null;
        if (orden) {
            formDataTemp = {
                mesa: orden.mesa,
                nroDeOrden: orden.nroDeOrden,
                platillos: orden.platillos,
                cantidades: orden.cantidades,
                estado: orden.estado,
            };
            idToEdit = orden._id;
        }

        // Generar opciones del select
        const platilloOptions = platos.map(plato => `
            <option value="${plato._id}" ${formDataTemp.platillos === plato._id ? 'selected' : ''}>
                ${plato.nombre}
            </option>
        `).join('');

        Swal.fire({
            title: orden ? "Editar Orden" : "Nueva Orden",
            html: `
                <input id="mesa" class="swal2-input" placeholder="Mesa" value="${formDataTemp.mesa}" />
                <input id="nroDeOrden" class="swal2-input" placeholder="Número de Orden" value="${formDataTemp.nroDeOrden}" />
                <select id="platillos" class="swal2-input">
                    <option value="">Selecciona un Platillo</option>
                    ${platilloOptions}
                </select>
                <input id="cantidades" class="swal2-input" placeholder="Cantidades" value="${formDataTemp.cantidades}" />
                <input id="estado" class="swal2-input" placeholder="Estado" value="${formDataTemp.estado}" />
            `,
            focusConfirm: false,
            preConfirm: () => {
                const mesa = document.getElementById("mesa").value;
                const nroDeOrden = document.getElementById("nroDeOrden").value;
                const platillos = document.getElementById("platillos").value;
                const cantidades = document.getElementById("cantidades").value;
                const estado = document.getElementById("estado").value;
                return { mesa, nroDeOrden, platillos, cantidades, estado, idToEdit };
            },
        }).then((result) => {
            if (result.isConfirmed) {
                const { idToEdit, mesa, nroDeOrden, platillos, cantidades, estado } = result.value;
                handleSave(idToEdit, { mesa, nroDeOrden, platillos, cantidades, estado });
            }
        });
    };

    return (
        <div className="container mt-4">
            <h2>Gestión de Órdenes</h2>

            <button className="btn btn-primary mb-3" onClick={() => openModal()}>
                Nueva Orden
            </button>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Mesa</th>
                        <th>Número de Orden</th>
                        <th>Platillos</th>
                        <th>Cantidades</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {ordenes.map((orden, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{orden.mesa}</td>
                            <td>{orden.nroDeOrden}</td>
                            <td>{platos.find(c => c._id === orden.platillos[0])?.nombre || 'Sin Platillo' }</td>
                            <td>{orden.cantidades}</td>
                            <td>{orden.estado}</td>
                            <td>
                                <button
                                    className="btn btn-warning btn-sm me-2"
                                    onClick={() => handleEdit(orden)}
                                >
                                    Editar
                                </button>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDelete(orden._id)}
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
