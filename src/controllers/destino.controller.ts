import { Request, Response } from "express";
import { getConnection } from "../config/server";
import { DestinoQuery } from "../queries/Destino.query";
import sql from "mssql";

const getDestino = async (req: Request, res: Response) => {
    const pool = await getConnection();
    const result = await pool?.request().query(DestinoQuery.findAll);
    return res.status(200).send({ destino: result?.recordset })
}
const createDestino = async ({ body }: Request, res: Response) => {
    const { codigo_de_viaje, codigo_destino } = body;
    const pool = await getConnection();
    await pool?.request()
        .input("codigo_de_viaje", sql.Int, codigo_de_viaje)
        .input("codigo_destino", sql.VarChar, codigo_destino)
        .query(DestinoQuery.create);
    return res.status(200).send({ message: "Creado correctamente" })
}
const updateDestino = async ({ params, body }: Request, res: Response) => {
    const { id } = params;
    const { codigo_de_viaje, codigo_destino } = body;
    const pool = await getConnection();
    await pool?.request()
        .input("id", sql.Int, id)
        .input("codigo_de_viaje", sql.Int, codigo_de_viaje)
        .input("codigo_destino", sql.VarChar, codigo_destino)
        .query(DestinoQuery.update);
    return res.status(200).send({ message: "Actualizado correctamente" })
}
const deleteDestino = async ({ params }: Request, res: Response) => {
    const { id } = params;
    const pool = await getConnection();
    await pool?.request()
        .input("codigo_de_viaje", sql.Int, id)
        .query(DestinoQuery.delete);
    return res.status(200).send({ message: "Eliminado correctamente" })
}

export { getDestino, createDestino, updateDestino, deleteDestino };