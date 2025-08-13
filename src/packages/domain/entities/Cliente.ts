export interface Cliente {
  id: string;
  tipoDoc: 'CC' | 'CE' | 'NIT' | 'PP';
  numeroDoc: string;
  nombre: string;
  telefono: string;
  email?: string;
  direccion?: string;
  consentimientoComunicaciones: boolean;
  fechaRegistro: Date;
}