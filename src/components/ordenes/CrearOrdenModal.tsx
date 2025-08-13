import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Textarea } from '../ui/Textarea';
import { useAppContext } from '../../context/AppContext';
import { OrdenTrabajo } from '../../packages/domain/entities/OrdenTrabajo';

interface CrearOrdenModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated: (orden: OrdenTrabajo) => void;
}

export function CrearOrdenModal({ isOpen, onClose, onCreated }: CrearOrdenModalProps) {
  const { vehiculos, clientes } = useAppContext();
  const [formData, setFormData] = useState({
    vehiculoId: '',
    odometroIngreso: '',
    nivelCombustible: '1/2',
    observaciones: '',
    fechaEstimadaEntrega: '',
  });

  const vehiculosConCliente = vehiculos.map(vehiculo => {
    const cliente = clientes.find(c => c.id === vehiculo.clienteId);
    return {
      ...vehiculo,
      clienteNombre: cliente?.nombre || 'Cliente no encontrado'
    };
  });

  const vehiculoOptions = vehiculosConCliente.map(vehiculo => ({
    value: vehiculo.id,
    label: `${vehiculo.placa} - ${vehiculo.marca} ${vehiculo.lineaModelo} (${vehiculo.clienteNombre})`
  }));

  const combustibleOptions = [
    { value: 'Vacío', label: 'Vacío' },
    { value: '1/4', label: '1/4' },
    { value: '1/2', label: '1/2' },
    { value: '3/4', label: '3/4' },
    { value: 'Lleno', label: 'Lleno' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.vehiculoId || !formData.odometroIngreso) {
      alert('Por favor completa los campos obligatorios');
      return;
    }

    const nuevaOrden: OrdenTrabajo = {
      id: `OT-${new Date().getFullYear()}-${String(Date.now()).slice(-3)}`,
      vehiculoId: formData.vehiculoId,
      fechaIngreso: new Date(),
      estado: 'Recepción',
      odometroIngreso: parseInt(formData.odometroIngreso),
      nivelCombustible: formData.nivelCombustible,
      observaciones: formData.observaciones,
      fechaEstimadaEntrega: formData.fechaEstimadaEntrega ? new Date(formData.fechaEstimadaEntrega) : undefined,
      fotosUrl: [],
    };

    onCreated(nuevaOrden);
    setFormData({
      vehiculoId: '',
      odometroIngreso: '',
      nivelCombustible: '1/2',
      observaciones: '',
      fechaEstimadaEntrega: '',
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Nueva Orden de Trabajo" size="lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Vehículo *
            </label>
            <Select
              options={[{ value: '', label: 'Seleccionar vehículo' }, ...vehiculoOptions]}
              value={formData.vehiculoId}
              onChange={(e) => setFormData({ ...formData, vehiculoId: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Odómetro (km) *
            </label>
            <Input
              type="number"
              value={formData.odometroIngreso}
              onChange={(e) => setFormData({ ...formData, odometroIngreso: e.target.value })}
              placeholder="Ej: 15000"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nivel de Combustible
            </label>
            <Select
              options={combustibleOptions}
              value={formData.nivelCombustible}
              onChange={(e) => setFormData({ ...formData, nivelCombustible: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fecha Estimada de Entrega
            </label>
            <Input
              type="date"
              value={formData.fechaEstimadaEntrega}
              onChange={(e) => setFormData({ ...formData, fechaEstimadaEntrega: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Observaciones
          </label>
          <Textarea
            value={formData.observaciones}
            onChange={(e) => setFormData({ ...formData, observaciones: e.target.value })}
            placeholder="Describe el motivo de ingreso, síntomas reportados, etc."
            rows={4}
          />
        </div>

        <div className="flex justify-end space-x-3">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit">
            Crear Orden
          </Button>
        </div>
      </form>
    </Modal>
  );
}