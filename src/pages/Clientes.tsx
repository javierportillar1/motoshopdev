import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Car, Users } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { useAppContext } from '../context/AppContext';
import { formatDate } from '../lib/utils';

export function Clientes() {
  const { clientes } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredClientes = clientes.filter(cliente =>
    cliente.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cliente.numeroDoc.includes(searchQuery) ||
    cliente.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="p-6 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-blue-600 bg-clip-text text-transparent">
            Clientes
          </h1>
          <p className="text-gray-600 mt-2">Gestiona la información de tus clientes</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg">
          <Plus size={20} className="mr-2" />
          Nuevo Cliente
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                type="text"
                placeholder="Buscar por nombre, documento o email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-0 bg-gray-50/50 focus:bg-white transition-colors"
              />
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Clients List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredClientes.map((cliente) => (
          <Card key={cliente.id} className="hover:shadow-2xl transition-all duration-300 border-0 bg-white/90 backdrop-blur-sm group hover:scale-105">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">{cliente.nombre}</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">
                    {cliente.tipoDoc}: {cliente.numeroDoc}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="icon" className="hover:bg-blue-50 hover:text-blue-600">
                    <Edit size={16} />
                  </Button>
                  <Button variant="ghost" size="icon" className="hover:bg-red-50 hover:text-red-600">
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Teléfono:</span>
                  <span className="text-sm">{cliente.telefono}</span>
                </div>
                {cliente.email && (
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Email:</span>
                    <span className="text-sm">{cliente.email}</span>
                  </div>
                )}
                {cliente.direccion && (
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Dirección:</span>
                    <span className="text-sm">{cliente.direccion}</span>
                  </div>
                )}
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Registro:</span>
                  <span className="text-sm">{formatDate(new Date(cliente.fechaRegistro))}</span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t">
                  <div className="flex items-center space-x-1 text-sm text-gray-600">
                    <Car size={16} />
                    <span>Ver vehículos</span>
                  </div>
                  <div className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                    cliente.consentimientoComunicaciones 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {cliente.consentimientoComunicaciones ? 'Acepta comunicaciones' : 'No acepta comunicaciones'}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredClientes.length === 0 && (
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="py-16 text-center">
            <Users size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchQuery ? 'No se encontraron clientes' : 'No hay clientes registrados'}
            </h3>
            <p className="text-gray-600 mb-6">
              {searchQuery 
                ? 'Intenta con otros términos de búsqueda'
                : 'Comienza agregando tu primer cliente'
              }
            </p>
            {!searchQuery && (
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Plus size={20} className="mr-2" />
                Agregar Cliente
              </Button>
            )}
          </CardContent>
        </Card>
      )}
      </div>
    </div>
  );
}