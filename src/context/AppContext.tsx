import React, { createContext, useContext, ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Cliente } from '../packages/domain/entities/Cliente';
import { Vehiculo } from '../packages/domain/entities/Vehiculo';
import { OrdenTrabajo } from '../packages/domain/entities/OrdenTrabajo';
import { initialClientes, initialVehiculos, initialOrdenes } from '../data/initialData';

interface AppContextType {
  clientes: Cliente[];
  setClientes: (clientes: Cliente[] | ((prev: Cliente[]) => Cliente[])) => void;
  vehiculos: Vehiculo[];
  setVehiculos: (vehiculos: Vehiculo[] | ((prev: Vehiculo[]) => Vehiculo[])) => void;
  ordenes: OrdenTrabajo[];
  setOrdenes: (ordenes: OrdenTrabajo[] | ((prev: OrdenTrabajo[]) => OrdenTrabajo[])) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [clientes, setClientes] = useLocalStorage<Cliente[]>('taller-clientes', initialClientes);
  const [vehiculos, setVehiculos] = useLocalStorage<Vehiculo[]>('taller-vehiculos', initialVehiculos);
  const [ordenes, setOrdenes] = useLocalStorage<OrdenTrabajo[]>('taller-ordenes', initialOrdenes);

  return (
    <AppContext.Provider value={{
      clientes,
      setClientes,
      vehiculos,
      setVehiculos,
      ordenes,
      setOrdenes,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}