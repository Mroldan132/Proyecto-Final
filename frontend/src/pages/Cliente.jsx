import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import {
    listaCliente,
    clienteInsert,
    clienteUpdate,
    clienteDelete,
} from "../api/cliente";

export const Cliente = () => {
    const [clientes, setClientes] = useState([]);

    // Cargar clientes
    const fetchClientes = async () => {
        const response = await listaCliente();
        setClientes(response);
    };

    useEffect(() => {
        fetchClientes();
    }, []);

    // Crear o actualizar cliente
    const handleSave = async (idToEdit, formData) => {
        try {
            if (idToEdit) {
                await clienteUpdate(idToEdit, formData);
                Swal.fire("Actualizado", "El cliente se ha actualizado correctamente.", "success");
            } else {
                await clienteInsert(formData);
                Swal.fire("Guardado", "El nuevo cliente se ha guardado correctamente.", "success");
            }
            fetchClientes();
        } catch (error) {
            Swal.fire("Error", "Hubo un error al guardar el cliente.", "error");
        }
    };

    // Eliminar cliente
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
                await clienteDelete(id);
                Swal.fire("Eliminado", "El cliente ha sido eliminado correctamente.", "success");
                fetchClientes();
            } catch (error) {
                Swal.fire("Error", "Hubo un error al eliminar el cliente.", "error");
            }
        }
    };

    // Editar un cliente
    const handleEdit = (cliente) => {
        openModal(cliente);
    };

    // Abrir el modal
    const openModal = (cliente = null) => {
        let formDataTemp = { nombre: "", dni: "", email: "", telefono: "" };
        let idToEdit = null;
        if (cliente) {
            formDataTemp = { nombre: cliente.nombre, dni: cliente.dni, email: cliente.email, telefono: cliente.telefono };
            idToEdit = cliente._id;
        }

        Swal.fire({
            title: cliente ? "Editar Cliente" : "Nuevo Cliente",
            html: `
                <input id="nombre" class="swal2-input" placeholder="Nombre" value="${formDataTemp.nombre}" />
                <input id="dni" class="swal2-input" placeholder="DNI" value="${formDataTemp.dni}" />
                <input id="email" class="swal2-input" placeholder="Email" value="${formDataTemp.email}" />
                <input id="telefono" class="swal2-input" placeholder="Teléfono" value="${formDataTemp.telefono}" />
            `,
            focusConfirm: false,
            preConfirm: () => {
                const nombre = document.getElementById("nombre").value;
                const dni = document.getElementById("dni").value;
                const email = document.getElementById("email").value;
                const telefono = document.getElementById("telefono").value;
                return { nombre, dni, email, telefono, idToEdit };
            },
        }).then((result) => {
            if (result.isConfirmed) {
                const { idToEdit, nombre, dni, email, telefono } = result.value;
                handleSave(idToEdit, { nombre, dni, email, telefono });
            }
        });
    };

    return (
        <div className="container mt-4">
            <h2>Gestión de Clientes</h2>

            <button className="btn btn-primary mb-3" onClick={() => openModal()}>
                Nuevo Cliente
            </button>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>DNI</th>
                        <th>Email</th>
                        <th>Teléfono</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes.map((cliente, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{cliente.nombre}</td>
                            <td>{cliente.dni}</td>
                            <td>{cliente.email}</td>
                            <td>{cliente.telefono}</td>
                            <td>
                                <button
                                    className="btn btn-warning btn-sm me-2"
                                    onClick={() => handleEdit(cliente)}
                                >
                                    Editar
                                </button>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDelete(cliente._id)}
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
