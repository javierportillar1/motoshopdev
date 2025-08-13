export interface Vehiculo {
  id: string;
  clienteId: string;
  placa: string;
  vin?: string;
  marca: string;
  lineaModelo: string;
  anio: number;
  cilindrajeCc: number;
  color: string;
  kmActual: number;
  soatVence?: Date;
  tecnomecanicaVence?: Date;
  fechaRegistro: Date;
}

export interface MarcaVehiculo {
  id: string;
  nombre: string;
  modelos: ModeloVehiculo[];
}

export interface ModeloVehiculo {
  id: string;
  nombre: string;
  cilindrajeCc: number;
  tipo: 'Urbana' | 'Deportiva' | 'Touring' | 'Enduro' | 'Scooter';
  especificaciones: {
    potencia?: string;
    torque?: string;
    transmision?: string;
    arranque?: string;
    tanqueCombustible?: string;
    peso?: string;
  };
}