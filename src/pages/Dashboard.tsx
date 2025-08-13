import React, { useEffect, useState } from 'react';
import { 
  FileText, 
  Users, 
  Car, 
  AlertTriangle,
  Clock,
  CheckCircle,
  TrendingUp,
  DollarSign 
} from 'lucide-react';
import { StatsCard } from '../components/dashboard/StatsCard';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { formatCurrency, formatDate } from '../lib/utils';

interface DashboardStats {
  totalOrdenes: number;
  ordenesAbiertas: number;
  clientesTotal: number;
  vehiculosTotal: number;
  ordenesHoy: number;
  recordatoriosVencidos: number;
  ventasDelMes: number;
  conversionCotizaciones: number;
}

export function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalOrdenes: 0,
    ordenesAbiertas: 0,
    clientesTotal: 0,
    vehiculosTotal: 0,
    ordenesHoy: 0,
    recordatoriosVencidos: 0,
    ventasDelMes: 0,
    conversionCotizaciones: 0,
  });

  const [recentOrders, setRecentOrders] = useState<any[]>([]);

  useEffect(() => {
    // Cargar estadísticas del dashboard
    loadDashboardStats();
    loadRecentOrders();
  }, []);

  const loadDashboardStats = async () => {
    // TODO: Implementar carga real de estadísticas
    setStats({
      totalOrdenes: 156,
      ordenesAbiertas: 23,
      clientesTotal: 87,
      vehiculosTotal: 134,
      ordenesHoy: 8,
      recordatoriosVencidos: 12,
      ventasDelMes: 15200000,
      conversionCotizaciones: 72,
    });
  };

  const loadRecentOrders = async () => {
    // TODO: Implementar carga real de órdenes recientes
    setRecentOrders([
      { id: 'OT-001', cliente: 'Juan Pérez', vehiculo: 'Honda CB 150', estado: 'Diagnóstico', fecha: new Date() },
      { id: 'OT-002', cliente: 'María García', vehiculo: 'Yamaha FZ16', estado: 'Aprobado', fecha: new Date() },
      { id: 'OT-003', cliente: 'Carlos López', vehiculo: 'Suzuki GN125', estado: 'EnProceso', fecha: new Date() },
    ]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="p-6 space-y-8">
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-blue-600 bg-clip-text text-transparent">
          Dashboard
        </h1>
        <p className="text-gray-600 mt-2">Vista general del taller</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatsCard
          title="Órdenes Abiertas"
          value={stats.ordenesAbiertas}
          icon={<FileText size={24} />}
          trend={{ value: "+12% vs mes anterior", isPositive: true }}
        />
        <StatsCard
          title="Clientes Activos"
          value={stats.clientesTotal}
          icon={<Users size={24} />}
          trend={{ value: "+5% vs mes anterior", isPositive: true }}
        />
        <StatsCard
          title="Vehículos Registrados"
          value={stats.vehiculosTotal}
          icon={<Car size={24} />}
        />
        <StatsCard
          title="Recordatorios Vencidos"
          value={stats.recordatoriosVencidos}
          icon={<AlertTriangle size={24} />}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatsCard
          title="Órdenes Hoy"
          value={stats.ordenesHoy}
          icon={<Clock size={24} />}
        />
        <StatsCard
          title="Ventas del Mes"
          value={formatCurrency(stats.ventasDelMes)}
          icon={<DollarSign size={24} />}
          trend={{ value: "+18% vs mes anterior", isPositive: true }}
        />
        <StatsCard
          title="Conversión Cotizaciones"
          value={`${stats.conversionCotizaciones}%`}
          icon={<TrendingUp size={24} />}
          trend={{ value: "+3% vs mes anterior", isPositive: true }}
        />
        <StatsCard
          title="Órdenes Completadas"
          value={stats.totalOrdenes - stats.ordenesAbiertas}
          icon={<CheckCircle size={24} />}
        />
      </div>

      {/* Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Órdenes Recientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between border-b pb-2 last:border-b-0">
                  <div>
                    <div className="font-medium">{order.id}</div>
                    <div className="text-sm text-gray-600">{order.cliente} - {order.vehiculo}</div>
                  </div>
                  <div className="text-right">
                    <div className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                      order.estado === 'Diagnóstico' ? 'bg-yellow-100 text-yellow-800' :
                      order.estado === 'Aprobado' ? 'bg-green-100 text-green-800' :
                      order.estado === 'EnProceso' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {order.estado}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {formatDate(order.fecha)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Alertas y Notificaciones</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg">
                <AlertTriangle className="text-red-500" size={20} />
                <div>
                  <div className="text-sm font-medium text-red-800">Stock Bajo</div>
                  <div className="text-xs text-red-600">5 productos por debajo del stock mínimo</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                <Clock className="text-yellow-500" size={20} />
                <div>
                  <div className="text-sm font-medium text-yellow-800">SOAT por Vencer</div>
                  <div className="text-xs text-yellow-600">8 vehículos con SOAT próximo a vencer</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                <FileText className="text-blue-500" size={20} />
                <div>
                  <div className="text-sm font-medium text-blue-800">Cotizaciones Pendientes</div>
                  <div className="text-xs text-blue-600">4 cotizaciones esperando respuesta</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      </div>
    </div>
  );
}