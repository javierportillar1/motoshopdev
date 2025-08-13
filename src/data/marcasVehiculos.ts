import { MarcaVehiculo } from '../packages/domain/entities/Vehiculo';

export const marcasVehiculos: MarcaVehiculo[] = [
  {
    id: 'honda',
    nombre: 'HONDA',
    modelos: [
      {
        id: 'cb150-invicta',
        nombre: 'CB 150 Invicta',
        cilindrajeCc: 150,
        tipo: 'Urbana',
        especificaciones: {
          potencia: '12.73 HP @ 8,500 rpm',
          torque: '12.8 Nm @ 6,500 rpm',
          transmision: '5 velocidades',
          arranque: 'Eléctrico y pedal',
          tanqueCombustible: '13 litros',
          peso: '134 kg'
        }
      },
      {
        id: 'cb125f',
        nombre: 'CB 125F',
        cilindrajeCc: 125,
        tipo: 'Urbana',
        especificaciones: {
          potencia: '10.9 HP @ 8,000 rpm',
          torque: '10.3 Nm @ 6,000 rpm',
          transmision: '5 velocidades',
          arranque: 'Eléctrico y pedal',
          tanqueCombustible: '13 litros',
          peso: '126 kg'
        }
      },
      {
        id: 'xr150l',
        nombre: 'XR 150L',
        cilindrajeCc: 150,
        tipo: 'Enduro',
        especificaciones: {
          potencia: '12.8 HP @ 8,000 rpm',
          torque: '12.8 Nm @ 6,500 rpm',
          transmision: '5 velocidades',
          arranque: 'Eléctrico y pedal',
          tanqueCombustible: '12 litros',
          peso: '140 kg'
        }
      }
    ]
  },
  {
    id: 'yamaha',
    nombre: 'YAMAHA',
    modelos: [
      {
        id: 'fz16',
        nombre: 'FZ16',
        cilindrajeCc: 150,
        tipo: 'Deportiva',
        especificaciones: {
          potencia: '13.8 HP @ 8,000 rpm',
          torque: '12.8 Nm @ 6,000 rpm',
          transmision: '5 velocidades',
          arranque: 'Eléctrico',
          tanqueCombustible: '14 litros',
          peso: '132 kg'
        }
      },
      {
        id: 'crypton',
        nombre: 'Crypton',
        cilindrajeCc: 115,
        tipo: 'Urbana',
        especificaciones: {
          potencia: '8.2 HP @ 7,500 rpm',
          torque: '8.6 Nm @ 5,500 rpm',
          transmision: '4 velocidades',
          arranque: 'Eléctrico y pedal',
          tanqueCombustible: '12.2 litros',
          peso: '108 kg'
        }
      },
      {
        id: 'xtz125',
        nombre: 'XTZ 125',
        cilindrajeCc: 125,
        tipo: 'Enduro',
        especificaciones: {
          potencia: '10.3 HP @ 8,000 rpm',
          torque: '9.6 Nm @ 6,500 rpm',
          transmision: '5 velocidades',
          arranque: 'Eléctrico y pedal',
          tanqueCombustible: '9.6 litros',
          peso: '116 kg'
        }
      }
    ]
  },
  {
    id: 'suzuki',
    nombre: 'SUZUKI',
    modelos: [
      {
        id: 'gn125',
        nombre: 'GN 125',
        cilindrajeCc: 125,
        tipo: 'Urbana',
        especificaciones: {
          potencia: '11 HP @ 8,500 rpm',
          torque: '9.5 Nm @ 6,500 rpm',
          transmision: '5 velocidades',
          arranque: 'Eléctrico y pedal',
          tanqueCombustible: '12 litros',
          peso: '121 kg'
        }
      },
      {
        id: 'gixxer150',
        nombre: 'Gixxer 150',
        cilindrajeCc: 150,
        tipo: 'Deportiva',
        especificaciones: {
          potencia: '13.4 HP @ 8,000 rpm',
          torque: '13.4 Nm @ 6,000 rpm',
          transmision: '5 velocidades',
          arranque: 'Eléctrico',
          tanqueCombustible: '12 litros',
          peso: '140 kg'
        }
      }
    ]
  },
  {
    id: 'akt',
    nombre: 'AKT',
    modelos: [
      {
        id: 'nkd125',
        nombre: 'NKD 125',
        cilindrajeCc: 125,
        tipo: 'Urbana',
        especificaciones: {
          potencia: '8.5 HP @ 7,500 rpm',
          torque: '9.5 Nm @ 6,000 rpm',
          transmision: '4 velocidades',
          arranque: 'Eléctrico y pedal',
          tanqueCombustible: '14 litros',
          peso: '115 kg'
        }
      },
      {
        id: 'evo150',
        nombre: 'EVO 150',
        cilindrajeCc: 150,
        tipo: 'Deportiva',
        especificaciones: {
          potencia: '12.5 HP @ 8,500 rpm',
          torque: '11.8 Nm @ 7,000 rpm',
          transmision: '5 velocidades',
          arranque: 'Eléctrico',
          tanqueCombustible: '16 litros',
          peso: '138 kg'
        }
      }
    ]
  },
  {
    id: 'hero',
    nombre: 'HERO',
    modelos: [
      {
        id: 'hunk150',
        nombre: 'Hunk 150',
        cilindrajeCc: 150,
        tipo: 'Deportiva',
        especificaciones: {
          potencia: '13.2 HP @ 8,000 rpm',
          torque: '12.8 Nm @ 6,500 rpm',
          transmision: '5 velocidades',
          arranque: 'Eléctrico',
          tanqueCombustible: '12.8 litros',
          peso: '144 kg'
        }
      },
      {
        id: 'eco100',
        nombre: 'Eco 100',
        cilindrajeCc: 100,
        tipo: 'Urbana',
        especificaciones: {
          potencia: '7.5 HP @ 8,000 rpm',
          torque: '7.5 Nm @ 5,500 rpm',
          transmision: '4 velocidades',
          arranque: 'Eléctrico y pedal',
          tanqueCombustible: '9.5 litros',
          peso: '105 kg'
        }
      }
    ]
  },
  {
    id: 'bajaj',
    nombre: 'BAJAJ',
    modelos: [
      {
        id: 'pulsar150',
        nombre: 'Pulsar 150',
        cilindrajeCc: 150,
        tipo: 'Deportiva',
        especificaciones: {
          potencia: '14 HP @ 8,500 rpm',
          torque: '12.5 Nm @ 6,500 rpm',
          transmision: '5 velocidades',
          arranque: 'Eléctrico',
          tanqueCombustible: '15 litros',
          peso: '144 kg'
        }
      },
      {
        id: 'boxer150',
        nombre: 'Boxer 150',
        cilindrajeCc: 150,
        tipo: 'Urbana',
        especificaciones: {
          potencia: '12.1 HP @ 7,500 rpm',
          torque: '12.8 Nm @ 5,500 rpm',
          transmision: '5 velocidades',
          arranque: 'Eléctrico y pedal',
          tanqueCombustible: '12 litros',
          peso: '135 kg'
        }
      }
    ]
  }
];