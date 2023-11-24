export const RefFamQuery = {
    findAll: "SELECT * FROM referencia_familiares",
    create: "INSERT INTO referencia_familiares (dni,codigo_de_viaje,nombre,apellido,direccion,telefono) VALUES (@dni,@codigo_de_viaje,@nombre,@apellido,@direccion,@telefono)",
    update: `
    UPDATE referencia_familiares SET
    dni = @dni,
    codigo_de_viaje = @codigo_de_viaje,
    nombre = @nombre,
    apellido = @apellido,
    direccion = @direccion,
    telefono = @telefono
    WHERE dni_familiar = @id
    `,
    delete: "DELETE FROM referencia_familiares WHERE dni_familiar = @id",
};