export const DestinoQuery = {
    findAll: "SELECT * FROM destino",
    create: "INSERT INTO destino (codigo_de_viaje, codigo_destino) VALUES (@codigo_de_viaje, @codigo_destino)",
    update: "UPDATE destino SET codigo_de_viaje = @codigo_de_viaje ,codigo_destino = @codigo_destino WHERE codigo_de_viaje = @id ",
    delete: "DELETE FROM destino WHERE codigo_de_viaje = @codigo_de_viaje "
};