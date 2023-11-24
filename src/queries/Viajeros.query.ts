export const ViajerosQuery = {
    findAll: "SELECT dni,nombre,direccion,telefono FROM viajeros WHERE estado = @estado",
    create: "INSERT INTO viajeros (nombre, direccion, telefono) VALUES (@nombre, @direccion, @telefono)",
    update: "UPDATE viajeros SET nombre = @nombre, direccion = @direccion, telefono = @telefono WHERE dni = @id",
    delete: "UPDATE viajeros SET estado = @estado WHERE dni = @id",
};