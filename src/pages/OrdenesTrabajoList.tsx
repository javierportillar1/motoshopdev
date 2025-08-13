import React, { useState } from 'react';
import { Plus, Search, Eye, Edit, FileText, Settings } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { EstadoOT } from '../packages/domain/entities/OrdenTrabajo';
import { useAppContext } from '../context/AppContext';
import { formatDate } from '../lib/utils';
import { CrearOrdenModal } from '../components/ordenes/CrearOrdenModal';
import { CambiarEstadoModal } from '../components/ordenes/CambiarEstadoModal';

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
  const { ordenes, vehiculos, clientes, setOrdenes } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEstado, setSelectedEstado] = useState<EstadoOT | 'Todas'>('Todas');
  const [showCrearModal, setShowCrearModal] = useState(false);
  const [showCambiarEstadoModal, setShowCambiarEstadoModal] = useState(false);
  const [ordenSeleccionada, setOrdenSeleccionada] = useState<string | null>(null);

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
    if (!vehiculo) return 'Vehículo no encontrado';
    
    const cliente = clientes.find(c => c.id === vehiculo.clienteId);
    return {
      vehiculo: `${vehiculo.marca} ${vehiculo.lineaModelo} - ${vehiculo.placa}`,
      cliente: cliente?.nombre || 'Cliente no encontrado'
    };
  };

  const handleCrearOrden = (nuevaOrden: any) => {
    setOrdenes(prev => [...prev, nuevaOrden]);
  };

  const handleCambiarEstado = (nuevoEstado: EstadoOT) => {
    if (!ordenSeleccionada) return;
    
    setOrdenes(prev => prev.map(orden => 
      orden.id === ordenSeleccionada 
        ? { ...orden, estado: nuevoEstado }
        : orden
    ));
  };

  const ordenParaCambiarEstado = ordenes.find(o => o.id === ordenSeleccionada);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="p-6 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-blue-600 bg-clip-text text-transparent">
            Órdenes de Trabajo
          </h1>
          <p className="text-gray-600 mt-2">Gestiona las órdenes de trabajo del taller</p>
        </div>
        <Button 
          onClick={() => setShowCrearModal(true)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
        >
          <Plus size={20} className="mr-2" />
          Nueva Orden
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                type="text"
                placeholder="Buscar por número de orden..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-0 bg-gray-50/50 focus:bg-white transition-colors"
              />
            </div>
            
            {/* Estado Tabs */}
            <div className="flex flex-wrap gap-2">
              {estadoTabs.map((estado) => (
                <Button
                  key={estado}
                  variant={selectedEstado === estado ? 'default' : 'ghost'}
                  size="sm"
                  className={selectedEstado === estado 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                    : 'hover:bg-blue-50'
                  }
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
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          const vehiculoInfo = getVehiculoInfo(orden.vehiculoId);
        {filteredOrdenes.map((orden) => (
            <Card key={orden.id} className="hover:shadow-2xl transition-all duration-300 border-0 bg-white/90 backdrop-blur-sm group hover:scale-105">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">{orden.id}</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">
                    {typeof vehiculoInfo === 'object' ? vehiculoInfo.vehiculo : vehiculoInfo}
                  </p>
                  {typeof vehiculoInfo === 'object' && (
                    <p className="text-xs text-gray-500 mt-1">
                      Cliente: {vehiculoInfo.cliente}
                    </p>
                  )}
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="hover:bg-blue-50 hover:text-blue-600"
                  >
                    <Eye size={16} />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="hover:bg-green-50 hover:text-green-600"
                    onClick={() => {
                      setOrdenSeleccionada(orden.id);
                      setShowCambiarEstadoModal(true);
                    }}
                  >
                    <Settings size={16} />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Estado:</span>
                  <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${estadoColors[orden.estado]}`}>
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
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="hover:bg-blue-50 hover:text-blue-600"
                  >
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
          );
        ))}
      </div>

      {filteredOrdenes.length === 0 && (
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
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
              <Button 
                onClick={() => setShowCrearModal(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Plus size={20} className="mr-2" />
                Nueva Orden
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      {/* Modales */}
      <CrearOrdenModal
        isOpen={showCrearModal}
        onClose={() => setShowCrearModal(false)}
        onCreated={handleCrearOrden}
      />

      {ordenParaCambiarEstado && (
        <CambiarEstadoModal
          isOpen={showCambiarEstadoModal}
          onClose={() => {
            setShowCambiarEstadoModal(false);
            setOrdenSeleccionada(null);
          }}
          estadoActual={ordenParaCambiarEstado.estado}
          onCambiarEstado={handleCambiarEstado}
          ordenId={ordenParaCambiarEstado.id}
        />
      )}
      </div>
    </div>
  );
}