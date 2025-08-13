import React, { useState } from 'react';
import { Plus, Search, Eye, Edit, FileText } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { EstadoOT } from '../packages/domain/entities/OrdenTrabajo';
import { useAppContext } from '../context/AppContext';
import { formatDate } from '../lib/utils';

const estadoColors: Record<EstadoOT, string> = {
  'Recepción': 'bg-gray-100 text-gray-800',
  'Diagnóstico': 'bg-yellow-100 text-yellow-800',
  'Cotizado': 'bg-blue-100 text-blue-800',
  'Aprobado': 'bg-green-100 text-green-800',
  'EnProceso': 'bg-indigo-100 text-indigo-800',
  'Pruebas': 'bg-purple-100 text-purple-800',
  'Listo': 'bg-emerald-100 text-emerald-800',
  'Entregado': 'bg-teal-100 text-teal-800',
  'Cerrado': 'bg-slate-100 text-slate-800',
};

export function OrdenesTrabajoList() {
  const { ordenes, vehiculos } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEstado, setSelectedEstado] = useState<EstadoOT | 'Todas'>('Todas');

  const filteredOrdenes = ordenes.filter(orden => {
    const matchesSearch = searchQuery === '' || 
      orden.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesEstado = selectedEstado === 'Todas' || orden.estado === selectedEstado;
    
    return matchesSearch && matchesEstado;
  });

  const estadoTabs: Array<EstadoOT | 'Todas'> = [
    'Todas', 'Recepción', 'Diagnóstico', 'Cotizado', 'Aprobado', 'EnProceso', 'Listo', 'Entregado'
  ];

  const getVehiculoInfo = (vehiculoId: string) => {
    const vehiculo = vehiculos.find(v => v.id === vehiculoId);
    return vehiculo ? `${vehiculo.marca} ${vehiculo.lineaModelo} - ${vehiculo.placa}` : 'Vehículo no encontrado';
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Órdenes de Trabajo</h1>
          <p className="text-gray-600 mt-2">Gestiona las órdenes de trabajo del taller</p>
        </div>
        <Button>
          <Plus size={20} className="mr-2" />
          Nueva Orden
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                type="text"
                placeholder="Buscar por número de orden..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            {/* Estado Tabs */}
            <div className="flex flex-wrap gap-2">
              {estadoTabs.map((estado) => (
                <Button
                  key={estado}
                  variant={selectedEstado === estado ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedEstado(estado)}
                >
                  {estado}
                  {estado !== 'Todas' && (
                    <span className="ml-2 bg-white/20 px-2 py-0.5 rounded-full text-xs">
                      {ordenes.filter(o => o.estado === estado).length}
                    </span>
                  )}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Orders Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredOrdenes.map((orden) => (
          <Card key={orden.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{orden.id}</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">
                    {getVehiculoInfo(orden.vehiculoId)}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="icon">
                    <Eye size={16} />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Edit size={16} />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Estado:</span>
                  <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${estadoColors[orden.estado]}`}>
                    {orden.estado}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Ingreso:</span>
                  <span className="text-sm">{formatDate(new Date(orden.fechaIngreso))}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Odómetro:</span>
                  <span className="text-sm">{orden.odometroIngreso.toLocaleString()} km</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Combustible:</span>
                  <span className="text-sm">{orden.nivelCombustible}</span>
                </div>
                
                {orden.fechaEstimadaEntrega && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Entrega estimada:</span>
                    <span className="text-sm">{formatDate(new Date(orden.fechaEstimadaEntrega))}</span>
                  </div>
                )}
                
                {orden.observaciones && (
                  <div className="pt-2 border-t">
                    <span className="text-sm text-gray-600">Observaciones:</span>
                    <p className="text-sm mt-1 line-clamp-2">{orden.observaciones}</p>
                  </div>
                )}
                
                <div className="flex items-center justify-between pt-3 border-t">
                  <Button variant="ghost" size="sm">
                    <FileText size={16} className="mr-1" />
                    Ver Detalles
                  </Button>
                  {orden.fotosUrl.length > 0 && (
                    <span className="text-xs text-gray-500">
                      {orden.fotosUrl.length} foto{orden.fotosUrl.length !== 1 ? 's' : ''}
                    </span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredOrdenes.length === 0 && (
        <Card>
          <CardContent className="py-16 text-center">
            <FileText size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchQuery || selectedEstado !== 'Todas' 
                ? 'No se encontraron órdenes' 
                : 'No hay órdenes registradas'
              }
            </h3>
            <p className="text-gray-600 mb-6">
              {searchQuery || selectedEstado !== 'Todas'
                ? 'Intenta con otros criterios de búsqueda'
                : 'Comienza creando tu primera orden de trabajo'
              }
            </p>
            {!searchQuery && selectedEstado === 'Todas' && (
              <Button>
                <Plus size={20} className="mr-2" />
                Nueva Orden
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}