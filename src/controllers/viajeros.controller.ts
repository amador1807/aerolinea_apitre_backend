import { Request, Response, query } from "express";
import { getConnection } from "../config/server";
import sql from "mssql";
import { ViajerosQuery } from "../queries/Viajeros.query";

const getViajeros = async (req: Request, res: Response) => {
    const pool = await getConnection();
    const estado = 1;
    const result = await pool?.request()
        .input("estado", sql.Bit, estado)
        .query(ViajerosQuery.findAll);
    return res.status(200).send({ viajeros: result?.recordset })
}
const createViajero = async ({ body }: Request, res: Response) => {
    try {
        const { nombre, direccion, telefono } = body
        const pool = await getConnection();
        await pool?.request()
            .input("nombre", sql.VarChar, nombre)
            .input("direccion", sql.VarChar, direccion)
            .input("telefono", sql.VarChar, telefono)
            .query(ViajerosQuery.create);
        return res.status(200).send({ message: 'Viajero registrado correctamente' })
    } catch (error) {
        return res.status(500).send({ message: 'Error en consulta', error: error })
    }
}
const updateViajero = async ({ params, body }: Request, res: Response) => {
    try {
        const { id } = params;
        const { nombre, direccion, telefono } = body;
        if (!id) return res.status(400).send({ error: "Es necesario una ID" })
        const pool = await getConnection();
        await pool?.request()
            .input("id", sql.Int, id)
            .input("nombre", sql.VarChar, nombre)
            .input("direccion", sql.VarChar, direccion)
            .input("telefono", sql.VarChar, telefono)
            .query(ViajerosQuery.update)
        return res.status(200).send({ message: "Viajero actualizado correctamente" })
    } catch (error) {
        return res.status(500).send({ message: 'Error en consulta', error: error })
    }
}
const deleteViajero = async ({ params }: Request, res: Response) => {
    try {
        const { id } = params;
        const estado = 0;
        if (!id) return res.status(400).send({ error: "Es necesario una ID" })
        const pool = await getConnection();
        await pool?.request()
            .input("id", sql.Int, id)
            .input("estado", sql.Bit, estado)
            .query(ViajerosQuery.delete);
        return res.status(200).send({ message: "Viajero eliminado correctamente" })
    } catch (error) {
        return res.status(500).send({ message: 'Error en consulta', error: error })
    }
}

export { getViajeros, createViajero, updateViajero, deleteViajero };