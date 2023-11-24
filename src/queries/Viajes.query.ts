export const ViajesQuery = {
    findAll: `
    SELECT
    v.codigo_de_viaje,
    v.numero_plazas,
    v.frv,
    vj.dni,
    vj.nombre,
    vj.direccion,
    vj.telefono
    FROM viajes v
    INNER JOIN viajeros vj ON v.dni = vj.dni
    WHERE v.estado = @estado
    `,
    create: "INSERT INTO viajes (dni, numero_plazas, frv) OUTPUT INSERTED.* VALUES (@dni, @numero_plazas, @frv)",
    update: "UPDATE viajes SET dni = @dni, numero_plazas = @numero_plazas, frv = @frv WHERE codigo_de_viaje = @codigo_de_viaje",
    delete: "UPDATE viajes SET estado = @estado WHERE codigo_de_viaje = @id",
};