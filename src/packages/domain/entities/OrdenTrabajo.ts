export type EstadoOT = 
  | 'Recepción'
  | 'Diagnóstico' 
  | 'Cotizado'
  | 'Aprobado'
  | 'EnProceso'
  | 'Pruebas'
  | 'Listo'
  | 'Entregado'
  | 'Cerrado';

export interface OrdenTrabajo {
  id: string;
  vehiculoId: string;
  fechaIngreso: Date;
  estado: EstadoOT;
  odometroIngreso: number;
  nivelCombustible: string;
  observaciones?: string;
  fechaEstimadaEntrega?: Date;
  fotosUrl: string[];
  servicios?: ServicioOT[];
  repuestos?: RepuestoOT[];
  total?: number;
}

export interface ServicioOT {
  id: string;
  descripcion: string;
  precio: number;
  cantidad: number;
}

export interface RepuestoOT {
  id: string;
  descripcion: string;
  precio: number;
  cantidad: number;
}