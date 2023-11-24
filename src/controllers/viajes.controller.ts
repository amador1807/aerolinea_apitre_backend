import { Request, Response } from "express";
import sql from "mssql";

import { getConnection } from "../config/server";
import { ViajesQuery } from "../queries/Viajes.query";
import { OrigenQuery } from "../queries/Origen.query";
import { DestinoQuery } from "../queries/Destino.query";
import { RefFamQuery } from "../queries/ReferenciaFamiliar.query";

const getViajes = async (req: Request, res: Response) => {
    try {
        const estado = 1;
        const pool = await getConnection();
        const result = await pool?.request()
            .input("estado", sql.Bit, estado)
            .query(ViajesQuery.findAll);
        const viajes = result?.recordset.map((row) => {
            return {
                codigo_de_viaje: row.codigo_de_viaje,
                viajero: {
                    dni: row.dni,
                    nombre: row.nombre,
                    direccion: row.direccion,
                    telefono: row.telefono
                },
                numero_plazas: row.numero_plazas,
                frv: row.frv,
            };
        });
        return res.status(200).send({ viajes: viajes })
    } catch (error) {
        return res.status(500).send({ message: 'Error en consulta', error: error })
    }
};
const createViaje = async ({ body }: Request, res: Response) => {
    try {
        const { dni, numero_plazas, frv } = body;
        const pool = await getConnection();
        await pool?.request()
            .input("dni", sql.Int, dni)
            .input("numero_plazas", sql.Int, numero_plazas)
            .input("frv", sql.VarChar, frv)
            .query(ViajesQuery.create);

        return res.status(200).send({ messsage: "Viaje registrado correctamente" })
    } catch (error) {
        return res.status(500).send({ message: 'Error en consulta', error: error })
    }
};
const updateViaje = async ({ params, body }: Request, res: Response) => {
    try {
        const { id: codigo_de_viaje } = params;
        const { dni, dni_familiar, numero_plazas, frv, codigo_origen, codigo_destino, nombre, apellido, direccion, telefono } = body;
        const pool = await getConnection();

        await pool?.request()
            .input("codigo_de_viaje", sql.Int, codigo_de_viaje)
            .input("dni", sql.Int, dni)
            .input("numero_plazas", sql.Int, numero_plazas)
            .input("frv", sql.VarChar, frv)
            .query(ViajesQuery.update);

        // await pool?.request()
        //     .input("codigo_de_viaje", sql.Int, codigo_de_viaje)
        //     .input("codigo_origen", sql.VarChar, codigo_origen)
        //     .query(OrigenQuery.update);

        // await pool?.request()
        //     .input("codigo_de_viaje", sql.Int, codigo_de_viaje)
        //     .input("codigo_destino", sql.VarChar, codigo_destino)
        //     .query(DestinoQuery.update);

        // await pool?.request()
        //     .input("dni_familiar", sql.Int, dni_familiar)
        //     .input("dni", sql.Int, dni)
        //     .input("codigo_de_viaje", sql.Int, codigo_de_viaje)
        //     .input("nombre", sql.VarChar, nombre)
        //     .input("apellido", sql.VarChar, apellido)
        //     .input("direccion", sql.VarChar, direccion)
        //     .input("telefono", sql.VarChar, telefono)
        //     .query(RefFamQuery.update);
        return res.status(200).send({ messsage: "Viaje actualizado correctamente" })
    } catch (error) {
        return res.status(500).send({ message: 'Error en consulta', error: error })
    }
};
const deleteViaje = async ({ params }: Request, res: Response) => {
    try {
        const { id } = params;
        const estado = 0;
        if (!id) return res.status(400).send({ error: "Es necesario una ID" })
        const pool = await getConnection();
        await pool?.request()
            .input("id", sql.Int, id)
            .input("estado", sql.Bit, estado)
            .query(ViajesQuery.delete);
        return res.status(200).send({ message: "Viajero eliminado correctamente" })
    } catch (error) {
        return res.status(500).send({ message: 'Error en consulta', error: error })
    }
};

export { getViajes, createViaje, updateViaje, deleteViaje };
