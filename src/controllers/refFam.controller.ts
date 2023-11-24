import { Request, Response } from "express";
import { getConnection } from "../config/server";
import { RefFamQuery } from "../queries/ReferenciaFamiliar.query";
import sql from "mssql";

const getRefs = async (req: Request, res: Response) => {
    const pool = await getConnection();
    const result = await pool?.request().query(RefFamQuery.findAll);
    return res.status(200).send({ referencias: result?.recordset })
}
const createRefs = async ({ body }: Request, res: Response) => {
    const { dni, codigo_de_viaje, nombre, apellido, direccion, telefono } = body;
    const pool = await getConnection();
    await pool?.request()
        .input("dni", sql.Int, dni)
        .input("codigo_de_viaje", sql.Int, codigo_de_viaje)
        .input("nombre", sql.VarChar, nombre)
        .input("apellido", sql.VarChar, apellido)
        .input("direccion", sql.VarChar, direccion)
        .input("telefono", sql.VarChar, telefono)
        .query(RefFamQuery.create);
    return res.status(200).send({ message: "Creado correctamente" })
}
const updateRefs = async ({ params, body }: Request, res: Response) => {
    const { id } = params;
    const { dni, codigo_de_viaje, nombre, apellido, direccion, telefono } = body;
    const pool = await getConnection();
    await pool?.request()
        .input("id", sql.Int, id)
        .input("dni", sql.Int, dni)
        .input("codigo_de_viaje", sql.Int, codigo_de_viaje)
        .input("nombre", sql.VarChar, nombre)
        .input("apellido", sql.VarChar, apellido)
        .input("direccion", sql.VarChar, direccion)
        .input("telefono", sql.VarChar, telefono)
        .query(RefFamQuery.update);
    return res.status(200).send({ message: "Actualizado correctamente" })
}
const deleteRefs = async ({ params }: Request, res: Response) => {
    const { id } = params;
    const pool = await getConnection();
    await pool?.request()
        .input("id", sql.Int, id)
        .query(RefFamQuery.delete);
    return res.status(200).send({ message: "Eliminado correctamente" })
}

export { getRefs, createRefs, updateRefs, deleteRefs };