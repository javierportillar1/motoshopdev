import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Select } from '../ui/Select';
import { EstadoOT } from '../../packages/domain/entities/OrdenTrabajo';

interface CambiarEstadoModalProps {
  isOpen: boolean;
  onClose: () => void;
  estadoActual: EstadoOT;
  onCambiarEstado: (nuevoEstado: EstadoOT) => void;
  ordenId: string;
}

const estadosOT: Array<{ value: EstadoOT; label: string; description: string }> = [
  { value: 'Recepción', label: 'Recepción', description: 'Vehículo recibido, pendiente de diagnóstico' },
  { value: 'Diagnóstico', label: 'Diagnóstico', description: 'En proceso de diagnóstico técnico' },
  { value: 'Cotizado', label: 'Cotizado', description: 'Cotización enviada al cliente' },
  { value: 'Aprobado', label: 'Aprobado', description: 'Cliente aprobó la cotización' },
  { value: 'EnProceso', label: 'En Proceso', description: 'Trabajos en ejecución' },
  { value: 'Pruebas', label: 'Pruebas', description: 'Realizando pruebas finales' },
  { value: 'Listo', label: 'Listo', description: 'Trabajo terminado, listo para entrega' },
  { value: 'Entregado', label: 'Entregado', description: 'Vehículo entregado al cliente' },
  { value: 'Cerrado', label: 'Cerrado', description: 'Orden cerrada y facturada' },
];

export function CambiarEstadoModal({ 
  isOpen, 
  onClose, 
  estadoActual, 
  onCambiarEstado, 
  ordenId 
}: CambiarEstadoModalProps) {
  const [nuevoEstado, setNuevoEstado] = useState<EstadoOT>(estadoActual);

  const estadoOptions = estadosOT.map(estado => ({
    value: estado.value,
    label: estado.label
  }));

  const estadoSeleccionado = estadosOT.find(e => e.value === nuevoEstado);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCambiarEstado(nuevoEstado);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Cambiar Estado - ${ordenId}`}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Estado Actual
          </label>
          <div className="p-3 bg-gray-50 rounded-lg">
            <span className="font-medium">{estadoActual}</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nuevo Estado
          </label>
          <Select
            options={estadoOptions}
            value={nuevoEstado}
            onChange={(e) => setNuevoEstado(e.target.value as EstadoOT)}
          />
          {estadoSeleccionado && (
            <p className="text-sm text-gray-600 mt-2">
              {estadoSeleccionado.description}
            </p>
          )}
        </div>

        <div className="flex justify-end space-x-3">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" disabled={nuevoEstado === estadoActual}>
            Cambiar Estado
          </Button>
        </div>
      </form>
    </Modal>
  );
}