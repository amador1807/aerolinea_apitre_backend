export const OrigenQuery = {
    findAll: "SELECT * FROM origen",
    create: "INSERT INTO origen (codigo_de_viaje, codigo_origen) VALUES (@codigo_de_viaje, @codigo_origen)",
    update: "UPDATE origen SET codigo_de_viaje = @codigo_de_viaje,codigo_origen = @codigo_origen WHERE codigo_de_viaje = @id ",
    delete: "DELETE FROM origen WHERE codigo_de_viaje = @codigo_de_viaje "
};