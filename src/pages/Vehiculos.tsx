import React, { useState } from 'react';
import { Car, Search, Plus, Wrench, Fuel, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { marcasVehiculos } from '../data/marcasVehiculos';
import { MarcaVehiculo, ModeloVehiculo } from '../packages/domain/entities/Vehiculo';

export function Vehiculos() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMarca, setSelectedMarca] = useState<string | null>(null);
  const [selectedModelo, setSelectedModelo] = useState<ModeloVehiculo | null>(null);

  const filteredMarcas = marcasVehiculos.filter(marca =>
    marca.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
    marca.modelos.some(modelo => 
      modelo.nombre.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const marcaSeleccionada = marcasVehiculos.find(m => m.id === selectedMarca);

  const tipoColors: Record<string, string> = {
    'Urbana': 'bg-blue-100 text-blue-800',
    'Deportiva': 'bg-red-100 text-red-800',
    'Touring': 'bg-green-100 text-green-800',
    'Enduro': 'bg-yellow-100 text-yellow-800',
    'Scooter': 'bg-purple-100 text-purple-800',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="p-6 space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-blue-600 bg-clip-text text-transparent">
              Catálogo de Vehículos
            </h1>
            <p className="text-gray-600 mt-2">Explora las marcas y modelos disponibles</p>
          </div>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg">
            <Plus size={20} className="mr-2" />
            Registrar Vehículo
          </Button>
        </div>

        {/* Search */}
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                type="text"
                placeholder="Buscar marca o modelo..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-0 bg-gray-50/50 focus:bg-white transition-colors"
              />
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Marcas */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Marcas</h2>
            <div className="space-y-4">
              {filteredMarcas.map((marca) => (
                <Card 
                  key={marca.id} 
                  className={`cursor-pointer transition-all duration-300 hover:shadow-xl border-0 ${
                    selectedMarca === marca.id 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-2xl scale-105' 
                      : 'bg-white/80 backdrop-blur-sm hover:bg-white'
                  }`}
                  onClick={() => {
                    setSelectedMarca(selectedMarca === marca.id ? null : marca.id);
                    setSelectedModelo(null);
                  }}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`p-3 rounded-full ${
                          selectedMarca === marca.id ? 'bg-white/20' : 'bg-blue-100'
                        }`}>
                          <Car className={`${
                            selectedMarca === marca.id ? 'text-white' : 'text-blue-600'
                          }`} size={24} />
                        </div>
                        <div>
                          <CardTitle className="text-xl">{marca.nombre}</CardTitle>
                          <p className={`text-sm ${
                            selectedMarca === marca.id ? 'text-white/80' : 'text-gray-600'
                          }`}>
                            {marca.modelos.length} modelos
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>

          {/* Modelos */}
          <div className="lg:col-span-2">
            {marcaSeleccionada ? (
              <>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Modelos {marcaSeleccionada.nombre}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {marcaSeleccionada.modelos.map((modelo) => (
                    <Card 
                      key={modelo.id} 
                      className="cursor-pointer transition-all duration-300 hover:shadow-xl border-0 bg-white/80 backdrop-blur-sm hover:bg-white group"
                      onClick={() => setSelectedModelo(modelo)}
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                              {modelo.nombre}
                            </CardTitle>
                            <div className="flex items-center space-x-2 mt-2">
                              <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${tipoColors[modelo.tipo]}`}>
                                {modelo.tipo}
                              </span>
                              <span className="text-sm text-gray-600">
                                {modelo.cilindrajeCc}cc
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {modelo.especificaciones.potencia && (
                            <div className="flex items-center space-x-2">
                              <Wrench size={16} className="text-gray-400" />
                              <span className="text-sm text-gray-600">
                                {modelo.especificaciones.potencia}
                              </span>
                            </div>
                          )}
                          {modelo.especificaciones.tanqueCombustible && (
                            <div className="flex items-center space-x-2">
                              <Fuel size={16} className="text-gray-400" />
                              <span className="text-sm text-gray-600">
                                Tanque: {modelo.especificaciones.tanqueCombustible}
                              </span>
                            </div>
                          )}
                          {modelo.especificaciones.peso && (
                            <div className="flex items-center space-x-2">
                              <Calendar size={16} className="text-gray-400" />
                              <span className="text-sm text-gray-600">
                                Peso: {modelo.especificaciones.peso}
                              </span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-96">
                <div className="text-center">
                  <Car size={64} className="mx-auto text-gray-300 mb-4" />
                  <h3 className="text-xl font-medium text-gray-600 mb-2">
                    Selecciona una marca
                  </h3>
                  <p className="text-gray-500">
                    Elige una marca para ver sus modelos disponibles
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal de especificaciones */}
        {selectedModelo && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-screen items-center justify-center p-4">
              <div 
                className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                onClick={() => setSelectedModelo(null)}
              />
              <Card className="relative w-full max-w-2xl bg-white shadow-2xl border-0">
                <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
                  <CardTitle className="text-2xl">{selectedModelo.nombre}</CardTitle>
                  <p className="text-blue-100">
                    {marcaSeleccionada?.nombre} • {selectedModelo.cilindrajeCc}cc • {selectedModelo.tipo}
                  </p>
                </CardHeader>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Especificaciones Técnicas</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(selectedModelo.especificaciones).map(([key, value]) => {
                      if (!value) return null;
                      
                      const labels: Record<string, string> = {
                        potencia: 'Potencia',
                        torque: 'Torque',
                        transmision: 'Transmisión',
                        arranque: 'Arranque',
                        tanqueCombustible: 'Tanque de Combustible',
                        peso: 'Peso'
                      };
                      
                      return (
                        <div key={key} className="bg-gray-50 p-4 rounded-lg">
                          <div className="text-sm font-medium text-gray-600 mb-1">
                            {labels[key]}
                          </div>
                          <div className="text-gray-900 font-medium">
                            {value}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-6 flex justify-end">
                    <Button onClick={() => setSelectedModelo(null)}>
                      Cerrar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}