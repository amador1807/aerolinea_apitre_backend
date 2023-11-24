export interface Viajeros {
    nombre: string;
    direccion: string;
    telefono: string;
}
export interface ReferenciaFamiliar {
    dni: number;
    codigo_de_viaje: number;
    nombre: string;
    apellido: string;
    direccion: string;
    telefono: string;
}
export interface Viajes {
    numero_plazas: string;
    frv: string;
    codigo_origen: string;
    codigo_destino: string;
    referencia_familiar: ReferenciaFamiliar;
}