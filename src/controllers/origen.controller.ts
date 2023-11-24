import { Request, Response } from "express";
import { getConnection } from "../config/server";
import { OrigenQuery } from "../queries/Origen.query";
import sql from "mssql";

const getOrigen = async (req: Request, res: Response) => {
    const pool = await getConnection();
    const result = await pool?.request().query(OrigenQuery.findAll);
    return res.status(200).send({ origen: result?.recordset })
}
const createOrigen = async ({ body }: Request, res: Response) => {
    const { codigo_de_viaje, codigo_origen } = body;
    const pool = await getConnection();
    await pool?.request()
        .input("codigo_de_viaje", sql.Int, codigo_de_viaje)
        .input("codigo_origen", sql.VarChar, codigo_origen)
        .query(OrigenQuery.create);
    return res.status(200).send({ message: "Creado correctamente" })
}
const updateOrigen = async ({ params, body }: Request, res: Response) => {
    const { id } = params;
    const { codigo_de_viaje, codigo_origen } = body;
    const pool = await getConnection();
    await pool?.request()
        .input("id", sql.Int, id)
        .input("codigo_de_viaje", sql.Int, codigo_de_viaje)
        .input("codigo_origen", sql.VarChar, codigo_origen)
        .query(OrigenQuery.update);
    return res.status(200).send({ message: "Actualizado correctamente" })
}
const deleteOrigen = async ({ params }: Request, res: Response) => {
    const { id } = params;
    const pool = await getConnection();
    await pool?.request()
        .input("codigo_de_viaje", sql.Int, id)
        .query(OrigenQuery.delete);
    return res.status(200).send({ message: "Eliminado correctamente" })
}

export { getOrigen, createOrigen, updateOrigen, deleteOrigen };